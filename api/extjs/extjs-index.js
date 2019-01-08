'use strict';

const path = require('path');
const fs = require('fs');

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
 * @param {boolean} [logAction=true] - is logging needed for this action.
 *
 * @returns {Promise}.
 */
gT.e.initTiaExtJsBrHelpers = function initTiaExtJsBrHelpers(logAction) {
  return gIn.wrap(
    'Initialization of TIA ExtJs helpers ... ',
    logAction,
    async () => {
      for (const fName of brHelpers) { // eslint-disable-line no-restricted-syntax
        const scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part', fName), 'utf8');
        await gT.s.browser.executeScriptWrapper(scriptStr);
      }
      if (gIn.params.debugLocale) {
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
 * @param {boolean} [logAction=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
gT.e.setLocaleObject = function setLocaleObject(objExpression, logAction) {
  return gIn.wrap('setLocaleObject ... ', logAction, () => {
    const scriptStr = `return tiaEJ.setLocale(${objExpression});`;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then((res) => {
        gT.e.locale = res.locale;
        gT.e.invertedLocaleFirstKey = res.invertedLocaleFirstKey;
        gT.e.invertedLocaleAllKeys = res.invertedLocaleAllKeys;
      });
  });
};

gT.e.utils = require('./extjs-utils');
gT.e.api = require('./extjs-api-actions.js');
gT.e.explore = require('./extjs-exploration.js');
gT.e.search = require('./extjs-search.js');
gT.e.sendKeys = require('./extjs-send-keys.js');
gT.e.logCtById = require('./extjs-log-by-id.js');
gT.e.logCtByFormIdName = require('./extjs-log-by-formIdName.js');
gT.e.logUtils = require('./extjs-log-utils');
gT.e.getByFormIdName = require('./extjs-get-by-formIdName.js');
gT.e.msgBox = require('./extjs-msgbox.js');

gT.e.hL = require('./extjs-hl.js');

gT.e.lClick = require('./extjs-l-clicks.js');
gT.e.lClick.cb = require('./extjs-l-clicks-cb.js');

gT.e.wait = require('./extjs-waits.js');

gT.e.query = require('./extjs-query.js');
gT.e.queryFromParent = require('./extjs-query-from-parent.js');

gT.e.q = gT.e.query;
gT.e.qp = gT.e.queryFromParent;
