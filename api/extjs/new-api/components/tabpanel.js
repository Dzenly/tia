'use strict';

const { queryAndAction } = require('../tia-extjs-query');

const cmpName = 'TabPanel';

const actions = {
  async setActiveTabByCardId(tEQ, cardId, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `${cmpName} "${tEQ}": select tab by cardId: "${cardId}" ... `,
      logAction,
      act: () => queryAndAction({
        tEQ,
        action: `cmp.setActiveTab('${cardId}');`,
        logAction: false,
      }),
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
