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

  gIn.tracer.trace0('Starting new test: ' + file);

  try {
    nodeUtils.requireEx(file, true);
  } catch (e) {
    // TODO: why did I disable exceptions to console here?
    gIn.logger.exception('Exception in runner: ', e);
    gIn.tInfo.addFail();
  }
}

function *handleTestFile(file, dirConfig) {
  // Restore the state which could be damaged by previous test and any other initialization.
  gIn.tInfo.isPassCountingEnabled = true;
  gIn.loggerCfg.defLlLogAction = true;

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

  var startTime = gT.timeUtils.startTimer();

  yield flow.execute(function () { // gIn.tInfo.data
    runTestFile(file);
  });

  gIn.logger.testSummary();
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
  gIn.tracer.trace3('handleDir Dir: ' + dir);
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
        gIn.tracer.trace3('Skipping directory, because it is browser profile');
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
  var noTimeLog = log + '.notime';
  var noTimeLogPrev = noTimeLog + '.prev';
  gIn.fileUtils.safeUnlink(log);
  gIn.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  var dirInfo = yield* handleTestDir(dir, gT.dirConfigDefault);

  // dirInfo.title = path.basename(dir);
  gIn.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  var metaLogDifRes = Boolean(gIn.diffUtils.getDiff('.', noTimeLogPrev, noTimeLog));
  var etMlogInfo = '';
  var etMlogInfoCons = '';
  var metaLogEtDifRes = 'Some Initial Dif';
  if (gIn.params.etMlog) {
    metaLogEtDifRes = Boolean(gIn.diffUtils.getDiff('.', gIn.params.etMlog, noTimeLog));
    gIn.tracer.trace3('metaLogEtDifRes: ' + metaLogEtDifRes);
    etMlogInfo = metaLogEtDifRes ? 'DIF_MLOG, ' : 'ET_MLOG, ';
    etMlogInfoCons = metaLogEtDifRes ? gIn.cLogger.chalkWrap('red', 'DIF_MLOG') + ', ' :
      gIn.cLogger.chalkWrap('green', 'ET_MLOG')  + ', ';
  }

  var changedDiffs = gIn.diffUtils.changedDiffs ? '(' + gIn.diffUtils.changedDiffs + ' diff(s) changed)' : '';
  var emailSubj = getOs() + ', ' + (metaLogDifRes ? 'DIF FROM PREV' : ('AS PREV' + changedDiffs)) + ', ' + gIn.logger.saveSuiteLog(dirInfo, log);
  var emailSubjCons = etMlogInfoCons + emailSubj;
  emailSubj = etMlogInfo + emailSubj;

  dirInfo.metaLogDiff = metaLogDifRes;
  dirInfo.os = getOs();
  gIn.fileUtils.saveJson(dirInfo, log + '.json');

  var arcName = gIn.fileUtils.archiveSuiteDir(dirInfo);

  yield gIn.mailUtils.send(emailSubj, log, arcName);
  var status = dirInfo.diffed ? 1 : 0;
  gIn.cLogger.msg('\n' + emailSubjCons + '\n');
  if (gT.suiteConfig.metaLogToStdout) {
    gIn.logger.printSuiteLog(dirInfo);
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
  try {
    fs.mkdirSync(gIn.params.profileRootPath);
  } catch (e) {
  }

  flow.execute(function () {
    return promise.consume(runTestSuite, null, suiteRoot);
  }).then(
    function (exitStatus) {
      process.exitCode = exitStatus;
    },
    function (err) {
      gIn.tracer.traceErr('Runner ERR: ' + gIn.textUtils.excToStr(err));
      process.exitCode = 1;
    }
  );
};

