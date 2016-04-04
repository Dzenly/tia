'use strict';

/* globals gT: true */

var mpath = require('path');
gT.tInfo = {
  setLlPassCounting: true
};

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
gT.tInfo.testInfoToString = function (curInfo, isDir, verbose, noTime, noTitle) {
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
  path += '"' + mpath.basename(curInfo.path) + '"';
  title = noTitle ? '' : '"' + curInfo.title + '"';
  passed = formLogPart('Pass', curInfo.passed);
  failed = formLogPart('Fail', curInfo.failed);
  time = noTime ? '' : curInfo.time.toFixed(2) + ' ms';

  var arr = verbose ? [path, diffed, failed, ediffed, skipped, passed, time, title,] : [path, diffed, failed];

  return arr.filter(function (val) {
      return val;
    }).join(', ') + '\n'; // join only non-empty strings.
};

/**
 *
 * @param isDir - true - directory, false - file.
 */
gT.tInfo.createTestInfo = function (isDir, title, path) {
  var info = {
    path: gT.textUtils.winToUnixSep(path), // For uniform logging.
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

gT.tInfo.fail = function () {
  if (gT.config.ignorePassAndFailCounters) {
    return;
  }
  gT.tInfo.data.failed++; // From global sandbox.
};

gT.tInfo.passForce = function () {
  gT.tInfo.data.passed++;
};

gT.tInfo.pass = function () {
  if (!gT.tInfo.isPassCountingEnabled || gT.config.ignorePassAndFailCounters) {
    return;
  }
  gT.tInfo.data.passed++; // From global sandbox.
};
