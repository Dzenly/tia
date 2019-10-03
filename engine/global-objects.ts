import * as loggerCfg from './loggers/logger-cfg';
import * as cLogger from './loggers/console-logger';
import * as logger from './loggers/logger';
import * as tracer from './tracer';
import * as fileUtils from '../utils/file-utils';
import * as textUtils from '../utils/text-utils';
import * as testInfo from './test-info';
import * as diffUtils from '../utils/diff-utils';
import * as mailUtils from '../utils/mail-utils';
import * as remoteDriverUtils from '../utils/remote-driver-utils';
import * as wrap from './wrap';

import { ExtJsAPI } from '../api/extjs/new-api/components/extjs-components';

export class GlobalTiaInnerObjects {
  static loggerCfg = loggerCfg;
  static cLogger = cLogger;
  static logger = logger;
  static tracer = tracer;
  static fileUtils = fileUtils;
  static textUtils = textUtils;
  static tU = textUtils;
  static testInfo = testInfo;
  static diffUtils = diffUtils;
  static mailUtils = mailUtils;
  static remoteDriverUtils = remoteDriverUtils;
  static wrap = wrap;
  static tracePrefix = '';
}

export class GlobalTiaObjects {
  static sOrig: any; // TODO: change type.
  static eC = ExtJsAPI;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      gT: typeof GlobalTiaObjects;
      gIn: typeof GlobalTiaInnerObjects;
      // e: ExtJsApi;
      // eC: ExtJsComponents;
      // s: SeleniumApi;
      // sOrig: SeleniumOriginalApi;
      // a: TiaAssertions;
      // l: TiaLogs;
      // t: TiaTest;
    }
  }
}

global.gT = GlobalTiaObjects;
global.gIn = GlobalTiaInnerObjects;

// const gTName = 'gT';
// global[gTName] = {};
//
// const gInName = 'gIn';
// global[gInName] = {};
//
// global.gT_ = global[gTName]; // Global object as namespace for objects which user (test writer) can use.
// global.gIn_ = global[gInName]; // Global object as namespace for inner objects.
//
// gT_.sOrig = {}; // Original selenium API.
//
// gIn.loggerCfg = require('./loggers/logger-cfg'); *
// gIn.cLogger = require('./loggers/console-logger'); *
// gIn.logger = require('./loggers/logger'); *
//
// gIn.tracer = require('./tracer'); *
//
// gIn.fileUtils = require('../utils/file-utils');
//
// gIn.textUtils = require('../utils/text-utils');
//
// gIn.tU = gIn.textUtils; // alias
//
// gIn.tInfo = require('./test-info');
//
// gIn.diffUtils = require('../utils/diff-utils');
//
// gIn.mailUtils = require('../utils/mail-utils');
//
// gIn.remoteDriverUtils = require('../utils/remote-driver-utils');
//
// gIn.wrap = require('./wrap');
//
// require('../api/api-index');
