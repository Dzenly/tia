'use strict';

/* globals gT: true */
/* globals gIn: true */

const fs = require('fs');
const path = require('path');
const nodeUtils = require('../utils/nodejs-utils');

function getOs() {
  let os = require('os');
  return os.platform() + '_' + os.release();
}

function runTestFile(file) {

  gIn.tracer.msg2('Starting new test: ' + file);

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

function* handleTestFile(file, dirConfig) {

  // Restore the state which could be damaged by previous test and any other initialization.
  gIn.tInfo.isPassCountingEnabled = gT.engineConsts.defIsPassCountingEnabled;
  gIn.loggerCfg.defLLLogAction = gT.engineConsts.defLLLogAction;

  gIn.config = gIn.configUtils.copyConfig(dirConfig); // Config for current test, can be changed by test.
  // It is not safe to create such structure in the test and return it from test,
  // because test can be terminated with exception.

  //console.log('File: ' + file);
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

  gIn.fileUtils.createEmptyLog(file);
  gIn.fileUtils.rmPngs(file);

  if (gIn.params.extLog) {
    gIn.fileUtils.safeUnlink(gIn.params.extLog);
  }

  let startTime = gT.timeUtils.startTimer();

  yield Bluebird.try(function () { // gIn.tInfo.data
    return runTestFile(file);
  });

  gIn.logger.testSummary();

  if (gIn.params.extLog) {
    let extLog = gIn.fileUtils.safeReadFile(gIn.params.extLog);
    gIn.logger.log(extLog);
  }

  gIn.tInfo.data.time = gT.timeUtils.stopTimer(startTime);
  gIn.diffUtils.diff(file);

  return gIn.tInfo.data; // Return value to be uniform in handleDir.
}

function handleDirConfig(dir, files, prevDirConfig) {
  let index = files.indexOf(gT.engineConsts.configName);
  let config;
  if (index < 0) {
    config = {};
  } else {
    files.splice(index, 1);
    config = nodeUtils.requireEx(path.join(dir, gT.engineConsts.configName), true).result;
  }

  // Remove suite-config.js from list (it is already handled by the module entry point).
  index = files.indexOf(gT.engineConsts.suiteConfigName);
  if (index > -1) {
    files.splice(index, 1);
  }

  return gIn.configUtils.mergeConfigs(prevDirConfig, config);
}

/**
 * Read directory. Create test info. Start Timer.
 * Goes into subdirs recursively, runs test files, collects info for meta log.
 *
 * @param dir
 * @param prevDirConfig
 */
function* handleTestDir(dir, prevDirConfig) {
  gIn.tracer.msg3('handleDir Dir: ' + dir);
  let files = fs.readdirSync(dir);
  let dirConfig = handleDirConfig(dir, files, prevDirConfig);
  let dirInfo = gIn.tInfo.createTestInfo(true, dirConfig.sectionTitle, dir);
  let startTime = gT.timeUtils.startTimer();

  for (let fileOrDir of files) {
    let fileOrDirPath = path.join(dir, fileOrDir);
    let stat;
    try {
      stat = fs.statSync(fileOrDirPath);
    } catch (e) {
      continue; // We remove some files in process.
    }
    let innerCurInfo;
    if (stat.isFile() && path.extname(fileOrDirPath) === '.js') {
      innerCurInfo = yield* handleTestFile(fileOrDirPath, dirConfig);
    } else if (stat.isDirectory()) {
      if (fileOrDir === gT.engineConsts.profileRootDir) {
        gIn.tracer.msg3('Skipping directory, because it is browser profile');
        continue;
      }
      innerCurInfo = yield* handleTestDir(fileOrDirPath, dirConfig);
    } else {
      continue;
    }
    //console.log('handleDir, innerCurInfo: ' + innerCurInfo);

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

function* runTestSuite(dir) {
  //console.log('runAsync Dir: ' + dir);
  let log = dir + '.mlog'; // Summary log.
  let procInfoFilePath = dir + '.procInfo';
  let txtAttachments = [log];
  let noTimeLog = log + '.notime';
  let prevDif = noTimeLog + '.prev.dif';
  let etDif = noTimeLog + '.et.dif';
  let noTimeLogPrev = noTimeLog + '.prev';
  gIn.fileUtils.safeUnlink(log);
  gIn.fileUtils.safeUnlink(prevDif);
  gIn.fileUtils.safeUnlink(etDif);
  gIn.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  let dirInfo = yield* handleTestDir(dir, gT.dirConfigDefault);

  if (!gIn.params.useRemoteDriver) {
    yield gT.s.driver.quitIfInited();
  } else {
    gIn.tracer.msg3('No force driver.quit() for the last test, due to useRemoteDriver option');
  }

  // dirInfo.title = path.basename(dir);
  gIn.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  let noPrevMLog = gIn.fileUtils.isAbsent(noTimeLogPrev);
  let metaLogPrevDifRes = gIn.diffUtils.getDiff('.', noTimeLog, noTimeLogPrev);
  let metaLogPrevDifResBool = Boolean(metaLogPrevDifRes);
  if (metaLogPrevDifResBool) {
    fs.writeFileSync(prevDif, metaLogPrevDifRes, {encoding: gT.engineConsts.logEncoding});
    txtAttachments.push(prevDif);
  }

  let etMlogInfo = '';
  let etMlogInfoCons = '';

  if (gIn.params.etMlog) {
    let metaLogEtDifRes = gIn.diffUtils.getDiff('.', noTimeLog, gIn.params.etMlog);
    let metaLogEtDifResBool = Boolean(metaLogEtDifRes);
    if (metaLogEtDifResBool) {
      fs.writeFileSync(etDif, metaLogEtDifRes, {encoding: gT.engineConsts.logEncoding});
      txtAttachments.push(etDif);
    }
    gIn.tracer.msg3('metaLogEtDifRes: ' + metaLogEtDifResBool);
    etMlogInfo = metaLogEtDifResBool ? 'DIF_MLOG, ' : 'ET_MLOG, ';
    etMlogInfoCons = metaLogEtDifResBool ? gIn.cLogger.chalkWrap('red', 'DIF_MLOG') + ', ' :
      gIn.cLogger.chalkWrap('green', 'ET_MLOG') + ', ';
  }

  let subjTimeMark = dirInfo.time > gIn.params.tooLongTime ? ', TOO_LONG' : '';

  let changedDiffs = gIn.diffUtils.changedDiffs ? '(' + gIn.diffUtils.changedDiffs + ' diff(s) changed)' : '';
  let emailSubj = (noPrevMLog ? 'NO PREV' : (metaLogPrevDifResBool ? 'DIF FROM PREV' : ('AS PREV' + changedDiffs))) +
    subjTimeMark +
    ', ' + gIn.logger.saveSuiteLog(dirInfo, log) + ', ' + getOs();
  let emailSubjCons = etMlogInfoCons + emailSubj;
  emailSubj = etMlogInfo + emailSubj;

  dirInfo.metaLogDiff = metaLogPrevDifResBool;
  dirInfo.os = getOs();
  gIn.fileUtils.saveJson(dirInfo, log + '.json');

  let arcName = gIn.fileUtils.archiveSuiteDir(dirInfo);

  let procInfo = nodeUtils.getProcInfo();
  fs.writeFileSync(procInfoFilePath, procInfo, {encoding: gT.engineConsts.logEncoding});
  txtAttachments.push(procInfoFilePath);

  yield gIn.mailUtils.send(emailSubj, txtAttachments, [arcName]);
  let status = dirInfo.diffed ? 1 : 0;
  gIn.cLogger.msg('\n' + emailSubjCons + '\n');
  if (gT.suiteConfig.metaLogToStdout) {
    gIn.logger.printSuiteLog(dirInfo);
    gIn.cLogger.msgln(procInfo);
    //gIn.fileUtils.fileToStdout(log);
  }

  if (gT.suiteConfig.removeZipAfterSend) {
    gIn.fileUtils.safeUnlink(arcName);
  }

  return status;// Process exit status.
}

// Returns subject for email.
module.exports = function runner(suiteRoot) {
  gIn.configUtils.handleSuiteConfig();

  if (gIn.params.stopRemoteDriver) {
    gIn.remoteDriverUtils.stop();
    return 'Just removing of remove driver';
  }

  let result = Bluebird.resolve(true);

  if (gIn.params.useRemoteDriver) {
    result = result.then(function () {
      return gIn.remoteDriverUtils.start();
    });
  }

  // Return value is not needed.
  result
    .then(function () {
      try {
        fs.mkdirSync(gIn.params.profileRootPath);
      } catch (e) {
      }
      return gT.u.iterate(runTestSuite(suiteRoot));
    }).then(
    function (exitStatus) {
      process.exitCode = exitStatus;
    },
    function (err) {
      gIn.tracer.err('Runner ERR: ' + gIn.textUtils.excToStr(err));
      process.exitCode = 1;
    }
  );
  // .then(function () {
  //   process.exit();
  // });
};


