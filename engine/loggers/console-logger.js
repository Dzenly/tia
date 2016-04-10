'use strict';
/* globals gIn: true */

var chalk;
var isChalkEnabled = false; // Just to speed up checking boolean instead of Boolean(object).

if (!process.env.TIA_NO_COLORS) {
  process.env.FORCE_COLOR = '1';
  chalk = require('chalk');
  isChalkEnabled = true;
}

// exports.chalk = chalk;
// exports.isChalkEnabled = isChalkEnabled;

/**
 * Writes msg to stdout as is.
 * @param msg
 */
exports.msg = function (msg) {
  process.stdout.write(msg);
};

/**
 * Writes msg to stdout using red ANSI color code.
 * @param msg
 */
exports.err = function (msg) {
  if (isChalkEnabled) {
    msg = chalk.red(msg);
  }
  process.stdout.write(msg);
};

// =====================================

/**
 * Writes msg to stdout if corresponding parameter is specified in cmd line.
 * Otherwise - does nothing.
 * @param msg
 */
exports.logIfEnabled = function (msg) {
  if (gIn.params.logDupToStdout) {
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};

/**
 *
 * @param msg
 * Prefix should be set in caller.
 */
exports.errIfEnabled = function (msg) {
  if (gIn.params.logErrToConsole) {
    return exports.err(msg);
  }
};

exports.passIfEnabled = function (msg) {
  if (gIn.params.logDupToStdout) {
    if (isChalkEnabled) {
      msg = chalk.green(msg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};

exports.failIfEnabled = function (msg) {
  if (gIn.params.logDupToStdout) {
    if (isChalkEnabled) {
      msg = chalk.red(msg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};

// =====================================

exports.logBold = function (msg) {
  if (gIn.params.logDupToStdout) {
    if (isChalkEnabled) {
      msg = chalk.bold(msg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};
