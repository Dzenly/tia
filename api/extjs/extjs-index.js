'use strict';

const path = require('path');
const fs = require('fs');

/* globals gT: true, gIn */

/**
 * ExtJs utils.
 *
 * @type {{}}
 */
gT_.e = {};

// Find.
// Wait.
// Read some data from ExtJs objects: both GUI and non-GUI.
// Set some data by scripts.

// ua - User Actions.
// sa - script Actions.

// for gT.e.initTiaExtJsBrHelpers
const brHelpers = [
  'e-br.js',
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
gT_.e.initTiaExtJsBrHelpers = function initTiaExtJsBrHelpers(enableLog) {
  return gIn.wrap(
    'Initialization of TIA ExtJs helpers ... ',
    enableLog,
    async () => {
      for (const fName of brHelpers) { // eslint-disable-line no-restricted-syntax
        const scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part', fName), 'utf8');
        await gT.s.browser.executeScriptWrapper(scriptStr);
      }
      if (gT.cLParams.debugLocale) {
        await gT.e.utils.setDebugLocaleMode(true);
      }
    }
  );
};

/**
 * Sets locale object. Locale object is key-value object for localization.
 * Key is english text, and value is any utf8 text.
 *
 * @param objExpression - expression how to get locale object.
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
gT_.e.setLocaleObject = function setLocaleObject(objExpression, enableLog) {
  return gIn.wrap('setLocaleObject ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setLocale(${objExpression});`;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then((res) => {
        gT_.e.locale = res.locale;
        gT_.e.invertedLocaleFirstKey = res.invertedLocaleFirstKey;
        gT_.e.invertedLocaleAllKeys = res.invertedLocaleAllKeys;
      });
  });
};

gT_.e.utils = require('./extjs-utils');
gT_.e.api = require('./extjs-api-actions.js');
gT_.e.explore = require('./extjs-exploration.js');
gT_.e.search = require('./extjs-search.js');
gT_.e.sendKeys = require('./extjs-send-keys.js');
gT_.e.logCtById = require('./extjs-log-by-id.js');
gT_.e.logCtByFormIdName = require('./extjs-log-by-formIdName.js');
gT_.e.logUtils = require('./extjs-log-utils');
gT_.e.getByFormIdName = require('./extjs-get-by-formIdName.js');
gT_.e.msgBox = require('./extjs-msgbox.js');

gT_.e.hL = require('./extjs-hl.js');

gT_.e.lClick = require('./extjs-l-clicks.js');
gT_.e.lClick.cb = require('./extjs-l-clicks-cb.js');

gT_.e.wait = require('./extjs-waits.js');

require('./new-api/ext-js');
