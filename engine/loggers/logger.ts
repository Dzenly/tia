/**
 * Inner utilities for logging.
 * **gIn.logger**.
 */

/* globals gT: true */
/* globals gIn: true */

/*
 Inner utils for logging.
 */
let isVerbose = false;

let logFile = '';

// TODO: bad design.
let fd: number;

export function setLogFile(newLogFile: string) {
  logFile = newLogFile;
}

export function getLogFile() {
  return logFile;
}

import * as fs from 'fs';
import * as nodeUtils from '../../utils/nodejs-utils';
import { TestInfo } from '../test-info';

function logToFile(msg: string) {
  // TODO: check how diff work for unicode.
  fs.appendFileSync(logFile, msg, { encoding: gT.engineConsts.logEncoding });
}

// function logToFileLn(msg) {
//   return logToFile(`${msg}\n`);
// }

/**
 * Logs to file and writes to console (if console output is enabled).
 * @param msg
 * @param noConsole
 */
export function log(msg: string, dontWriteToFile?: boolean) {
  // We use append here, to don't lost some strings if something will break the test engine.
  gIn.cLogger.logIfEnabled(msg);
  if (!dontWriteToFile) {
    logToFile(msg);
  }
}

export function logln(msg: string) {
  log(`${msg}\n`);
}

export function logResourcesUsage(prefix = '') {
  if (gT.config.resUsagePrintAtErrors) {
    logln(prefix + nodeUtils.getResourcesUsage(true));
  }
}

export function logBold(msg: string) {
  gIn.cLogger.logBold(msg);
  logToFile(msg);
}

export function fail(msg: string) {
  gIn.cLogger.failIfEnabled(msg);
  logToFile(msg);
}

export function pass(msg: string) {
  gIn.cLogger.passIfEnabled(msg);
  logToFile(msg);
}

/**
 * Report about some error.
 * @param msg
 */
export function error(msg: string) {
  const msgNew = gIn.loggerCfg.errPrefix + msg;
  gIn.cLogger.errIfEnabled(msgNew);
  logToFile(msgNew);
}

export function errorln(msg: string) {
  return error(`${msg}\n`);
}

/**
 * Report about some exception.
 * @param msg
 * @param e
 */
export function exception(msg: string, e: Error) {
  const msgNew = gIn.loggerCfg.excPrefix + msg;
  gIn.cLogger.errIfEnabled(`${msgNew} ${gIn.textUtils.excToStr(e)}\n`);
  logToFile(`${msgNew} ${gIn.textUtils.excToStr(e, !gT.cLParams.stackToLog)}\n`);
}

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean}[enable]. If true log is enabled, othwerwise log is disabled.
 */
export function logIfEnabled(msg: string, enable?: boolean) {
  let dontWriteToFile = false;
  if (!enable && gT.cLParams.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gT.cLParams.forceLogActions || enable) {
    log(msg, dontWriteToFile);
  }
}

/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean} [enable = gIn.loggerCfg.defLLLogAction] - If false - log is disabled,
 * otherwise - log is enabled.
 */
export function logIfNotDisabled(msg: string, enable?: boolean) {
  if (enable === undefined) {
    enable = gIn.loggerCfg.getDefLLLogAction();
  }
  let dontWriteToFile = false;
  if (!enable && gT.cLParams.forceLogActions) {
    dontWriteToFile = true;
  }
  if (gT.cLParams.forceLogActions || enable) {
    log(msg, dontWriteToFile);
  }
}

function writeStrToFile(str: string, fd: number /* , diffed, isDif*/) {
  fs.writeSync(fd, str, null, gT.engineConsts.logEncoding);
}

function writeStrToStdout(str: string, diffed?: boolean, isDif?: boolean) {
  // str = str.replace(/\s+$/g, '');
  // str += '\n';
  if (diffed) {
    gIn.cLogger.err(str);
  } else if (isDif) {
    gIn.cLogger.msgDifStr(str);
  } else {
    gIn.cLogger.msg(str);
  }
}

function writeToSuiteLog({
  str,
  diffed,
  isDif,
  fd,
}: {
  str: string;
  diffed?: boolean;
  isDif?: boolean;
  fd?: number;
}) {
  if (typeof fd !== 'undefined') {
    return writeStrToFile(str, fd);
  }
  writeStrToStdout(str, diffed, isDif);
}

export function testSummary() {
  log('=================\n');
  log(`Pass: ${gIn.tInfo.getPassed()}, Fail: ${gIn.tInfo.getFailed()}\n`);
}

