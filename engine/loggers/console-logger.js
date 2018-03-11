'use strict';

/* globals gT, gIn */

let chalk;
let isChalkEnabled = false; // Just to speed up checking boolean instead of Boolean(object).

if (!process.env.TIA_NO_COLORS) {
  process.env.FORCE_COLOR = '1';
  chalk = require('chalk');
  isChalkEnabled = true;
}

// exports.chalk = chalk;
// exports.isChalkEnabled = isChalkEnabled;

gIn.tracePref = '';

/**
 * Tracks EOL of last message printed to console.
 * Also msg can be boolean - true means there is EOL.
 * @param msg
 */
function trackEOL(msg) {
  if (msg === true || Boolean(msg.match(/(\n|\r)$/))) {
    gIn.tracePref = '';
  } else {
    gIn.tracePref = '\n';
  }
}

/**
 * Writes message to stdout as is.
 * @param message
 */
exports.msg = function msg(message) {
  process.stdout.write(message);
  trackEOL(message);
};

exports.msgln = function msgln(msg) {
  exports.msg(`${msg}\n`);
};

exports.logResourcesUsage = function logResourcesUsage(prefix = '') {
  // if (gIn.config.resUsagePrintAtErrors) {
  exports.msgln(prefix + gT.nodeUtils.getResourcesUsage());

  // }
};

/**
 *
 * @param chalkProps - string or array.
 * @param msg
 * @returns {*}
 */
exports.chalkWrap = function chalkWrap(chalkProps, msg) {
  let resMsg = msg;
  if (isChalkEnabled) {
    if (typeof chalkProps === 'string') {
      resMsg = chalk[chalkProps](resMsg);
    } else {
      chalkProps.forEach((prop) => {
        resMsg = chalk[prop](resMsg);
      });
    }
  }
  return resMsg;
};

/**
 * Writes string from dif to console.
 * @param msg
 */
exports.msgDifStr = function msgDifStr(msg) {
  process.stdout.write(exports.chalkWrap(['yellow', 'bold'], msg));
  trackEOL(msg);
};

/**
 * Writes string for debug tracing.
 * @param msg
 */
exports.msgDbg = function msgDbg(msg) {
  process.stdout.write(`${exports.chalkWrap(['cyan', 'bold'], msg)}\n`);
  trackEOL(true);
};

/**
 * Writes msg to stdout using red ANSI color code.
 * @param msg
 */
exports.err = function err(msg) {
  let resMsg = msg;
  if (isChalkEnabled) {
    resMsg = chalk.red(resMsg);
  }
  process.stdout.write(resMsg);
  trackEOL(resMsg);
};


exports.errln = function errln(msg) {
  exports.err(`${msg}\n`);
};

// =====================================

/**
 * Writes msg to stdout if corresponding parameter is specified in cmd line.
 * Otherwise - does nothing.
 * @param msg
 */
exports.logIfEnabled = function logIfEnabled(msg) {
  if (gIn.params.logToConsole) {
    exports.msg(gIn.loggerCfg.consoleLogPrefix + msg);
  }
};

/**
 *
 * @param msg
 * Prefix should be set in caller.
 */
exports.errIfEnabled = function errIfEnabled(msg) {
  if (gIn.params.errToConsole) {
    return exports.err(msg);
  }
};

exports.passIfEnabled = function passIfEnabled(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.green(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};

exports.failIfEnabled = function failIfEnabled(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.red(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};

// =====================================

exports.logBold = function logBold(msg) {
  let resMsg = msg;
  if (gIn.params.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.bold(resMsg);
    }
    exports.msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
};
