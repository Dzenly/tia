'use strict';

const {
  queryAndAction,
} = require('../tia-extjs-query');

const { actions: anyActions } = require('./any');

const compName = 'GridColumn';

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
  async clickTrigger(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { el, trigger } = await queryAndAction({
          tEQ,
          action: 'return { el: cmpInfo.constProps.domEl, trigger: cmpInfo.constProps.triggerEl } ;',
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver.actions({ bridge: true }).move({
          origin: el,
          x: 0,
          y: 0,
          duration: 0,
        }).perform();

        await gT.s.driver.sleep(300, false);

        await trigger.click();
      },
      actionDesc: 'Click trigger',
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
