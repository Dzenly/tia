'use strict';

let path = require('path');
let inspect = require('util').inspect;

/**
 * Clears 'require' cache for specified node module.
 * @param {String} resolvedModulePath
 */
exports.clearRequireCache = function clearRequireCache(resolvedModulePath) {
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
exports.requireEx = function requireEx(modPath, clearCache) {

  let absFilePath = path.resolve(modPath);
  let res = {
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

exports.getResourcesUsage = function getResourcesUsage() {
  let mem = process.memoryUsage();
  mem.rss = toMb(mem.rss);
  mem.heapTotal = toMb(mem.heapTotal);
  mem.heapUsed = toMb(mem.heapUsed);
  let str = 'Memory MB: ' + inspect(mem);
  if (process.cpuUsage) {
    let cpuU = process.cpuUsage();
    cpuU.user = toMs(cpuU.user);
    cpuU.system = toMs(cpuU.system);
    str += '\nCPU ms: ' + inspect(cpuU);
  }
  return str;
};

exports.getProcInfo = function () {

  // Env: ${inspect(process.env)}
  let str = `
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

exports.isPromise = function isPromise(p) {
  if (_.isObject(p) && _.isFunction(p.then)) {
    return true;
  }
  return false;
};


exports.checkNodeJsVersion = function checkNodeJsVersion() {
  const majVersion = process.version.match(/\d+/)[0];
  if (majVersion < 8) {
    console.error(`Node.js less then 8.x.x is not supported, your version: ${process.version}`);
    process.exit(1);
  }
}
