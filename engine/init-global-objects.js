'use strict';

/* globals gT: true */
/* globals gIn: true */

// Test engine init.
// Fills the gT global object, which will be used in all tests and in the test engine.

const path = require('path');

global.Bluebird = require('bluebird');
global._ = require('lodash');

// Bluebird.cancellation = true;

global.gT = {}; // Global object as namespace for objects which user (test writer) can use.
global.gIn = {}; // Global object as namespace for inner objects.

gT.sOrig = {}; // Original selenium API.
global.sOrig = gT.sOrig;

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + path.dirname(process.execPath);

process.env.SELENIUM_PROMISE_MANAGER = 0;

// It is non GUI stuff.
gT.sOrig.wdModule = require('selenium-webdriver');

// TODO: remove these strings after test.
// const logging = gT.sOrig.wdModule.logging;
// logging.installConsoleHandler();

gT.sOrig.driverLogType = gT.sOrig.wdModule.logging.Type.DRIVER;
gT.sOrig.browserLogType = gT.sOrig.wdModule.logging.Type.BROWSER;

gIn.configUtils = require('../utils/config-utils');

gT.engineConsts = require('../config/engine-constants.js');
gT.suiteConfigDefault = require('../config/default-suite-config.js');
gT.dirConfigDefault = require('../config/default-dir-config.js');

gIn.loggerCfg = require('./loggers/logger-cfg.js');
gIn.cLogger = require('./loggers/console-logger.js');
gIn.logger = require('./loggers/logger.js');

gIn.tracer = require('./tracer.js');

gT.commonMiscUtils = require('../common-utils/common-misc-utils.js');

gT.commonConsts = require('../common-utils/common-constants.js');

gIn.fileUtils = require('../utils/file-utils.js');

gIn.textUtils = require('../utils/text-utils.js');

gT.timeUtils = require('../utils/time-utils.js');

gIn.tInfo = require('./test-info.js');

gIn.diffUtils = require('../utils/diff-utils.js');

gIn.mailUtils = require('../utils/mail-utils.js');

gIn.remoteDriverUtils = require('../utils/remote-driver-utils.js');

gT.nodeUtils = require('../utils/nodejs-utils.js');

gIn.wrap = require('./wrap.js');

require('../api/api-index.js');

