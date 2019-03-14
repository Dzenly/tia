'use strict';

const { queryCmpId } = require('../tia-extjs-query');

const compName = 'Tab';

const actions = {
  compName,

  async click(tEQ, idForLog, enableLog) {
    return gIn.wrap({
      msg: `${compName}  "${tEQ}": click ... `,
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
};

const checks = {
  compName,
};

const logs = {
  compName,
};

module.exports = {
  actions,
  checks,
  logs,
};
