'use strict';

const { getCISRVal } = require('../../extjs-utils');

const { queryAndAction } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');

const compName = 'CheckBox';

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

const checks = {};

const logs = {
  async rawValue(tEQ, idForLog) {
    await gT.eC.any.l.rawValue(tEQ, compName, idForLog, val => `${val ? 'checked' : 'unchecked'}`);
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
