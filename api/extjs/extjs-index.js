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

/**
 * Initializes TIA ExtJs helpers.
 * Loads and runs the tia-extjs-br-helpers.js script in context of current browser window.
 * Adds some ExtJs helpers to window object.
 *
 * @param {boolean} [logAction] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
gT.e.initTiaExtJsBrHelpers = function (logAction) {
  return gIn.wrap('Initialization of TIA ExtJs helpers ... ', logAction, function () {
    var scriptStr = fs.readFileSync(path.join(__dirname, 'browser-part/tia-extjs-br-helpers.js'), 'utf8');
    // gIn.tracer.trace3('initTiaExtJsBrHelpers: script: ' + scriptStr);
    return gT.sOrig.driver.executeScript(scriptStr);
  });
};

gT.e.ua = require('./extjs-user-actions.js');
