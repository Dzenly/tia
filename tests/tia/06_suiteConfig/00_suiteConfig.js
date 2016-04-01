'use strict';

var util = require('util');


t.setTitle('Checking config and suite-config work.');

gT.t.checkAny(gT.config.configDirDummyOption, 'configDirDummyOption', 'Dir config check');
gT.t.checkAny(gT.suiteConfig.dummyGoodSuitConfigOption, 'dummyGoodSuitConfigOption', 'Suite config Expected value check');

gT.t.checkAny(gT.suiteConfig.dummyBadSuitConfigOption, undefined, 'Suite config Unexpected value check');


// t.checkTrue(typeof gT !== 'undefined', 'gT exists');
// t.checkTrue('config' in gT, 'gT.config exists');
// t.checkTrue('tinfo' in gT, 'gT.tinfo exists');
// t.checkTrue('data' in gT.tinfo, 'gT.tinfo.data exists');
