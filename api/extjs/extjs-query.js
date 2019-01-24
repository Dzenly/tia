'use strict';

const { inspect } = require('util');
const wrap = require('./components/wrap');

// These methods I think would be most often used.

// TODO: тут нужно описать все компоненты ExtJs и заодно чекать, что нашелся именно ожидаемый компонент.

// TODO: Можно попробовать модифицировать query для поиска. Например по ariaType.

exports.textbox = function textbox() {
};

exports.combobox = function combobox() {
};

/**
 * Search the Component by https://docs.sencha.com/extjs/6.5.3/modern/Ext.ComponentQuery.html#method-query
 * @param {String} compQuery - substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
 * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
 * @param compQuery - ExtJs component query.
 * But
 * @param logAction
 * @return {*}
 */
// Без типный.
exports.any = function any(compQuery, logAction) {
  return gIn.wrap(
    `Searching id by compQuery: ${compQuery} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchAndWrap.byCompQuery('${compQuery}')`
    )
      .then(wrap)
  );
};
