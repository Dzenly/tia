'use strict';

/* global gIn */

const path = require('path');
const fileUtils = require('./file-utils');


exports.isRootDirInited = function isRootDirInited(rootDir) {
  const rootResultsDir = path.join(
    rootDir,
    gT.engineConsts.suiteDirName,
    gT.engineConsts.rootSubDirName
  );

  return fileUtils.isDirectory(rootResultsDir);
};

exports.resolveRootDir = function resolveRootDir(argsTiaRootDir) {
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

/**
 * Resolves path specified by cmd line option or environment variable.
 * Non mandatory path resolved to CWD.
 * Relative paths resolved relative to CWD.
 * @return {String} - resolved path.
 */
exports.resolveRootDirEx = function resolveRootDirEx(argsTiaRootDir) {

  const tiaRootDir = exports.resolveRootDir(argsTiaRootDir);
  if (tiaRootDir) {
    return tiaRootDir;
  }

  gIn.tracer.msg0('Root dir is not specified by cmd line or env var.');

  let curDir = process.cwd();
  let error = false;

  const systemRoot = path.parse(curDir).root;

  try {
    while (!exports.isRootDirInited(curDir)) {
      if (curDir === systemRoot) {
        error = true;
        break;
      }
      curDir = path.dirname(curDir);
    }
  } catch (err) {
    gIn.tracer.exc(err);
    error = true;
  }

  if (error) {
    gIn.tracer.err('You have not initialized any directories. See tia -h for init command');
    process.exit(1);
  }
  return curDir;
};

exports.initTia = function initTia(argsTiaRootDir) {




  process.exit();
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
