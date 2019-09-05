/* eslint-disable @typescript-eslint/no-explicit-any */

import { TiaAssertions } from './assertions';
import { ExtJsComponents } from './ext-js/ext-js-components/extjs-components';
import { ExtJsApi } from './ext-js/extjs-api';
import { TiaLogs } from './logs';
import { SeleniumOriginalApi } from './selenium/original-api';
import { SeleniumApi } from './selenium/selenium-api';
import { TiaTest } from './test';

/**
 * gT.config
 */
interface TiaConfig {
  [x: string]: any;
}

/**
 * gT.cLParams
 */
interface TiaCommandLineParameters {
  [x: string]: any;
}

/**
 * gIn.tracer
 */
interface TiaTracer {
  /**
   * Writes an error.to stdout.
   * @param msg - error message
   */
  err(msg: string): void;
  [x: string]: any;
}

/**
 * gIn
 */
interface GlobalTiaInnerObjects {
  [x: string]: any;
  tracer: TiaTracer;
}

/**
 * gT
 */
interface GlobalTiaObjects {
  e: ExtJsApi;
  eC: ExtJsComponents;
  s: SeleniumApi;
  sOrig: SeleniumOriginalApi;
  a: TiaAssertions;
  l: TiaLogs;
  t: TiaTest;
  /**
   * Reserved for usage by R-Vision.
   */
  rv: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  version: string;
  /**
   * Browsers supported by Tia.
   */
  browsers: string[];
  config: TiaConfig;
  cLParams: TiaCommandLineParameters;
  rootSuiteConfig: string;
  rootDirConfig: any;
  engineConsts: any;
  rootResultsDir: string;
  rootLog: string;
  dirConfigDefault: any;
  rootTestsDirPath: any;
  suiteConfigDefault: any;
  globalConfig: any;
  defaultRootProfile: any;
  globalConfigDefault: any;
  nodeUtils: any;
  tiaDir: string;
}

// Module augmentation.
declare module NodeJS {
  interface Global {
    gT: GlobalTiaObjects;
    gIn: GlobalTiaInnerObjects;
    // e: ExtJsApi;
    // eC: ExtJsComponents;
    // s: SeleniumApi;
    // sOrig: SeleniumOriginalApi;
    // a: TiaAssertions;
    // l: TiaLogs;
    // t: TiaTest;
  }
}

declare const gT: GlobalTiaObjects;
// declare const e: ExtJsApi;
// declare const eC: ExtJsComponents;
// declare const s: SeleniumApi;
// declare const sOrig: SeleniumOriginalApi;
// declare const a: TiaAssertions;
// declare const l: TiaLogs;
// declare const t: TiaTest;
