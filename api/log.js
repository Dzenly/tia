'use strict';

/* globals gIn: true */

var ok = 'OK: ';
var okLn = ok + '\n';
var fail = 'FAIL: ';
var failLn = fail + '\n';

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
 * Increases fails count.
 * @param [msg] - message to print.
 */
exports.fail = function (msg) {
  if (typeof msg !== 'undefined') {
    gIn.logger.fail(fail + msg + '\n');
  }
  gIn.tInfo.addFail();
};

/**
 * Logs Pass with optional msg.
 * Increases passes count.
 * @param msg - msg to log.
 * @param {Object} [mode] the mode
 * @param {Boolean} [mode.passSilently] - do not show message.
 * @param {Boolean} [mode.noPassIncrement] - do not increment pass counter.
 */
exports.pass = function (msg, mode) {
  mode = mode || {passSilently: false, noPassIncrement: false};
  if (typeof msg !== 'undefined' && !mode.passSilently) {
    if (gIn.tInfo.isPassPrintingEnabled) {
      gIn.logger.pass(ok + msg + '\n');
    } else if (gIn.params.forceLogActions) {
      gIn.cLogger.passIfEnabled(msg);
    }
  }
  if (!mode.noPassIncrement) {
    gIn.tInfo.addPass();
  }
};
