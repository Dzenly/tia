'use strict';

const { queryCmpId } = require('../tia-extjs-query');

const actions = {
  async click(tEQ, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `Click tab "${tEQ}" ... `,
      logAction,
      act: async () => {
        const id = await queryCmpId({
          tEQ,
          logAction: false,
        });
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
