'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

/* globals gT, gIn */

// TODO: сделать так, чтобы тесты работали под правами специально заведеного юзера.
// У этого юзера будет доступ к тестовой директории только на чтение.
// Права на запись у него будут только в его home.
// Перед тестом (после подключения всех require), юзер процесса будет подменяться (process.setuid(id)).
// Весь test suite будет копироваться в директорию юзера и работать оттуда.
// gT.fileUtilsCheckPath = function(path){
//
// };

/**
 * Checks that file or directory absent by statSync, without checking for catch reason (ENOENT or no).
 *
 * @param fileOrDirPath
 * @returns {boolean}
 */
exports.isAbsent = function isAbsent(fileOrDirPath) {
  try {
    fs.statSync(fileOrDirPath);
  } catch (e) {
    return true;
  }
  return false;
};

exports.safeUnlink = function safeUnlink(fileOrDirPath) {
  try {
    fs.unlinkSync(fileOrDirPath);
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.safeReadFile = function safeReadFile(fileOrDirPath) {
  let res = '';
  try {
    res = fs.readFileSync(fileOrDirPath, gT.engineConsts.logEncoding);
  } catch (e) {
    // No handling intentionaly.
  }
  return res;
};

exports.backupDif = function backupDif(fileOrDirPath) {
  try {
    fs.renameSync(fileOrDirPath, `${fileOrDirPath}.old`);
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.rmPngs = function rmPngs(jsPath) {
  try {
    childProcess.execSync(`rm ${gIn.textUtils.changeExt(jsPath, '*.png')}`, { stdio: [null, null, null] });
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.rmDir = function rmDir(dir, removeSelf) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dir, files[i]);
      const fdata = fs.lstatSync(filePath);
      try {
        if (fdata.isSymbolicLink()) {
          fs.unlinkSync(filePath);
        }
        if (fdata.isFile()) {
          fs.unlinkSync(filePath);
        }
      } catch (e) {
        gIn.tracer.err(`rmDir: ${gIn.textUtils.excToStr(e)}`);
      }
      if (fdata.isDirectory()) {
        exports.rmDir(filePath, true);
      }
    }
  }
  if (removeSelf) {
    fs.rmdirSync(dir);
  }
};

exports.emptyDir = function emptyDir(dir) {
  exports.rmDir(dir);
};

exports.safeRename = function safeRename(oldPath, newPath) {
  exports.safeUnlink(newPath);
  try {
    fs.renameSync(oldPath, newPath);
  } catch (e) {
    // No handling intentionaly.
  }
};

// Removes file, if exists.
exports.createEmptyFileSync = function createEmptyFileSync(fileOrDirPath) {
  fs.closeSync(fs.openSync(fileOrDirPath, 'w'));
};

exports.createEmptyLog = function createEmptyLog(fileOrDirPath) {
  gIn.logger.logFile = gIn.textUtils.jsToLog(fileOrDirPath);
  exports.createEmptyFileSync(gIn.logger.logFile);
};

exports.fileToStdout = function fileToStdout(file) {
  console.log(fs.readFileSync(file, { encoding: gT.engineConsts.logEncoding }));
};

exports.fileToStderr = function fileToStderr(file) {
  // console.error(fs.readFileSync(file, {encoding: gT.engineConsts.logEncoding}));
  gIn.cLogger.errln(fs.readFileSync(file, { encoding: gT.engineConsts.logEncoding }));
};

exports.saveJson = function saveJson(obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj), { encoding: gT.engineConsts.logEncoding });
};

function collectArcPaths(dirInfo, arcPaths) {
  if (!dirInfo.diffed) {
    return;
  }

  // Absense of 'children' property says that it is test and not directory,
  // we should not allow to use this function for not directory.
  for (const curInfo of dirInfo.children) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(curInfo, 'children')) {
      collectArcPaths(curInfo, arcPaths);
    } else if (curInfo.diffed) {
      arcPaths.push(gIn.textUtils.changeExt(curInfo.path, ''));
    }
  }
}

exports.archiveSuiteDir = function archiveSuiteDir(dirInfo) {
  if (gIn.params.disableEmail || !gT.suiteConfig.attachArchiveToMail || !gT.suiteConfig.mailRecipientList) {
    return null;
  }
  let arcName = `${new Date().toISOString().slice(0, 19).replace(/:/g, '_')}.zip`;
  arcName = path.resolve(arcName); // TODO shorten paths in zip?
  if (!gT.suiteConfig.attachOnlyDiffs) {
    // TODO: can throw, is this ok?
    try {
      childProcess.execSync(
        `cd ${gIn.params.rootDir} && zip -r ${arcName} *`,
        { stdio: [null, null, null] }
      );
    } catch (e) {
      gIn.tracer.err(`zip stderr: ${e.stderr.toString()}`);
      gIn.tracer.err(`zip stdout: ${e.stdout.toString()}`);
      throw (new Error('Error with zip'));
    }
    return arcName;
  }

  let arr = [];

  collectArcPaths(dirInfo, arr);

  if (arr.length === 0) {
    gIn.tracer.msg3('Archieve: No diffs, no archieve');
    return null;
  }

  arr = arr.map((item) => {
    const newItem = `"${path.relative(gIn.params.rootDir, item)}"*`;
    return newItem;
  });

  try {
    childProcess.execSync(
      `cd ${gIn.params.rootDir} && zip ${arcName} ${arr.join(' ')}`,
      { stdio: [null, null, null] }
    );
  } catch (e) {
    gIn.tracer.err(`zip stderr: ${e.stderr.toString()}`);
    gIn.tracer.err(`zip stdout: ${e.stdout.toString()}`);
    throw (new Error('Error with zip'));
  }

  return arcName;
};

exports.isDirectory = function isDirectory(fileOrDirPath) {
  let stat;
  try {
    stat = fs.statSync(fileOrDirPath);
  } catch (e) {
    return false;
  }

  return stat.isDirectory();
};
