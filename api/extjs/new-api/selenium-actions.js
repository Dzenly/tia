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


// Элементы.
// ua Действия юзеров.
// check Проверки.
// log Распечатки.

// gT.ej.textEdit(tEQ);

// actions
// checks
// log

// gT.e.textEdit(tEQ):  {
//   actions
//   checks
//   log
// }






