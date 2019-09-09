// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + path.dirname(process.execPath);

process.env.SELENIUM_PROMISE_MANAGER = '0';

import * as wdModule from 'selenium-webdriver';
import * as winstonMock from '../api/log/winston-mock';
import * as rStreamToLog from '../api/log/r-stream-to-log';
import * as l from '../api/log/log';
import * as t from '../api/test';
import * as lL from '../api/low-level';

import * as a from '../api/assertions';

export class OriginalSeleniumAPI {
  static wdModule = wdModule;
  static driverLogType = wdModule.logging.Type.DRIVER;
  static browserLogType = wdModule.logging.Type.BROWSER;

  /**
   * Assigned at driver initialization.
   */
  static driver: typeof wdModule.WebDriver;
}

export class LogUtils {
  static winstonMock = winstonMock;
  static rStreamToLog = rStreamToLog;
}

export class SeleniumUtils {

}

export class Utils {

}

export class TiaPublicApi {
  static sOrig = OriginalSeleniumAPI;
  static configUtils = require('../utils/config-utils');
  static engineConsts = require('../config/engine-constants');
  static suiteConfigDefault = require('../config/default-suite-config');
  static globalConfigDefault = require('../config/default-global-config');
  static dirConfigDefault = require('../config/default-dir-config');
  static commonMiscUtils = require('../common-utils/common-misc-utils');

  static commonConsts = require('../common-utils/common-constants');
  static cC = TiaPublicApi.commonConsts;
  static timeUtils = require('../utils/time-utils');
  static nodeUtils = require('../utils/nodejs-utils');

  /**
   * Utilities for logging.
   */
  static l = l;
  /**
   * Misc. test utils.
   */
  static t = t;
  /**
   * Low level API for tests. It can be used for helpers writing.
   */
  static lL = lL;

  /**
   * Assertions
   */
  static a = a;

  /**
 * Selenium utils.
 */
  static s = SeleniumUtils;


}
