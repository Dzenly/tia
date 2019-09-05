'use strict';

const path = require('path');
const { appendFileSync } = require('fs');
const fileUtils = require('./file-utils');

exports.getNoEtalonTestsInfoPath = function getNoEtalonTestsInfoPath() {
  const noEtalonTestsPath = path.join(
    gIn.suite.root,
    gT.engineConsts.suiteResDirName,
    gT.engineConsts.noEtalonTests
  );
  return noEtalonTestsPath;
};

exports.saveNewTestInfo = function saveNewTestInfo(testPath) {
  const pathToAdd = path.relative(gIn.suite.root, testPath);
  appendFileSync(exports.getNoEtalonTestsInfoPath(), `${pathToAdd}\n`, 'utf8')
};

exports.rmNewTestsInfo = function rmNewTestsInfo() {
  fileUtils.safeUnlink(exports.getNoEtalonTestsInfoPath());
};
