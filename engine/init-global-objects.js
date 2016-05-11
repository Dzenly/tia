'use strict';
/* globals gT: true */
/* globals gIn: true */

// Test engine init.
// Fills the gT global object, which will be used in all tests and in the test engine.

var path = require('path');

global.gT = {}; // Global object as namespace for objects which user (test writer) can use.
global.gIn = {}; // Global object as namespace for inner objects.

gT.sOrig = {}; // Original selenium API.
global.sOrig = gT.sOrig;

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + require('path').dirname(process.execPath);

// Tests use promise and control flow from selenium-webdriver module.
// It is non GUI stuff.
gT.sOrig.wdModule = require('selenium-webdriver');
gT.sOrig.promise = gT.sOrig.wdModule.promise;
gT.sOrig.flow = gT.sOrig.promise.controlFlow();

gIn.configUtils = require('../utils/config-utils');

gT.engineConsts = require('../config/engine-constants.js');
gT.suiteConfigDefault = require('../config/default-suite-config.js');
gT.dirConfigDefault = require('../config/default-dir-config.js');

gIn.loggerCfg = require('./loggers/logger-cfg.js');
gIn.cLogger = require('./loggers/console-logger.js');
gIn.logger = require('./loggers/logger.js');

gIn.tracer = require('./tracer.js');

gIn.miscUtils = require('../utils/misc-utils.js');

gIn.fileUtils = require('../utils/file-utils.js');

gIn.textUtils = require('../utils/text-utils.js');

gT.timeUtils = require('../utils/time-utils.js');

gIn.tInfo = require('./test-info.js');

gIn.diffUtils = require('../utils/diff-utils.js');

gIn.mailUtils = require('../utils/mail-utils.js');

gIn.remoteDriverUtils = require('../utils/remote-driver-utils.js');

gIn.wrap = require('./wrap.js');

require('../api/api-index.js');

