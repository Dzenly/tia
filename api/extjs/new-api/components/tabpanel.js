'use strict';

const { queryAndAction } = require('../tia-extjs-query');

const cmpName = 'TabPanel';

const actions = {
  async setActiveTabByCardId(tEQ, cardId, idForLog, enableLog) {
    return gIn.wrap({
      msg: `${cmpName} ${idForLog ? `${idForLog} ` : ''}"${tEQ}": select tab by cardId: "${cardId}" ... `,
      enableLog,
      act: () => queryAndAction({
        tEQ,
        action: `cmp.setActiveTab('${cardId}');`,
        enableLog: false,
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
