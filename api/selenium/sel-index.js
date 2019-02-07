'use strict';

/* globals gT: true */
/* globals gIn: true */

const path = require('path');

const chromeDriverPath = require('chromedriver').path;

process.env.PATH = chromeDriverPath + path.delimiter + process.env.PATH;
gIn.chromeDriverPath = chromeDriverPath;

gT_.sOrig.chrome = require('selenium-webdriver/chrome');
gT_.sOrig.Executor = require('selenium-webdriver/http').Executor;
gT_.sOrig.Client = require('selenium-webdriver/http').HttpClient;
gT_.sOrig.firefox = require('selenium-webdriver/firefox');

gT_.sOrig.by = gT.sOrig.wdModule.By;
gT_.sOrig.until = gT.sOrig.wdModule.until;
gT_.sOrig.ActionSequence = gT.sOrig.wdModule.ActionSequence;
gT_.sOrig.key = gT.sOrig.wdModule.Key;

// gT.sOrig.driver is set by gT.sOrig.driver.init.

// gIn.s = {};
gT_.s.driver = require('./sel-driver');
require('./sel-misc');
gT_.s.wait = require('./sel-waits.js');
gT_.s.uA = require('./sel-user-actions.js');
gT_.s.browser = require('./sel-browser.js');
gT_.s.hL = require('./sel-hl.js');
