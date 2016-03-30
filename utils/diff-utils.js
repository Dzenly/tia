var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

gTE.diffUtils = {};

gTE.changedDiffs = 0;

/**
 * Returns result of running external diff utility, i.e. stdout + stderr.
 * NOTE: this function requires external diff utility.
 * Both files must be ended by newline, otherwise there will be 'No newline at end of file' messages in resulting diff.
 *
 * @param dir - working dir
 * @param oldFile - basename for file 1
 * @param newFile - basename for file 2
 */
gTE.diffUtils.getDiff = function (dir, oldFile, newFile) {
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
gTE.diffUtils.diff = function (jsTest) {
  var dir = path.dirname(jsTest);
  var base = path.basename(jsTest, '.js');
  var out = gTE.diffUtils.getDiff(dir, base + '.et', base + '.log');
  var diffPath = path.join(dir, base + '.dif');
  var diffed = out ? 1 : 0;
  if (!diffed) {
    gTE.fileUtils.safeUnlink(diffPath);
    return; // No gTE.tinfo.data changes. gTE.tinfo.data.diffed and gTE.tinfo.data.expDiffed are zeroes.
  }

  gTE.fileUtils.backupDif(diffPath);

  fs.writeFileSync(diffPath, out, {encoding: 'ascii'});

  // Check for expected diff.
  out = gTE.diffUtils.getDiff(dir, base + '.edif', base + '.dif');
	if (out) {
		gTE.tinfo.data.diffed = 1;
		out = gTE.diffUtils.getDiff(dir, base + '.dif.dif', base + '.dif');
		if (out) {
			gTE.changedDiffs++;
		}
	}
	else {
		gTE.tinfo.data.expDiffed = 1;
  }

  gTE.fileUtils.safeUnlink(diffPath + '.dif');
};
