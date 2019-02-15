'use strict';

/**
 * Returns locale keys for which values are equal to given text.
 * Requires gT.e.setLocaleObject(expression) call before.
 * @param text
 * @returns {string}
 */
exports.getLocKeysByText = function getLocKeysByText(text) {
  const res = [];
  for (const key of gT.e.locale) {
    if (gT.e.locale.hasOwnProperty(key)) {
      if (text === gT.e.locale[key]) {
        res.push(key);
      }
    }
  }
  return res.join(', ');
};

/**
 *
 * @param parentCmp
 * @param enableLog
 * @return {*}
 */
exports.setParentCmp = function setParentContainer(cmp, enableLog) {
  return gIn.wrap(
    `Set container '${cmp.getLogInfo()}' as the parent for further search`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.search.settings.setParentContainer('${cmp.getId()}');`,
      false
    )
  );
};

exports.addFakeId = function addFakeId(fakeId, realId, enableLog) {
  return gIn.wrap(
    `Add fake id '${fakeId}' to idMap`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.idMap.add('${fakeId}', '${realId}');`,
      false
    )
  );
};

/**
 * The mode in which native language text is added after locale keys.
 * @param newMode
 * @param enableLog
 * @return {*}
 */
exports.setDebugLocaleMode = function setDebugLocaleMode(newMode, enableLog) {
  return gIn.wrap(
    `Set debugLocale mode to '${newMode}'`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.setDebugLocaleMode(${newMode});`,
      false
    )
  );
};
