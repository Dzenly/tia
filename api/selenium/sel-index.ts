'use strict';

import * as path from 'path';

// gT.sOrig.driver is set by gT.sOrig.driver.init.

// gIn.s = {};
gT.s.driver = require('./sel-driver');
require('./sel-misc');
gT.s.wait = require('./sel-waits');
gT.s.uA = require('./sel-user-actions');
gT.s.browser = require('./sel-browser');
