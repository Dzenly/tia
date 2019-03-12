'use strict';

const _ = require('lodash');

// const { queryCmpInputId } = require('../tia-extjs-query');
// const { actions: anyActions } = require('./any');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const compName = 'Form';

const actions = {
};

const checks = {};

const logs = {
  // async content(tEQ, idForLog) {
  //   const result = await queryAndAction({
  //     tEQ,
  //     action: 'return tiaEJ.ctByObj.getCB(cmp);',
  //     idForLog,
  //     enableLog: false,
  //   });
  //
  //   gIn.logger.logln(getCISContent('Content', tEQ, compName, idForLog, result));
  // },
};

module.exports = {
  actions,
  checks,
  logs,
};
