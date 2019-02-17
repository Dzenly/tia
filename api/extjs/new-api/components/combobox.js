'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: anyActions, checks: anyChecks, logs: anyLogs } = require('./any');
const { queryAndAction } = require('../tia-extjs-query');
const { inspect } = require('util');

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
  async setByKbd(tEQ, text, idForLog, enableLog) {
    return anyActions.selectAllSendKeysEnter({
      tEQ,
      keys: text,
      compName,
      idForLog,
      actionDesc: 'Select',
      enableLog,
    });
  },
  async setByMouse(tEQ, text, idForLog, enableLog) {
    const valueStr = gT.e.utils.locKeyToStr(text);

    // TODO: honestly I should change cmp.expand() to key.Down.
    const { id, fieldName } = await queryAndAction({
      tEQ,
      action: 'cmp.expand(); return { id: cmpInfo.constProps.realId, fieldName: cmp.displayField }',
      idForLog,
      enableLog,
    });

    await gT.sOrig.driver.wait(
      () => gT.s.browser.executeScriptWrapper(
        `return tiaEJ.hEById.isCBPickerVisible('${id}');`
      ),
      gT.engineConsts.cbBoundListTimeout
    );

    const el = await gT.s.browser.executeScriptWrapper(
      `return tiaEJ.hEById.getCBItemByField('${id}', ${gT.s.browser.valueToParameter(valueStr)}, '${fieldName}');`
    );

    el.click();

    await gT.e.wait.ajaxRequestsFinish(undefined, false);
  },

  async clearByEJ(tEQ, idForLog, enableLog) {
    await queryAndAction({
      tEQ,
      action: 'cmp.clearValue();',
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