function saveDirInfoToSuiteLog({
  dirInfo,
  indent,
  verbose,
  noTime,
  noTestDifs,
  fd,
}: {
  dirInfo: TestInfo;
  indent: string;
  verbose?: boolean;
  noTime?: boolean;
  noTestDifs?: boolean;
  fd?: number;
}) {
  gIn.tracer.msg3(`${dirInfo.path}, dirInfo.run: ${dirInfo.run}`);
  if (!dirInfo.run && !gT.suiteConfig.emptyDirToSuiteLog) {
    return;
  }
  writeToSuiteLog({ str: indent, fd });
  writeToSuiteLog({
    str: gIn.tInfo.testInfoToString({
      curInfo: dirInfo,
      isDir: true,
      verbose,
      noTime,
    }),
    diffed: Boolean(dirInfo.diffed),
    fd,
  });
  indent = gIn.loggerCfg.indentation + indent;

  // If directory is empty there will be empty array.
  // Absense of 'children' property says that it is test and not directory,
  // we should not allow to use this function for not directory.
  const len = dirInfo.children!.length;
  for (let i = 0; i < len; i++) {
    const curInfo = dirInfo.children![i];
    if (curInfo.diffed || verbose) {
      if (curInfo.children) {
        saveDirInfoToSuiteLog({
          dirInfo: curInfo,
          indent,
          verbose,
          noTime,
          noTestDifs,
          fd,
        });
      } else {
        writeToSuiteLog({ str: indent, fd });
        writeToSuiteLog({
          str: gIn.tInfo.testInfoToString({
            curInfo,
            isDir: false,
            verbose,
            noTime,
          }),
          diffed: Boolean(curInfo.diffed),
          fd,
        });
        if (curInfo.diffed && gT.cLParams.difsToSlog && !isVerbose && !noTestDifs) {
          const difPath = gIn.textUtils.jsToDif(curInfo.path);
          const dif = fs.readFileSync(difPath, gT.engineConsts.logEncoding);
          writeToSuiteLog({ str: `${indent}============== DIF ============== \n`, fd });
          const diffStrs = dif.split('\n');
          diffStrs.forEach(str => {
            writeToSuiteLog({ str: indent, fd });
            writeToSuiteLog({ str: `${str}\n`, diffed: false, isDif: true, fd });
          });
          writeToSuiteLog({ str: `${indent}========== END OF DIF  ========== \n`, fd });
        }
      }
    }
  }
}

function saveSuiteLogPart({
  verbose,
  dirInfo,
  noTime,
  noTestDifs,
  fd,
}: {
  verbose: boolean;
  dirInfo: TestInfo;
  noTime?: boolean;
  noTestDifs?: boolean;
  fd?: number;
}) {
  isVerbose = verbose;
  const title = verbose ? 'Verbose' : 'Short';
  const decor = '====================';
  writeToSuiteLog({ str: `${decor}    ${title} Log BEGIN:    ${decor}\n`, fd });
  saveDirInfoToSuiteLog({
    dirInfo,
    indent: '',
    verbose,
    noTime,
    noTestDifs,
    fd,
  });
  writeToSuiteLog({ str: `${decor}    ${title} Log END.    ${decor}\n`, fd });
}

/**
 * Saves suite log.
 * @param dirInfo
 * @param log
 * @parem noTime
 * @returns {string} - Verbose info for the root test directory.
 */
export function saveSuiteLog({
  dirInfo,
  log,
  noTime,
  noTestDifs,
}: {
  dirInfo: TestInfo;
  log: string;
  noTime?: boolean;
  noTestDifs?: boolean;
}) {
  fd = fs.openSync(log, 'w');
  saveSuiteLogPart({
    verbose: false,
    dirInfo,
    noTime,
    noTestDifs,
    fd,
  });
  fs.writeSync(fd, '\n', null, gT.engineConsts.logEncoding);
  saveSuiteLogPart({
    verbose: true,
    dirInfo,
    noTime,
    noTestDifs,
    fd,
  });
  fs.closeSync(fd);
  return gIn.tInfo.testInfoToString({
    curInfo: dirInfo,
    isDir: true,
    verbose: true,
    noTime,
    noTitle: true,
    noEol: true,
  });
}

/* Prints expected tests results to stdout and unexpected to stderr */
export function printSuiteLog(dirInfo: any, noTestDifs?: boolean) {
  saveSuiteLogPart({ verbose: false, dirInfo, noTime: false, noTestDifs });
  writeToSuiteLog({ str: '\n' });
  saveSuiteLogPart({ verbose: true, dirInfo, noTime: false, noTestDifs });
}
