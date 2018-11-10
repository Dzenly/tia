'use strict';

gT.logUtils = {};

gT.logUtils.winstonMock = require('./winston-mock');
gT.logUtils.rStreamToLog = require('./r-stream-to-log');

gT.l = require('./log.js');
global.l = gT.l; // Alias. If your IDE does not autocomplete log. you can use gT.l.

