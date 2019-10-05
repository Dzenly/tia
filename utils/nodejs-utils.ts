'use strict';

/* global gIn */

import * as path from 'path';
import { inspect } from 'util';
import { engines } from '../package.json';
import * as semver from 'semver';
import * as _ from 'lodash';

/**
 * Clears 'require' cache for specified node module.
 * @param {String} resolvedModulePath
 */
export function clearRequireCache(resolvedModulePath: string) {
  delete require.cache[resolvedModulePath];
}

/**
 * Wrapper for 'require'. Allows to clean cache.
 *
 * @param {String} modPath - path to module.
 * @param {Boolean} clearCache - Set to true if cache should be deleted immediately.
 * @returns {{res: *, resolvedModPath: String}}
 * @throws {*} - Exceptions from 'require' calls.
 */
export function requireEx(modPath: string, clearCache?: boolean) {
  const absFilePath = path.resolve(modPath);
  const res = {
    result: require(absFilePath),
    resolvedModPath: require.resolve(absFilePath), // Can be used later for clear require cache.
  };

  if (clearCache) {
    clearRequireCache(res.resolvedModPath);
  }

  return res;
}

/**
 * Wrapper for require,  do not generate exception if path is absent.
 * @param modPath - path to module.
 * @return {*} - exports from existing module or empty object if module is absent.
 */
export function requireIfExists(modPath: string) {
  try {
    return require(modPath);
  } catch (e) {
    gIn.tracer.msg3(`requireIfExists: There is no module: ${modPath}.`);
    return {};
  }
}

function toMb(val: number): string {
  const mb = 1024 * 1024;
  return (val / mb).toFixed(3);
}

function toMs(val: number): string {
  return (val / 1000).toFixed(3);
}

export function getResourcesUsage(isTestLog?: boolean) {
  // gT.config.rssUsageThreshold

  const mem = process.memoryUsage();

  if (isTestLog && mem.rss < gT.config.rssUsageThreshold * 1e6) {
    return '';
  }

  let str = `Memory MB: ${inspect({
    rss: toMb(mem.rss),
    heapTotal: toMb(mem.heapTotal),
    heapUsed: toMb(mem.heapUsed),
  })}`;
  if (process.cpuUsage) {
    const cpuU = process.cpuUsage();
    str += `\nCPU ms: ${inspect({
      user: toMs(cpuU.user),
      system: toMs(cpuU.system),
    })}`;
  }
  return str;
}

export function getProcInfo() {
  // Env: ${inspect(process.env)}
  const str = `
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
${getResourcesUsage()}`;
  return str;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(p: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return _.isObject(p) && _.isFunction(p.then);
}

export function checkNodeJsVersion() {
  const version = engines.node;
  if (!semver.satisfies(process.version, version)) {
    console.error(`Required node version ${version}, current version ${process.version}.`);
    process.exit(1);
  }
}

export function requireArray(modules: string[]) {
  modules.forEach((modulePath: string) => {
    const modPath = path.resolve(gT.cLParams.rootDir, modulePath);
    gIn.tracer.msg1(`Requiring module: ${modPath}`);
    require(modPath);
  });
}
