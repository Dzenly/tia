'use strict';
/* globals gT: true */
/* globals gIn: true */

var path = require('path');

var chromeDriverPath = require('chromedriver').path;
process.env.PATH = chromeDriverPath + path.delimiter + process.env.PATH;
gIn.chromeDriverPath = chromeDriverPath;

gT.sOrig.chrome = require('selenium-webdriver/chrome');
gT.sOrig.executors = require('selenium-webdriver/executors');
gT.sOrig.firefox = require('selenium-webdriver/firefox');

gT.sOrig.by = gT.sOrig.wdModule.By;
gT.sOrig.until = gT.sOrig.wdModule.until;
gT.sOrig.ActionSequence = gT.sOrig.wdModule.ActionSequence;
gT.sOrig.key = gT.sOrig.wdModule.Key;

// gT.sOrig.driver is set by gT.sOrig.driver.init.

// gIn.s = {};
gT.s.driver = require('./sel-driver.js');
gT.s.wait = require('./sel-waits.js');
gT.s.ua = require('./sel-user-actions.js');
gT.s.browser = require('./sel-browser.js');
