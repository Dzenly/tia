'use strict';

/* global gIn */

import * as path from 'path';
import * as fs from 'fs';

import * as fileUtils from './file-utils';

export function containsSuite(dir: string) {
  const suiteDir = path.join(dir, gT.engineConsts.suiteDirName);

  return fileUtils.isDirectory(suiteDir);
}

export function isRootDirInited(rootDir: string) {
  const rootResultsDir = path.join(
    rootDir,
    gT.engineConsts.suiteDirName,
    gT.engineConsts.rootResDirName
  );

  return fileUtils.isDirectory(rootResultsDir);
}

export function isSuiteDirInited(dir: string) {
  const suiteResultsDir = path.join(
    dir,
    gT.engineConsts.suiteDirName,
    gT.engineConsts.suiteResDirName
  );

  return fileUtils.isDirectory(suiteResultsDir);
}

export function resolveRootDirFromArgsAndEnv(argsTiaRootDir: string) {
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
}

export function findTiaRootInParents(dir: string) {
  const systemRoot = path.parse(dir).root;
  let notFound = false;

  try {
    while (!isRootDirInited(dir)) {
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
}

// export function findTiaSuiteResInParents(dir) {
//
//   const systemRoot = path.parse(dir).root;
//   let notFound = false;
//
//   try {
//     while (!isSuiteDirInited(dir)) {
//       if (dir === systemRoot || isRootDirInited(dir)) {
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

export function getTiaSuiteFromParents(dir: string) {
  const startIndex = dir.indexOf(gT.engineConsts.suiteDirName);
  if (startIndex === -1) {
    throw new Error(`No suite found for directory: ${dir}`);
  }

  const result = dir.slice(0, startIndex + gT.engineConsts.suiteDirName.length);
  return result;
}

export function isTiaSuiteInParents(dir: string) {
  const dirArr = dir.split(path.sep);
  return dirArr.includes(gT.engineConsts.suiteDirName);
}

export function findTiaRootInChildren(dir: string) {
  return fileUtils.whichDirContain(
    dir,
    [gT.engineConsts.rootResDirName],
    path.join(dir, gT.engineConsts.suiteDirName)
  );
}

/**
 * Resolves path specified by cmd line option or environment variable.
 * Non mandatory path resolved to CWD.
 * Relative paths resolved relative to CWD.
 * @return {String} - resolved path.
 */
export function resolveRootDirEx(argsTiaRootDir: string): string {
  let tiaRootDir = resolveRootDirFromArgsAndEnv(argsTiaRootDir);
  if (tiaRootDir) {
    return tiaRootDir;
  }

  gIn.tracer.msg0('Root dir is not specified by cmd line or env var.');

  tiaRootDir = findTiaRootInParents(process.cwd());

  if (!tiaRootDir) {
    gIn.tracer.err('You have not initialized any directories. See tia -h for init command');
    process.exit(1);
  }
  return tiaRootDir || '';
}

export function initTiaSuite() {
  // eslint-disable-next-line no-param-reassign
  const dir = process.cwd();

  if (isTiaSuiteInParents(dir)) {
    gIn.tracer.err(`TIA suite is existed in parent dirs here: ${dir}`);
    gIn.tracer.err('You can not create suite inside suite');
    process.exit(1);
  }

  const existedTiaRootInChildren = findTiaRootInChildren(dir);
  if (existedTiaRootInChildren) {
    gIn.tracer.err(`TIA root is existed in children dirs here: ${existedTiaRootInChildren}`);
    gIn.tracer.err('You can not have TIA root inside TIA suite');
    process.exit(1);
  }

  const tiaRootInParents = findTiaRootInParents(dir);
  if (!tiaRootInParents) {
    gIn.tracer.err(`TIA root is not found for : ${dir}`);
    gIn.tracer.err('You must have TIA root, before suite creation, see tia -h for initRoot mode');
    process.exit(1);
  }

  gIn.cLogger.msgln(`Root dir "${tiaRootInParents}" is found.`);
  gIn.cLogger.msgln(`Suite dir "${dir}" is created successfully.`);

  fileUtils.mkDirRecursive(dir, [gT.engineConsts.suiteDirName, gT.engineConsts.suiteResDirName]);

  fs.writeFileSync(
    path.join(dir, gT.engineConsts.suiteDirName, gT.engineConsts.suiteResDirName, '.gitkeep'),
    'Just dummy file to commit _tia-suite to VCS',
    'utf8'
  );

  process.exit(0);
}

export function initTiaRoot(argsTiaRootDir: string) {
  const tiaRootCandidate = resolveRootDirFromArgsAndEnv(argsTiaRootDir) || process.cwd();

  if (isTiaSuiteInParents(tiaRootCandidate)) {
    gIn.tracer.err(`TIA suite is existed in parent dirs here: ${tiaRootCandidate}`);
    gIn.tracer.err('You can not create root inside suite');
    process.exit(1);
  }

  const existedTiaRootInChildren = findTiaRootInChildren(tiaRootCandidate);
  if (existedTiaRootInChildren) {
    gIn.tracer.err(`TIA root is existed in children dirs here: ${existedTiaRootInChildren}`);
    gIn.tracer.err('You can not have TIA root inside TIA root');
    process.exit(1);
  }

  const tiaRootInParents = findTiaRootInParents(tiaRootCandidate);
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
}

/**
 * Resolves path specified by cmd line option or environment variable.
 * Relative paths resolved relative to gT.cLParams.rootDir.
 * @param {Object} argsObj
 * @return {String} - resolved path or empty string.
 */
export function resolvePathOptionRelativeToRootDir({
  cmdLineArgsPath,
  envVarName,
  description,
  cutLastDirSep,
  mandatory,
}: {
  cmdLineArgsPath: string;
  envVarName: string;
  description: string;
  cutLastDirSep: boolean;
  mandatory: boolean;
}) {
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
    myPath = path.resolve(gT.cLParams.rootDir, myPath);

    if (cutLastDirSep && myPath.endsWith(path.sep)) {
      myPath = myPath.slice(0, -1);
    }
  }

  gIn.tracer.msg3(`${description}: ${myPath}`);

  return myPath;
}
