'use strict';
exports.__esModule = true;
/* global gIn */
var path = require("path");
var util_1 = require("util");
var package_1 = require("../package");
var semver = require("semver");
var _ = require("lodash");
/**
 * Clears 'require' cache for specified node module.
 * @param {String} resolvedModulePath
 */
function clearRequireCache(resolvedModulePath) {
    delete require.cache[resolvedModulePath];
}
exports.clearRequireCache = clearRequireCache;
/**
 * Wrapper for 'require'. Allows to clean cache.
 *
 * @param {String} modPath - path to module.
 * @param {Boolean} clearCache - Set to true if cache should be deleted immediately.
 * @returns {{res: *, resolvedModPath: String}}
 * @throws {*} - Exceptions from 'require' calls.
 */
function requireEx(modPath, clearCache) {
    var absFilePath = path.resolve(modPath);
    var res = {
        result: require(absFilePath),
        resolvedModPath: require.resolve(absFilePath)
    };
    if (clearCache) {
        clearRequireCache(res.resolvedModPath);
    }
    return res;
}
exports.requireEx = requireEx;
/**
 * Wrapper for require,  do not generate exception if path is absent.
 * @param modPath - path to module.
 * @return {*} - exports from existing module or empty object if module is absent.
 */
function requireIfExists(modPath) {
    try {
        return require(modPath);
    }
    catch (e) {
        gIn.tracer.msg3("requireIfExists: There is no module: " + modPath + ".");
        return {};
    }
}
exports.requireIfExists = requireIfExists;
function toMb(val) {
    var mb = 1024 * 1024;
    return (val / mb).toFixed(3);
}
function toMs(val) {
    return (val / 1000).toFixed(3);
}
function getResourcesUsage(isTestLog) {
    // gT.config.rssUsageThreshold
    var mem = process.memoryUsage();
    if (isTestLog && mem.rss < gT.config.rssUsageThreshold * 1e6) {
        return '';
    }
    mem.rss = toMb(mem.rss);
    mem.heapTotal = toMb(mem.heapTotal);
    mem.heapUsed = toMb(mem.heapUsed);
    var str = "Memory MB: " + util_1.inspect(mem);
    if (process.cpuUsage) {
        var cpuU = process.cpuUsage();
        cpuU.user = toMs(cpuU.user);
        cpuU.system = toMs(cpuU.system);
        str += "\nCPU ms: " + util_1.inspect(cpuU);
    }
    return str;
}
exports.getResourcesUsage = getResourcesUsage;
function getProcInfo() {
    // Env: ${inspect(process.env)}
    var str = "\nArch: " + process.arch + "\nCwd: " + process.cwd() + "\nProc Exec: " + process.execPath + "\nProc Args: " + process.execArgv + "\nProc Pid: " + process.pid + "\nProc Platform: " + process.platform + "\nProc Title: " + process.title + "\nProc Uptime: " + process.uptime() + "\nNode release info: " + util_1.inspect(process.release) + "\nNode version info: " + util_1.inspect(process.versions) + "\n" + getResourcesUsage();
    return str;
}
exports.getProcInfo = getProcInfo;
function isPromise(p) {
    return _.isObject(p) && _.isFunction(p.then);
}
exports.isPromise = isPromise;
function checkNodeJsVersion() {
    var version = package_1.engines.node;
    if (!semver.satisfies(process.version, version)) {
        console.error("Required node version " + version + ", current version " + process.version + ".");
        process.exit(1);
    }
}
exports.checkNodeJsVersion = checkNodeJsVersion;
function requireArray(modules) {
    modules.forEach(function (modulePath) {
        var modPath = path.resolve(gT.cLParams.rootDir, modulePath);
        gIn.tracer.msg1("Requiring module: " + modPath);
        require(modPath);
    });
}
exports.requireArray = requireArray;
