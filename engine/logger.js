'use strict';

/* globals gT: true */

/*
 Inner utils for logging.
 */

var fs = require('fs');

exports.indentation = '| ';
exports.defLlLogAction = true;
//exports.firstIndent = '|-'


// Must be called only before handleDir for root test directory, like engine, app, etc..
exports.setSuiteLog = function (suiteLog) {
  exports.suiteLog = suiteLog;
};

exports.log = function (msg, noConsole) {
  // We use append here, because there must be maximum strings in the log,
  // even if something will break the test engine.
  if (gIn.params.logToConsole && !noConsole) {
    console.log('LOG:' + msg);
  }
  fs.appendFileSync(exports.logFile, msg, {encoding: 'ascii'});
};

exports.logln = function (msg) {
  if (gIn.params.logToConsole) {
    console.log('LOG:' + msg);
  }
  exports.log(msg + '\n', true);
};

exports.error = function (msg) {
  msg = 'ERR: ' + msg;
  if (gIn.params.logErrToConsole) {
    console.error(msg);
  }
  exports.log(msg, true);
};

exports.errorln = function (msg) {
  msg = 'ERR: ' + msg;
  if (gIn.params.logErrToConsole) {
    console.error(msg);
  }
  exports.log(msg + '\n', true);
};

exports.exception = function (msg, e, noConsole) {
  if (gIn.params.logErrToConsole && !noConsole) {
    console.error('EXC: ' + msg + ' ' + gIn.textUtils.excToStr(e));
  }
  exports.log('EXC: ' + msg + ' ' + gIn.textUtils.excToStr(e, true) + '\n', true);
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param enable - Optional. If true log is enabled, othwerwise log is disabled.
 */
exports.logIfEnabled = function (msg, enable) {
  if (gIn.config.forceLogAction || gIn.params.forceLogActions || enable) {
    exports.log(msg);
  }
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param enable - Optional. If false - log is disabled, otherwise - log is enabled.
 */
exports.logIfNotDisabled = function (msg, enable) {
  if (typeof enable === 'undefined') {
    enable = exports.defLlLogAction;
  }
  if (gIn.config.forceLogAction || gIn.params.forceLogActions || enable) {
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
