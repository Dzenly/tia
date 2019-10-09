

/* globals gT: true */
/* globals gIn: true */

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as nodeUtils from '../utils/nodejs-utils';
import * as fileUtils from '../utils/file-utils';
import * as suiteUtils from '../utils/suite-utils';
import * as os from 'os';
import { TestInfo } from './test-info';
import { handleSuiteConfig } from '../utils/config-utils';

function getOs() {
  return `${os.platform()}_${os.release()}`;
}

function isIterator(result: any) {
  if (!result) {
    return false;
  }
  const funcs = ['next', 'return', 'throw'];

  return funcs.every(func => typeof result[func] === 'function');
}

function exceptionHandler(e: Error) {
  // TODO: why did I disable exceptions to console here?
  gIn.logger.exception('Exception in runner: ', e);
  gIn.logger.logResourcesUsage();
  gIn.tInfo.addFail();
}

async function runTestFile(file: string) {
  gIn.tracer.msg2(`Starting new test: ${file}`);

  gIn.errRecursionCount = 0;
  gIn.cancelThisTest = false;

  try {
    let testObject = nodeUtils.requireEx(file, true).result;
    if (testObject.__esModule === true) {
      testObject = testObject.default;
    }
    if (typeof testObject === 'function') {
      const funcRes = await testObject(gT, gIn, gT.a); // TIA :) Test Inner Assertions.
      if (isIterator(funcRes)) {
        await gT.u.misc.iterateSafe(funcRes);
      }
    } else {
      await testObject;
    }
  } catch (e) {
    exceptionHandler(e);
  }

  // To allow test read events from event loop.
  await gT.u.promise.delayed(gT.config.delayAfterTest);
}

// return null - means skipped by --pattern or --new or due to etalon absence.
async function handleTestFile(file: string, dirConfig: any) {
  // Restore the state which could be damaged by previous test and any other initialization.
  gIn.tInfo.setPassCountingEnabled(gT.engineConsts.defIsPassCountingEnabled);
  gIn.loggerCfg.setDefLLLogAction(gT.engineConsts.defLLLogAction);

  gT.config = _.cloneDeep(dirConfig); // Config for current test, can be changed by test.
  // It is not safe to create such structure in the test and return it from test,
  // because test can be terminated with exception.

  // console.log('File: ' + file);
  if (
    gT.cLParams.pattern &&
    file.lastIndexOf(gT.cLParams.pattern) < gT.cLParams.minPathSearchIndex
  ) {
    return null;
  }

  const etalonAbsent = fileUtils.isEtalonAbsent(file);
  if (gT.cLParams.new && !etalonAbsent) {
    return null;
  }

  const skippedDir = dirConfig.skip && !gT.cLParams.ignoreSkipFlag;
  if (!skippedDir && etalonAbsent) {
    if (gT.cLParams.new) {
      gIn.tracer.msg0(`Found new test: ${file}`);
    } else {
      gIn.tracer.msg0(`Skipped new test: ${file}`);
      if (!gT.cLParams.pattern) {
        suiteUtils.saveNewTestInfo(file);
      }
      return null;
    }
  }

  gIn.tInfo.setData(gIn.tInfo.createTestInfo(false, '', file)); // Test should change this title.

  if (skippedDir) {
    gIn.tInfo.setSkipped(1);
    return gIn.tInfo.getData();
  }

  gIn.tInfo.setRun(1);

  if (gT.config.DISPLAY && gT.cLParams.xvfb) {
    process.env.DISPLAY = gT.config.DISPLAY;
  } else {
    process.env.DISPLAY = gT.engineConsts.defDisplay;
  }

  fileUtils.createEmptyLog(file);
  fileUtils.rmPngs(file);

  if (gT.cLParams.extLog) {
    fileUtils.safeUnlink(gT.cLParams.extLog);
  }

  const startTime = gT.timeUtils.startTimer();

  await runTestFile(file).catch(e => {
    const asdf = 5;
  }); // Can be sync.

  gIn.logger.testSummary();

  if (gT.cLParams.extLog) {
    const extLog = fileUtils.safeReadFile(gT.cLParams.extLog);
    gIn.logger.log(extLog);
  }

  gIn.tInfo.setTime(gT.timeUtils.stopTimer(startTime));
  if (!gT.cLParams.new) {
    gIn.diffUtils.diff({
      jsTest: file,
    });
  }

  return gIn.tInfo.getData(); // Return value to be uniform in handleDir.
}

