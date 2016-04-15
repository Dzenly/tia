'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Clicks on tab with specified ItemId of specified component.
 * @param compId - component HTML id.
 * @param itemId - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 */
exports.clickCompTabId = function (compId, itemId, logAction) {
  return gIn.wrap(`Click on tab ${itemId} of component ${compId} ... `, logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaExtJs.getTabId('${compId}', '${itemId}')`)
      .then(function (id) {
        gIn.tracer.trace3('clickCompTabId: id of found element: ' + id);
        return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
      });
  });
};
