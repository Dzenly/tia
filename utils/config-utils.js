'use strict';

/* globals gT: true, gIn: true */

const path = require('path');
const nodeUtils = require('../utils/nodejs-utils.js');
const _ = require('lodash');

// Returns merged config for suite.
exports.handleSuiteConfig = function handleSuiteConfig() {
  let localSuiteConfig = {};

  // TODO: current suite dir.
  const suiteConfigPath = path.join(gIn.params.rootDir, gT.engineConsts.suiteConfigName);
  try {
    localSuiteConfig = nodeUtils.requireEx(suiteConfigPath, true).result;
  } catch (e) {
    gIn.tracer.msg2(e);
    gIn.tracer.msg2(`There is no Suite Config: ${suiteConfigPath}`);
  }
  gT.suiteConfig = _.merge(_.cloneDeep(gT.suiteConfigDefault), localSuiteConfig);
};