/**
 * Removes config from files. Merges current config to parrent config.
 * Also removes names specified by config.ignoreNames.
 * @param {String} dir
 * @param {Array<String>} files
 * @param {Object} parentDirConfig
 * @return {Object} directory config.
 */
function handleDirConfig(dir: string, files: string[], parentDirConfig: any) {
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
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.rootResDirName,
    gT.engineConsts.dirRootConfigName,
    gT.engineConsts.suiteRootConfigName,
  ]);

  if (config.requireMods) {
    nodeUtils.requireArray(config.requireMods);
  }

  const dirCfg = _.merge(_.cloneDeep(parentDirConfig), config);

  if (dirCfg.ignoreNames) {
    _.pullAll(files, dirCfg.ignoreNames);
  }

  if (config.browserProfileDir) {
    dirCfg.browserProfilePath = path.join(gIn.suite.browserProfilesPath, config.browserProfileDir);
  } else {
    dirCfg.browserProfilePath = gT.defaultRootProfile;
  }

  gIn.tracer.msg2(`Profile path: ${dirCfg.browserProfilePath}`);

  return dirCfg;
}

/**
 * Read directory. Create test info. Start Timer.
 * Goes into subdirs recursively, runs test files, collects info for suite log.
 *
 * @param dir
 * @param parentDirConfig
 */
async function handleTestDir(dir: string, parentDirConfig: any) {
  gIn.tracer.msg3(`handleDir Dir: ${dir}`);

  let filesOrDirs = fs
    .readdirSync(dir)
    .filter(fileName => {
      for (const pattern of gT.engineConsts.patternsToIgnore) {
        // eslint-disable-line no-restricted-syntax
        if (pattern.test(fileName)) {
          return false;
        }
      }
      return true;
    })
    .sort();

  const dirConfig = handleDirConfig(dir, filesOrDirs, parentDirConfig);

  if (gIn.dirArr && gIn.dirArr.length > 0) {
    filesOrDirs = [gIn.dirArr.shift()!];
  }

  const dirInfo = gIn.tInfo.createTestInfo(true, dirConfig.sectionTitle, dir);
  const startTime = gT.timeUtils.startTimer();

  for (const fileOrDir of filesOrDirs) {
    // eslint-disable-line no-restricted-syntax
    const fileOrDirPath = path.join(dir, fileOrDir);
    let stat;
    try {
      stat = fs.statSync(fileOrDirPath);
    } catch (e) {
      continue; // We remove some files in process.
    }
    let innerCurInfo;
    if (stat.isFile() && fileOrDirPath.endsWith(gT.engineConsts.tiaJsSuffix)) {
      const tsFile = gIn.textUtils.jsToTs(fileOrDirPath);
      if (fs.existsSync(tsFile)) {
        throw new Error(
          `You must use either TS or JS file for test, but not both: ${fileOrDirPath}`
        );
      }
      innerCurInfo = await handleTestFile(fileOrDirPath, dirConfig);
    } else if (stat.isFile() && fileOrDirPath.endsWith(gT.engineConsts.tiaTsSuffix)) {
      innerCurInfo = await handleTestFile(fileOrDirPath, dirConfig);
    } else if (stat.isDirectory()) {
      if (fileOrDir === gT.engineConsts.browserProfilesRootDirName) {
        gIn.tracer.msg3(`Skipping directory ${fileOrDirPath}, because it is browser profile`);
        continue;
      }
      innerCurInfo = await handleTestDir(fileOrDirPath, dirConfig);
    } else {
      gIn.tracer.msg3(`Skipping file: ${fileOrDirPath}, because it is not TIA test.`);
      continue;
    }

    // console.log('handleDir, innerCurInfo: ' + innerCurInfo);

    if (innerCurInfo) {
      dirInfo.run += innerCurInfo.run;
      dirInfo.passed += innerCurInfo.passed;
      dirInfo.failed += innerCurInfo.failed;
      dirInfo.diffed += innerCurInfo.diffed;
      dirInfo.expDiffed += innerCurInfo.expDiffed;
      dirInfo.skipped += innerCurInfo.skipped;
      dirInfo.children!.push(innerCurInfo);
    }
  }

  dirInfo.time = gT.timeUtils.stopTimer(startTime);
  return dirInfo;
}

