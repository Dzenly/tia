'use strict';

/* globals gIn: true */

const ok = 'OK: ';

// const okLn = `${ok}\n`;
const FAIL = 'FAIL: ';

// const failLn = `${FAIL}\n`;

/**
 * Logs the specified msg.
 */
exports.print = function print(msg) {
  gIn.logger.log(msg);
};

/**
 * Logs the msg and EOL.
 */
exports.println = function println(msg) {
  gIn.logger.logln(msg);
};

/**
 * Logs separator.
 */
exports.sep = function sep() {
  gIn.logger.logln('==========');
};

/**
 * Logs End of Line.
 */
exports.eol = function eol() {
  gIn.logger.log('\n');
};

/**
 * Logs fail with optional msg.
 * Increases fails count.
 * @param [msg] - message to print.
 */
exports.fail = function fail(msg) {
  if (typeof msg !== 'undefined') {
    gIn.logger.fail(`${FAIL + msg}\n`);
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
exports.pass = function pass(msg, mode = { passSilently: false, noPassIncrement: false }) {
  if (typeof msg !== 'undefined' && !mode.passSilently) {
    if (gIn.tInfo.isPassPrintingEnabled) {
      gIn.logger.pass(`${ok + msg}\n`);
    } else if (gIn.params.forceLogActions) {
      gIn.cLogger.passIfEnabled(msg);
    }
  }
  if (!mode.noPassIncrement) {
    gIn.tInfo.addPass();
  }
};
