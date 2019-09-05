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

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + path.dirname(process.execPath);

process.env.SELENIUM_PROMISE_MANAGER = 0;

// It is non GUI stuff.
gT_.sOrig.wdModule = require('selenium-webdriver');

// TODO: remove these strings after test.
// const logging = gT.sOrig.wdModule.logging;
// logging.installConsoleHandler();

gT_.sOrig.driverLogType = gT.sOrig.wdModule.logging.Type.DRIVER;
gT_.sOrig.browserLogType = gT.sOrig.wdModule.logging.Type.BROWSER;

gT.configUtils = require('../utils/config-utils');

gT_.engineConsts = require('../config/engine-constants.js');
gT_.suiteConfigDefault = require('../config/default-suite-config.js');
gT_.globalConfigDefault = require('../config/default-global-config.js');
gT_.dirConfigDefault = require('../config/default-dir-config.js');

gIn.loggerCfg = require('./loggers/logger-cfg.js');
gIn.cLogger = require('./loggers/console-logger');
gIn.logger = require('./loggers/logger.js');

gIn.tracer = require('./tracer');

gT_.commonMiscUtils = require('../common-utils/common-misc-utils.js');

gT_.commonConsts = require('../common-utils/common-constants.js');

gT_.cC = gT_.commonConsts; // alias

gIn.fileUtils = require('../utils/file-utils.js');

gIn.textUtils = require('../utils/text-utils.js');

gIn.tU = gIn.textUtils; // alias

gT_.timeUtils = require('../utils/time-utils.js');

gIn.tInfo = require('./test-info.js');

gIn.diffUtils = require('../utils/diff-utils.js');

gIn.mailUtils = require('../utils/mail-utils.js');

gIn.remoteDriverUtils = require('../utils/remote-driver-utils.js');

gT_.nodeUtils = require('../utils/nodejs-utils.js');

gIn.wrap = require('./wrap.js');

require('../api/api-index.js');
