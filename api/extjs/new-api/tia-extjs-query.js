'use strict';

/**
 * Search the Component by TEQ search string.
 * and performing specified action on the component found.
 *
 * @param tEQ - the TEQ search string.
 * The TEQ is a mix of following two abilities:
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.ComponentQuery.html#method-query
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#cfg-reference
 *
 * In the component queries, substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
 * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
 *
 * References can be specified using '&' prefix. Say if your TEQ string is:
 * '#someId &someReference someXType', then the function will search the component with id 'someId',
 * then it will be equal to:
 * Ext.ComponentQuery('#someId).lookupReference('someReference').query(someXType)
 *
 * @param action {string} - action to perform.
 * @param [elNameForLog=null] {string} - element name for log (if there is no id).
 * @param [method='query'] {string} (allowed values are: 'query', 'id', 'fakeId')
 * @param logAction - should action be logged. By default - default settings will be used,
 * e.g. don't log actions inside high level action and log other actions.
 * @return {*} - Defined by your action.
 */
exports.queryAndAction = async function queryAndAction({
  tEQ,
  action,
  elNameForLog = null,
  logAction,
}) {
  // Waiting for all ExtJs inner processes are finished and component is ready to work with.
  await gT.e.wait.idle(undefined, false);

  return gIn.wrap({
    msg: `Searching ExtJs cmp ${elNameForLog} by TEQ: ${tEQ} ... `,
    logAction,
    act: () => gT.s.browser.executeScriptWrapper(
      `const { cmp, cmpInfo } = tiaEJ.searchAndWrap.byTeq('${tEQ}')`
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
  logAction,
}) {
  return exports.queryAndAction({
    searchStr,
    action: 'return cmpInfo;',
    elNameForLog,
    logAction,
  });
};
