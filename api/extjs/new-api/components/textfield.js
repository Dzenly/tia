'use strict';

const { queryCmpInputId } = require('../tia-extjs-query');

const cmpName = 'TextField';

const actions = {
  async click(tEQ, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": click ... `,
      logAction,
      act: async () => {
        const id = await queryCmpInputId(
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
      msg: `${cmpName} "${tEQ}": send keys ${JSON.stringify(keys)} ... `,
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
  async setText(tEQ, text, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": set text "${text}" ... `,
      logAction,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          undefined,
          false
        );
        await gT.s.uA.selectAllAndSendKeysById(id, text, false);
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
