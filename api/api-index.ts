'use strict';

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
// require('./log/log-index');

// ==================================================

/**
 * Low level API for tests. It can be used for helpers writing.
 * @type {{}}
 */
// gT_.lL = require('./low-level');

// ==================================================

/**
 * Misc. test utils.
 *
 * @type {{}}
 */
// gT_.t = require('./test');

// ==================================================

gIn.wrap = require('./../engine/wrap');

// ==================================================

/**
 * Assertions.
 *
 * @type {{}}
 */
// gT_.a = require('./assertions');

// ==================================================

/**
 * Selenium utils.
 * @type {{}}
 */
gT_.s = {};

require('./selenium/sel-index');

// ==================================================

/**
 * Utilities for tests.
 * @type {{}}
 */
gT_.u = {};

require('./utils/utils-index');

// ==================================================

gT_.hL = require('./high-level');

// ==================================================

require('./extjs/extjs-index');

// ==================================================;
