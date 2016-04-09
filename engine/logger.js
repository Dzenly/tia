'use strict';

/* globals gT: true */
/* globals gIn: true */

/*
 Inner utils for logging.
 */

var fs = require('fs');

var consoleLogPrefix = 'LOG: ';
var errPrefix = 'ERR: ';
var excPrefix = 'EXC: ';

exports.indentation = '| ';
exports.defLlLogAction = true;
//exports.firstIndent = '|-'

// Must be called only before handleDir for root test directory, like engine, app, etc..
exports.setSuiteLog = function (suiteLog) {
  exports.suiteLog = suiteLog;
};

function logToFile(msg) {
  // , {encoding: 'ascii'}
  // TODO: check how diff work for unicode.
  fs.appendFileSync(exports.logFile, msg);
}

function logToConsoleIfEnabled(msg) {
  if (gIn.params.logToConsole) {
    console.log(consoleLogPrefix + msg);
  }
}

function errToConsoleIfEnabled(msg) {
  if (gIn.params.logErrToConsole) {
    console.error(msg);
  }
}

/**
 * Logs to file and writes to console (if console out is enabled).
 * @param msg
 * @param noConsole
 */
exports.log = function (msg, noConsole) {
  // We use append here, to don't lost some strings if something will break the test engine.
  if (!noConsole) {
    logToConsoleIfEnabled(msg);
  }
  logToFile(msg);
};

exports.logln = function (msg) {
  logToConsoleIfEnabled(msg);
  logToFile(msg + '\n');
};

/**
 * Report about some error.
 * @param msg
 */
exports.error = function (msg) {
  msg = 'ERR: ' + msg;
  errToConsoleIfEnabled(msg);
  logToFile(msg);
};

exports.errorln = function (msg) {
  msg = 'ERR: ' + msg;
  errToConsoleIfEnabled(msg);
  logToFile(msg + '\n');
};

/**
 * Report about some exception.
 * @param msg
 * @param e
 * @param noConsole
 */
exports.exception = function (msg, e, noConsole) {
  msg = excPrefix + msg;
  if (!noConsole) {
    errToConsoleIfEnabled(msg + ' ' + gIn.textUtils.excToStr(e));
  }
  logToFile(msg + ' ' + gIn.textUtils.excToStr(e, true) + '\n');
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean}[enable]. If true log is enabled, othwerwise log is disabled.
 */
exports.logIfEnabled = function (msg, enable) {
  let forcedByCmdLine = false;
  if (!enable && gIn.params.forceLogActions) {
    forcedByCmdLine = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg);
  }
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean} [enable = exports.defLlLogAction] - If false - log is disabled,
 * otherwise - log is enabled.
 */
exports.logIfNotDisabled = function (msg, enable) {
  if (typeof enable === 'undefined') {
    enable = exports.defLlLogAction;
  }
  let forcedByCmdLine = false;
  if (!enable && gIn.params.forceLogActions) {
    forcedByCmdLine = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg);
  }
};

function writeStrToFile(str, diffed) {
  fs.writeSync(exports.fd, str, null, 'ascii');
}

function writeStrToStdout(str, diffed) {
  str = str.replace(/\s+$/g, '');
  if (diffed) {
    console.error(str);
  } else {
    console.log(str);
  }
}

var writeLogStr = writeStrToFile;

function writeToSuiteLog(str, diffed) {
  writeLogStr(str, diffed);
}

exports.testSummary = function () {
  exports.log('=================\n');
  exports.log('Pass: ' + gIn.tInfo.data.passed + ', Fail: ' + gIn.tInfo.data.failed + '\n');
};

function saveDirInfo(dirInfo, indent, verbose, noTime) {
  if (!dirInfo.handled && !gT.suiteConfig.emptyDirToSuiteLog) {
    return;
  }
  writeToSuiteLog(indent + gIn.tInfo.testInfoToString(dirInfo, true, verbose, noTime), dirInfo.diffed);
  indent = exports.indentation + indent;
  // If directory is empty there will be empty array.
  // Absense of 'children' property says that it is test and not directory, we should not allow to use this function for not directory.
  var len = dirInfo.children.length;
  for (var i = 0; i < len; i++) {
    var curInfo = dirInfo.children[i];
    if (curInfo.diffed || verbose) {
      if (curInfo.hasOwnProperty('children')) {
        saveDirInfo(curInfo, indent, verbose, noTime);
      } else {
        writeToSuiteLog(indent + gIn.tInfo.testInfoToString(curInfo, false, verbose, noTime), curInfo.diffed);
      }
    }
  }
}

function saveSuiteLogPart(verbose, dirInfo, noTime) {
  var title = verbose ? 'Verbose' : 'Short';
  var decor = '====================';
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
exports.saveSuiteLog = function (dirInfo, log, noTime) {
  writeLogStr = writeStrToFile;
  exports.fd = fs.openSync(log, 'w');
  saveSuiteLogPart(false, dirInfo, noTime);
  fs.writeSync(exports.fd, '\n', null, 'ascii');
  saveSuiteLogPart(true, dirInfo, noTime);
  fs.closeSync(exports.fd);
  return gIn.tInfo.testInfoToString(dirInfo, true, true, noTime, true);
};

/* Prints expected tests results to stdout and unexpected to stderr */
exports.printSuiteLog = function (dirInfo) {
  writeLogStr = writeStrToStdout;
  saveDirInfo(dirInfo, '', true, false);
};