interface SuiteResult {
  dirInfo?: any;
  path?: string; // TODO: path is just for TS.
  suiteEqualToEtalon?: boolean;
  diffed?: number;
  emailSubj?: string;
  emailSubjConsole?: string;
  err?: any;
}

async function runTestSuite(suiteData: any): Promise<SuiteResult> {
  const { root, log: suiteLog } = suiteData;

  // console.log('runAsync Dir: ' + dir);

  const procInfoFilePath = `${root}/${gT.engineConsts.suiteResDirName}/.procInfo`;
  const txtAttachments = [suiteLog];
  const noTimeSuiteLogFName = `${suiteLog}.notime`;
  const noTimePlusTestDifsSuiteLogFName = `${suiteLog}.notime.plus.difs`;
  const prevDifFName = `${noTimeSuiteLogFName}.prev.dif`;
  const etDifHtmlFName = `${noTimeSuiteLogFName}.et.dif.html`;
  const etDifTxtFName = `${noTimeSuiteLogFName}.et.dif`;
  const noTimeSuiteLogPrevFName = `${noTimeSuiteLogFName}.prev`;

  if (!gT.cLParams.new && !gT.cLParams.dir && !gT.cLParams.pattern) {
    fileUtils.safeUnlink(suiteLog);
    fileUtils.safeUnlink(prevDifFName);
    fileUtils.safeUnlink(etDifHtmlFName);
    fileUtils.safeUnlink(etDifTxtFName);
    fileUtils.safeRename(noTimeSuiteLogFName, noTimeSuiteLogPrevFName);
    suiteUtils.rmNewTestsInfo();
  }

  const dirInfo = await handleTestDir(root, gT.rootDirConfig);
  dirInfo.isSuiteRoot = true;

  const { diffed } = dirInfo;

  if (gT.cLParams.dir) {
    // gIn.cLogger.msgln(JSON.stringify(dirInfo, null, 2));
    gIn.logger.printSuiteLog(dirInfo);
  }

  if (gT.cLParams.new) {
    return { path: '' }; // TODO: path is just for TS.
  }

  if (gT.cLParams.pattern || gT.cLParams.dir) {
    return { dirInfo, path: '' }; // TODO: path is just for TS.
  }

  // dirInfo.title = path.basename(dir);
  gIn.logger.saveSuiteLog({
    dirInfo,
    log: noTimePlusTestDifsSuiteLogFName,
    noTime: true,
  });

  gIn.logger.saveSuiteLog({
    dirInfo,
    log: noTimeSuiteLogFName,
    noTime: true,
    noTestDifs: true,
  });

  const noPrevSLog = fileUtils.isAbsent(noTimeSuiteLogPrevFName);
  const suiteLogPrevDifRes = gIn.diffUtils.getDiff({
    dir: '.',
    oldFile: noTimeSuiteLogFName,
    newFile: noTimeSuiteLogPrevFName,
  });
  const suiteLogPrevDifResBool = Boolean(suiteLogPrevDifRes);
  if (suiteLogPrevDifResBool) {
    fs.writeFileSync(prevDifFName, suiteLogPrevDifRes, { encoding: gT.engineConsts.logEncoding });
    txtAttachments.push(prevDifFName);
  }

  let etDifTxt = '';
  const suiteLogEtDifResStr = gIn.diffUtils.getDiff({
    dir: '.',
    oldFile: noTimeSuiteLogFName,
    newFile: gIn.suite.etLog,
    highlight: 'html',
    htmlWrap: true,
  });
  const suiteEqualToEtalon = !suiteLogEtDifResStr;
  if (!suiteEqualToEtalon) {
    fs.writeFileSync(etDifHtmlFName, suiteLogEtDifResStr, {
      encoding: gT.engineConsts.logEncoding,
    });

    etDifTxt = gIn.diffUtils.getDiff({
      dir: '.',
      oldFile: noTimeSuiteLogFName,
      newFile: gIn.suite.etLog,
      highlight: 'ansi',
    });
    fs.writeFileSync(etDifTxtFName, etDifTxt, { encoding: gT.engineConsts.logEncoding });
  }
  gIn.tracer.msg3(`equalToEtalon: ${suiteEqualToEtalon}`);
  const etSLogInfoEmail = suiteEqualToEtalon ? 'ET_SLOG, ' : 'DIF_SLOG, ';
  const etSLogInfoConsole = suiteEqualToEtalon
    ? `${gIn.cLogger.chalkWrap('green', 'ET_SLOG')}, `
    : `${gIn.cLogger.chalkWrap('red', 'DIF_SLOG')}, `;

  const subjTimeMark = dirInfo.time > gT.cLParams.tooLongTime ? ', TOO_LONG' : '';

  const changedEDiffsStr = gIn.suite.changedEDiffs
    ? `(${gIn.suite.changedEDiffs} dif(s) changed)`
    : '';

  let emailSubj;
  if (noPrevSLog) {
    emailSubj = 'NO PREV';
  } else if (suiteLogPrevDifResBool) {
    emailSubj = 'DIF FROM PREV';
  } else {
    emailSubj = `AS PREV${changedEDiffsStr}`;
  }
  emailSubj = `${emailSubj}${subjTimeMark},${gIn.logger.saveSuiteLog({
    dirInfo,
    log: suiteLog,
  })}, ${getOs()}`;

  const emailSubjConsole = etSLogInfoConsole + emailSubj;
  emailSubj = etSLogInfoEmail + emailSubj;

  dirInfo.suiteLogDiff = suiteLogPrevDifResBool;
  dirInfo.os = getOs();
  fileUtils.saveJson(dirInfo, `${suiteLog}.json`);

  const arcPath = fileUtils.archiveSuiteDir(dirInfo);

  const procInfo = nodeUtils.getProcInfo();
  fs.writeFileSync(procInfoFilePath, procInfo, { encoding: gT.engineConsts.logEncoding });
  txtAttachments.push(procInfoFilePath);

  txtAttachments.push(suiteUtils.getNoEtalonTestsInfoPath());

  await gIn.mailUtils.send(
    emailSubj,
    suiteLogEtDifResStr,
    etDifTxt,
    txtAttachments,
    arcPath ? [arcPath] : undefined
  );

  const suiteNotEmpty = dirInfo.run + dirInfo.skipped;

  if (gT.cLParams.slogDifToConsole && etDifTxt && (gT.cLParams.showEmptySuites || suiteNotEmpty)) {
    gIn.cLogger.msg(`\n${emailSubjConsole}\n`);
    gIn.cLogger.msgln(etDifTxt);
  }

  if (gT.suiteConfig.suiteLogToStdout && (gT.cLParams.showEmptySuites || suiteNotEmpty)) {
    gIn.cLogger.msg(`\n${emailSubjConsole}\n`);
    gIn.logger.printSuiteLog(dirInfo);

    // fileUtils.fileToStdout(log);
  }
  if (gT.cLParams.printProcInfo) {
    gIn.cLogger.msgln(procInfo);
  }

  if (gT.suiteConfig.removeZipAfterSend && arcPath) {
    fileUtils.safeUnlink(arcPath);
  }

  return {
    path: '', // TODO: path is just for TS.
    suiteEqualToEtalon,
    diffed,
    emailSubj,
    emailSubjConsole,
  };
}

