'use strict';

const { queryAndAction } = require('../tia-extjs-query');

const actions = {
  async setActiveTabByCardId(tEQ, cardId, elNameForLog, logAction) {
    return gIn.wrap({
      msg: `Tab panel "${tEQ}": select tab by cardId: "${cardId}" ... `,
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
