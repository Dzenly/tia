'use strict';

gT.t.setTitle('Root dir: Checking config and suite-config work.');

gT.a.value(gIn.config.existingRootDirConfigOption, 'existingRootDirConfigOption', 'Root dir config check');
gT.a.value(gT.suiteConfig.existingRootSuiteConfigOption, 'existingRootSuiteConfigOption', 'Root suite config check');

gT.a.value(gIn.config.existingDirConfigOptionInPrjRoot, 'existingDirConfigOptionInPrjRoot', 'Option from root dir config should be existing');
gT.a.value(gT.suiteConfig.existingSuitConfigOptionInPrjRoot, 'existingSuitConfigOptionInPrjRoot', 'Option from root suite config should be existing.');

gT.a.value(gIn.config.existingSuitConfigOptionInPrjRoot, undefined, 'Check for intermix of options.');
gT.a.value(gT.suiteConfig.existingDirConfigOptionInPrjRoot, undefined, 'Check for intermix of options.');
