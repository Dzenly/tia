'use strict';

/* globals gT, gIn */

/**
 * Sets default handlers for debug.
 * Ctrl/Meta + Alt + LClick - shows info about ExtJs component under mouse cursor.
 * And Ctrl/Meta + Alt + t - shows components hierarchy.
 * Removes previous handlers (if they exist).
 * @param logAction
 * @returns {*}
 */
exports.setDefDbgHandlers = function(logAction) {
  return gIn.wrap('Setup debug mousedown and keydown handler for extJs ... ', logAction, function () {
    var scriptStr = `
    try {
      document.removeEventListener('mousedown', tiaExtJsOnMouseDown);
      document.removeEventListener('keydown', tiaExtJsOnKeyDown);
    } catch(e) {
    }
    window.tiaExtJsOnMouseDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.which === 1) {
        tiaExtJs.showCompInfo(e);
      }
    };
    window.tiaExtJsOnKeyDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 84) {
        tiaExtJs.showHierarchy();
      }
    };
    document.addEventListener('mousedown', tiaExtJsOnMouseDown);
    document.addEventListener('keydown', tiaExtJsOnKeyDown);
    `;
    // gIn.tracer.trace3('setDbgOnMouseDown: script: ' + funcBody);
    return gT.sOrig.driver.executeScript(scriptStr);
  });
};
