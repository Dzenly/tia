import {LogAction} from '../ext-js/common';

/**
 * Return value from JavaScript injected in the AUT (Application Under Test).
 */
type ScriptReturnValue = any;

interface ScreenResolution {
  width: number;
  height: number;
}

interface AddCookieArgs {
  domain: string|undefined;
  expiry: Date|number|undefined;
  httpOnly: boolean|undefined;
  name: string;
  path: string|undefined;
  secure: boolean|undefined;
  value: string;
}

export interface SeleniumBrowserApi {

  /**
   * Initializes TIA browser helpers.
   * I.e., adds to window object some objects which TIA uses in injected JS code.
   * You can use these helpers too.
   * TODO: Describe browser API too and provide link here.
   */
  initTiaBrHelpers(logAction: LogAction): Promise<undefined>;


  /**
   * Encloses string value into single quotes. Leaves number value as is.
   * @param val - value
   * @returns {string}
   */
  valueToParameter(val: string | number): string;

  /**
   * Loads a page with specified URL.
   * Note: it replaces the string '$(host)' by the actual host address.
   * See also --def-host description in `tia --help`.
   */
  loadPage(url: string, logAction: LogAction): Promise<undefined>;


  /**
   * Closes the active browser tab.
   */
  close(logAction: LogAction): Promise<undefined>;

  /**
   * Sets a function which clicks body every minute to keep session active.
   */
  setBodyClicker(logAction: LogAction): Promise<undefined>;

  /**
   * Wraps the given script text into tmpFunc and try/catch block.
   * Then runs tmpFunc in AUT.
   * Returns a Promise resolved to the value returned from the script value.
   */
  executeScript(scriptStr: string, logAction: LogAction): Promise<ScriptReturnValue>;

  /**
   * Helper, used inside executeScript().
   * Returns a Promise resolved to the value returned from the script value.
   */
  executeScriptWrapper(scriptStr: string): Promise<ScriptReturnValue>;

  /**
   * Executes a script from the specified file.
   * Returns a Promise resolved to the value returned from the script value.
   *
   * @param fPath - path to the file to execute in browser.
   */
  executeScriptFromFile(fPath: string, logAction: LogAction): Promise<ScriptReturnValue>;

  /**
   * Sets function body for "Ctrl/Meta + Alt + LClick" handler.
   * You can use 'e' object of MouseEvent class.
   * Removes previous tiaOnClick handler (if exists).
   * @param funcBody - JS body to be executed at Ctrl/Meta + Alt + CClick
   */
  setCtrlAltLClickHandler(funcBody: string, logAction: LogAction): Promise<undefined>;

  /**
   * Sets debug mode for browser scripts.
   * More info is showed for elements (including ExtJs ones).
   */
  setDebugMode(logAction: LogAction): Promise<undefined>;

  /**
   * Resets debug mode for browser scripts.
   * Less info is showed for elements (including ExtJs ones).
   */
  resetDebugMode(logAction: LogAction): Promise<undefined>;

  /**
   * Returns tia.debugMode value.
   */
  getDebugMode(logAction: LogAction): Promise<boolean>;

  /**
   * Returns the current page URL.
   */
  getCurUrl(logAction: LogAction): Promise<string>;

  /**
   * Returns the current page Title.
   */
  getTitle(logAction: LogAction): Promise<string>;

  /**
   * Prints browser console into the test log.
   */
  printSelBrowserLogs(): Promise<undefined>;

  /**
   * Prints caught exceptions into the test log.
   */
  printCaughtExceptions(includeExtAjaxFailures: boolean): Promise<undefined>;

  /**
   * Cleans all accumulated exceptions.
   * @param includingExtAjaxFailures
   */
  cleanExceptions(includingExtAjaxFailures: boolean, logAction: LogAction): Promise<undefined>;

  /**
   * @param x - relative to screen.
   * @param y - relative to screen.
   * @param logAction
   */
  setWindowPosition(x: number, y: number,logAction: LogAction): Promise<undefined>;

  setWindowSize(width: number, height: number, logAction: LogAction): Promise<undefined>;

  getScreenResolution(logAction: LogAction): Promise<ScreenResolution>;

  /**
   * Maximizes browser window.
   * @param logAction
   */
  maximize(logAction: LogAction): Promise<undefined>;

  /**
   * Saves screenshot into png file near the test JS file.
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html#takeScreenshot
   */
  screenshot(logAction: LogAction): Promise<undefined>;

  /**
   *
   * @param name
   * @param value
   * @param logAction
   */
  addCookie(name: string, value: string, logAction: LogAction): Promise<undefined>;


  /**
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Options.html#addCookie
   */
  addCookieEx(args: AddCookieArgs, logAction: LogAction): Promise<undefined>;

  deleteCookie(name: string, logAction: LogAction): Promise<undefined>;

  getCookie(name: string, logAction: LogAction): Promise<string>;

  /**
   * Cleans up the directory with browser profile.
   * @param logAction
   */
  cleanProfile(logAction: LogAction): Promise<undefined>;
}
