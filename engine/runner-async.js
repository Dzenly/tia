var fs = require('fs');
var path = require('path');
var vm = require('vm');

var logger = gTE.logger;

var flow = gTE.sel.flow;
var promise = gTE.sel.promise;

function handleDirConfig(dir, files, prevDirConfig) {
	var index = files.indexOf(gTE.engineConfig.configName);
	var config;
	if (index < 0) {
		config = {};
	} else {
		files.splice(index, 1);
		var code = fs.readFileSync(path.join(dir, gTE.engineConfig.configName))
		config = vm.runInThisContext(code);
	}

	index = files.indexOf(gTE.engineConfig.suiteConfigName); // Remove suite-config.js from list (it already handled).
	if (index > -1)
		files.splice(index, 1);

	return gTE.configUtils.mergeConfigs(prevDirConfig, config);
}

function testRunner(code, file) {
	var res;

	gTE.tracer.trace0('Starting new test: ' + file);

	try {
		// This timeout for syncronous part only.
		res = vm.runInThisContext(code, {timeout: gTE.config.timeout});
	}
	catch (e) {
		logger.exception('Exception in runner: ', e, true);
		gTE.tinfo.fail();
	}
}

function *handleTest(file, dirConfig) {
	// Restore the state which could be damaged by previous test and any other initialization.
	gTE.tinfo.isPassCountingEnabled = true;
	gTE.logger.defLlLogAction = true;

	gTE.config = gTE.configUtils.copyConfig(dirConfig); // Config for current test, can be changed by test.
	// It is not safe to create such structure in the test and return it from test, because test can be terminated with exception.

	//console.log('File: ' + file);
	if (gTE.params.path && file.lastIndexOf(gTE.params.path) < gTE.params.minPathIndex) {
		return null;
	}

	gTE.tinfo.data = gTE.tinfo.createTestInfo(false, '', file); // Test should change this title.
	gTE.tinfo.data.handled = 1;

	if (dirConfig.skip) {
		gTE.tinfo.data.skipped = 1;
		return gTE.tinfo.data;
	}

	if (gTE.config.DISPLAY && !gTE.params.noxvfb)
		process.env.DISPLAY = gTE.config.DISPLAY;
	else
		process.env.DISPLAY = gTE.engineConfig.defDisplay;

	gTE.fileUtils.createEmptyLog(file);
	gTE.fileUtils.rmPngs(file);

	var code = fs.readFileSync(file);
	var startTime = gTE.timeUtils.startTimer();

	yield flow.execute(function() { // gTE.tinfo.data
		testRunner(code, file);
	});

	logger.testSummary();
	gTE.tinfo.data.time = gTE.timeUtils.stopTimer(startTime);
	gTE.diffUtils.diff(file);

	return gTE.tinfo.data; // Return value to be uniform in handleDir.
}

function *handleDir(dir, prevDirConfig) {
	//console.log('handleDir Dir: ' + dir);
	var files = fs.readdirSync(dir);
	var dirConfig = handleDirConfig(dir, files, prevDirConfig);
	var dirInfo = gTE.tinfo.createTestInfo(true, dirConfig.sectTitle, dir);
	var startTime = gTE.timeUtils.startTimer();

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

	dirInfo.time = gTE.timeUtils.stopTimer(startTime);
	return dirInfo;
}

function *runAsync(dir) {
	//console.log('runAsync Dir: ' + dir);
	var log = dir + '.log'; // Summary log.
	var noTimeLog = log + '.notime';
	var noTimeLogPrev = noTimeLog + '.prev';
	gTE.fileUtils.safeUnlink(log);
	gTE.fileUtils.safeRename(noTimeLog, noTimeLogPrev);

	var dirInfo = yield* handleDir(dir, gTE.dirConfigDefault);

	dirInfo.title = dir;
	gTE.logger.saveSuiteLog(dirInfo, noTimeLog, true);

	var suiteLogDifRes = Boolean(gTE.diffUtils.getDiff('.', noTimeLogPrev, noTimeLog));
	var changedDiffs = gTE.changedDiffs ? '(' + gTE.changedDiffs + ' diff(s) changed)' : '';
	var subj = gTE.os() + ', ' + (suiteLogDifRes ? 'CHANGED' : ('AS PREV ' + changedDiffs)) + ', ' + gTE.logger.saveSuiteLog(dirInfo, log);
	dirInfo.suiteLogDiff = suiteLogDifRes;
	dirInfo.os = gTE.os();
	gTE.fileUtils.saveJson(dirInfo, log + '.json');

	var arcName = gTE.fileUtils.archiveSuiteDir(dirInfo);

	yield gTE.mailUtils.sendMail(subj, log, arcName);
	var status = dirInfo.diffed ? 1 : 0;
	console.log(subj);
	if (gTE.suiteConfig.logToStdErrOut) {
		gTE.logger.printSuiteLog(dirInfo);
		//gTE.fileUtils.fileToStdout(log);
	}

	if (gTE.suiteConfig.removeZipAfterSend)
		gTE.fileUtils.safeUnlink(arcName);

	return status;// Process exit status.
}

// Returns subject for email.
gTE.runTestsAsync = function(suiteRoot) {
	gTE.configUtils.handleSuiteConfig();
	try {
		fs.mkdirSync(gTE.engineConfig.profileRoot);
	} catch (e) {
	}

	flow.execute(function() {
		return promise.consume(runAsync, null, suiteRoot);
	}).then(
			function(exitStatus) {
				process.exitCode = exitStatus;
			},
			function(err) {
				gTE.tracer.traceErr(gTE.textUtils.excToStr(err));
				process.exitCode = 1;
			}
	);
};



