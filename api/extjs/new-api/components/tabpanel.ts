'use strict';

const { queryAndAction } = require('../tia-extjs-query');

const compName = 'TabPanel';

const actions = {
  compName,

  async setActiveTabByCardId(tEQ, cardId, idForLog, enableLog) {
    return gIn.wrap({
      msg: `${compName} ${idForLog ? `${idForLog} ` : ''}"${tEQ}": select tab by cardId: "${cardId}" ... `,
      enableLog,
      act: () => queryAndAction({
        tEQ,
        action: `cmp.setActiveTab('${cardId}');`,
        enableLog: false,
      }),
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
