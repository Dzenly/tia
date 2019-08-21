import {EnableLog} from '../ext-js/common';

/**
 * gT.s.driver
 */
export interface SeleniumDriverApi {

  /**
   * Initiates webdriver.
   * All gui tests should start with this function.
   *
   * @param {Boolean} cleanProfile - Is profile cleaning needed. Works only if custom profile is defined.
   * There is an issue with custom profile on Windows. Profile is not saved after browser closing.
   */
  init(cleanProfile: boolean, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sleeps for the specified milliseconds amount.
   */
  sleep(ms: number, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Closes the browser.
   * @param [enableLog]
   * If there was a custom profile - default enableLog is true,
   * otherwise - false.
   */
  quit(enableLog?: EnableLog): Promise<undefined>;

  /**
   * Quits if driver is initiated and if there is not ejExplore mode.
   */
  quitIfInited(): Promise<undefined>;

  /**
   * Prints Selenium webdriver logs.
   * @param minLevel - the minimal log levels.
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Level.html
   */
  printSelDriverLogs(minLevel: number): Promise<undefined>;
}
