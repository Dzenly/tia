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
 * @param logAction
 * @return {*}
 */
exports.setParentCmp = function setParentContainer(cmp, logAction) {
  return gIn.wrap(
    `Set container '${cmp.getLogInfo()}' as the parent for further search`,
    logAction,
    () => gT.s.browser.executeScript(
      `return tiaEJ.search.settings.setParentContainer('${cmp.getId()}');`,
      false
    )
  );
};


exports.addFakeId = function addFakeId(fakeId, realId, logAction) {
  return gIn.wrap(
    `Add fake id '${fakeId}' to idMap`,
    logAction,
    () => gT.s.browser.executeScript(
      `return tiaEJ.idMap.add('${fakeId}', '${realId}');`,
      false
    )
  );
};
