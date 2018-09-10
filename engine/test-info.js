'use strict';

/* globals gIn */

const mPath = require('path');

exports.isPassCountingEnabled = true;
exports.isPassPrintingEnabled = true;

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
exports.testInfoToString = function testInfoToString(parameters) {
  const {
    curInfo, isDir, verbose, noTime, noTitle, noEol,
  } = parameters;
  let diffed;
  let ediffed;
  let skipped;
  if (isDir) {
    diffed = formLogPart('Dif', curInfo.diffed);
    ediffed = formLogPart('EDif', curInfo.expDiffed);
    skipped = formLogPart('Skip', curInfo.skipped);
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

  const filePath = curInfo.isSuiteRoot ? `"${mPath.relative(gIn.params.rootDir, curInfo.path)}"` :
    `"${mPath.basename(curInfo.path)}"`;
  const title = noTitle ? '' : `"${curInfo.title}"`;
  const passed = formLogPart('Pass', curInfo.passed);
  const failed = formLogPart('Fail', curInfo.failed);
  const time = noTime ? '' : `${curInfo.time.toFixed(2)} ms`;

  const arr = verbose ? [filePath, diffed, failed, ediffed, skipped, passed, time, title] :
    [filePath, diffed, failed];

  let res = `${arr.filter(val => val).join(', ')}`; // join only non-empty strings.

  if (!noEol) {
    res += '\n';
  }

  return res;
};

/**
 *
 * @param isDir - true - directory, false - file.
 */
exports.createTestInfo = function createTestInfo(isDir, title, path) {
  const info = {
    path: gIn.textUtils.winToUnixSep(path), // For uniform logging.
    title,
    handled: 0,
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
};

exports.addFail = function addFail() {
  if (gIn.config.ignorePassAndFailCounters) {
    return;
  }
  exports.data.failed++; // From global sandbox.
};

exports.addPassForce = function addPassForce() {
  exports.data.passed++;
};

exports.addPass = function addPass() {
  if (!exports.isPassCountingEnabled || gIn.config.ignorePassAndFailCounters) {
    return;
  }
  exports.data.passed++; // From global sandbox.
};
