'use strict';
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

/* globals gT: true */

// TODO: сделать так, чтобы тесты работали под правами специально заведеного юзера.
// У этого юзера будет доступ к тестовой директории только на чтение.
// Права на запись у него будут только в его home.
// Перед тестом (после подключения всех require), юзер процесса будет подменяться (process.setuid(id)).
// Весь test suite будет копироваться в директорию юзера и работать оттуда.
//gT.fileUtilsCheckPath = function(path){
//
//};

/**
 * Checks that file or directory absent by statSync, without checking for catch reason (ENOENT or no).
 *
 * @param path
 * @returns {boolean}
 */
exports.isAbsent = function isAbsent(path) {
  try {
    fs.statSync(path);
  } catch (e) {
    return true;
  }
  return false;
};

exports.safeUnlink = function safeUnlink(path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.safeReadFile = function safeReadFile(path) {
  var res = '';
  try {
    res = fs.readFileSync(path, gT.engineConsts.logEncoding);
  } catch (e) {
    // No handling intentionaly.
  }
  return res;
};

exports.backupDif = function backupDif(path) {
  try {
    fs.renameSync(path, path + '.old');
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.rmPngs = function rmPngs(jsPath) {
  try {
    child_process.execSync('rm ' + gIn.textUtils.changeExt(jsPath, '*.png'), {stdio: [null, null, null]});
  } catch (e) {
    // No handling intentionaly.
  }
};

exports.rmDir = function rmDir(dir, removeSelf) {
  var files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var filePath = path.join(dir, files[i]);
      var fdata = fs.lstatSync(filePath);
      try {
        if (fdata.isSymbolicLink()) {
          fs.unlinkSync(filePath);
        }
        if (fdata.isFile()) {
          fs.unlinkSync(filePath);
        }
      } catch (e) {
        gIn.tracer.err('rmDir: ' + gIn.textUtils.excToStr(e));
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
exports.createEmptyFileSync = function createEmptyFileSync(path) {
  fs.closeSync(fs.openSync(path, 'w'));
};

exports.createEmptyLog = function createEmptyLog(path) {
  gIn.logger.logFile = gIn.textUtils.jsToLog(path);
  exports.createEmptyFileSync(gIn.logger.logFile);
};

exports.fileToStdout = function fileToStdout(file) {
  console.log(fs.readFileSync(file, {encoding: gT.engineConsts.logEncoding}));
};

exports.fileToStderr = function fileToStderr(file) {
  // console.error(fs.readFileSync(file, {encoding: gT.engineConsts.logEncoding}));
  gIn.cLogger.errln(fs.readFileSync(file, {encoding: gT.engineConsts.logEncoding}));
};

exports.saveJson = function saveJson(obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj), {encoding: gT.engineConsts.logEncoding});
};

function collectArcPaths(dirInfo, arcPaths) {

  if (!dirInfo.diffed) {
    return;
  }

  // Absense of 'children' property says that it is test and not directory,
  // we should not allow to use this function for not directory.
  for (let curInfo of dirInfo.children) {
    if (curInfo.hasOwnProperty('children')) {
      collectArcPaths(curInfo, arcPaths);
    } else {
      if (curInfo.diffed) {
        arcPaths.push(gIn.textUtils.changeExt(curInfo.path, ''));
      }
    }
  }
}

exports.archiveSuiteDir = function archiveSuiteDir(dirInfo) {
  if (gIn.params.disableEmail || !gT.suiteConfig.attachArchiveToMail || !gT.suiteConfig.mailRecipientList) {
    return null;
  }
  var arcName = new Date().toISOString().slice(0, 19).replace(/:/g, '_') + '.zip';
  arcName = path.resolve(arcName); // TODO shorten paths in zip?
  if (!gT.suiteConfig.attachOnlyDiffs) {
    // TODO: can throw, is this ok?
    try {
      child_process.execSync(`cd ${gIn.params.testsDir} && zip -r ` + arcName + ' ' + '*', {stdio: [null, null, null]});
    } catch (e) {
      gIn.tracer.err('zip stderr: ' + e.stderr.toString());
      gIn.tracer.err('zip stdout: ' + e.stdout.toString());
      throw(new Error('Error with zip'));
    }
    return arcName;
  }

  var arr = [];

  collectArcPaths(dirInfo, arr);

  if (arr.length === 0) {
    gIn.tracer.msg3('Archieve: No diffs, no archieve');
    return null;
  }

  arr = arr.map(function (item ) {
    let newItem = '"' + path.relative(gIn.params.testsDir, item) + '"*';
    return newItem;
  });

  try {
    child_process.execSync(`cd ${gIn.params.testsDir} && zip ` + arcName + ' ' + arr.join(' '), {stdio: [null, null, null]});
  } catch (e) {
    gIn.tracer.err('zip stderr: ' + e.stderr.toString());
    gIn.tracer.err('zip stdout: ' + e.stdout.toString());
    throw(new Error('Error with zip'));
  }

  return arcName;
};
