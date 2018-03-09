'use strict';

/* globals gT: true, gIn: true */

const path = require('path');
const nodeUtils = require('../utils/nodejs-utils.js');

exports.copyConfig = function copyConfig(config) {
  const result = {};
  for (const prop in config) {
    result[prop] = config[prop];
  }
  return result;
};

/**
 * Returns a new config which is merge config1 and config2.
 * Properties from config2 override properties from config1.
 * Does not change config1 and config2.
 * @param config1
 * @param config2
 */
exports.mergeConfigs = function mergeConfigs(config1, config2) {
  const result = exports.copyConfig(config1);
  result.sectionTitle = '';
  for (const prop in config2) {
    result[prop] = config2[prop];
  }
  return result;
};

// Returns merged config for suite.
exports.handleSuiteConfig = function handleSuiteConfig() {
  let localSuiteConfig = {};
  const configPath = path.join(gIn.params.rootDir, gT.engineConsts.suiteConfigName);
  try {
    localSuiteConfig = nodeUtils.requireEx(configPath, true).result;
  } catch (e) {
    gIn.tracer.msg2(e);
    gIn.tracer.msg2(`There is no Local Suite Config: ${configPath}`);
  }
  gT.suiteConfig = exports.mergeConfigs(gT.suiteConfigDefault, localSuiteConfig);
};
