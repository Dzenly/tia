'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const { queryCmpInputId } = require('../tia-extjs-query');

const cmpName = 'ComboBox';

const actions = {
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
  async select(tEQ, text, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": send keys ${JSON.stringify(text)} and ENTER ... `,
      logAction,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          undefined,
          false
        );
        await gT.s.uA.selectAllSendKeysEnterById(id, text, false);
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
