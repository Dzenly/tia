'use strict';

/* globals gT: true */

gT.t = {};

global.t = gT.t;

var shared = {};

var logger = gT.logger;
var ok = 'OK\n';
var fail = 'FAIL\n';

var tinfo = gT.tinfo;

gT.t.saveShared = function (key, value) {
  shared[key] = value;
};

gT.t.getShared = function (key) {
  return shared[key];
};

gT.t.deleteShared = function (key) {
  delete shared[key];
};

gT.t.clearShared = function () {
  shared = {};
};

/**
 * Logs the specifiied msg.
 */
gT.t.print = function (msg) {
  logger.log(msg);
};

/**
 * Logs the msg and EOL.
 */
gT.t.println = function (msg) {
  logger.logln(msg);
};

/**
 * Logs separator.
 */
gT.t.sep = function () {
  logger.logln('==========');
};

/**
 * Logs End of Line.
 */
gT.t.eol = function () {
  logger.log('\n');
};

/**
 * Logs fail with optional msg.
 * @param [msg] - message to print.
 */
gT.t.fail = function (msg) {
  if (typeof msg !== 'undefined') {
    logger.log(msg);
  }
  tinfo.fail();
};

/**
 * Logs Pass with optional msg.
 */
gT.t.pass = function (msg) {
  if (typeof msg !== 'undefined') {
    logger.log(msg);
  }
  tinfo.pass();
};

/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
gT.t.setPassed = function (passed) {
  tinfo.data.passed = passed;
};

/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
gT.t.setFailed = function (failed) {
  tinfo.data.failed = failed;
};

/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
gT.t.getPassed = function () {
  return tinfo.data.passed;
};

/**
 * Gets fails count for current test.
 * @returns {number}
 */
gT.t.getFailed = function () {
  return tinfo.data.failed;
};


/**
 * Sets the test title.
 * @param title
 */
gT.t.setTitle = function (title) {
  tinfo.data.title = title; // From global sandbox.
  logger.logln(title);
  logger.logln('=================');
};


/**
 * Checks that specified condition is true.
 * @param condition
 * @param msg
 */
gT.t.checkTrue = function (condition, msg) {
  var logStr = msg + '...';
  if (Boolean(condition)) {
    logStr += ok;
    gT.tinfo.pass();
  } else {
    logStr += fail;
    gT.tinfo.fail();
  }
  logger.logln(logStr);
};

/**
 * Checks that specified value's type is number, and value equals to expected value.
 * @param {} val
 * @param {} expVal
 * @param msg
 */
gT.t.checkNumber = function (val, expVal, msg) {
  logger.logln(msg + ':');
  logger.log('Check that "' + val + '" is a number and is equal to "' + expVal + '"...');
  if (typeof val !== 'number') {
    logger.log(fail);
    gT.t.fail('\n"' + val + '" is not a number\n');
    return;
  }
  if (val !== expVal) {
    logger.log(fail);
    gT.t.fail('\n"' + val + '" != "' + expVal + '"\n');
    return;
  }
  gT.t.pass(ok);
};

/**
 * Checks that specified value equals to expected value.
 * @param {} val
 * @param {} expVal
 * @param msg
 */
gT.t.checkAny = function (val, expVal, msg) {
  logger.logln(msg + ':');
  logger.log('Check that "' + val + '" is equal to "' + expVal + '"...');
  if (val !== expVal) {
    logger.log(fail);
    gT.t.fail('\n"' + val + '" != "' + expVal + '"\n');
    return;
  }
  gT.t.pass(ok);
};

// /**
//  * Checks that specified value's type is number, and value equals to expected value.
//  * @param {} val
//  * @param {} expVal
//  * @param msg
//  */
// gT.t.checkNumber = function(val, expVal, msg) {
//   logger.logln(msg + ':');
//   logger.log('Check that "' + val + '" is a number and is equal to "' + expVal + '"...');
//   if (typeof val !== 'number') {
//     logger.log(fail);
//     gT.t.fail('\n"' + val + '" is not a number\n');
//     return;
//   }
//   if (val !== expVal) {
//     logger.log(fail);
//     gT.t.fail('\n"' + val + '" != "' + expVal + '"\n');
//     return;
//   }
//   gT.t.pass(ok);
// };

/**
 * Enables/disables pass counting.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new value for pass counting.
 * @returns {boolean} - old pass counting value.
 */
gT.t.setLlPassCounting = function (enable) {
  var old = gT.tinfo.isPassCountingEnabled;
  gT.tinfo.isPassCountingEnabled = enable;
  return old;
};

/**
 * Enables/disables low level actions logging.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new Log Action value.
 * @returns {boolean} - old Log Action value.
 */
gT.t.setDefaultLlLogAction = function (enable) {
  var old = gT.logger.defLlLogAction;
  gT.logger.defLlLogAction = enable;
  return old;
};
