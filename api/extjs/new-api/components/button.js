'use strict';

const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');

const compName = 'Button';

// TODO: задействовать везде idForLog.

const actions = {
  async click(tEQ, idForLog, enableLog) {
    return anyActions.clickCmp({
      tEQ,
      compName,
      idForLog,
      actionDesc: 'Click',
      enableLog,
    });
  },
};

const checks = {};

const logs = {};

module.exports = {
  actions,
  checks,
  logs,
};
