'use strict';

/* globals gIn: true */

/**
 * Logs the specifiied msg.
 */
exports.print = function (msg) {
  gIn.logger.log(msg);
};

/**
 * Logs the msg and EOL.
 */
exports.println = function (msg) {
  gIn.logger.logln(msg);
};

/**
 * Logs separator.
 */
exports.sep = function () {
  gIn.logger.logln('==========');
};

/**
 * Logs End of Line.
 */
exports.eol = function () {
  gIn.logger.log('\n');
};

/**
 * Logs fail with optional msg.
 * @param [msg] - message to print.
 */
exports.fail = function (msg) {
  if (typeof msg !== 'undefined') {
    gIn.logger.log(msg);
  }
  gIn.tInfo.fail();
};

/**
 * Logs Pass with optional msg.
 */
exports.pass = function (msg) {
  if (typeof msg !== 'undefined') {
    gIn.logger.log(msg);
  }
  gIn.tInfo.pass();
};

