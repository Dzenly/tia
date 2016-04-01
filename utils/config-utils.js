'use strict';

/* globals gT: true */

var path = require('path');
var fs = require('fs');
var nodeUtils = require('../utils/nodejs-utils.js');

gT.configUtils = {};

gT.configUtils.copyConfig = function (config) {
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
gT.configUtils.mergeConfigs = function (config1, config2) {
  var result = gT.configUtils.copyConfig(config1);
  for (var prop in config2) {
    result[prop] = config2[prop];
  }
  return result;
};

// Returns merged config for suite.
gT.configUtils.handleSuiteConfig = function () {
  var localSuiteConfig = {};
  var configPath = path.join(gT.params.suiteRoot, gT.engineConfig.suiteConfigName);
  try {
    localSuiteConfig = nodeUtils.requireEx(configPath, true).result;
  } catch (e) {
    gT.tracer.trace2('There is no Local Suite Config');
  }
  gT.suiteConfig = gT.configUtils.mergeConfigs(gT.suiteConfigDefault, localSuiteConfig);
};
