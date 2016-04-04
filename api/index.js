'use strict';

/* globals gT: true */

/*
 Includes API modules in correct order.
 */

/*
 I keep this global objects here to don't care about 'require' calls order.
 Also test writers can see the whole objects structure on one place.
 */

/**
 * Assertions.
 *
 * @type {{}}
 */
gT.a = {};
global.a = gT.a;

/**
 * Utilities for logging.
 * @type {{}}
 */
gT.l = {};
global.l = gT.l; // Alias. If your IDE does not autocomplete log. you can use gTe.log.
// change to l ?

/**
 * Misc. test utils.
 *
 * @type {{}}
 */
gT.t = {};
global.t = gT.t;

/**
 * Low level API for tests. It can be used for helpers writing.
 * @type {{}}
 */
gT.ll = {};
global.ll = gT.ll;

/**
 * Utilities for tests.
 * @type {{}}
 */
gT.u = {};
global.u = gT.u;
gT.u.sharedData = {};

/**
 * Selenium utils.
 *
 * @type {{}}
 */
gT.s = {};
global.s = gT.s;

/**
 * ExtJs utils.
 *
 * @type {{}}
 */
gT.e = {};
global.e = gT.e;

// TODO: should all hl utils be moved to R-Vision tia-tests?

require('./log.js');
require('./low-level.js');
require('./test.js');
require('./selenium');
require('./utils');
require('./assertions.js');
