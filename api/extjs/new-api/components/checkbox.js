'use strict';

const teq = require('../tia-extjs-query');
//
// /**
//  *
//  * @param tEQ
//  * @param elNameForLog
//  * @param logAction
//  * @return {Promise<{checks: {}, log: {}, actions: {}}>}
//  */
module.exports = async function textbox(tEQ, elNameForLog = null, logAction) {
  const cmpInfo = await teq.queryAndAction({
    tEQ,
    action: 'return cmpInfo',
    elNameForLog,
    logAction,
  });

  return {
    actions: {},
    checks: {},
    log: {}
  };

};
