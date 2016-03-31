// Test engine init.
// Fills the gT global object, which will be used in all tests and in the test engine.

var path = require('path');


global.gT = {}; // Global object for Test Engine.

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + require('path').dirname(process.execPath);

require('../utils/config-utils');
require('../config/engine-config.js');
require('../config/suite-config.js');
require('../config/dir-config.js');
require('../utils/misc-utils.js');
require('../utils/file-utils.js');
require('../utils/text-utils.js');
require('../utils/time-utils.js');
require('./tracer.js');
require('./logger.js');
require('./test-info.js');
require('../utils/diff-utils.js');
require('../api-low-level/sel-helpers.js');
require('../utils/mail-utils.js');
require('./runner-async.js');
require('../api-low-level/common-helpers.js');
require('../api-high-level/init-hl-api.js');
