'use strict';

/* globals gT: true */
/* globals gIn: true */

// TODO: remove rv mentions.
gT.e.clickTabId = function (itemId, logAction) {
  return gIn.wrap('Click on element with itemId: "' + itemId + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript('return rvTestHelperExt.getTabId("' + itemId + '")').then(function (id) {
      gIn.tracer.trace3('clickTabId: id of found element: ' + id);
      return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
    });
  });
};
