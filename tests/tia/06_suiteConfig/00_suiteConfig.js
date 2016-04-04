'use strict';

var util = require('util');


t.setTitle('Checking config and suite-config work.');

gT.a.equal(gT.config.configDirDummyOption, 'configDirDummyOption', 'Dir config check');
gT.a.equal(gT.suiteConfig.dummyGoodSuitConfigOption, 'dummyGoodSuitConfigOption', 'Suite config Expected value check');

gT.a.equal(gT.suiteConfig.dummyBadSuitConfigOption, undefined, 'Suite config Unexpected value check');


// t.checkTrue(typeof gT !== 'undefined', 'gT exists');
// t.checkTrue('config' in gT, 'gT.config exists');
// t.checkTrue('tInfo' in gT, 'gT.tInfo exists');
// t.checkTrue('data' in gT.tInfo, 'gT.tInfo.data exists');
