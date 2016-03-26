// Test engine init.
// Fills the gTE global object, which will be used in all tests and in the test engine.

global.gTE = {}; // Global object for Test Engine.

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + ':' + require('path').dirname(process.execPath);

require('../utils/configUtils');
require('../config/engineConfig.js');
require('../config/suiteConfig.js');
require('../config/dirConfig.js');
require('../utils/miscUtils.js');
require('../utils/fileUtils.js');
require('../utils/textUtils.js');
require('../utils/timeUtils.js');
require('./tracer.js');
require('./logger.js');
require('./testInfo.js');
require('../utils/diffUtils.js');
require('../apiLowLevel/selHelpers.js');
require('../utils/mailUtils.js');
require('./runnerAsync.js');
require('../apiLowLevel/commonHelpers.js');
require('../apiHighLevel/initHlApi.js');
