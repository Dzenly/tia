'use strict';

/* globals gT: true */
/* globals gIn: true */

var fs = require('fs');
var path = require('path');
var nodeUtils = require('../utils/nodejs-utils');

var flow = gT.sOrig.flow;
var promise = gT.sOrig.promise;

function getOs() {
  var os = require('os');
  return os.platform() + '_' + os.release();
}

function runTestFile(file) {

  gIn.tracer.msg2('Starting new test: ' + file);

  gIn.errRecursionCount = 0;
  gIn.cancelThisTest = false;

  try {
    nodeUtils.requireEx(file, true);
  } catch (e) {
    // TODO: why did I disable exceptions to console here?
    gIn.logger.exception('Exception in runner: ', e);
    gIn.logger.logResourcesUsage();
    gIn.tInfo.addFail();
  }
}

function *handleTestFile(file, dirConfig) {

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

  var startTime = gT.timeUtils.startTimer();

  yield flow.execute(function () { // gIn.tInfo.data
    runTestFile(file);
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
  var index = files.indexOf(gT.engineConsts.configName);
  var config;
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
function *handleTestDir(dir, prevDirConfig) {
  gIn.tracer.msg3('handleDir Dir: ' + dir);
  var files = fs.readdirSync(dir);
  var dirConfig = handleDirConfig(dir, files, prevDirConfig);
  var dirInfo = gIn.tInfo.createTestInfo(true, dirConfig.sectionTitle, dir);
  var startTime = gT.timeUtils.startTimer();

  for (var fileOrDir of files) {
    var fileOrDirPath = path.join(dir, fileOrDir);
    var stat;
    try {
      stat = fs.statSync(fileOrDirPath);
    } catch (e) {
      continue; // We remove some files in process.
    }
    var innerCurInfo;
    if (stat.isFile() && path.extname(fileOrDirPath) === '.js') {
      innerCurInfo = yield *handleTestFile(fileOrDirPath, dirConfig);
    } else if (stat.isDirectory()) {
      if (fileOrDir === gT.engineConsts.profileRootDir) {
        gIn.tracer.msg3('Skipping directory, because it is browser profile');
        continue;
      }
      innerCurInfo = yield *handleTestDir(fileOrDirPath, dirConfig);
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

function *runTestSuite(dir) {
  //console.log('runAsync Dir: ' + dir);
  var log = dir + '.mlog'; // Summary log.
  var procInfoFilePath = dir + '.procInfo';
  var txtAttachments = [log];
  var noTimeLog = log + '.notime';
  var prevDif = noTimeLog + '.prev.dif';
  var etDif = noTimeLog + '.et.dif';
  var noTimeLogPrev = noTimeLog + '.prev';
  gIn.fileUtils.safeUnlink(log);
  gIn.fileUtils.safeUnlink(prevDif);
  gIn.fileUtils.safeUnlink(etDif);
  gIn.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  var dirInfo = yield* handleTestDir(dir, gT.dirConfigDefault);

  yield gT.s.driver.quitIfInited();

  // dirInfo.title = path.basename(dir);
  gIn.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  var noPrevMLog = gIn.fileUtils.isAbsent(noTimeLogPrev);
  var metaLogPrevDifRes = gIn.diffUtils.getDiff('.', noTimeLog, noTimeLogPrev);
  var metaLogPrevDifResBool = Boolean(metaLogPrevDifRes);
  if (metaLogPrevDifResBool) {
    fs.writeFileSync(prevDif, metaLogPrevDifRes, {encoding: gT.engineConsts.logEncoding});
    txtAttachments.push(prevDif);
  }

  var etMlogInfo = '';
  var etMlogInfoCons = '';

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

  var changedDiffs = gIn.diffUtils.changedDiffs ? '(' + gIn.diffUtils.changedDiffs + ' diff(s) changed)' : '';
  var emailSubj = (noPrevMLog ? 'NO PREV' : (metaLogPrevDifResBool ? 'DIF FROM PREV' : ('AS PREV' + changedDiffs))) +
    subjTimeMark +
    ', ' + gIn.logger.saveSuiteLog(dirInfo, log) + ', ' + getOs();
  var emailSubjCons = etMlogInfoCons + emailSubj;
  emailSubj = etMlogInfo + emailSubj;

  dirInfo.metaLogDiff = metaLogPrevDifResBool;
  dirInfo.os = getOs();
  gIn.fileUtils.saveJson(dirInfo, log + '.json');

  var arcName = gIn.fileUtils.archiveSuiteDir(dirInfo);

  var procInfo = nodeUtils.getProcInfo();
  fs.writeFileSync(procInfoFilePath, procInfo, {encoding: gT.engineConsts.logEncoding});
  txtAttachments.push(procInfoFilePath);

  yield gIn.mailUtils.send(emailSubj, txtAttachments, [arcName]);
  var status = dirInfo.diffed ? 1 : 0;
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
module.exports = function (suiteRoot) {
  gIn.configUtils.handleSuiteConfig();

  if (gIn.params.stopRemoteDriver) {
    gIn.remoteDriverUtils.stop();
    return 'Just removing of remove driver';
  }

  var result = gT.sOrig.promise.fulfilled(true);

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
      return flow.execute(function () {
        return promise.consume(runTestSuite, null, suiteRoot);
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
    });
};

