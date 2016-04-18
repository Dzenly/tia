'use strict';

/* globals gT: true, gIn: true */

var path = require('path');
var nodeUtils = require('../utils/nodejs-utils.js');

exports.copyConfig = function (config) {
  var result = {};
  for (var prop in config) {
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
exports.mergeConfigs = function (config1, config2) {
  var result = exports.copyConfig(config1);
  for (var prop in config2) {
    result[prop] = config2[prop];
  }
  return result;
};

// Returns merged config for suite.
exports.handleSuiteConfig = function () {
  var localSuiteConfig = {};
  var configPath = path.join(gIn.params.suiteRoot, gT.engineConsts.suiteConfigName);
  try {
    localSuiteConfig = nodeUtils.requireEx(configPath, true).result;
  } catch (e) {
    gIn.tracer.trace2('There is no Local Suite Config');
  }
  gT.suiteConfig = exports.mergeConfigs(gT.suiteConfigDefault, localSuiteConfig);
};