async function prepareAndRunTestSuite(root: string) {
  const browserProfilesPath = path.resolve(
    root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.browserProfilesRootDirName
  );

  const log = path.join(
    root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.suiteLogName + gT.engineConsts.logExtension
  );

  const etLog = path.join(
    root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.suiteLogName + gT.engineConsts.etalonExtension
  );

  const configPath = path.join(
    root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.suiteConfigName
  );

  const suite = {
    root,
    browserProfilesPath,
    log,
    etLog,
    configPath,
    changedEDiffs: 0,
  };

  gIn.suite = suite;

  handleSuiteConfig();

  const suiteResult = await runTestSuite(suite).catch(err => {
    gIn.tracer.err(`Runner ERR: ${gIn.textUtils.excToStr(err)}`);
    return {
      err,
    } as SuiteResult;
  });

  suiteResult.path = path.relative(gT.cLParams.rootDir, root);

  return suiteResult;
}

function getTestSuitePaths() {
  const suitePaths: string[] = [];

  function walkSubDirs(parentDir: string) {
    const dirs = fs.readdirSync(parentDir).filter(childDir => {
      const fullPath = path.join(parentDir, childDir);
      if (!fileUtils.isDirectory(fullPath)) {
        return false;
      }

      for (const pattern of gT.engineConsts.patternsToIgnore) {
        // eslint-disable-line no-restricted-syntax
        if (pattern.test(childDir)) {
          return false;
        }
      }

      if (childDir === gT.engineConsts.suiteDirName) {
        if (fileUtils.isDirectory(path.join(fullPath, gT.engineConsts.suiteResDirName))) {
          suitePaths.push(fullPath);
        } else {
          gIn.tracer.msg1(
            `Directory ${fullPath} is ignored because does not contain TIA results subdirectory.`
          );
        }
        return false;
      }

      return childDir !== gT.engineConsts.suiteResDirName;
    });

    dirs.forEach(subDir => {
      const fullPath = path.join(parentDir, subDir);
      walkSubDirs(fullPath);
    });
  }

  walkSubDirs(gT.cLParams.rootDir);

  return suitePaths;
}

