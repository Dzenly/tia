'use strict';

const { queryAndAction } = require('./extjs-query');
const search = require('./selenium-search');

/**
 * Returns DOM element.
 * @param tEQ
 * @param elNameForLog
 * @param logAction
 * @return {*}
 */
exports.cmpDomElement = async function getDomElement({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.domEl;',
    elNameForLog,
    logAction,
  });
};

// Click.
// Double click.
// Keyboard type.

// Actions using DOM.
// Actions using ExtJS.






