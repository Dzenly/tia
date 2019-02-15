'use strict';

const { queryAndAction } = require('./tia-extjs-query');

/**
 * Returns DOM element.
 * @param tEQ
 * @param idForLog
 * @param method
 * @param enableLog
 * @return {*}
 */
exports.cmpDomElement = async function getDomElement({
  searchStr: tEQ,
  idForLog,
  enableLog,
}) {
  return queryAndAction({
    searchStr: tEQ,
    action: 'return cmpInfo.constProps.domEl;',
    idForLog,
    enableLog,
  });
};

/**
 * Returns DOM element id
 * @param tEQ
 * @param idForLog
 * @param method
 * @param enableLog
 * @return {*}
 */
exports.cmpDomElementId = async function getDomElement({
  tEQ,
  idForLog,
  enableLog,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.domElId;',
    idForLog,
    enableLog,
  });
};

/**
 * Returns Input DOM element.
 * @param tEQ
 * @param idForLog
 * @param method
 * @param enableLog
 * @return {*}
 */
exports.cmpInputDomElement = async function cmpInputDomElement({
  tEQ,
  idForLog,
  enableLog,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputEl;',
    idForLog,
    enableLog,
  });
};

/**
 * Returns input DOM element id
 * @param tEQ
 * @param idForLog
 * @param method
 * @param enableLog
 * @return {*}
 */
exports.cmpInputDomElementId = async function getDomElement({
  tEQ,
  idForLog,
  enableLog,
}) {
  return queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputId;',
    idForLog,
    enableLog,
  });
};
