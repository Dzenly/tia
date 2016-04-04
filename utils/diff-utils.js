'use strict';

var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

/* globals gT: true */

gT.diffUtils = {};

gT.diffUtils.changedDiffs = 0;

/**
 * Returns result of running external diff utility, i.e. stdout + stderr.
 * NOTE: this function requires external diff utility.
 * Both files must be ended by newline, otherwise there will be 'No newline at end of file' messages in resulting diff.
 *
 * @param dir - working dir
 * @param oldFile - basename for file 1
 * @param newFile - basename for file 2
 */
gT.diffUtils.getDiff = function (dir, oldFile, newFile) {
  var diffRes = child_process.spawnSync('diff', [oldFile, newFile], {cwd: dir, encoding: 'ascii'});
  return diffRes.stdout + diffRes.stderr;
};

/**
 * Diffs current log (*.log) and ethalon log (*.eth) files.
 * Takes into account presense of .edif file.
 * If diff is not empty it is placed to (*.diff) file.
 *
 * NOTE: this function requires external diff utility.
 * Both logs must be ended by newline, otherwise there will be 'No newline at end of file' messages in resulting diff.
 *
 * @param jsTest - path to js file, for which just created *.log to be diffed with *.eth.
 */
gT.diffUtils.diff = function (jsTest) {
  var dir = path.dirname(jsTest);
  var base = path.basename(jsTest, '.js');
  var out = gT.diffUtils.getDiff(dir, base + '.et', base + '.log');
  var diffPath = path.join(dir, base + '.dif');
  var diffed = out ? 1 : 0;
  if (!diffed) {
    gT.fileUtils.safeUnlink(diffPath);
    return; // No gT.tInfo.data changes. gT.tInfo.data.diffed and gT.tInfo.data.expDiffed are zeroes.
  }

  gT.fileUtils.backupDif(diffPath);

  fs.writeFileSync(diffPath, out, {encoding: 'ascii'});

  // Check for expected diff.
  out = gT.diffUtils.getDiff(dir, base + '.edif', base + '.dif');
	if (out) {
		gT.tInfo.data.diffed = 1;
		out = gT.diffUtils.getDiff(dir, base + '.dif.dif', base + '.dif');
		if (out) {
			gT.diffUtils.changedDiffs++;
		}
	}
	else {
		gT.tInfo.data.expDiffed = 1;
  }

  gT.fileUtils.safeUnlink(diffPath + '.dif');
};
