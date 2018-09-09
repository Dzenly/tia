'use strict';

/* globals gT: true */
/* globals gIn: true */

const fs = require('fs');
const path = require('path');
const nodeUtils = require('../utils/nodejs-utils.js');
const fileUtils = require('../utils/file-utils.js');
const _ = require('lodash');
const Bluebird = require('bluebird');

function getOs() {
  const os = require('os');
  return `${os.platform()}_${os.release()}`;
}

function runTestFile(file) {
  gIn.tracer.msg2(`Starting new test: ${file}`);

  gIn.errRecursionCount = 0;
  gIn.cancelThisTest = false;

  try {
    return nodeUtils.requireEx(file, true).result;
  } catch (e) {
    // TODO: why did I disable exceptions to console here?
    gIn.logger.exception('Exception in runner: ', e);
    gIn.logger.logResourcesUsage();
    gIn.tInfo.addFail();
  }
}

async function handleTestFile(file, dirConfig) {
  // Restore the state which could be damaged by previous test and any other initialization.
  gIn.tInfo.isPassCountingEnabled = gT.engineConsts.defIsPassCountingEnabled;
  gIn.loggerCfg.defLLLogAction = gT.engineConsts.defLLLogAction;

  gIn.config = _.cloneDeep(dirConfig); // Config for current test, can be changed by test.
  // It is not safe to create such structure in the test and return it from test,
  // because test can be terminated with exception.

  // console.log('File: ' + file);
  if (gIn.params.pattern && file.lastIndexOf(gIn.params.pattern) < gIn.params.minPathSearchIndex) {
    return null;
  }

  gIn.tInfo.data = gIn.tInfo.createTestInfo(false, '', file); // Test should change this title.

  if (dirConfig.skip && !gIn.params.ignoreSkipFlag) {
    gIn.tInfo.data.skipped = 1;
    return gIn.tInfo.data;
  }

  gIn.tInfo.data.handled = 1;

  if (gIn.config.DISPLAY && gIn.params.xvfb) {
    process.env.DISPLAY = gIn.config.DISPLAY;
  } else {
    process.env.DISPLAY = gT.engineConsts.defDisplay;
  }

  fileUtils.createEmptyLog(file);
  fileUtils.rmPngs(file);

  if (gIn.params.extLog) {
    fileUtils.safeUnlink(gIn.params.extLog);
  }

  const startTime = gT.timeUtils.startTimer();

  // gIn.tInfo.data
  await runTestFile(file); // Can be sync.

  gIn.logger.testSummary();

  if (gIn.params.extLog) {
    const extLog = fileUtils.safeReadFile(gIn.params.extLog);
    gIn.logger.log(extLog);
  }

  gIn.tInfo.data.time = gT.timeUtils.stopTimer(startTime);
  gIn.diffUtils.diff(file);

  return gIn.tInfo.data; // Return value to be uniform in handleDir.
}

/**
 * Removes config from files. Merges current config to parrent config.
 * @param {String} dir
 * @param {Array<String>} files
 * @param {Object} parentDirConfig
 * @return {Object} directory config.
 */
function handleDirConfig(dir, files, parentDirConfig) {
  let config;
  if (files.includes(gT.engineConsts.dirConfigName)) {
    config = nodeUtils.requireEx(path.join(dir, gT.engineConsts.dirConfigName), true).result;
  } else {
    config = {};
  }

  // TODO: some error when suite configs or root configs is met in wrong places.
  _.pullAll(files, [
    gT.engineConsts.suiteConfigName,
    gT.engineConsts.dirConfigName,
    gT.engineConsts.resultsSubDirName,
    gT.engineConsts.dirRootConfigName,
    gT.engineConsts.suiteRootConfigName,
  ]);

  return _.merge(_.cloneDeep(parentDirConfig), config);
}

/**
 * Read directory. Create test info. Start Timer.
 * Goes into subdirs recursively, runs test files, collects info for suite log.
 *
 * @param dir
 * @param parentDirConfig
 */
