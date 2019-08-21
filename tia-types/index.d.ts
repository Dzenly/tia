import { TiaAssertions } from './assertions';
import { ExtJsComponents } from './ext-js/ext-js-components/extjs-components';
import { ExtJsApi } from './ext-js/extjs-api';
import { TiaLogs } from './logs';
import { SeleniumOriginalApi } from './selenium/original-api';
import { SeleniumApi } from './selenium/selenium-api';
import { TiaTest } from './test';

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
  rv: any;
}

declare namespace NodeJS {
  interface Global {
    gT: GlobalTiaObjects;
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
