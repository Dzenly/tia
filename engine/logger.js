var fs = require('fs');

gT.logger = {
  indentation: '| ',
  defLlLogAction: true
  //firstIndent: '|-'
};

var self = gT.logger;

// Must be called only before handleDir for root test directory, like engine, app, etc..
self.setSuiteLog = function (suiteLog) {
  self.suiteLog = suiteLog;
};

self.log = function (msg, noConsole) {
  // We use append here, because there must be maximum strings in the log,
  // even if something will break the test engine.
	if (gT.params.logToConsole && !noConsole) {
		console.log('LOG:' + msg);
	}
  fs.appendFileSync(self.logFile, msg, {encoding: 'ascii'});
};

self.logln = function (msg) {
	if (gT.params.logToConsole) {
		console.log('LOG:' + msg);
	}
  self.log(msg + '\n', true);
};

self.error = function (msg) {
  msg = 'ERR: ' + msg;
	if (gT.params.logErrToConsole) {
		console.error(msg);
	}
  self.log(msg, true);
};

self.errorln = function (msg) {
  msg = 'ERR: ' + msg;
	if (gT.params.logErrToConsole) {
		console.error(msg);
	}
  self.log(msg + '\n', true);
};

self.exception = function (msg, e, noConsole) {
	if (gT.params.logErrToConsole && !noConsole) {
		console.error('EXC: ' + msg + ' ' + gT.textUtils.excToStr(e));
	}
  self.log('EXC: ' + msg + ' ' + gT.textUtils.excToStr(e, true) + '\n', true);
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param enable - Optional. If true log is enabled, othwerwise log is disabled.
 */
self.logIfEnabled = function (msg, enable) {
  if (gT.config.forceLogAction || gT.params.forceLogActions || enable) {
    self.log(msg);
  }
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param enable - Optional. If false - log is disabled, otherwise - log is enabled.
 */
self.logIfNotDisabled = function (msg, enable) {
	if (typeof enable === 'undefined') {
		enable = self.defLlLogAction;
	}
  if (gT.config.forceLogAction || gT.params.forceLogActions || enable) {
    self.log(msg);
  }
};

function writeStrToFile(str, diffed) {
  fs.writeSync(self.fd, str, null, 'ascii');
}

function writeStrToStdout(str, diffed) {
  str = str.replace(/\s+$/g, '');
	if (diffed) {
		console.error(str);
	} else {
		console.log(str);
  }
}

gT.writeLogStr = writeStrToFile;

function writeToSuiteLog(str, diffed) {
  gT.writeLogStr(str, diffed);
}

self.testSummary = function () {
  self.log("=================\n");
  self.log('Pass: ' + gT.tinfo.data.passed + ', Fail: ' + gT.tinfo.data.failed + '\n');
};

function saveDirInfo(dirInfo, indent, verbose, noTime) {
	if (!dirInfo.handled && !gT.suiteConfig.emptyDirToSuiteLog) {
		return;
	}
  writeToSuiteLog(indent + gT.tinfo.testInfoToString(dirInfo, true, verbose, noTime), dirInfo.diffed);
  indent = self.indentation + indent;
  // If directory is empty there will be empty array.
  // Absense of 'children' property says that it is test and not directory, we should not allow to use this function for not directory.
  var len = dirInfo.children.length;
  for (var i = 0; i < len; i++) {
    var curInfo = dirInfo.children[i];
    if (curInfo.diffed || verbose) {
      if (curInfo.hasOwnProperty('children')) {
        saveDirInfo(curInfo, indent, verbose, noTime);
      } else {
        writeToSuiteLog(indent + gT.tinfo.testInfoToString(curInfo, false, verbose, noTime), curInfo.diffed);
      }
    }
  }
}

function saveSuiteLogPart(verbose, dirInfo, noTime) {
  var title = verbose ? 'Verbose' : 'Short';
  var decor = "====================";
  writeToSuiteLog(decor + '    ' + title + ' Log BEGIN:    ' + decor + '\n');
  saveDirInfo(dirInfo, '', verbose, noTime);
  writeToSuiteLog(decor + '    ' + title + ' Log END.    ' + decor + '\n');
}


/**
 * Saves main log.
 * @param dirInfo
 * @param log
 * @parem noTime
 * @returns {string} - Verbose info for the root test directory.
 */
self.saveSuiteLog = function (dirInfo, log, noTime) {
  gT.writeLogStr = writeStrToFile;
  self.fd = fs.openSync(log, 'w');
  saveSuiteLogPart(false, dirInfo, noTime);
  fs.writeSync(self.fd, '\n', null, 'ascii');
  saveSuiteLogPart(true, dirInfo, noTime);
  fs.closeSync(self.fd);
  return gT.tinfo.testInfoToString(dirInfo, true, true, noTime, true);
};


/* Prints expected tests results to stdout and unexpected to stderr */
self.printSuiteLog = function (dirInfo) {
  gT.writeLogStr = writeStrToStdout;
  saveDirInfo(dirInfo, '', true, false);
};
