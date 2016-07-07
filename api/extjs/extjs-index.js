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
  'e-br-dyn-id.js',
  'e-br-content.js',
  'e-br-get-html-els.js'
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
gT.e.initTiaExtJsBrHelpers = function (logAction) {
  return gIn.wrap('Initialization of TIA ExtJs helpers ... ', logAction, function () {
    return gT.sOrig.promise.consume(function* () {
      for (const fName of brHelpers) {
        let scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part', fName), 'utf8');
        yield gT.sOrig.driver.executeScript(scriptStr);
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
gT.e.setLocaleObject = function (objExpression, logAction) {
  return gIn.wrap('setLocaleObject ... ', logAction, function () {
    var scriptStr = `
        tiaEJ.locale = ${objExpression};
        return tiaEJ.locale;
    `;
    return gT.sOrig.driver.executeScript(scriptStr)
      .then(function (res) {
        gT.e.locale = res;
      });
  });
};

gT.e.u = require('./extjs-utils');
gT.e.ua = require('./extjs-user-actions.js');
gT.e.exp = require('./extjs-exploration.js');
gT.e.s = require('./extjs-search.js');
gT.e.ct = require('./extjs-content.js');
gT.e.cl = require('./extjs-clicks.js');
gT.e.w = require('./extjs-waits.js');
