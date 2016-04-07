'use strict';
/* globals gT: true */
/* globals gIn: true */

var path = require('path');

var chromedriverPath = require('chromedriver').path;
process.env.PATH = chromedriverPath + path.delimiter + process.env.PATH;

gT.sOrig.chrome = require('selenium-webdriver/chrome');
gT.sOrig.firefox = require('selenium-webdriver/firefox');

gT.sOrig.by = gT.sOrig.wdModule.By;
gT.sOrig.until = gT.sOrig.wdModule.until;
gT.sOrig.ActionSequence = gT.sOrig.wdModule.ActionSequence;
gT.sOrig.key = gT.sOrig.wdModule.Key;

// gT.sOrig.driver is set bygT.sOrig.driver.init.

// gIn.s = {};
gT.s.driver = require('./sel-driver.js');
gT.s.wait = require('./sel-waits.js');
gT.s.ua = require('./sel-waits.js');
gT.s.browser = require('./sel-browser.js');

