'use strict';

const { queryAndAction } = require('./extjs-query');
const search = require('./selenium-search');

/**
 * Returns DOM element.
 * @param searchStr
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpDomElement = async function getDomElement({
  searchStr,
  elNameForLog,
  method, // 'id', 'fakeId'
  logAction,
}) {
  return queryAndAction({
    searchStr,
    action: 'return cmpInfo.constProps.domEl;',
    elNameForLog,
    method, // 'id', 'fakeId'
    logAction,
  });
};
