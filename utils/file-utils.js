'use strict';
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

/* globals gT: true */

gT.fileUtils = {};

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
gT.fileUtils.isAbsent = function (path) {
  try {
    fs.statSync(path);
  } catch (e) {
    return true;
  }
  return false;
};

gT.fileUtils.safeUnlink = function (path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    // No handling intentionaly.
  }
};

gT.fileUtils.backupDif = function (path) {
  try {
    fs.renameSync(path, path + '.dif');
  } catch (e) {
    // No handling intentionaly.
  }
};

gT.fileUtils.rmPngs = function (jsPath) {
  try {
    child_process.execSync('rm ' + gT.textUtils.changeExt(jsPath, '*.png'), {stdio: [null, null, null]});
  } catch (e) {
    // No handling intentionaly.
  }
};

gT.fileUtils.rmDir = function (dir, removeSelf) {
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
        gT.tracer.traceErr(gT.textUtils.excToStr(e));
      }
      if (fdata.isDirectory()) {
        gT.fileUtils.rmDir(filePath, true);
      }
    }
  }
  if (removeSelf) {
    fs.rmdirSync(dir);
  }
};

gT.fileUtils.emptyDir = function (dir) {
  gT.fileUtils.rmDir(dir);
};

gT.fileUtils.safeRename = function (path1, path2) {
  gT.fileUtils.safeUnlink(path2);
  try {
    fs.renameSync(path1, path2);
  } catch (e) {
    // No handling intentionaly.
  }
};

// Removes file, if exists.
gT.fileUtils.createEmptyFileSync = function (path) {
  fs.closeSync(fs.openSync(path, 'w'));
};

gT.fileUtils.createEmptyLog = function (path) {
  gT.logger.logFile = gT.textUtils.jsToLog(path);
  gT.fileUtils.createEmptyFileSync(gT.logger.logFile);
};

gT.fileUtils.fileToStdout = function (file) {
  console.log(fs.readFileSync(file, {encoding: 'ascii'}));
};

gT.fileUtils.fileToStderr = function (file) {
  console.error(fs.readFileSync(file, {encoding: 'ascii'}));
};

gT.fileUtils.saveJson = function (obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj), {encoding: 'ascii'});
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
        arcPaths.push('"' + gT.textUtils.changeExt(curInfo.path, '') + '"*');
      }
    }
  }
}

gT.fileUtils.archiveSuiteDir = function (dirInfo) {
  if (!gT.params.mail || !gT.suiteConfig.attachArchive || !gT.suiteConfig.mailList) {
    return null;
  }
  var arcName = new Date().toISOString().slice(0, 19).replace(/:/g, '_') + '.zip';
  //arcName = path.resolve(arcName); // TODO shorten paths in zip?
  if (!gT.suiteConfig.attachOnlyDiffs) {
    // TODO: can throw, is this ok?
    child_process.execSync('zip -r ' + arcName + ' ' + dirInfo.path, {stdio: [null, null, null]});
    return arcName;
  }

  var arr = [];

  collectArcPaths(dirInfo, arr);

  if (arr.length === 0) {
    return null;
  }

  try {
    child_process.execSync('zip ' + arcName + ' ' + arr.join(' '), {stdio: [null, null, null]});
  } catch (e) {
    gT.tracer.traceErr(e.stderr.toString());
    gT.tracer.traceErr(e.stdout.toString());
    throw(new Error('Error with zip'));
  }

  return arcName;
};
