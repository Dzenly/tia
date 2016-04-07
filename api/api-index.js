'use strict';

/* globals gT: true */
/* globals gIn: true */

/*
 Includes API modules in correct order.
 */

/*
 I keep this global objects here to don't care about 'require' calls order.
 Also test writers can see the whole objects structure on one place.
 */

/**
 * ExtJs utils.
 *
 * @type {{}}
 */
gT.e = {};
global.e = gT.e;

// TODO: should all hl utils be moved to R-Vision tia-tests?

// ==================================================

/**
 * Utilities for logging.
 * @type {{}}
 */
gT.l = require('./log.js');
global.l = gT.l; // Alias. If your IDE does not autocomplete log. you can use gT.l.

// ==================================================

/**
 * Low level API for tests. It can be used for helpers writing.
 * @type {{}}
 */
gT.ll = require('./low-level.js');
global.ll = gT.ll;

// ==================================================

/**
 * Misc. test utils.
 *
 * @type {{}}
 */
gT.t = require('./test.js');
global.t = gT.t;

// ==================================================

gIn.wrap = require('./../engine/wrap.js');

// ==================================================

/**
 * Assertions.
 *
 * @type {{}}
 */
gT.a = require('./assertions.js');
global.a = gT.a;

// ==================================================

/**
 * Selenium utils.
 * @type {{}}
 */
gT.s = {};
global.s = gT.s;

require('./selenium/sel-index.js');

// ==================================================

/**
 * Utilities for tests.
 * @type {{}}
 */
gT.u = {};
global.u = gT.u;

require('./utils/utils-index.js');

// ==================================================

require('./extjs/extjs-index.js');

// ==================================================

require('./r-vision/rv-index.js');
