'use strict';

import * as path from 'path';
import * as fileUtils from './file-utils';
import { appendFileSync } from 'fs';

export function getNoEtalonTestsInfoPath() {
  const noEtalonTestsPath = path.join(
    gIn.suite.root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.noEtalonTests
  );
  return noEtalonTestsPath;
}

export function saveNewTestInfo(testPath: string) {
  const pathToAdd = path.relative(gIn.suite.root, testPath);
  appendFileSync(getNoEtalonTestsInfoPath(), `${pathToAdd}\n`, 'utf8');
}

export function rmNewTestsInfo() {
  fileUtils.safeUnlink(getNoEtalonTestsInfoPath());
}
