'use strict';

const _ = require('lodash');

// const { queryCmpInputId } = require('../tia-extjs-query');
// const { actions: cmpActions } = require('./component');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const compName = 'Form';

const actions = {
  compName,
};

const checks = {
  compName,
};

const logs = {
  compName,
  async content(tEQ, includingStores, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: `return tiaEJ.ctByObj.getForm(cmp, ${includingStores});`,
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
