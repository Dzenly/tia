'use strict';

/* global gIn */

const path = require('path');

/**
 * Resolves path specified by cmd line option or environment variable.
 * @param {Object} argsObj
 * @return {String} - resolved path.
 */
exports.resolvePathOption = function resolvePathOption(argsObj) {
  const {
    cmdLineArgsPath, envVarName, description, cutLastDirSep, mandatory,
  } = argsObj;

  let myPath = cmdLineArgsPath || process.env[envVarName];
  if (!myPath) {
    if (mandatory) {
      gIn.cLogger.errln(`${description} is not specified`);
      process.exit(1); // TODO: change to debug-assert ??
    } else {
      myPath = process.cwd();
    }
  }

  myPath = path.resolve(myPath);

  if (cutLastDirSep && myPath[myPath.length - 1] === path.sep) {
    myPath = myPath.slice(0, -1);
  }

  gIn.tracer.msg3(`${description}: ${myPath}`);

  return myPath;
};
