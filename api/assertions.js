'use strict';

/* globals gT: true */
/* globals gIn: true */

var ok = 'OK\n';
var fail = 'FAIL\n';

/**
 * Checks that specified condition is true.
 * @param condition
 * @param msg
 */
exports.true = function (condition, msg) {
  var logStr = msg + '...';
  if (Boolean(condition)) {
    logStr += ok;
    gIn.tInfo.pass();
  } else {
    logStr += fail;
    gIn.tInfo.fail();
  }
  gIn.logger.logln(logStr);
};

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg
 */
exports.false = function (condition, msg) {
  var logStr = msg + '...';
  if (Boolean(condition)) {
    logStr += fail;
    gIn.tInfo.fail();
  } else {
    logStr += ok;
    gIn.tInfo.pass();
  }
  gIn.logger.logln(logStr);
};

/**
 * Checks that value equals to expected value.
 * @param {} val
 * @param {} expVal
 * @param msg
 */
exports.equal = function (val, expVal, msg) {
  gIn.logger.logln(msg + ':');
  gIn.logger.log('Check that "' + val + '" is equal to "' + expVal + '"...');
  if (val !== expVal) {
    gIn.logger.log(fail);
    gT.l.fail('\n"' + val + '" != "' + expVal + '"\n');
    return;
  }
  gT.l.pass(ok);
};
