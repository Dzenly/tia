'use strict';

const teq = require('../tia-extjs-query');

// /**
//  *
//  * @param tEQ
//  * @param idForLog
//  * @param enableLog
//  * @return {Promise<{checks: {}, log: {}, actions: {}}>}
//  */
module.exports = async function checkbox(tEQ, idForLog = null, enableLog) {
  const cmpInfo = await teq.queryAndAction({
    tEQ,
    action: 'return cmpInfo',
    idForLog,
    enableLog,
  });

  return {
    actions: {},
    checks: {},
    log: {}
  };

};
