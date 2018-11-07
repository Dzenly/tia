'use strict';

/* global gIn */

const path = require('path');
const fs = require('fs');

const fileUtils = require('./file-utils');

exports.containsSuite = function containsTiaTest(dir) {
  const suiteDir = path.join(
    dir,
    gT.engineConsts.suiteDirName
  );

  return fileUtils.isDirectory(suiteDir);
};


exports.isRootDirInited = function isRootDirInited(rootDir) {
  const rootResultsDir = path.join(
    rootDir,
    gT.engineConsts.suiteDirName,
    gT.engineConsts.rootResDirName
  );

  return fileUtils.isDirectory(rootResultsDir);
};

exports.isSuiteDirInited = function isSuiteDirInited(dir) {
  const suiteResultsDir = path.join(
    dir,
    gT.engineConsts.suiteDirName,
    gT.engineConsts.suiteResDirName
  );

  return fileUtils.isDirectory(suiteResultsDir);
};

exports.resolveRootDirFromArgsAndEnv = function resolveRootDir(argsTiaRootDir) {
  let tiaRootDir = argsTiaRootDir || process.env[gT.engineConsts.rootDirEnvVarName];

  if (tiaRootDir && !path.isAbsolute(tiaRootDir)) {
    gIn.tracer.msg0(`Relative root dir "${tiaRootDir}" will be resolved to absolute one.`);
    tiaRootDir = path.resolve(process.cwd(), tiaRootDir);
    tiaRootDir = fileUtils.rmLastDirSep(tiaRootDir);
  }

  if (tiaRootDir) {
    gIn.tracer.msg0(`Root dir is: ${tiaRootDir}`);
    return tiaRootDir;
  }

  return null;
};

exports.findTiaRootInParents = function findTiaRootInParents(dir) {
  const systemRoot = path.parse(dir).root;
  let notFound = false;

  try {
    while (!exports.isRootDirInited(dir)) {
      if (dir === systemRoot) {
        notFound = true;
        break;
      }

      // eslint-disable-next-line no-param-reassign
      dir = path.dirname(dir);
    }
  } catch (err) {
    gIn.tracer.exc(err);
    notFound = true;
  }

  if (notFound) return null;
  return dir;
};

// exports.findTiaSuiteResInParents = function findTiaSuiteResInParents(dir) {
//
//   const systemRoot = path.parse(dir).root;
//   let notFound = false;
//
//   try {
//     while (!exports.isSuiteDirInited(dir)) {
//       if (dir === systemRoot || exports.isRootDirInited(dir)) {
//         notFound = true;
//         break;
//       }
//
//       // eslint-disable-next-line no-param-reassign
//       dir = path.dirname(dir);
//     }
//   } catch (err) {
//     gIn.tracer.exc(err);
//     notFound = true;
//   }
//
//   if (notFound) return null;
//   return dir;
// };

exports.isTiaSuiteInParents = function isTiaSuiteInParents(dir) {
  const dirArr = dir.split(path.sep);
  return dirArr.includes(gT.engineConsts.suiteDirName);
};

exports.findTiaRootInChildren = function findTiaSuiteInChildren(dir) {
  return fileUtils.whichDirContain(
    dir,
    [gT.engineConsts.rootResDirName],
    path.join(dir, gT.engineConsts.suiteDirName)
  );
};

/**
 * Resolves path specified by cmd line option or environment variable.
 * Non mandatory path resolved to CWD.
 * Relative paths resolved relative to CWD.
 * @return {String} - resolved path.
 */
exports.resolveRootDirEx = function resolveRootDirEx(argsTiaRootDir) {
  let tiaRootDir = exports.resolveRootDirFromArgsAndEnv(argsTiaRootDir);
  if (tiaRootDir) {
    return tiaRootDir;
  }

  gIn.tracer.msg0('Root dir is not specified by cmd line or env var.');

  tiaRootDir = exports.findTiaRootInParents(process.cwd());

  if (!tiaRootDir) {
    gIn.tracer.err('You have not initialized any directories. See tia -h for init command');
    process.exit(1);
  }
  return tiaRootDir;
};

