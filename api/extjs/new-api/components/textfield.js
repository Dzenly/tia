'use strict';

const { queryCmpInputId, queryAndAction } = require('../tia-extjs-query');
const { actions: cmpActions, checks: anyChecks, logs: anyLogs } = require('./component');
const { getCISRVal } = require('../../extjs-utils');

const compName = 'TextField';

// TODO: задействовать везде idForLog.

const actions = {
  compName,
};

const checks = {
  compName,
};

const logs = {
  compName,
};

module.exports = {
  actions,
  checks,
  logs,
};
