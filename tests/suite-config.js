'use strict';

var suiteConfig = {};

try {
  suiteConfig = require('./mail-settings.nogit.json');
} catch(e) {

}
suiteConfig.dummyGoodSuitConfigOption = 'dummyGoodSuitConfigOption';

module.exports = suiteConfig;
