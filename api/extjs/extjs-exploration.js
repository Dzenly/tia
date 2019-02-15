'use strict';
/* globals gT, gIn */

let fs = require('fs');
let path = require('path');

/**
 * Initializes TIA ExtJs exploration helpers.
 * Loads and runs the e-br-explore.js script in context of current browser window.
 *
 * Sets default handlers for debug and explorations.
 * Ctrl/Meta + Alt + LClick - shows info about ExtJs component under mouse cursor.
 * And Ctrl/Meta + Alt + t - shows components hierarchy.
 * Removes previous handlers (if they exist).
 *
 * Sets debug mode for browser JS TIA part.
 *
 * Sets body clicker to avoid session expiration.
 *
 * @param {boolean} [enableLog] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
exports.init = function init(enableLog) {
  return gIn.wrap('Initialization of TIA ExtJs Exp helpers ... ', enableLog, function () {
    let scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part/e-br-explore.js'), 'utf8');
    // gIn.tracer.msg3('init: script: ' + scriptStr);
    return gT.s.browser.executeScriptWrapper(scriptStr);
  }).then(function () {
    let scriptStr = `
    try {
      document.removeEventListener('click', tiaEJOnMouseDown);
      document.removeEventListener('keydown', tiaEJOnKeyDown);
    } catch(e) {
    }
    window.tiaEJOnMouseDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.which === 1) {
        tiaEJExp.showCompInfoFromPoint(e);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.tiaEJOnKeyDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 84) {
        tiaEJExp.showCompHierarchy();
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener('click', tiaEJOnMouseDown);
    document.addEventListener('keydown', tiaEJOnKeyDown);
    `;
    return gT.s.browser.executeScriptWrapper(scriptStr);
  }).then(function () {
    return gT.s.browser.setDebugMode();
  }).then(function () {
    return gT.s.browser.setBodyClicker();
  });
};
