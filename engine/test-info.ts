'use strict';

import * as mPath from 'path';
import * as fileUtils from '../utils/file-utils';

let isPassCountingEnabled = true;
let isPassPrintingEnabled = true;

export function getPassCountingEnabled() {
  return isPassCountingEnabled;
}

export function setPassCountingEnabled(enable: boolean) {
  isPassCountingEnabled = enable;
}

export function getPassPrintingEnabled() {
  return isPassPrintingEnabled;
}

export function setPassPrintingEnabled(enable: boolean) {
  isPassPrintingEnabled = enable;
}

export class TestInfo {
  path: string;
  title: string;

  run = 0;
  passed = 0;
  failed = 0;
  diffed = 0; // For dir this can be > 1, for file it can be 0 or 1.
  expDiffed = 0; // expectedly diffed (e.g. for purpose of testing).
  skipped = 0;
  screenShotCounter = 0;
  children: null | TestInfo[] = null;
  time = 0; // Execution time in milliseconds.
  // TODO: To investigate the need for throws count.

  constructor(isDir: boolean, title: string, path: string) {
    this.title = title;
    this.path = path;
    if (isDir) {
      this.children = [];
    }
  }
}

// Singleton.
let data: TestInfo | null = null;

export function getData() {
  return data;
}

export function setData(newData: TestInfo) {
  data = newData;
}

export function setPassed(newCount: number) {
  data!.passed = newCount;
}

export function setFailed(newCount: number) {
  data!.failed = newCount;
}

export function getPassed() {
  return data!.passed;
}

export function getFailed() {
  return data!.failed;
}

export function setSkipped(newCount: number) {
  data!.skipped = newCount;
}

export function setRun(newCount: number) {
  data!.run = newCount;
}

export function setDiffed(newCount: number) {
  data!.diffed = newCount;
}

export function setExpDiffed(newCount: number) {
  data!.expDiffed = newCount;
}

export function setTime(newTime: number) {
  data!.time = newTime;
}

export function setTitle(title: string) {
  data!.title = title;
}

// TODO: Unclear logic.
function formLogPart(str: string, count: number) {
  let strNew = str;
  if (!count) {
    strNew = strNew.toLowerCase();
  }
  strNew += `: ${count}`;
  return strNew;
}

/**
 * Forms the string for test statistics for tests and for directories.
 * @param parameters
 * @param parameters.curInfo - Directory info or Test info structure.
 * @param parameters.isDir
 * @param parameters.verbose
 * @param parameters.noTime
 * @param parameters.noTitle
 * @returns {String}
 */
export function testInfoToString(parameters) {
  const { curInfo, isDir, verbose, noTime, noTitle, noEol } = parameters;
  let diffed;
  let ediffed;
  let skipped;
  let run;
  if (isDir) {
    diffed = formLogPart('Dif', curInfo.diffed);
    ediffed = formLogPart('EDif', curInfo.expDiffed);
    skipped = formLogPart('Skip', curInfo.skipped);
    if (curInfo.isSuiteRoot && gT.cLParams.slogSubj!.includes('run')) {
      run = formLogPart('Run', curInfo.run);
    }
  } else {
    if (curInfo.diffed) {
      diffed = 'DIF';
    } else if (curInfo.expDiffed) {
      diffed = 'EDIF';
    } else {
      diffed = 'OK';
    }
    ediffed = '';
    skipped = curInfo.skipped ? 'SKIP' : '';
  }

  let filePath;

  if (isDir && curInfo.isSuiteRoot) {
    filePath = ` "${fileUtils.getDirectoryAlias(curInfo.path)}"`;
  } else {
    filePath = `"${mPath.basename(curInfo.path)}"`;
  }

  const title = noTitle ? '' : `"${curInfo.title}"`;
  const passed =
    (curInfo.isSuiteRoot && gT.cLParams.slogSubj!.includes('pass')) || !isDir
      ? formLogPart('Pass', curInfo.passed)
      : null;
  const failed = formLogPart('Fail', curInfo.failed);
  const time = noTime ? '' : `${curInfo.time.toFixed(2)} ms`;

  const arr = verbose
    ? [filePath, diffed, failed, ediffed, skipped, passed, run, time, title]
    : [filePath, diffed, failed];

  let res = `${arr.filter(Boolean).join(', ')}`; // join only non-empty strings.

  if (!noEol) {
    res += '\n';
  }

  return res;
}

/**
 *
 * @param isDir - true - directory, false - file.
 */
export function createTestInfo(isDir: boolean, title: string, path: string) {
  return new TestInfo(isDir, title, path);
}

export function addFail() {
  if (gT.config.ignorePassAndFailCounters) {
    return;
  }
  data!.failed++; // From global sandbox.
}

export function addPassForce() {
  data!.passed++;
}

export function addPass() {
  if (!isPassCountingEnabled || gT.config.ignorePassAndFailCounters) {
    return;
  }
  data!.passed++; // From global sandbox.
}