function extractDiffedPaths(testOrDirInfo: TestInfo, result: string[], suiteRoot: string) {
  if (testOrDirInfo.children) {
    for (const child of testOrDirInfo.children) {
      if (child.diffed) {
        extractDiffedPaths(child, result, suiteRoot);
      }
    }
  } else {
    result.push(path.relative(suiteRoot, testOrDirInfo.path));
  }
}

// Returns subject for email.
export async function runTestSuites() {
  fileUtils.safeUnlink(gT.rootLog);

  if (gT.cLParams.stopRemoteDriver) {
    gIn.remoteDriverUtils.stop();
    return 'Just removing of remote driver';
  }

  if (gT.cLParams.useRemoteDriver) {
    await gIn.remoteDriverUtils.start();

    // .catch((err) => {
    //   gIn.tracer.err(`Runner ERR, remoteDriverUtils.start: ${err}`);
    // });
  }

  const suitePaths = gT.cLParams.suite ? [gT.cLParams.suite] : getTestSuitePaths();

  gIn.tracer.msg1(`Following suite paths are found: ${suitePaths}`);

  const results = [];

  for (const suitePath of suitePaths) {
    // eslint-disable-line no-restricted-syntax
    results.push(await prepareAndRunTestSuite(suitePath));
  }

  if (!gT.cLParams.useRemoteDriver) {
    await gT.s.driver.quitIfInited();
  } else {
    gIn.tracer.msg3('No force driver.quit() for the last test, due to useRemoteDriver option');
  }

  if (gT.cLParams.new) {
    gIn.cLogger.msgln('All new tests are finished.');
    process.exitCode = 0;
    return;
  }

  if (gT.cLParams.pattern || gT.cLParams.dir) {
    let isDiffed = false;
    let run = 0;
    for (const { dirInfo } of results) {
      run += dirInfo.run;
      if (dirInfo.diffed) {
        isDiffed = true;
        gIn.cLogger.msg(`Following tests are diffed in suite: ${dirInfo.path}:\n- `);
        const result: string[] = [];
        extractDiffedPaths(dirInfo, result, dirInfo.path);
        gIn.cLogger.msgln(`${result.join('\n- ')}\n`);
      }
    }

    gIn.cLogger.msgln(`Total run count: ${run}.`);

    process.exitCode = isDiffed ? 1 : 0;
    return;
  }

  const wasError = results.some(result => !result || result.diffed || !result.suiteEqualToEtalon);

  process.exitCode = wasError ? 1 : 0;

  const resumeFileStr = wasError ? 'FAILED' : 'PASSED';
  const resumeConsoleStr = gIn.cLogger.chalkWrap(wasError ? 'red' : 'green', resumeFileStr);

  const head = '<<<< Summary of tests results: >>>>';
  fs.appendFileSync(gT.rootLog, `${head} \n`);
  gIn.cLogger.msgln(head);

  fs.appendFileSync(gT.rootLog, `${resumeFileStr}\n`);
  gIn.cLogger.msgln(resumeConsoleStr);

  results.forEach(result => {
    if (result.err) {
      fs.appendFileSync(gT.rootLog, `${result.err}\n`);
      gIn.cLogger.errln(result.err);
      return;
    }

    fs.appendFileSync(gT.rootLog, `${result.emailSubj}\n`);
    gIn.cLogger.msgln(result.emailSubjConsole!);
  });

  const tail = '<<<< ===================== >>>>';
  fs.appendFileSync(gT.rootLog, `${tail} \n`);
  gIn.cLogger.msgln(tail);
}
