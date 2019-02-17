'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const { queryCmpInputIdj, queryAndAction } = require('../tia-extjs-query');
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
  async check(tEQ, idForLog, enableLog) {
    const { checked, id } = await queryAndAction({
      tEQ,
      action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
      idForLog,
      enableLog,
    });
    if (!checked) {
      await gT.s.uA.clickById(id);
    }
  },
  async uncheck(tEQ, idForLog, enableLog) {
    const { checked, id } = await queryAndAction({
      tEQ,
      action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
      idForLog,
      enableLog,
    });
    if (checked) {
      await gT.s.uA.clickById(id);
    }
  },
  async checkEJ(tEQ, idForLog, enableLog) {
    await queryAndAction({
      tEQ,
      action: 'cmp.setValue(true);',
      idForLog,
      enableLog,
    });
  },
  async uncheckEJ(tEQ, idForLog, enableLog) {
    await queryAndAction({
      tEQ,
      action: 'cmp.setValue(false);',
      idForLog,
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