async function handleTestDir(dir, parentDirConfig) {
  gIn.tracer.msg3(`handleDir Dir: ${dir}`);

  const filesOrDirs = fs.readdirSync(dir).filter((fileName) => {
    for (const pattern of gT.engineConsts.patternsToIgnore) { // eslint-disable-line no-restricted-syntax
      if (pattern.test(fileName)) {
        return false;
      }
    }
    return true;
  });

  const dirConfig = handleDirConfig(dir, filesOrDirs, parentDirConfig);
  const dirInfo = gIn.tInfo.createTestInfo(true, dirConfig.sectionTitle, dir);
  const startTime = gT.timeUtils.startTimer();

  for (const fileOrDir of filesOrDirs) { // eslint-disable-line no-restricted-syntax
    const fileOrDirPath = path.join(dir, fileOrDir);
    let stat;
    try {
      stat = fs.statSync(fileOrDirPath);
    } catch (e) {
      continue; // We remove some files in process.
    }
    let innerCurInfo;
    if (stat.isFile() && path.extname(fileOrDirPath) === '.js') {
      innerCurInfo = await handleTestFile(fileOrDirPath, dirConfig);
    } else if (stat.isDirectory()) {
      if (fileOrDir === gT.engineConsts.browserProfileRootDirName) {
        gIn.tracer.msg3('Skipping directory, because it is browser profile');
        continue;
      }
      innerCurInfo = await handleTestDir(fileOrDirPath, dirConfig);
    } else {
      continue;
    }

    // console.log('handleDir, innerCurInfo: ' + innerCurInfo);

    if (innerCurInfo) {
      dirInfo.handled += innerCurInfo.handled;
      dirInfo.passed += innerCurInfo.passed;
      dirInfo.failed += innerCurInfo.failed;
      dirInfo.diffed += innerCurInfo.diffed;
      dirInfo.expDiffed += innerCurInfo.expDiffed;
      dirInfo.skipped += innerCurInfo.skipped;
      dirInfo.children.push(innerCurInfo);
    }
  }

  dirInfo.time = gT.timeUtils.stopTimer(startTime);
  return dirInfo;
}

async function runTestSuite(suiteData) {
  const { root, log } = suiteData;

  // console.log('runAsync Dir: ' + dir);

  const procInfoFilePath = `${root}/${gT.engineConsts.resultsSubDirName}/.procInfo`;
  const txtAttachments = [log];
  const noTimeLog = `${log}.notime`;
  const prevDif = `${noTimeLog}.prev.dif`;
  const etDif = `${noTimeLog}.et.dif`;
  const noTimeLogPrev = `${noTimeLog}.prev`;

  fileUtils.safeUnlink(log);
  fileUtils.safeUnlink(prevDif);
  fileUtils.safeUnlink(etDif);
  fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  const dirInfo = await handleTestDir(root, gT.rootDirConfig);

  if (!gIn.params.useRemoteDriver) {
    await gT.s.driver.quitIfInited();
  } else {
    gIn.tracer.msg3('No force driver.quit() for the last test, due to useRemoteDriver option');
  }

  // dirInfo.title = path.basename(dir);
  gIn.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  const noPrevSLog = fileUtils.isAbsent(noTimeLogPrev);
  const suiteLogPrevDifRes = gIn.diffUtils.getDiff('.', noTimeLog, noTimeLogPrev);
  const suiteLogPrevDifResBool = Boolean(suiteLogPrevDifRes);
  if (suiteLogPrevDifResBool) {
    fs.writeFileSync(prevDif, suiteLogPrevDifRes, { encoding: gT.engineConsts.logEncoding });
    txtAttachments.push(prevDif);
  }

  const suiteLogEtDifRes = gIn.diffUtils.getDiff('.', noTimeLog, gIn.suite.etLog);
  const suiteLogEtDifResBool = Boolean(suiteLogEtDifRes);
  if (suiteLogEtDifResBool) {
    fs.writeFileSync(etDif, suiteLogEtDifRes, { encoding: gT.engineConsts.logEncoding });
    txtAttachments.push(etDif);
  }
  gIn.tracer.msg3(`suiteLogEtDifRes: ${suiteLogEtDifResBool}`);
  const etSLogInfo = suiteLogEtDifResBool ? 'DIF_SLOG, ' : 'ET_SLOG, ';
  const etSLogInfoCons = suiteLogEtDifResBool ? `${gIn.cLogger.chalkWrap('red', 'DIF_SLOG')}, ` :
    `${gIn.cLogger.chalkWrap('green', 'ET_SLOG')}, `;

  const subjTimeMark = dirInfo.time > gIn.params.tooLongTime ? ', TOO_LONG' : '';

  const changedDiffs = gIn.diffUtils.changedDiffs ? `(${gIn.diffUtils.changedDiffs} diff(s) changed)` : '';

  let emailSubj;
  if (noPrevSLog) {
    emailSubj = 'NO PREV';
  } else if (suiteLogPrevDifResBool) {
    emailSubj = 'DIF FROM PREV';
  } else {
    emailSubj = `AS PREV${changedDiffs}`;
  }
  emailSubj = `${emailSubj}${subjTimeMark},${gIn.logger.saveSuiteLog(dirInfo, log)}, ${getOs()}`;

  const emailSubjCons = etSLogInfoCons + emailSubj;
  emailSubj = etSLogInfo + emailSubj;

  dirInfo.suiteLogDiff = suiteLogPrevDifResBool;
  dirInfo.os = getOs();
  fileUtils.saveJson(dirInfo, `${log}.json`);

  const arcName = fileUtils.archiveSuiteDir(dirInfo);

  const procInfo = nodeUtils.getProcInfo();
  fs.writeFileSync(procInfoFilePath, procInfo, { encoding: gT.engineConsts.logEncoding });
  txtAttachments.push(procInfoFilePath);

  await gIn.mailUtils.send(emailSubj, txtAttachments, [arcName]);
  const status = dirInfo.diffed ? 1 : 0;
  gIn.cLogger.msg(`\n${emailSubjCons}\n`);
  if (gT.suiteConfig.suiteLogToStdout) {
    gIn.logger.printSuiteLog(dirInfo);
    gIn.cLogger.msgln(procInfo);

    // fileUtils.fileToStdout(log);
  }

  if (gT.suiteConfig.removeZipAfterSend) {
    fileUtils.safeUnlink(arcName);
  }

  return status;// Process exit status.
}

