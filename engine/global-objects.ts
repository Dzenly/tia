import * as path from 'path';

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
import wrap from './wrap';

import * as engineConsts from '../config/engine-constants';
import * as configUtils from '../utils/config-utils';
import * as suiteConfigDefault from '../config/default-suite-config';
import * as globalConfigDefault from '../config/default-global-config';
import * as dirConfigDefault from '../config/default-dir-config';

import * as l from '../api/log/log';
import * as t from '../api/test';
import * as lL from '../api/low-level';
import * as a from '../api/assertions';

import * as timeUtils from '../utils/time-utils';
import * as nodeUtils from '../utils/nodejs-utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import commonConsts = require('../common-utils/common-constants');

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import commonMiscUtils = require('../common-utils/common-misc-utils');

import '../api/api-index';

import { ExtJsCmpAPI } from '../api/extjs/new-api/components/extjs-components';

import UtilsAPI from '../api/utils/utils-index';

import * as winstonMock from '../api/log/winston-mock';
import * as rStreamToLog from '../api/log/r-stream-to-log';

export class LogUtils {
  static winstonMock = winstonMock;
  static rStreamToLog = rStreamToLog;
}

// Chromedriver needs nodejs.
process.env.PATH = process.env.PATH + path.delimiter + path.dirname(process.execPath);
process.env.SELENIUM_PROMISE_MANAGER = '0';

import { path as chromeDriverPath } from 'chromedriver';

process.env.PATH = chromeDriverPath + path.delimiter + process.env.PATH;

import * as wdModule from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { Executor, HttpClient as Client } from 'selenium-webdriver/http';
import * as firefox from 'selenium-webdriver/firefox';
import * as input from 'selenium-webdriver/lib/input';

export class OriginalSeleniumAPI {
  static wdModule = wdModule;
  static by = wdModule.By;
  static key = wdModule.Key;
  static until = wdModule.until;
  static input = input;
  static driverLogType = wdModule.logging.Type.DRIVER;
  static browserLogType = wdModule.logging.Type.BROWSER;
  static chrome = chrome;
  static firefox = firefox;
  static Executor = Executor;
  static Client = Client;
  static logs: any;

  /**
   * Assigned at driver initialization.
   */
  static driver: wdModule.WebDriver;
}

export class CommandLineParams {
  static rootDir: string;
  static extLog?: string;
  static difsToSlog: boolean;
  static slogDifToConsole: boolean;
  static dir: string;
  static emailCfgPath: string;
  static slogSubj?: string[];
  static testsParentDir: string;
  static traceLevel: number;
  static minPathSearchIndex: number;
  static defHost: string;
  static ejExplore: boolean;
  static keepBrowserAtError: boolean;
  static suite: string;
  static errToConsole: boolean;
  static logToConsole: boolean;
  static pattern: string;
  static new: boolean;
  static ignoreSkipFlag: boolean;
  static selActsDelay: number;
  static stopRemoteDriver: boolean;
  static useRemoteDriver: boolean;
  static forceLogActions: boolean;
  static shareBrowser: boolean;
  static clearProfiles: boolean;
  static browser: string;
  static headless: boolean;
  static debugLocale: boolean;
  static hangTimeout: number;
  static enableEmail: boolean;
  static xvfb: boolean;
  static tooLongTime = engineConsts.tooLongTime;
  static showEmptySuites: boolean;
  static printProcInfo: boolean;
}

export interface Suite {
  root: string;
  browserProfilesPath: string;
  log: string;
  etLog: string;
  configPath: string;
  changedEDiffs: number;
}

export class GlobalTiaInnerObjects {
  static suite: Suite;
  static loggerCfg = loggerCfg;
  static cLogger = cLogger;
  static logger = logger;
  static tracer = tracer;
  static fileUtils = fileUtils;
  static textUtils = textUtils;
  static tU = textUtils;
  static tInfo = testInfo;
  static diffUtils = diffUtils;
  static mailUtils = mailUtils;
  static remoteDriverUtils = remoteDriverUtils;
  static wrap = wrap;
  static tracePrefix = '';
  static chromeDriverPath = chromeDriverPath;
  static dirArr: string[];
  static errRecursionCount: number;
  static cancelThisTest: boolean;
  static suiteErrRecursionCount: number;
  static cancelSuite: boolean;
  static sharedBrowserInitiated: boolean;
  static screenShotScheduled: boolean;
  static brHelpersInitiated: boolean;
}

import * as driver from '../api/selenium/sel-driver';
import * as wait from '../api/selenium/sel-waits';
import * as uA from '../api/selenium/sel-user-actions';
import * as browser from '../api/selenium/sel-browser';
import { idToIdForLogObj } from '../api/selenium/sel-misc';

export class SeleniumAPI {
  static driver = driver;
  static wait = wait;
  static uA = uA;
  static browser = browser;
  static idToIdForLogObj = idToIdForLogObj;
}

export class GlobalTiaObjects {
  static engineConsts = engineConsts;
  static configUtils = configUtils;
  static suiteConfigDefault = suiteConfigDefault;
  static globalConfigDefault = globalConfigDefault;
  static dirConfigDefault = dirConfigDefault;

  static s = SeleniumAPI;

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

  static u = UtilsAPI;

  static commonConsts = commonConsts;
  static cC = commonConsts;
  static commonMiscUtils = commonMiscUtils;

  static sOrig = OriginalSeleniumAPI; // TODO: change type.
  static eC = ExtJsCmpAPI;

  static nodeUtils = nodeUtils;
  static timeUtils = timeUtils;
  static LogUtils = LogUtils;

  static tiaDir: string;
  static version: string;
  static browsers = [
    'chrome', // First browser is default.
    'firefox',
  ];

  static cLParams = CommandLineParams;
  static rootTestsDirPath: string;
  static rootResultsDir: string;

  static rootSuiteConfig: any;

  static globalConfig: any;

  static defaultRootProfile: any;

  static rootDirConfig: any;

  static rootLog: string;

  static config: any;

  static suiteConfig: any;

  static firstRunWithRemoteDriver?: boolean;
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

// require('../api/api-index');
