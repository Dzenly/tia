'use strict';

var util = require('util');


t.setTitle('Checking config and suite-config work.');

gT.a.equal(gIn.config.configDirDummyOption, 'configDirDummyOption', 'Dir config check');
gT.a.equal(gIn.config.dummyExpectedRootDirConfigOption, 'dummyExpectedRootDirConfigOption', 'Root dir config check');

gT.a.equal(gT.suiteConfig.dummyGoodSuitConfigOption, 'dummyGoodSuitConfigOption', 'Suite config Expected value check');
gT.a.equal(gT.suiteConfig.dummyBadSuitConfigOption, undefined, 'Suite config Unexpected value check');
