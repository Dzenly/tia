'use strict';

const { queryCmpInputId, queryCmpId } = require('../tia-extjs-query');

const defaultCompName = 'ANY Cmp';

const actions = {
  async clickCmp({
    tEQ,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Click Cmp',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async clickInput({
    tEQ,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Click Input',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async sendKeys({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Send keys',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ${JSON.stringify(keys)} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendKeysById(id, keys, false);
      },
    });
  },
  async selectAllAndSendKeys({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Ctrl +a, Send keys',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ${JSON.stringify(keys)} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.selectAllAndSendKeysById(id, keys, false);
      },
    });
  },
  async selectAllSendKeysEnter({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Ctrl +a, Send keys, Enter',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ${JSON.stringify(keys)} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.selectAllSendKeysEnterById(id, keys, false);
      },
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
