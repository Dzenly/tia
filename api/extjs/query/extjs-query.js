'use strict';

const methodToFunc = {
  query: 'byCompQuery',
  id: 'byId',
  fakeId: 'byFakeId',
};

/**
 * Search the Component by https://docs.sencha.com/extjs/6.5.3/modern/Ext.ComponentQuery.html#method-query
 * and performing specified action on the component found.
 * @param {String} searchStr - ComponentQuery, id, of fakeId.
 * In component queries substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
 * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
 * For fakeId the prefix '##' is not used, as for ExtJs.getCmp.
 * @param action {string} - action to perform.
 * @param [elNameForLog=null] {string} - element name for log (if there is no id).
 * @param [method='query'] {string} (allowed values are: 'query', 'id', 'fakeId')
 * @param logAction - should action be logged. By default - default settings will be used,
 * e.g. don't log actions inside high level action and log other actions.
 * @return {*} - Defined by your action.
 */
exports.queryAndAction = async function queryAndAction({
  searchStr,
  action,
  elNameForLog = null,
  method = 'query', // 'id', 'fakeId'
  logAction,
}) {
  // Waiting for all ExtJs inner processes are finished and component is ready to work with.
  await gT.e.wait.idle(undefined, false);

  return gIn.wrap({
    msg: `Searching ExtJs cmp ${elNameForLog} by ${method}: ${searchStr} ... `,
    logAction,
    act: () => gT.s.browser.executeScriptWrapper(
      `const { cmp, cmpInfo } = tiaEJ.searchAndWrap.${methodToFunc[method]}('${searchStr}')`
      + `${action};`
    ),
  });
};


/**
 * Returns DOM element.
 * @param searchStr
 * @param elNameForLog
 * @param method
 * @param logAction
 * @return {*}
 */
exports.queryCmpInfo = async function queryCmpInfo({
  searchStr,
  elNameForLog,
  method, // 'id', 'fakeId'
  logAction,
}) {
  return exports.queryAndAction({
    searchStr,
    action: 'return cmpInfo;',
    elNameForLog,
    method, // 'id', 'fakeId'
    logAction,
  });
};
