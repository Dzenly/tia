'use strict';

const path = require('path');
const { appendFileSync } = require('fs');
const fileUtils = require('./file-utils');

export function getNoEtalonTestsInfoPath() {
  const noEtalonTestsPath = path.join(
    gIn.suite.root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.noEtalonTests
  );
  return noEtalonTestsPath;
};

export function saveNewTestInfo(testPath) {
  const pathToAdd = path.relative(gIn.suite.root, testPath);
  appendFileSync(getNoEtalonTestsInfoPath(), `${pathToAdd}\n`, 'utf8')
};

export function rmNewTestsInfo() {
  fileUtils.safeUnlink(getNoEtalonTestsInfoPath());
};
