'use strict';

var path = require('path');

/**
 * Clears 'require' cache for specified node module.
 * @param {String} resolvedModulePath
 */
exports.clearRequireCache = function (resolvedModulePath) {
  delete require.cache[resolvedModulePath];
};

/**
 * Wrapper for 'require'. Allows to clean cache.
 *
 * @param {String} modPath
 * @param {Boolean} clearCache - Set to true if cache should be deleted immediately.
 * @returns {{res: *, resolvedModPath: String}}
 * @throws {*} - Exceptions from 'require' calls.
 */
exports.requireEx = function (modPath, clearCache) {

  let absFilePath = path.resolve(modPath);
  var res = {
    result: require(absFilePath),
    resolvedModPath: require.resolve(absFilePath) // Can be used later for clear require cache.
  };

  if (clearCache) {
    exports.clearRequireCache(res.resolvedModPath);
  }

  return res;
};
