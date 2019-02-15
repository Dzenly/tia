'use strict';

const { queryCmpInputId, queryCmpId } = require('../tia-extjs-query');

const cmpName = 'ANY Cmp';

const actions = {
  async click(tEQ, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": click ... `,
      logAction,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          undefined,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async sendKeys(tEQ, keys, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName}  "${tEQ}": send keys ${JSON.stringify(keys)} ... `,
      logAction,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          undefined,
          false
        );
        await gT.s.uA.sendKeysById(id, keys, false);
      },
    });
  },
  async sendKeysAndEnter(tEQ, keys, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": send keys ${JSON.stringify(keys)} and ENTER ... `,
      logAction,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          undefined,
          false
        );
        await gT.s.uA.sendKeysById(id, keys, false);
        await gT.s.uA.sendKeysById(id, gT.sOrig.key.ENTER, false);
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
