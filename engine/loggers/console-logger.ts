/**
 * Inner utilities for logging into console.
 * gIn.cLogger.
 */

declare const gT: typeof import('../global-objects').GlobalTiaObjects;
declare const gIn: typeof import('../global-objects').GlobalTiaInnerObjects;

let chalk: any; // eslint-disable-line @typescript-eslint/no-explicit-any
let isChalkEnabled = false; // Just to speed up checking boolean instead of Boolean(object).

if (!process.env.TIA_NO_COLORS) {
  process.env.FORCE_COLOR = '1';
  chalk = require('chalk');
  isChalkEnabled = true;
}

gIn.tracePrefix = '';

/**
 * Tracks EOL of last message printed to console.
 * Also msg can be boolean - true means there is EOL.
 * @param msg
 */
function trackEOL(msg: string | boolean) {
  if (typeof msg === 'string') {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (msg.match(/(\n|\r)$/)) {
      gIn.tracePrefix = '';
    } else {
      gIn.tracePrefix = '\n';
    }
  } else {
    if (msg) {
      gIn.tracePrefix = '';
    } else {
      gIn.tracePrefix = '\n';
    }
  }
}

/**
 * Writes message to stdout as is.
 * @param message
 */
export function msg(message: string): void {
  process.stdout.write(message);
  trackEOL(message);
}

export function msgln(message: string): void {
  msg(`${message}\n`);
}

export function logResourcesUsage(prefix = '') {
  // if (gT.config.resUsagePrintAtErrors) {
  msgln(prefix + gT.nodeUtils.getResourcesUsage(true));

  // }
}

/**
 *
 * @param chalkProps - string or array.
 * @param message
 * @returns {*}
 */
export function chalkWrap(chalkProps: string | string[], message: string) {
  let resMsg = message;
  if (isChalkEnabled) {
    if (typeof chalkProps === 'string') {
      resMsg = chalk[chalkProps](resMsg);
    } else {
      chalkProps.forEach(prop => {
        resMsg = chalk[prop](resMsg);
      });
    }
  }
  return resMsg;
}

/**
 * Writes string from dif to console.
 * @param message
 */
export function msgDifStr(message: string) {
  process.stdout.write(chalkWrap(['yellow', 'bold'], message));
  trackEOL(message);
}

/**
 * Writes string for debug tracing.
 * @param message
 */
export function msgDbg(message: string) {
  process.stdout.write(`${chalkWrap(['cyan', 'bold'], message)}\n`);
  trackEOL(true);
}

/**
 * Writes msg to stdout using red ANSI color code.
 * @param message
 */
export function err(message: string) {
  let resMsg = message;
  if (isChalkEnabled) {
    resMsg = chalk.red(resMsg);
  }
  process.stdout.write(resMsg);
  trackEOL(resMsg);
}

export function errln(message: string) {
  err(`${message}\n`);
}

// =====================================

/**
 * Writes msg to stdout if corresponding parameter is specified in cmd line.
 * Otherwise - does nothing.
 * @param message
 */
export function logIfEnabled(message: string) {
  if (gT.cLParams.logToConsole) {
    msg(gIn.loggerCfg.consoleLogPrefix + message);
  }
}

/**
 *
 * @param message
 * Prefix should be set in caller.
 */
export function errIfEnabled(message: string) {
  if (gT.cLParams.errToConsole) {
    return err(message);
  }
}

export function passIfEnabled(message: string) {
  let resMsg = message;
  if (gT.cLParams.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.green(resMsg);
    }
    msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
}

export function failIfEnabled(message: string) {
  let resMsg = message;
  if (gT.cLParams.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.red(resMsg);
    }
    msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
}

// =====================================

export function logBold(message: string) {
  let resMsg = message;
  if (gT.cLParams.logToConsole) {
    if (isChalkEnabled) {
      resMsg = chalk.bold(resMsg);
    }
    msg(gIn.loggerCfg.consoleLogPrefix + resMsg);
  }
}
