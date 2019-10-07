'use strict';

/* globals gIn: true */

const ok = 'OK: ';

// const okLn = `${ok}\n`;
const FAIL = 'FAIL: ';

// const failLn = `${FAIL}\n`;

/**
 * Logs the specified msg.
 */
export function print(msg: string) {
  gIn.logger.log(msg);
}

/**
 * Logs the msg and EOL.
 */
export function println(msg: string) {
  gIn.logger.logln(msg);
}

/**
 * Logs separator.
 */
export function sep() {
  gIn.logger.logln('==========');
}

/**
 * Logs End of Line.
 */
export function eol() {
  gIn.logger.log('\n');
}

/**
 * Logs fail with optional msg.
 * Increases fails count.
 * @param [msg] - message to print.
 */
export function fail(msg: string) {
  if (typeof msg !== 'undefined') {
    gIn.logger.fail(`${FAIL + msg}\n`);
  }
  gIn.tInfo.addFail();
}

/**
 * Logs Pass with optional msg.
 * Increases passes count.
 * @param msg - msg to log.
 * @param {Object} [mode] the mode
 * @param {Boolean} [mode.passSilently] - do not show message.
 * @param {Boolean} [mode.noPassIncrement] - do not increment pass counter.
 */
export function pass(msg: string, mode = { passSilently: false, noPassIncrement: false }) {
  if (typeof msg !== 'undefined' && !mode.passSilently) {
    if (gIn.tInfo.getPassPrintingEnabled()) {
      gIn.logger.pass(`${ok + msg}\n`);
    } else if (gT.cLParams.forceLogActions) {
      gIn.cLogger.passIfEnabled(msg);
    }
  }
  if (!mode.noPassIncrement) {
    gIn.tInfo.addPass();
  }
}
