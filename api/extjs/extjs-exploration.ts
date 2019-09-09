'use strict';

/* globals gT, gIn */

import * as fs from 'fs';
import * as path from 'path';

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
export function init(enableLog) {
  return (
    gIn
      .wrap('Initialization of TIA ExtJs Exp helpers ... ', enableLog, () => {
        const scriptStr = fs.readFileSync(
          path.join(gT.tiaDir, 'api', 'extjs', 'browser-part', 'e-br-explore.js'),
          'utf8'
        );

        // gIn.tracer.msg3('init: script: ' + scriptStr);
        return gT.s.browser.executeScriptWrapper(scriptStr);
      })
      .then(() => {
        const scriptStr = `
    try {
      document.removeEventListener('click', tiaEJOnMouseDown);
      document.removeEventListener('keydown', tiaEJOnKeyDown);
    } catch(e) {
    }
    window.tiaEJOnMouseDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.which === 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        tiaEJExp.showCompInfoFromPoint(e);
      }
    };
    window.tiaEJOnKeyDown = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 84) {
        e.preventDefault();
        e.stopImmediatePropagation();
        tiaEJExp.showCompHierarchy();
      }
    };
    document.addEventListener('click', tiaEJOnMouseDown);
    document.addEventListener('keydown', tiaEJOnKeyDown);
    `;
        return gT.s.browser.executeScriptWrapper(scriptStr);
      })

      // .then(() => gT.s.browser.setDebugMode())
      .then(() => gT.s.browser.setBodyClicker())
  );
}
