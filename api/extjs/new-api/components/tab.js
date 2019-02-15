'use strict';

const { queryCmpId } = require('../tia-extjs-query');

const cmpName = 'Tab';

const actions = {
  async click(tEQ, idForLog, enableLog) {
    return gIn.wrap({
      msg: `${cmpName}  "${tEQ}": click ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          idForLog,
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
