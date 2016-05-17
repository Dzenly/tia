'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Clicks on tab with specified itemId of component specified by id.
 * @param compId - component HTML id.
 * @param itemId - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 */
exports.clickCompTabByItemId = function (compId, itemId, logAction) {
  return gIn.wrap(`Click on tab ${itemId} of component ${compId} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.getTabIdByItemId('${compId}', '${itemId}')`)
      .then(function (id) {
        gIn.tracer.trace3('clickCompTabByItemId: id of found element: ' + id);
        return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
      });
  });
};

/**
 * Clicks on tab with specified text of component specified by id.
 * @param compId - component HTML id.
 * @param {Object/string} text - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
exports.clickCompTabByText = function (compId, text, logAction) {
  return gIn.wrap(`Click on tab ${text} of component ${compId} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.getTabIdByText ('${compId}', '${text}')`)
      .then(function (id) {
        gIn.tracer.trace3('clickCompTabByText: id of found element: ' + id);
        return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
      });
  });
};
