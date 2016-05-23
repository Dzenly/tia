'use strict';

/* globals gT: true */
/* globals gIn: true */

function click(fName) {
  return function(dynId) {
    gIn.tracer.trace3(`${fName}:, id of found element: ${dynId}`);
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(dynId)).click();
  };
}

/**
 * Clicks on tab with specified itemId of component specified by id.
 * @param id - component HTML id.
 * @param itemId - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 */
exports.clickTabByIdItemId = function (id, itemId, logAction) {
  return gIn.wrap(`Click on tab ${itemId} of component ${id} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.dynId.getTabIdByIdItemId('${id}', '${itemId}')`)
      .then(click('clickTabByIdItemId'));
  });
};

/**
 * Clicks on tab with specified text of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} text - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
exports.clickTabByIdText = function (id, text, logAction) {
  return gIn.wrap(`Click on tab with text ${text} of component ${id} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.dynId.getTabIdByIdText ('${id}', '${text}')`)
      .then(click('clickTabByIdText'));
  });
};

/**
 * Clicks on tab with specified locale key of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} locKey - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
exports.clickTabByIdLocKey = function (id, locKey, logAction) {
  return gIn.wrap(`Click on tab with locale key ${locKey} of component ${id} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.dynId.getTabIdByIdLocKey('${id}', '${locKey}')`)
      .then(click('clickTabByIdLocKey'));
  });
};

/**
 * Clicks on a component using id, reference, localization key.
 * @param id - component HTML id.
 * @param ref - reference inside component found by id.
 * @param key - key in locale.
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * Object: str for search, str for log.
 */
exports.clickByIdRefKey = function (id, ref, key, logAction) {
  return gIn.wrap(`Click on tab by id (${id}), reference (${ref}), key ${key} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.dynId.getByIdRefKey('${id}', '${ref}', '${key}')`)
      .then(click('clickByIdRefKey'));
  });
};
