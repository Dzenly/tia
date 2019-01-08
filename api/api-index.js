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

// ==================================================

/**
 * Utilities for logging.
 * @type {{}}
 */
require('./log/log-index');

// ==================================================

/**
 * Low level API for tests. It can be used for helpers writing.
 * @type {{}}
 */
gT.lL = require('./low-level.js');

// ==================================================

/**
 * Misc. test utils.
 *
 * @type {{}}
 */
gT.t = require('./test.js');

// ==================================================

gIn.wrap = require('./../engine/wrap.js');

// ==================================================

/**
 * Assertions.
 *
 * @type {{}}
 */
gT.a = require('./assertions.js');

// ==================================================

/**
 * Selenium utils.
 * @type {{}}
 */
gT.s = {};

require('./selenium/sel-index.js');

// ==================================================

/**
 * Utilities for tests.
 * @type {{}}
 */
gT.u = {};

require('./utils/utils-index.js');

// ==================================================

gT.hL = require('./high-level');

// ==================================================

require('./extjs/extjs-index.js');

// ==================================================;
