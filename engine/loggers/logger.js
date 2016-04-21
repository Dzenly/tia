'use strict';

/* globals gT: true */
/* globals gIn: true */

/*
 Inner utils for logging.
 */

var isVerbose;

var fs = require('fs');

// Must be called only before handleDir for root test directory, like engine, app, etc..
// TODO: what it is ?
// exports.setSuiteLog = function (metaLog) {
//   exports.metaLog = metaLog;
// };

function logToFile(msg) {
  // , {encoding: 'ascii'}
  // TODO: check how diff work for unicode.
  fs.appendFileSync(exports.logFile, msg);
}

function logToFileLn(msg) {
  return logToFile(msg + '\n');
}

/**
 * Logs to file and writes to console (if console output is enabled).
 * @param msg
 * @param noConsole
 */
exports.log = function (msg, dontWriteToFile) {
  // We use append here, to don't lost some strings if something will break the test engine.
  gIn.cLogger.logIfEnabled(msg);
  if (!dontWriteToFile) {
    logToFile(msg);
  }
};

exports.logln = function (msg) {
  exports.log(msg + '\n');
};

exports.logBold = function (msg) {
  gIn.cLogger.logBold(msg);
  logToFile(msg);
};

exports.fail = function (msg) {
  gIn.cLogger.failIfEnabled(msg);
  logToFile(msg);
};

exports.pass = function (msg) {
  gIn.cLogger.passIfEnabled(msg);
  logToFile(msg);
};

/**
 * Report about some error.
 * @param msg
 */
exports.error = function (msg) {
  msg = gIn.loggerCfg.errPrefix + msg;
  gIn.cLogger.errIfEnabled(msg);
  logToFile(msg);
};

exports.errorln = function (msg) {
  return exports.error(msg + '\n');
};

/**
 * Report about some exception.
 * @param msg
 * @param e
 */
exports.exception = function (msg, e) {
  msg = gIn.loggerCfg.excPrefix + msg;
  gIn.cLogger.errIfEnabled(msg + ' ' + gIn.textUtils.excToStr(e) + '\n');
  logToFile(msg + ' ' + gIn.textUtils.excToStr(e, true) + '\n');
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean}[enable]. If true log is enabled, othwerwise log is disabled.
 */
exports.logIfEnabled = function (msg, enable) {
  let dontWriteToFile = false;
  if (!enable && gIn.params.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg, dontWriteToFile);
  }
};

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean} [enable = gIn.loggerCfg.defLlLogAction] - If false - log is disabled,
 * otherwise - log is enabled.
 */
exports.logIfNotDisabled = function (msg, enable) {
  if (typeof enable === 'undefined') {
    enable = gIn.loggerCfg.defLlLogAction;
  }
  let dontWriteToFile = false;
  if (!enable && gIn.params.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gIn.params.forceLogActions || enable) {
    exports.log(msg, dontWriteToFile);
  }
};

function writeStrToFile(str, diffed, isDif) {
  fs.writeSync(exports.fd, str, null, 'ascii');
}

function writeStrToStdout(str, diffed, isDif) {
  // str = str.replace(/\s+$/g, '');
  // str += '\n';
  if (diffed) {
    gIn.cLogger.err(str);
  } else {
    if (isDif) {
      gIn.cLogger.msgDifStr(str);
    } else {
      gIn.cLogger.msg(str);
    }
  }
}

var writeLogStr = writeStrToFile;

function writeToSuiteLog(str, diffed, isDif) {
  writeLogStr(str, diffed, isDif);
}

exports.testSummary = function () {
  exports.log('=================\n');
  exports.log('Pass: ' + gIn.tInfo.data.passed + ', Fail: ' + gIn.tInfo.data.failed + '\n');
};

function saveDirInfo(dirInfo, indent, verbose, noTime) {
  gIn.tracer.trace3(dirInfo.path + ', dirInfo.handled: ' + dirInfo.handled);
  if (!dirInfo.handled && !gT.suiteConfig.emptyDirToSuiteLog) {
    return;
  }
  writeToSuiteLog(indent);
  writeToSuiteLog(gIn.tInfo.testInfoToString(dirInfo, true, verbose, noTime), dirInfo.diffed);
  indent = gIn.loggerCfg.indentation + indent;
  // If directory is empty there will be empty array.
  // Absense of 'children' property says that it is test and not directory, we should not allow to use this function for not directory.
  var len = dirInfo.children.length;
  for (var i = 0; i < len; i++) {
    var curInfo = dirInfo.children[i];
    if (curInfo.diffed || verbose) {
      if (curInfo.hasOwnProperty('children')) {
        saveDirInfo(curInfo, indent, verbose, noTime);
      } else {
        writeToSuiteLog(indent);
        writeToSuiteLog(gIn.tInfo.testInfoToString(curInfo, false, verbose, noTime), curInfo.diffed);
        if (curInfo.diffed && gIn.params.diffsToMlog && !isVerbose) {
          let difPath = gIn.textUtils.jsToDif(curInfo.path);
          let dif = fs.readFileSync(difPath, 'ascii');
          writeToSuiteLog(indent + '============== DIF ============== \n');
          let diffStrs = dif.split('\n');
          for (let str of diffStrs) {
            writeToSuiteLog(indent);
            writeToSuiteLog(str + '\n', false, true);
          }
          writeToSuiteLog(indent + '========== END OF DIF  ========== \n');
        }
      }
    }
  }
}

function saveSuiteLogPart(verbose, dirInfo, noTime) {
  isVerbose = verbose;
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
  saveSuiteLogPart(false, dirInfo, false);
  writeToSuiteLog('\n');
  saveSuiteLogPart(true, dirInfo, false);
  // saveDirInfo(dirInfo, '', false, false);
  // saveDirInfo(dirInfo, '', true, false);
};
