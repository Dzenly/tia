'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Checks that specified condition is true.
 * @param condition
 * @param msg
 */
exports.true = function (condition, msg) {
  var logStr;
  if (Boolean(condition)) {
    logStr = msg ;
    gT.l.pass(logStr);
  } else {
    logStr = msg;
    gT.l.fail(logStr);
  }
};

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg
 */
exports.false = function (condition, msg) {
  return exports.true(!Boolean(condition), false);
};

/**
 * Checks that value equals to expected value.
 * @param {*} val
 * @param {*} expVal
 * @param {String} [msg]
 * @returns {Boolean} comparision result.
 */
exports.equal = function (val, expVal, msg) {
  if (typeof msg !== 'undefined') {
    if (val === expVal) {
      gT.l.pass(msg + ': ' + val);
      return true;
    } else {
      msg += '\nAct: ' + val + '\nExp: ' + expVal;
      gT.l.fail(msg);
      return false;
    }
  } else {
    if (val === expVal) {
      msg  = 'Act: "' + val + '" = Exp: "' + expVal + '"';
      // TODO: (Yellow color ??) It is strange situation to compare smth without message.
      gT.l.pass(msg);
      return true;
    } else {
      msg = 'Equality checking:\nAct: ' + val + '\nExp: "' + expVal;
      gT.l.fail(msg);
      return false;
    }
  }
};
