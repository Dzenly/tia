'use strict';

const { queryCmpInputId, queryAndAction } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');
const { getCISRVal } = require('../../extjs-utils');

const compName = 'TextField';

// TODO: задействовать везде idForLog.

const actions = {
  async click(tEQ, idForLog, enableLog) {
    return anyActions.clickInput({
      tEQ,
      compName,
      idForLog,
      actionDesc: 'Click',
      enableLog,
    });
  },
  async sendKeys(tEQ, keys, idForLog, enableLog) {
    return anyActions.sendKeys({
      tEQ,
      keys,
      compName,
      idForLog,
      enableLog,
    });
  },
  async setText(tEQ, text, idForLog, enableLog) {
    return anyActions.selectAllAndSendKeys({
      tEQ,
      keys: text,
      compName,
      idForLog,
      actionDesc: 'Set text',
      enableLog,
    });
  },
};

const checks = {};

const logs = {
  async rawValue(tEQ, idForLog) {
    await gT.eC.any.l.rawValue(tEQ, compName, idForLog);
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
