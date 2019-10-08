

import * as path from 'path';
import * as fs from 'fs';

import * as diffJs from 'diff';

import chalk from 'chalk';

// const ansiToHtml = require('ansi-to-html')

import * as fileUtils from './file-utils';

/* globals gT: true */
/* globals gIn: true */
// ansi, html.
export function getStructuredPatch({
  dir,
  oldFile,
  newFile,
  highlight = '',
}: {
  dir: string;
  oldFile: string;
  newFile: string;
  highlight?: string;
}) {
  const oldPath = path.resolve(dir, oldFile);
  const newPath = path.resolve(dir, newFile);

  const oldText = fileUtils.safeReadFile(oldPath);
  const newText = fileUtils.safeReadFile(newPath);

  const structPath = diffJs.structuredPatch(oldFile, newFile, oldText, newText, '', '', {
    context: 0,
    newlineIsToken: false,
  });

  if (!highlight) {
    return structPath;
  }

  let eol: string;

  if (highlight === 'ansi') {
    eol = '\n';
  } else if (highlight === 'html') {
    eol = '<br>\n';
  } else {
    throw new Error(`Incorrect highlight: ${highlight}`);
  }

  structPath.hunks.forEach(hunk => {
    const oldArr = [];
    const newArr = [];

    for (let i = 0; i < hunk.lines.length; i++) {
      const line = hunk.lines[i];
      if (line.startsWith('-')) {
        oldArr.push(line.slice(1) + eol);
      } else if (line.startsWith('+')) {
        newArr.push(line.slice(1) + eol);
      } else {
        // TODO: if there is not file, the same error.
        throw new Error(`Unexpected line prefix:\noldPath: ${oldPath}\nnewPath: ${newPath}`);
      }
    }

    const oldStr = oldArr.join('');
    const newStr = newArr.join('');

    const wordResult = diffJs.diffWordsWithSpace(oldStr, newStr);

    const lineArr: string[] = [];

    wordResult.forEach((word: any) => {
      if (highlight === 'ansi') {
        if (word.added) {
          lineArr.push(chalk.green(word.value));
        } else if (word.removed) {
          lineArr.push(chalk.red(word.value));
        } else {
          lineArr.push(chalk.white(word.value));
        }
      } else if (word.added) {
        lineArr.push(`<strong><span style="color:#0A0">${word.value}</span></strong>`);
      } else if (word.removed) {
        lineArr.push(`<strong><span style="color:#F00">${word.value}</span></strong>`);
      } else {
        lineArr.push(`<span style="color:#333">${word.value}</span>`);
      }
    });
    hunk.lines = [lineArr.join('')]; // eslint-disable-line no-param-reassign
  });

  return structPath;
}

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
export function getDiff({
  dir,
  oldFile,
  newFile,
  highlight = '',
  htmlWrap = false,
}: {
  dir: string;
  oldFile: string;
  newFile: string;
  highlight?: string;
  htmlWrap?: boolean;
}) {
  const structPath = getStructuredPatch({
    dir,
    oldFile,
    newFile,
    highlight,
  });

  if (structPath.hunks.length === 0) {
    return '';
  }

  const strArr: string[] = [];

  structPath.hunks.forEach((hunk: any) => {
    strArr.push(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`);
    hunk.lines.forEach((line: string) => {
      strArr.push(line);
    });
  });

  let eol;
  let result;

  if (highlight === 'html') {
    eol = '<br>\n';

    if (htmlWrap) {
      result = `<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${oldFile} -> ${newFile} dif </title>
</head>
<body>
${strArr.join(eol)}
</body>
</html>
`;
    } else {
      result = strArr.join(eol);
    }
  } else if (highlight === 'ansi' || !highlight) {
    eol = '\n';
    result = strArr.join(eol);
  } else {
    throw new Error(`Incorrect highlight: ${highlight}`);
  }
  return result;
}

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
export function diff({
  jsTest,
  highlight,
  htmlWrap,
}: {
  jsTest: string;
  highlight?: string;
  htmlWrap?: boolean;
}) {
  const dir = path.dirname(jsTest);
  const base = path.basename(jsTest.slice(0, -3));
  let out = getDiff({
    dir,
    oldFile: `${base}.log`,
    newFile: `${base}.et`,
    highlight,
    htmlWrap,
  });
  const diffPath = path.join(dir, `${base}.dif`);
  const diffed = out ? 1 : 0;
  if (!diffed) {
    gIn.fileUtils.safeUnlink(diffPath);
    return; // No data changes. data.diffed and data.expDiffed are zeroes.
  }

  gIn.fileUtils.backupDif(diffPath);

  fs.writeFileSync(diffPath, out, { encoding: gT.engineConsts.logEncoding });

  // let oldOut = out;

  // Check for expected diff.
  out = getDiff({
    dir,
    oldFile: `${base}.dif`,
    newFile: `${base}.edif`,
  });
  if (out) {
    // gIn.tracer.trace1(`${base} DIFF: \n ${oldOut}`);
    gIn.tInfo.setDiffed(1);
    out = getDiff({
      dir,
      oldFile: `${base}.dif`,
      newFile: `${base}.dif.old`,
    });
    if (out) {
      gIn.suite.changedEDiffs++;
    }
  } else {
    gIn.tInfo.setExpDiffed(1);
  }

  gIn.fileUtils.safeUnlink(`${diffPath}.old`);
}
