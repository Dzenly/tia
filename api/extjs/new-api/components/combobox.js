'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');

const compName = 'ComboBox';

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
  async select(tEQ, text, idForLog, enableLog) {
    return anyActions.selectAllSendKeysEnter({
      tEQ,
      keys: text,
      compName,
      idForLog,
      actionDesc: 'Select',
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
