'use strict';

const { queryAndAction } = require('./tia-extjs-query');

/**
 * Returns DOM element.
 * @param tEQ
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpDomElement = async function getDomElement({
  searchStr: tEQ,
  elNameForLog,
  logAction,
}) {
  return queryAndAction({
    searchStr: tEQ,
    action: 'return cmpInfo.constProps.domEl;',
    elNameForLog,
    logAction,
  });
};

/**
 * Returns DOM element id
 * @param tEQ
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpDomElementId = async function getDomElement({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.domElId;',
    elNameForLog,
    logAction,
  });
};

/**
 * Returns Input DOM element.
 * @param tEQ
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpInputDomElement = async function cmpInputDomElement({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputEl;',
    elNameForLog,
    logAction,
  });
};

/**
 * Returns input DOM element id
 * @param tEQ
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpInputDomElementId = async function getDomElement({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputId;',
    elNameForLog,
    logAction,
  });
};
