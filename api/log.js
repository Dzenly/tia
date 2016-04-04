'use strict';

/* globals gT: true */

var logger = gT.logger;

/**
 * Logs the specifiied msg.
 */
gT.l.print = function (msg) {
  logger.log(msg);
};

/**
 * Logs the msg and EOL.
 */
gT.l.println = function (msg) {
  logger.logln(msg);
};

/**
 * Logs separator.
 */
gT.l.sep = function () {
  logger.logln('==========');
};

/**
 * Logs End of Line.
 */
gT.l.eol = function () {
  logger.log('\n');
};

/**
 * Logs fail with optional msg.
 * @param [msg] - message to print.
 */
gT.l.fail = function (msg) {
  if (typeof msg !== 'undefined') {
    logger.log(msg);
  }
  gT.tInfo.fail();
};

/**
 * Logs Pass with optional msg.
 */
gT.l.pass = function (msg) {
  if (typeof msg !== 'undefined') {
    logger.log(msg);
  }
  gT.tInfo.pass();
};

