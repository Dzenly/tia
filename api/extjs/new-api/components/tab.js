'use strict';

const { queryCmpId } = require('../tia-extjs-query');

const cmpName = 'Tab';

const actions = {
  async click(tEQ, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName}  "${tEQ}": click ... `,
      logAction,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          undefined,
          false,
        );
        await gT.s.uA.clickById(id, false);
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
