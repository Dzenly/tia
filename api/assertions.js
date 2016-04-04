'use strict';

/* globals gT: true */

var ok = 'OK\n';
var fail = 'FAIL\n';
var logger = gT.logger;

/**
 * Checks that specified condition is true.
 * @param condition
 * @param msg
 */
gT.a.true = function (condition, msg) {
  var logStr = msg + '...';
  if (Boolean(condition)) {
    logStr += ok;
    gT.tInfo.pass();
  } else {
    logStr += fail;
    gT.tInfo.fail();
  }
  logger.logln(logStr);
};

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg
 */
gT.a.false = function (condition, msg) {
  var logStr = msg + '...';
  if (Boolean(condition)) {
    logStr += fail;
    gT.tInfo.fail();
  } else {
    logStr += ok;
    gT.tInfo.pass();
  }
  logger.logln(logStr);
};

/**
 * Checks that value equals to expected value.
 * @param {} val
 * @param {} expVal
 * @param msg
 */
gT.a.equal = function (val, expVal, msg) {
  logger.logln(msg + ':');
  logger.log('Check that "' + val + '" is equal to "' + expVal + '"...');
  if (val !== expVal) {
    logger.log(fail);
    gT.l.fail('\n"' + val + '" != "' + expVal + '"\n');
    return;
  }
  gT.l.pass(ok);
};


