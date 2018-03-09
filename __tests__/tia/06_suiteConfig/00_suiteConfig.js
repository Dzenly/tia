'use strict';

let util = require('util');


t.setTitle('Checking config and suite-config work.');

gT.a.value(gIn.config.configDirDummyOption, 'configDirDummyOption', 'Dir config check');
gT.a.value(gIn.config.dummyExpectedRootDirConfigOption, 'dummyExpectedRootDirConfigOption', 'Root dir config check');

gT.a.value(gT.suiteConfig.dummyGoodSuitConfigOption, 'dummyGoodSuitConfigOption', 'Suite config Expected value check');
gT.a.value(gT.suiteConfig.dummyBadSuitConfigOption, undefined, 'Suite config Unexpected value check');