async function prepareAndRunTestSuite(root) {
  const browserProfilePath = path.resolve(
    root,
    gT.engineConsts.resultsSubDirName,
    gT.engineConsts.browserProfileRootDirName
  );

  const log = path.join(
    root,
    gT.engineConsts.resultsSubDirName,
    gT.engineConsts.suiteLogName + gT.engineConsts.logExtension
  );

  const etLog = path.join(
    root,
    gT.engineConsts.resultsSubDirName,
    gT.engineConsts.suiteLogName + gT.engineConsts.etalonExtension
  );

  const configPath = path.join(
    root,
    gT.engineConsts.suiteConfigName
  );

  const suite = {
    root,
    browserProfilePath,
    log,
    etLog,
    configPath,
  };

  gIn.suite = suite;

  gIn.configUtils.handleSuiteConfig();

  if (gIn.params.stopRemoteDriver) {
    gIn.remoteDriverUtils.stop();
    return 'Just removing of remote driver';
  }

  if (gIn.params.useRemoteDriver) {
    await gIn.remoteDriverUtils.start();

    // .catch((err) => {
    //   gIn.tracer.err(`Runner ERR, remoteDriverUtils.start: ${err}`);
    // });
  }

  const exitStatus = await runTestSuite(suite)
    .catch((err) => {
      gIn.tracer.err(`Runner ERR: ${gIn.textUtils.excToStr(err)}`);
      process.exitCode = 1;
    });

  if (exitStatus !== 0) { // 0 is returned only if all suites pass correctly.
    process.exitCode = exitStatus;
  }


  // .then(function () {
  //   process.exit();
  // });
}


function getTestSuitePaths() {
  const suitePaths = [];

  function walkSubDirs(dir) {
    const dirs = fs.readdirSync(dir).filter((fileName) => {
      const fullPath = path.join(dir, fileName);
      if (!fileUtils.isDirectory(fullPath)) {
        return false;
      }

      for (const pattern of gT.engineConsts.patternsToIgnore) { // eslint-disable-line no-restricted-syntax
        if (pattern.test(fileName)) {
          return false;
        }
      }

      if (fileName === gT.engineConsts.suiteDirName) {
        suitePaths.push(fullPath);
        return false;
      }

      return fileName !== gT.engineConsts.resultsSubDirName;
    });

    dirs.forEach((subDir) => {
      const fullPath = path.join(dir, subDir);
      walkSubDirs(fullPath);
    });
  }

  walkSubDirs(gIn.params.rootDir);

  return suitePaths;
}


// Returns subject for email.
exports.runTestSuites = async function runTestSuites() {
  const suitePaths = getTestSuitePaths();

  gIn.tracer.msg3(`Following suite paths are found: ${suitePaths}`);

  process.exitCode = 0;

  for (const suitePath of suitePaths) { // eslint-disable-line no-restricted-syntax
    const result = await prepareAndRunTestSuite(suitePath);
  }

  const asdf = 5;
};
