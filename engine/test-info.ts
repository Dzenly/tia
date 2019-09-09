'use strict';

/* globals gIn */

import * as mPath from 'path';
import * as fileUtils from '../utils/file-utils';

export const isPassCountingEnabled = true;
export const isPassPrintingEnabled = true;

export let data = null;

// TODO: Unclear logic.
function formLogPart(str, count) {
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
    if (curInfo.isSuiteRoot && gT.cLParams.slogSubj.includes('run')) {
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
    (curInfo.isSuiteRoot && gT.cLParams.slogSubj.includes('pass')) || !isDir
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
export function createTestInfo(isDir, title, path) {
  const info = {
    path: gIn.textUtils.winToUnixSep(path), // For uniform logging.
    title,
    run: 0,
    passed: 0,
    failed: 0,
    diffed: 0, // For dir this can be > 1, for file it can be 0 or 1.
    expDiffed: 0, // expectedly diffed (e.g. for purpose of testing).
    time: 0, // Execution time in milliseconds.
    skipped: 0,
    screenShotCounter: 0,

    // TODO: To investigate the need for throws count.
  };
  if (isDir) {
    info.children = [];
  }
  return info;
}

export function addFail() {
  if (gT.config.ignorePassAndFailCounters) {
    return;
  }
  data.failed++; // From global sandbox.
}

export function addPassForce() {
  data.passed++;
}

export function addPass() {
  if (!isPassCountingEnabled || gT.config.ignorePassAndFailCounters) {
    return;
  }
  data.passed++; // From global sandbox.
}
