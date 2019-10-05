'use strict';

import * as path from 'path';
import * as fs from 'fs';
import { inspect } from 'util';

/* globals gT: true, gIn */

/**
 * ExtJs utils.
 *
 * @type {{}}
 */
gT.e = {};

// Find.
// Wait.
// Read some data from ExtJs objects: both GUI and non-GUI.
// Set some data by scripts.

// ua - User Actions.
// sa - script Actions.

async function setEJSelectors(enableLog?: boolean) {
  const objStr = inspect(gT.globalConfig.ejSelectors, { compact: true, breakLength: 200 });
  return gIn.wrap('setEJSelectors ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setSelectors(${objStr});`;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then((res) => {
        if (res !== true) {
          throw new Error('setEJSelectors: Unexpected return value');
        }
      });
  });
}

// for gT.e.initTiaExtJsBrHelpers
const brHelpers = [
  'e-br.js',
  'e-br-actions.js',
  'e-br-check.js',
  'e-br-cmp-wrappers.js',
  'e-br-content.js',
  'e-br-get-html-els.js',
  'e-br-msgbox.js',
  'e-br-search.js',
];

/**
 * Initializes TIA ExtJs Browser helpers.
 * Loads and runs scripts from the extjs/browser-part directory in context of current browser window.
 * Adds some ExtJs helpers to window object.
 *
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 *
 * @returns {Promise}.
 */
gT.e.initTiaExtJsBrHelpers = function initTiaExtJsBrHelpers(enableLog?: boolean) {
  return gIn.wrap(
    'Initialization of TIA ExtJs helpers ... ',
    enableLog,
    async () => {
      for (const fName of brHelpers) { // eslint-disable-line no-restricted-syntax
        const scriptStr = fs.readFileSync(path.join(gT.tiaDir, 'api', 'extjs', 'browser-part', fName), 'utf8');
        await gT.s.browser.executeScriptWrapper(scriptStr);
      }

      await setEJSelectors(enableLog);

      if (gT.cLParams.debugLocale) {
        await gT.e.utils.setDebugLocaleMode(true);
      }
    }
  );
};

gT.e.utils = require('./extjs-utils');
gT.e.api = require('./extjs-api-actions');
gT.e.explore = require('./extjs-exploration');
gT.e.search = require('./extjs-search');
gT.e.logCtById = require('./extjs-log-by-id');
gT.e.logCtByFormIdName = require('./extjs-log-by-formIdName');
gT.e.logUtils = require('./extjs-log-utils');
gT.e.getByFormIdName = require('./extjs-get-by-formIdName');
gT.e.msgBox = require('./extjs-msgbox');

gT.e.hL = require('./extjs-hl');

gT.e.lClick = require('./extjs-l-clicks');
gT.e.lClick.cb = require('./extjs-l-clicks-cb');

gT.e.wait = require('./extjs-waits');

require('./new-api/ext-js');
