'use strict';

var util = require('util');
var fileUtils = require('dz-file-utils');
var dirUtils = require('dz-dir-utils');
var timer = require('dz-timer-utils');
var dateUtils = require('dz-date-utils');
process.env.FORCE_COLOR = '1';
var chalk = require('chalk');

var cfg = {
  throwAtFail: false,
  colorsEnabled: false,
  passStr: 'PASS',
  failStr: 'FAIL',
  logMsg: function (msg) {
    console.log(msg);
  },
  logErr: function (msg) {
    console.error(msg); // OK with console.error. Tmp utils.
  },
  indent: '      '
};

var inner = {
  passCnt: 0,
  failCnt: 0
};

inner.logDiff = function (actVal, expVal) {
  cfg.logErr('Act. value: ' + util.inspect(actVal) + ', Exp. value: ' + expVal + '\n');
};

exports.eq = function (actVal, expVal, msg, colorFunc) {
  var res = actVal === expVal;
  if (res) {
    exports.pass(msg, colorFunc);
    return true;
  } else {
    inner.logDiff(actVal, expVal);
    exports.fail(msg);
    return false;
  }
};

exports.eqDays = function (date1, date2, msg) {
  return exports.eq(dateUtils.trunkDateToDay(date1), dateUtils.trunkDateToDay(date2), msg);
};

exports.eqObjects = function (obj1, obj2, msg) {
  var aProps = Object.getOwnPropertyNames(obj1);
  var bProps = Object.getOwnPropertyNames(obj2);

  if (aProps.length != bProps.length) {
    exports.fail(msg + ': Objects comparison: different property counts');
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (obj1[propName] !== obj2[propName]) {
      exports.fail(msg + ': Objects comparison: different values for property: ' + propName +
        ', "' + obj1[propName] + '", vs "' + obj2[propName]);
      return false;
    }
  }

  exports.pass(msg);
  return true;
};

// Returns value, returned by the func, or undefined (it function throws an error).
exports.doesThrow = function (func, msg, arrArg) {
  var res;
  try {
    res = func.apply(null, arrArg);
    exports.fail(msg + ' Unexpected no throw.');
    return res;
  } catch (e) {
    exports.pass(msg + ' Expected throw from function: ' + e.message);
  }
};

// Returns value, returned by the func, or undefined (it function throws an error).
exports.doesNotThrow = function (func, msg, arrArg) {
  var res;
  try {
    res = func.apply(null, arrArg);
    exports.pass(msg + ' Expected no throw.');
    return res;
  } catch (e) {
    exports.fail(msg + ' Unexpected throw from function: ' + e.message);
  }
};

exports.checkSubstr = function (str, substr, msg) {
  cfg.logMsg(cfg.indent + 'Checking for substring: "' + substr + '"');
  var ind = str.search(substr);
  if (ind === -1) {
    cfg.logErr('No expression: "' + substr + '" found in string: \n' + str);
    exports.fail(msg);
    return false;
  } else {
    exports.pass(msg);
    return true;
  }
};

// Отличается от eq только цветом.
// Подразумевается, что так проверяется, что сгенерирована правильная ошибка.
exports.eqErr = function (actVal, expVal, msg) {
  return exports.eq(actVal, expVal, msg, chalk.yellow);
};

exports.checkAssertion = function (e, msg) {
  exports.eq(e.name, 'AssertionError', msg, chalk.yellow);
  cfg.logMsg(cfg.indent + 'Ass. Msg: ' + e.message);
};

exports.section = function (msg) {
  exports.sep();
  exports.msg(msg);
};

exports.msg = function (msg) {
  cfg.logMsg(cfg.indent + msg);
};

exports.msgErr = function (msg) {
  cfg.logErr(cfg.indent + msg);
};

exports.msgBold = function (msg) {
  cfg.logMsg(chalk.bold(cfg.indent + msg));
};

exports.sep = function () {
  cfg.logMsg(/*cfg.indent + */'    ================');
};

exports.fail = function (msg) {
  msg = colorMsg(chalk.red, msg);
  cfg.logErr(cfg.failStr + ': ' + msg);
  inner.failCnt++;
  if (cfg.throwAtFail) {
    throw new Error('Stop tests at first fail, according to settings');
  }
};

exports.pass = function (msg, colorFunc) {
  msg = colorMsg(colorFunc ? colorFunc : chalk.green, msg);
  cfg.logMsg(cfg.passStr + ': ' + msg);
  inner.passCnt++;
};

exports.total = function () {
  cfg.logMsg('=================');
  var msg = 'Passes: ' + inner.passCnt + ', Fails: ' + inner.failCnt;
  msg = colorMsg(inner.failCnt > 0 ? chalk.red : chalk.green, msg);
  var timeMsg = timer.timeDiffStr(inner.totStartTime);
  cfg.logMsg(msg + ', Duration: ' + timeMsg);
};

function timeDiffStr(startTime) {
  return colorMsg(chalk.cyan, timer.timeDiffStr(startTime));
}

exports.startTimer = function (msg) {
  return timer.startTimer(msg);
};

exports.stopTimer = function (timerObj) {
  if (!timerObj) {
    return;
  }
  var msg = timer.stopTimer(timerObj, true);
  cfg.logMsg(colorMsg(chalk.blue, cfg.indent + msg));
};

// ====

exports.checkFileExist = function (file) {
  exports.eq(fileUtils.checkFileExists(file), true, 'File "' + file + '" exists');
};

exports.checkFilesExist = function (files) {
  for (var i = 0, len = files.length; i < len; i++) {
    exports.checkFileExist(files[i]);
  }
};

// ====

exports.checkFileExistAndNonEmpty = function (file) {
  exports.eq(fileUtils.checkFileExistsAndNonEmpty(file), true, 'File "' + file + '" exists');
};

exports.checkFilesExistAndNonEmpty = function (files) {
  for (var i = 0, len = files.length; i < len; i++) {
    exports.checkFileExistAndNonEmpty(files[i]);
  }
};

// ====

exports.checkFileAbsent = function (file) {
  exports.eq(fileUtils.checkFileExists(file), false, 'File "' + file + '" absent');
};

exports.checkFilesAbsent = function (files) {
  for (var i = 0, len = files.length; i < len; i++) {
    exports.checkFileAbsent(files[i]);
  }
};

// ====

exports.checkDirExist = function (dir) {
  exports.eq(dirUtils.checkDirExists(dir), true, 'Dir "' + dir + '" exists');
};

exports.checkDirsExist = function (dirs) {
  for (var i = 0, len = dirs.length; i < len; i++) {
    exports.checkDirExist(dirs[i]);
  }
};

// ====

exports.checkDirAbsent = function (dir) {
  exports.eq(dirUtils.checkDirExists(dir), false, 'Dir "' + dir + '" absent');
};

exports.checkDirsAbsent = function (dirs) {
  for (var i = 0, len = dirs.length; i < len; i++) {
    exports.checkDirAbsent(dirs[i]);
  }
};

// ====

// Resets total timer.
exports.init = function (throwAtFail, colorsEnabled) {
  if (typeof throwAtFail !== 'undefined') {
    cfg.throwAtFail = throwAtFail;
  }
  if (typeof colorsEnabled !== 'undefined') {
    cfg.colorsEnabled = colorsEnabled;
  }
  inner.totStartTime = process.hrtime();
};

function colorMsg(func, msg) {
  if (cfg.colorsEnabled) {
    return func(msg);
  }
  return msg;
}

exports.init();