exports.initTiaSuite = function initTiaSuite() {
  // eslint-disable-next-line no-param-reassign
  const dir = process.cwd();

  if (exports.isTiaSuiteInParents(dir)) {
    gIn.tracer.err(`TIA suite is existed in parent dirs here: ${dir}`);
    gIn.tracer.err('You can not create suite inside suite');
    process.exit(1);
  }

  const existedTiaRootInChildren = exports.findTiaRootInChildren(dir);
  if (existedTiaRootInChildren) {
    gIn.tracer.err(`TIA root is existed in children dirs here: ${existedTiaRootInChildren}`);
    gIn.tracer.err('You can not have TIA root inside TIA suite');
    process.exit(1);
  }

  const tiaRootInParents = exports.findTiaRootInParents(dir);
  if (!tiaRootInParents) {
    gIn.tracer.err(`TIA root is not found for : ${dir}`);
    gIn.tracer.err('You must have TIA root, before suite creation, see tia -h for initRoot mode');
    process.exit(1);
  }

  gIn.cLogger.msgln(`Root dir "${tiaRootInParents}" is found.`);
  gIn.cLogger.msgln(`Suite dir "${dir}" is created successfully.`);

  fileUtils.mkDirRecursive(dir, [
    gT.engineConsts.suiteDirName,
    gT.engineConsts.suiteResDirName,
  ]);

  process.exit(0);
};

exports.initTiaRoot = function initTiaRoot(argsTiaRootDir) {
  const tiaRootCandidate = exports.resolveRootDirFromArgsAndEnv(argsTiaRootDir)
  || process.cwd();

  if (exports.isTiaSuiteInParents(tiaRootCandidate)) {
    gIn.tracer.err(`TIA suite is existed in parent dirs here: ${tiaRootCandidate}`);
    gIn.tracer.err('You can not create root inside suite');
    process.exit(1);
  }

  const existedTiaRootInChildren = exports.findTiaRootInChildren(tiaRootCandidate);
  if (existedTiaRootInChildren) {
    gIn.tracer.err(`TIA root is existed in children dirs here: ${existedTiaRootInChildren}`);
    gIn.tracer.err('You can not have TIA root inside TIA root');
    process.exit(1);
  }

  const tiaRootInParents = exports.findTiaRootInParents(tiaRootCandidate);
  if (tiaRootInParents) {
    gIn.tracer.err(`TIA root is found here : ${tiaRootInParents}`);
    gIn.tracer.err('You can not have TIA root inside TIA root');
    process.exit(1);
  }

  fileUtils.mkDirRecursive(tiaRootCandidate, [
    gT.engineConsts.suiteDirName,
    gT.engineConsts.rootResDirName,
  ]);

  gIn.cLogger.msgln(`Root results is created successfully in "${tiaRootCandidate}"`);

  process.exit(0);
};

/**
 * Resolves path specified by cmd line option or environment variable.
 * Relative paths resolved relative to gIn.params.rootDir.
 * @param {Object} argsObj
 * @return {String} - resolved path or empty string.
 */
exports.resolvePathOptionRelativeToRootDir = function resolvePathOptionRelativeToRootDir(argsObj) {
  const {
    cmdLineArgsPath, envVarName, description, cutLastDirSep, mandatory,
  } = argsObj;

  let myPath = cmdLineArgsPath || process.env[envVarName];
  if (!myPath) {
    if (mandatory) {
      gIn.cLogger.errln(`${description} is not specified`);
      process.exit(1); // TODO: change to debug-assert ??
    }
    gIn.tracer.msg3(`${description} is not specified`);
    return '';
  }

  if (!path.isAbsolute(myPath)) {
    myPath = path.resolve(gIn.params.rootDir, myPath);

    if (cutLastDirSep && myPath[myPath.length - 1] === path.sep) {
      myPath = myPath.slice(0, -1);
    }
  }

  gIn.tracer.msg3(`${description}: ${myPath}`);

  return myPath;
};
