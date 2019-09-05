'use strict';

const { getCISRVal } = require('../../extjs-utils');

const { queryAndAction } = require('../tia-extjs-query');
const { actions: cmpActions, checks: anyChecks, logs: anyLogs } = require('./component');

const compName = 'CheckBox';

const actions = {
  compName,
  async check(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { checked, id } = await queryAndAction({
          tEQ,
          action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
          idForLog,
          enableLog: false,
        });
        if (!checked) {
          await gT.s.uA.clickById(id, false);
        }
      },
      actionDesc: 'Check',
      enableLog,
    });
  },
  async uncheck(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { checked, id } = await queryAndAction({
          tEQ,
          action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
          idForLog,
          enableLog: false,
        });
        if (checked) {
          await gT.s.uA.clickById(id, false);
        }
      },
      actionDesc: 'Uncheck',
      enableLog,
    });
  },
  async checkByEJ(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.setValue(true);',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Check by EJ',
      enableLog,
    });
  },
  async uncheckByEJ(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.setValue(false);',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Uncheck by EJ',
      enableLog,
    });
  },
};

const checks = {
  compName,
};

const logs = {
  compName,
  async rawValue(tEQ, idForLog) {
    await gT.eC.component.l.rawValue(tEQ, idForLog, val => `${val ? 'checked' : 'unchecked'}`);
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
