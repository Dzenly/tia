'use strict';

var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

/* globals gT: true */
/* globals gIn: true */

exports.changedDiffs = 0;

/**
 * Returns result of running external diff utility, i.e. stdout + stderr.
 * NOTE: this function requires external diff utility.
 * Both files must be ended by newline, otherwise there will be 'No newline at end of file' messages in resulting diff.
 *
 * @param dir - working dir
 * @param oldFile - basename for file 1
 * @param newFile - basename for file 2
 */
exports.getDiff = function (dir, oldFile, newFile) {
  // TODO: check utf8 support.
  var diffRes = child_process.spawnSync('diff', [oldFile, newFile], {cwd: dir, encoding: gT.engineConsts.logEncoding});
  return diffRes.stdout + diffRes.stderr;
};

/**
 * Diffs current log (*.log) and etalon log (*.eth) files.
 * Takes into account presence of .edif file.
 * If diff is not empty it is placed to (*.diff) file.
 *
 * NOTE: this function requires external diff utility.
 * Both logs must be ended by newline, otherwise there will be 'No newline at end of file' messages in resulting diff.
 *
 * @param jsTest - path to js file, for which just created *.log to be diffed with *.eth.
 */
exports.diff = function (jsTest) {
  var dir = path.dirname(jsTest);
  var base = path.basename(jsTest, '.js');
  var out = exports.getDiff(dir, base + '.et', base + '.log');
  var diffPath = path.join(dir, base + '.dif');
  var diffed = out ? 1 : 0;
  if (!diffed) {
    gIn.fileUtils.safeUnlink(diffPath);
    return; // No gIn.tInfo.data changes. gIn.tInfo.data.diffed and gIn.tInfo.data.expDiffed are zeroes.
  }

  gIn.fileUtils.backupDif(diffPath);

  fs.writeFileSync(diffPath, out, {encoding: gT.engineConsts.logEncoding});
  // var oldOut = out;

  // Check for expected diff.
  out = exports.getDiff(dir, base + '.edif', base + '.dif');
  if (out) {
    // gIn.tracer.trace1(`${base} DIFF: \n ${oldOut}`);
    gIn.tInfo.data.diffed = 1;
    out = exports.getDiff(dir, base + '.dif.old', base + '.dif');
    if (out) {
      exports.changedDiffs++;
    }
  } else {
    gIn.tInfo.data.expDiffed = 1;
  }

  gIn.fileUtils.safeUnlink(diffPath + '.old');
};
