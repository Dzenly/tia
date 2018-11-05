'use strict';

let util = require('util');

t.setTitle('Checking config and suite-config work.');

gT.a.value(gIn.config.existingSubDirConfigOption, 'existingSubDirConfigOption', 'Dir config check');
gT.a.value(gIn.config.existingRootDirConfigOption, 'existingRootDirConfigOption', 'Root dir config check');
gT.a.value(gT.suiteConfig.existingRootSuiteConfigOption, 'existingRootSuiteConfigOption', 'Root suite config check');

gT.a.value(gT.suiteConfig.existingSubDirSuiteConfigOption, 'existingSubDirSuiteConfigOption', 'Subdir suite config Expected value check');
gT.a.value(gT.suiteConfig.absentSuiteConfigOption, undefined, 'Suite config absent value check');

gT.a.value(gIn.config.existingDirConfigOptionInPrjRoot, undefined, 'Option from root dir config should be absent');
gT.a.value(gT.suiteConfig.existingSuitConfigOptionInPrjRoot, undefined, 'Option from root suite config should be absent.');

gT.a.value(gIn.config.existingSuitConfigOptionInPrjRoot, undefined, 'Check for intermix of options.');
gT.a.value(gT.suiteConfig.existingDirConfigOptionInPrjRoot, undefined, 'Check for intermix of options.');
