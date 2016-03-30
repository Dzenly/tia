var fs = require('fs');
var path = require('path');
var vm = require('vm');

var logger = gT.logger;

var flow = gT.sel.flow;
var promise = gT.sel.promise;

function handleDirConfig(dir, files, prevDirConfig) {
  var index = files.indexOf(gT.engineConfig.configName);
  var config;
  if (index < 0) {
    config = {};
  } else {
    files.splice(index, 1);
    var code = fs.readFileSync(path.join(dir, gT.engineConfig.configName))
    config = vm.runInThisContext(code);
  }

  index = files.indexOf(gT.engineConfig.suiteConfigName); // Remove suite-config.js from list (it already handled).
	if (index > -1) {
		files.splice(index, 1);
	}

  return gT.configUtils.mergeConfigs(prevDirConfig, config);
}

function testRunner(code, file) {
  var res;

  gT.tracer.trace0('Starting new test: ' + file);

  try {
    // This timeout for syncronous part only.
    res = vm.runInThisContext(code, {timeout: gT.config.timeout});
  }
  catch (e) {
    logger.exception('Exception in runner: ', e, true);
    gT.tinfo.fail();
  }
}

function *handleTest(file, dirConfig) {
  // Restore the state which could be damaged by previous test and any other initialization.
  gT.tinfo.isPassCountingEnabled = true;
  gT.logger.defLlLogAction = true;

  gT.config = gT.configUtils.copyConfig(dirConfig); // Config for current test, can be changed by test.
  // It is not safe to create such structure in the test and return it from test, because test can be terminated with exception.

  //console.log('File: ' + file);
  if (gT.params.path && file.lastIndexOf(gT.params.path) < gT.params.minPathIndex) {
    return null;
  }

  gT.tinfo.data = gT.tinfo.createTestInfo(false, '', file); // Test should change this title.
  gT.tinfo.data.handled = 1;

  if (dirConfig.skip) {
    gT.tinfo.data.skipped = 1;
    return gT.tinfo.data;
  }

	if (gT.config.DISPLAY && !gT.params.noxvfb) {
		process.env.DISPLAY = gT.config.DISPLAY;
	} else {
		process.env.DISPLAY = gT.engineConfig.defDisplay;
  }

  gT.fileUtils.createEmptyLog(file);
  gT.fileUtils.rmPngs(file);

  var code = fs.readFileSync(file);
  var startTime = gT.timeUtils.startTimer();

  yield flow.execute(function () { // gT.tinfo.data
    testRunner(code, file);
  });

  logger.testSummary();
  gT.tinfo.data.time = gT.timeUtils.stopTimer(startTime);
  gT.diffUtils.diff(file);

  return gT.tinfo.data; // Return value to be uniform in handleDir.
}

function *handleDir(dir, prevDirConfig) {
  //console.log('handleDir Dir: ' + dir);
  var files = fs.readdirSync(dir);
  var dirConfig = handleDirConfig(dir, files, prevDirConfig);
  var dirInfo = gT.tinfo.createTestInfo(true, dirConfig.sectTitle, dir);
  var startTime = gT.timeUtils.startTimer();

  var len = files.length;
  for (var i = 0; i < len; i++) {
    var file = path.join(dir, files[i]);
    try {
      var stat = fs.statSync(file);
    } catch (e) {
      continue; // We remove some files in process.
    }
    var innerCurInfo;
    if (stat.isFile() && path.extname(file) === '.js') {
      innerCurInfo = yield *handleTest(file, dirConfig);
    } else if (stat.isDirectory()) {
      innerCurInfo = yield *handleDir(file, dirConfig);
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

function *runAsync(dir) {
  //console.log('runAsync Dir: ' + dir);
  var log = dir + '.log'; // Summary log.
  var noTimeLog = log + '.notime';
  var noTimeLogPrev = noTimeLog + '.prev';
  gT.fileUtils.safeUnlink(log);
  gT.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

  var dirInfo = yield* handleDir(dir, gT.dirConfigDefault);

  dirInfo.title = dir;
  gT.logger.saveSuiteLog(dirInfo, noTimeLog, true);

  var suiteLogDifRes = Boolean(gT.diffUtils.getDiff('.', noTimeLogPrev, noTimeLog));
  var changedDiffs = gT.changedDiffs ? '(' + gT.changedDiffs + ' diff(s) changed)' : '';
  var subj = gT.os() + ', ' + (suiteLogDifRes ? 'CHANGED' : ('AS PREV ' + changedDiffs)) + ', ' + gT.logger.saveSuiteLog(dirInfo, log);
  dirInfo.suiteLogDiff = suiteLogDifRes;
  dirInfo.os = gT.os();
  gT.fileUtils.saveJson(dirInfo, log + '.json');

  var arcName = gT.fileUtils.archiveSuiteDir(dirInfo);

  yield gT.mailUtils.sendMail(subj, log, arcName);
  var status = dirInfo.diffed ? 1 : 0;
  console.log(subj);
  if (gT.suiteConfig.logToStdErrOut) {
    gT.logger.printSuiteLog(dirInfo);
    //gT.fileUtils.fileToStdout(log);
  }

	if (gT.suiteConfig.removeZipAfterSend) {
		gT.fileUtils.safeUnlink(arcName);
	}

  return status;// Process exit status.
}

// Returns subject for email.
gT.runTestsAsync = function (suiteRoot) {
  gT.configUtils.handleSuiteConfig();
  try {
    fs.mkdirSync(gT.engineConfig.profileRoot);
  } catch (e) {
  }

  flow.execute(function () {
    return promise.consume(runAsync, null, suiteRoot);
  }).then(
    function (exitStatus) {
      process.exitCode = exitStatus;
    },
    function (err) {
      gT.tracer.traceErr(gT.textUtils.excToStr(err));
      process.exitCode = 1;
    }
  );
};



