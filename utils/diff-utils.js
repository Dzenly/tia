'use strict';

const path = require('path');
const fs = require('fs');

const diffJs = require('diff');
const colors = require('colors/safe');

// const ansiToHtml = require('ansi-to-html')

const fileUtils = require('./file-utils');


/* globals gT: true */
/* globals gIn: true */

/**
 * Returns result of running external dif utility, i.e. stdout + stderr.
 * NOTE: this function requires external dif utility.
 * Both files must be ended by newline, otherwise there will be 'No newline at end of file' messages
 * in resulting dif.
 *
 * @param dir - working dir
 * @param oldFile - basename for file 1
 * @param newFile - basename for file 2
 */
exports.getDiff = function getDiff(dir, oldFile, newFile) {
  const oldText = fileUtils.safeReadFile(path.resolve(dir, oldFile));
  const newText = fileUtils.safeReadFile(path.resolve(dir, newFile));

  const result = diffJs.structuredPatch(
    oldFile,
    newFile,
    oldText,
    newText,
    '',
    '',
    { context: 0, newlineIsToken: false });

  if (result.hunks.length === 0) {
    return '';
  }

  const strArr = [
    // `--- ${result.oldFileName}`,
    // `+++ ${result.newFileName}`,
  ];

  result.hunks.forEach((hunk) => {
    strArr.push(
      `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`);
    hunk.lines.forEach((line) => {
      strArr.push(line);
    });
  });

  return strArr.join('\n');
};

/**
 * Diffs current log (*.log) and etalon log (*.et) files.
 * Takes into account presence of .edif file.
 * If diff is not empty it is placed to (*.dif) file.
 *
 * NOTE: this function requires external diff utility.
 * Both logs must be ended by newline, otherwise there
 * will be 'No newline at end of file' messages
 * in resulting diff.
 *
 * @param jsTest - path to js file, for which just created *.log
 * to be diffed with *.et.
 */
exports.diff = function diff(jsTest) {
  const dir = path.dirname(jsTest);
  const base = path.basename(jsTest, '.js');
  let out = exports.getDiff(dir, `${base}.log`, `${base}.et`);
  const diffPath = path.join(dir, `${base}.dif`);
  const diffed = out ? 1 : 0;
  if (!diffed) {
    gIn.fileUtils.safeUnlink(diffPath);
    return; // No gIn.tInfo.data changes. gIn.tInfo.data.diffed and gIn.tInfo.data.expDiffed are zeroes.
  }

  gIn.fileUtils.backupDif(diffPath);

  fs.writeFileSync(diffPath, out, { encoding: gT.engineConsts.logEncoding });

  // let oldOut = out;

  // Check for expected diff.
  out = exports.getDiff(dir, `${base}.dif`, `${base}.edif`);
  if (out) {
    // gIn.tracer.trace1(`${base} DIFF: \n ${oldOut}`);
    gIn.tInfo.data.diffed = 1;
    out = exports.getDiff(dir, `${base}.dif`, `${base}.dif.old`);
    if (out) {
      gIn.suite.changedEDiffs++;
    }
  } else {
    gIn.tInfo.data.expDiffed = 1;
  }

  gIn.fileUtils.safeUnlink(`${diffPath}.old`);
};


// exports.getWordDiffData
