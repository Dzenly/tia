'use strict';

const { queryAndAction } = require('./extjs-query');

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

/**
 * Returns DOM element id
 * @param searchStr
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpDomElementId = async function getDomElement({
  searchStr,
  elNameForLog,
  method, // 'id', 'fakeId'
  logAction,
}) {
  return queryAndAction({
    searchStr,
    action: 'return cmpInfo.constProps.domElId;',
    elNameForLog,
    method, // 'id', 'fakeId'
    logAction,
  });
};

/**
 * Returns Input DOM element.
 * @param searchStr
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpInputDomElement = async function cmpInputDomElement({
  searchStr,
  elNameForLog,
  method, // 'id', 'fakeId'
  logAction,
}) {
  return queryAndAction({
    searchStr,
    action: 'return cmpInfo.constProps.inputEl;',
    elNameForLog,
    method, // 'id', 'fakeId'
    logAction,
  });
};

/**
 * Returns input DOM element id
 * @param searchStr
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.cmpInputDomElementId = async function getDomElement({
  searchStr,
  elNameForLog,
  method, // 'id', 'fakeId'
  logAction,
}) {
  return queryAndAction({
    searchStr,
    action: 'return cmpInfo.constProps.inputId;',
    elNameForLog,
    method, // 'id', 'fakeId'
    logAction,
  });
};
