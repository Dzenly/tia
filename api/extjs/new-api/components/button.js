'use strict';

const { queryAndAction } = require('../tia-extjs-query');
const { actions: cmpActions, checks: anyChecks, logs: anyLogs } = require('./component');
const { getCISRVal } = require('../../extjs-utils');

const compName = 'Button';

// TODO: задействовать везде idForLog.

const actions = {
  compName,
};

const checks = {
  compName,
};

const logs = {
  compName,
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
