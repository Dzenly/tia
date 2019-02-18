'use strict';

const { queryAndAction } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');
const { getCISRVal } = require('../../extjs-utils');

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

const logs = {
  async info(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCompDispIdProps(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, compName, idForLog, result));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
