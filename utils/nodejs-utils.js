'use strict';

var path = require('path');
var inspect = require('util').inspect;

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

function toMb(val) {
  const mb = 1024 * 1024;
  return (val / mb).toFixed(3);
}

function toMs(val) {
  return (val / 1000).toFixed(3);
}

exports.getResourcesUsage = function () {
  var mem = process.memoryUsage();
  mem.rss = toMb(mem.rss);
  mem.heapTotal = toMb(mem.heapTotal);
  mem.heapUsed = toMb(mem.heapUsed);
  var str = 'Memory MB: ' + inspect(mem);
  if (process.cpuUsage) {
    var cpuU = process.cpuUsage();
    cpuU.user = toMs(cpuU.user);
    cpuU.system = toMs(cpuU.system);
    str += '\nCPU ms: ' + inspect(cpuU);
  }
  return str;
};

exports.getProcInfo = function () {

  // Env: ${inspect(process.env)}
  var str = `
Arch: ${process.arch}
Cwd: ${process.cwd()}
Proc Exec: ${process.execPath}
Proc Args: ${process.execArgv}
Proc Pid: ${process.pid}
Proc Platform: ${process.platform}
Proc Title: ${process.title}
Proc Uptime: ${process.uptime()}
Node release info: ${inspect(process.release)}
Node version info: ${inspect(process.versions)}
` + exports.getResourcesUsage();
  return str;
};
