'use strict';

declare const gT: import('tia-types').GlobalTiaObjects;
declare const gT_: import('tia-types').GlobalTiaObjects;
declare const gIn: import('tia-types').GlobalTiaInnerObjects;

// Test engine init.
// Fills the gT global object, which will be used in all tests and in the test engine.

import path from 'path';

const gTName = 'gT';
global[gTName] = {};

const gInName = 'gIn';
global[gInName] = {};

global.gT_ = global[gTName]; // Global object as namespace for objects which user (test writer) can use.
global.gIn_ = global[gInName]; // Global object as namespace for inner objects.

gT_.sOrig = {}; // Original selenium API.

gIn.loggerCfg = require('./loggers/logger-cfg');
gIn.cLogger = require('./loggers/console-logger');
gIn.logger = require('./loggers/logger');

gIn.tracer = require('./tracer');

gIn.fileUtils = require('../utils/file-utils');

gIn.textUtils = require('../utils/text-utils');

gIn.tU = gIn.textUtils; // alias

gIn.tInfo = require('./test-info');

gIn.diffUtils = require('../utils/diff-utils');

gIn.mailUtils = require('../utils/mail-utils');

gIn.remoteDriverUtils = require('../utils/remote-driver-utils');

gIn.wrap = require('./wrap');

require('../api/api-index');
