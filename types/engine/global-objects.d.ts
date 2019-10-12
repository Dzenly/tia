import { Logs } from 'selenium-webdriver';
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
import * as suiteConfigDefault from '../config/default-suite-config';
import * as globalConfigDefault from '../config/default-global-config';
import * as dirConfigDefault from '../config/default-dir-config';
import * as l from '../api/log/log';
import * as t from '../api/test';
import * as lL from '../api/low-level';
import * as a from '../api/assertions';
import * as timeUtils from '../utils/time-utils';
import * as nodeUtils from '../utils/nodejs-utils';
import commonConsts = require('../common-utils/common-constants');
import commonMiscUtils = require('../common-utils/common-misc-utils');
import { ExtJsCmpAPI } from '../api/extjs/new-api/components/extjs-components';
import UtilsAPI from '../api/utils/utils-index';
import winstonMock from '../api/log/winston-mock';
import rStreamToLog from '../api/log/r-stream-to-log';
/**
 * **[[GlobalTiaObjects|gT]].logUtils**
 */
export declare class LogUtils {
    static winstonMock: typeof winstonMock;
    static rStreamToLog: typeof rStreamToLog;
}
import { ExtJsAPI } from '../api/extjs/extjs-index';
import * as wdModule from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { Executor, HttpClient as Client } from 'selenium-webdriver/http';
import * as firefox from 'selenium-webdriver/firefox';
import * as input from 'selenium-webdriver/lib/input';
/**
 * **[[GlobalTiaObjects|gT]].sOrig**
 */
export declare class OriginalSeleniumAPI {
    static wdModule: typeof wdModule;
    static by: typeof wdModule.By;
    static key: input.IKey;
    static until: typeof wdModule.until;
    static input: typeof input;
    static driverLogType: string;
    static browserLogType: string;
    static chrome: typeof chrome;
    static firefox: typeof firefox;
    static Executor: typeof Executor;
    static Client: typeof Client;
    static logs: Logs;
    /**
     * Assigned at driver initialization.
     */
    static driver: wdModule.WebDriver;
}
/**
 * **[[GlobalTiaObjects|gT]].cLParams**
 */
export declare class CommandLineParams {
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
    static tooLongTime: number;
    static showEmptySuites: boolean;
    static printProcInfo: boolean;
    static stackToLog: boolean;
    static browserLogLevel: number;
    static driverLogLevel: number;
}
/**
 * **[[GlobalTiaInnerObjects|gIn]].suite**
 */
export interface Suite {
    root: string;
    browserProfilesPath: string;
    log: string;
    etLog: string;
    configPath: string;
    changedEDiffs: number;
}
/**
 * **gIn**
 */
export declare class GlobalTiaInnerObjects {
    static suite: Suite;
    static loggerCfg: typeof loggerCfg;
    static cLogger: typeof cLogger;
    static logger: typeof logger;
    static tracer: typeof tracer;
    static fileUtils: typeof fileUtils;
    static textUtils: typeof textUtils;
    static tU: typeof textUtils;
    static tInfo: typeof testInfo;
    static diffUtils: typeof diffUtils;
    static mailUtils: typeof mailUtils;
    static remoteDriverUtils: typeof remoteDriverUtils;
    static wrap: typeof wrap;
    static tracePrefix: string;
    static chromeDriverPath: string;
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
/**
 * **[[GlobalTiaObjects|gT]].s**
 */
export declare class SeleniumAPI {
    static driver: typeof driver;
    static wait: typeof wait;
    static uA: typeof uA;
    static browser: typeof browser;
    static idToIdForLogObj: typeof idToIdForLogObj;
}
/**
 * **gT**
 */
export declare class GlobalTiaObjects {
    /**
     * Tia engine constants.
     */
    static engineConsts: typeof engineConsts;
    static suiteConfigDefault: typeof suiteConfigDefault;
    static globalConfigDefault: typeof globalConfigDefault;
    static dirConfigDefault: typeof dirConfigDefault;
    /**
     * Selenium API.
     */
    static s: typeof SeleniumAPI;
    /**
     * Utilities for logging.
     */
    static l: typeof l;
    /**
     * Misc. test utils.
     */
    static t: typeof t;
    /**
     * Low level API for tests. It can be used for helpers writing.
     */
    static lL: typeof lL;
    /**
     * Assertions
     */
    static a: typeof a;
    /**
     * Utilities.
     */
    static u: typeof UtilsAPI;
    /**
     * ExtJs common API
     */
    static e: typeof ExtJsAPI;
    static commonConsts: typeof commonConsts;
    static cC: typeof commonConsts;
    static commonMiscUtils: typeof commonMiscUtils;
    static sOrig: typeof OriginalSeleniumAPI;
    /**
     * ExtJs Components API.
     */
    static eC: typeof ExtJsCmpAPI;
    /**
     *
     */
    static nodeUtils: typeof nodeUtils;
    static timeUtils: typeof timeUtils;
    static logUtils: typeof LogUtils;
    static tiaDir: string;
    /**
     * Tia version.
     */
    static version: string;
    /**
     * Supported browsers.
     */
    static browsers: string[];
    static cLParams: typeof CommandLineParams;
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
/**
 * Global namespace.
 */
declare global {
    namespace NodeJS {
        interface Global {
            gT: typeof GlobalTiaObjects;
            gIn: typeof GlobalTiaInnerObjects;
        }
    }
}
