'use strict';
/* globals gT, gIn */

var fs = require('fs');
var path = require('path');

/**
 * Initializes TIA ExtJs exploration helpers.
 * Loads and runs the e-br-exp.js script in context of current browser window.
 *
 * @param {boolean} [logAction] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
exports.initHelpers = function (logAction) {
  return gIn.wrap('Initialization of TIA ExtJs Exp helpers ... ', logAction, function () {
    var scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part/e-br-exp.js'), 'utf8');
    // gIn.tracer.trace3('initHelpers: script: ' + scriptStr);
    return gT.sOrig.driver.executeScript(scriptStr);
  });
};

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
        tiaEJExp.showCompInfoFromPoint(e);
      }
    };
    window.tiaExtJsOnKeyDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 84) {
        tiaEJExp.showCompHierarchy();
      }
    };
    document.addEventListener('mousedown', tiaExtJsOnMouseDown);
    document.addEventListener('keydown', tiaExtJsOnKeyDown);
    `;
    // gIn.tracer.trace3('setDbgOnMouseDown: script: ' + funcBody);
    return gT.sOrig.driver.executeScript(scriptStr);
  });
};
