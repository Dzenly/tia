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
  if (gIn.params.path && file.lastIndexOf(gIn.params.path) < gIn.params.minPathSearchIndex) {
    return null;
  }

  gIn.tInfo.data = gIn.tInfo.createTestInfo(false, '', file); // Test should change this title.
  gIn.tInfo.data.handled = 1;

  if (dirConfig.skip) {
    gIn.tInfo.data.skipped = 1;
    return gIn.tInfo.data;
  }

  if (gIn.config.DISPLAY && !gIn.params.noxvfb) {
    process.env.DISPLAY = gIn.config.DISPLAY;
  } else {
    process.env.DISPLAY = gT.engineConfig.defDisplay;
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
  var index = files.indexOf(gT.engineConfig.configName);
  var config;
  if (index < 0) {
    config = {};
  } else {
    files.splice(index, 1);
    config = nodeUtils.requireEx(path.join(dir, gT.engineConfig.configName), true).result;
  }

  // Remove suite-config.js from list (it is already handled by the module entry point).
  index = files.indexOf(gT.engineConfig.suiteConfigName);
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
  //console.log('handleDir Dir: ' + dir);
  var files = fs.readdirSync(dir);
  var dirConfig = handleDirConfig(dir, files, prevDirConfig);
  var dirInfo = gIn.tInfo.createTestInfo(true, dirConfig.sectTitle, dir);
  var startTime = gT.timeUtils.startTimer();

  var len = files.length;
  for (var i = 0; i < len; i++) {
    var file = path.join(dir, files[i]);
    var stat;
    try {
      stat = fs.statSync(file);
    } catch (e) {
      continue; // We remove some files in process.
    }
    var innerCurInfo;
    if (stat.isFile() && path.extname(file) === '.js') {
      innerCurInfo = yield *handleTestFile(file, dirConfig);
    } else if (stat.isDirectory()) {
      innerCurInfo = yield *handleTestDir(file, dirConfig);
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
  var log = dir + '.log'; // Summary log.
  var noTimeLog = log + '.notime';
  var noTimeLogPrev = noTimeLog + '.prev';
  gIn.fileUtils.safeUnlink(log);
  gIn.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  var dirInfo = yield* handleTestDir(dir, gT.dirConfigDefault);

  dirInfo.title = dir;
  gIn.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  var suiteLogDifRes = Boolean(gIn.diffUtils.getDiff('.', noTimeLogPrev, noTimeLog));
  var changedDiffs = gIn.diffUtils.changedDiffs ? '(' + gIn.diffUtils.changedDiffs + ' diff(s) changed)' : '';
  var subj = getOs() + ', ' + (suiteLogDifRes ? 'CHANGED' : ('AS PREV ' + changedDiffs)) + ', ' + gIn.logger.saveSuiteLog(dirInfo, log);
  dirInfo.suiteLogDiff = suiteLogDifRes;
  dirInfo.os = getOs();
  gIn.fileUtils.saveJson(dirInfo, log + '.json');

  var arcName = gIn.fileUtils.archiveSuiteDir(dirInfo);

  yield gIn.mailUtils.send(subj, log, arcName);
  var status = dirInfo.diffed ? 1 : 0;
  console.log(subj);
  if (gT.suiteConfig.logToStdErrOut) {
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
    fs.mkdirSync(gT.engineConfig.profileRoot);
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

