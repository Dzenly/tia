'use strict';
var path = require('path');
var fs = require('fs');

/* globals gT: true, gIn */

/**
 * ExtJs utils.
 *
 * @type {{}}
 */
gT.e = {};
global.e = gT.e;

// Find.
// Wait.
// Read some data from ExtJs objects: both GUI and non-GUI.
// Set some data by scripts.

// ua - User Actions.
// sa - script Actions.

// for gT.e.initTiaExtJsBrHelpers
var brHelpers = [
  'e-br.js',
  'e-br-search.js',
  'e-br-content.js',
  'e-br-check.js',
  'e-br-get-html-els.js',
  'e-br-msgbox.js'
];

/**
 * Initializes TIA ExtJs helpers.
 * Loads and runs scripts from the extjs/browser-part directory in context of current browser window.
 * Adds some ExtJs helpers to window object.
 *
 * @param {boolean} [logAction=true] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
gT.e.initTiaExtJsBrHelpers = function initTiaExtJsBrHelpers(logAction) {
  return gIn.wrap('Initialization of TIA ExtJs helpers ... ', logAction, function () {
    return gT.u.execGen(function* () {
      for (const fName of brHelpers) {
        let scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part', fName), 'utf8');
        yield gT.s.browser.executeScriptWrapper(scriptStr);
      }
    });
  });
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
  return gIn.wrap('setLocaleObject ... ', logAction, function () {
    var scriptStr = `
        tiaEJ.locale = ${objExpression};
        return tiaEJ.locale;
    `;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then(function (res) {
        gT.e.locale = res;
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
