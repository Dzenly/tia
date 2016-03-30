'use strict';
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

gTE.fileUtils = {};


// TODO: сделать так, чтобы тесты работали под правами специально заведеного юзера.
// У этого юзера будет доступ к тестовой директории только на чтение.
// Права на запись у него будут только в его home.
// Перед тестом (после подключения всех require), юзер процесса будет подменяться (process.setuid(id)).
// Весь test suite будет копироваться в директорию юзера и работать оттуда.
//gTE.fileUtilsCheckPath = function(path){
//
//};

gTE.fileUtils.safeUnlink = function (path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    // No handling intentionaly.
  }
};

gTE.fileUtils.backupDif = function (path) {
  try {
    fs.renameSync(path, path + '.dif');
  } catch (e) {
    // No handling intentionaly.
  }
};


gTE.fileUtils.rmPngs = function (jsPath) {
  try {
    child_process.execSync('rm ' + gTE.textUtils.changeExt(jsPath, '*.png'), {stdio: [null, null, null]});
  } catch (e) {
    // No handling intentionaly.
  }
};

gTE.fileUtils.rmDir = function (dir, removeSelf) {
  try {
    var files = fs.readdirSync(dir);
  }
  catch (e) {
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
				gTE.tracer.traceErr(gTE.textUtils.excToStr(e));
			}
			if (fdata.isDirectory()) {
				gTE.fileUtils.rmDir(filePath, true);
      }
    }
  }
	if (removeSelf) {
		fs.rmdirSync(dir);
	}
};

gTE.fileUtils.emptyDir = function (dir) {
  gTE.fileUtils.rmDir(dir);
};

gTE.fileUtils.safeRename = function (path1, path2) {
  gTE.fileUtils.safeUnlink(path2);
  try {
    fs.renameSync(path1, path2);
  } catch (e) {
    // No handling intentionaly.
  }
};

// Removes file, if exists.
gTE.fileUtils.createEmptyFileSync = function (path) {
  fs.closeSync(fs.openSync(path, 'w'));
};

gTE.fileUtils.createEmptyLog = function (path) {
  gTE.logger.logFile = gTE.textUtils.jsToLog(path);
  gTE.fileUtils.createEmptyFileSync(gTE.logger.logFile);
};

gTE.fileUtils.fileToStdout = function (file) {
  console.log(fs.readFileSync(file, {encoding: 'ascii'}));
};

gTE.fileUtils.fileToStderr = function (file) {
  console.error(fs.readFileSync(file, {encoding: 'ascii'}));
};

gTE.fileUtils.saveJson = function (obj, file) {
  fs.writeFileSync(file, JSON.stringify(obj), {encoding: 'ascii'});
};

function handleDir(dirInfo, arr) {

	if (!dirInfo.diffed) {
		return;
	}

  // Absense of 'children' property says that it is test and not directory, we should not allow to use this function for not directory.
  for (let curInfo of dirInfo.children) {
    if (curInfo.hasOwnProperty('children')) {
      handleDir(curInfo, arr);
    } else {
			if (curInfo.diffed) {
				arr.push('"' + gTE.textUtils.changeExt(curInfo.path, '') + '"*');
			}
    }
  }
}

gTE.fileUtils.archiveSuiteDir = function (dirInfo) {
	if (!gTE.params.mail || !gTE.suiteConfig.attachArchive || !gTE.suiteConfig.mailList) {
		return null;
	}
  var arcName = new Date().toISOString().slice(0, 19).replace(/:/g, '_') + '.zip';
  //arcName = path.resolve(arcName); // TODO shorten paths in zip?
  if (!gTE.suiteConfig.attachOnlyDiffs) {
    child_process.execSync('zip -r ' + arcName + ' ' + dirInfo.path, {stdio: [null, null, null]});// TODO: can throw, is this ok?
    return arcName;
  }

  var arr = [];

  handleDir(dirInfo, arr);

	if (arr.length === 0) {
		return null;
	}

  try {
    child_process.execSync('zip ' + arcName + ' ' + arr.join(' '), {stdio: [null, null, null]});
  } catch (e) {
    gTE.tracer.traceErr(e.stderr.toString());
    gTE.tracer.traceErr(e.stdout.toString());
    throw(new Error('Error with zip'));
  }

  return arcName;
};
