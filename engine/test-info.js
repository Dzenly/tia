'use strict';

/* globals gT: true */

var mPath = require('path');
exports.isPassCountingEnabled = true;
exports.isPassPrintingEnabled = true;

function formLogPart(str, count) {
  if (!count) {
    str = str.toLowerCase();
  }
  str += ': ' + count;
  return str;
}

/**
 * Forms the string for test statistics for tests and for directories.
 * @param curInfo - Directory info or Test info structure.
 * @param isDir
 * @param verbose
 * @param noTime
 * @param noTitle
 * @returns {string}
 */
exports.testInfoToString = function testInfoToString(curInfo, isDir, verbose, noTime, noTitle) {
  var path, title, diffed, failed, ediffed, skipped, passed, time;
  if (isDir) {
    path = '';
    diffed = formLogPart('Dif', curInfo.diffed);
    ediffed = formLogPart('EDif', curInfo.expDiffed);
    skipped = formLogPart('Skip', curInfo.skipped);
  } else {
    path = '';
    diffed = curInfo.diffed ? 'DIF' : curInfo.expDiffed ? 'EDIF' : 'OK';
    ediffed = '';
    skipped = curInfo.skipped ? 'SKIP' : '';
  }
  path += '"' + mPath.basename(curInfo.path) + '"';
  title = noTitle ? '' : '"' + curInfo.title + '"';
  passed = formLogPart('Pass', curInfo.passed);
  failed = formLogPart('Fail', curInfo.failed);
  time = noTime ? '' : curInfo.time.toFixed(2) + ' ms';

  var arr = verbose ? [path, diffed, failed, ediffed, skipped, passed, time, title] :
    [path, diffed, failed];

  var res = arr.filter(function (val) {
      return val;
    }).join(', ') + '\n'; // join only non-empty strings.

  return res;
};

/**
 *
 * @param isDir - true - directory, false - file.
 */
exports.createTestInfo = function createTestInfo(isDir, title, path) {
  var info = {
    path: gIn.textUtils.winToUnixSep(path), // For uniform logging.
    title: title,
    handled: 0,
    passed: 0,
    failed: 0,
    diffed: 0, // For dir this can be > 1, for file it can be 0 or 1.
    expDiffed: 0, // expectedly diffed (e.g. for purpose of testing).
    time: 0, // Execution time in milliseconds.
    skipped: 0,
    screenShotCounter: 0
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
