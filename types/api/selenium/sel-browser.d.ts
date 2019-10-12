import { IWebDriverOptionsCookie } from 'selenium-webdriver';
import { EnableLog } from '../common-types';
export declare function executeScriptWrapper(scriptStr: string): Promise<any>;
export declare function executeScript(scriptStr: string, enableLog?: EnableLog): Promise<any>;
export declare function executeScriptFromFile(fPath: string, enableLog?: EnableLog): Promise<any>;
export declare function initTiaBrHelpers(enableLog?: EnableLog): Promise<any>;
export declare function valueToParameter(val: any): string | undefined;
export declare function loadPage(url: string, enableLog?: EnableLog): Promise<any>;
export declare function close(enableLog?: EnableLog): Promise<any>;
/**
 * Sets a function which clicks body every minute to keep session active.
 * @param enableLog
 * @returns {*}
 */
export declare function setBodyClicker(enableLog?: EnableLog): Promise<any>;
/**
 * Sets function body for "Ctrl/Meta + Alt + LClick" handler.
 * You can use 'e' object of MouseEvent class.
 * Removes previous tiaOnClick handler (if exists).
 * @param funcBody
 */
export declare function setCtrlAltLClickHandler(funcBody: string, enableLog?: EnableLog): Promise<any>;
/**
 * Sets debug mode for browser scripts.
 * More info is showed for elements (including ExtJs ones).
 */
export declare function setDebugMode(enableLog?: EnableLog): Promise<any>;
/**
 * Resets debug mode for browser scripts.
 * Less info is showed for elements (including ExtJs ones).
 */
export declare function resetDebugMode(enableLog?: EnableLog): Promise<any>;
export declare function getDebugMode(enableLog?: EnableLog): Promise<any>;
export declare function getCurUrl(enableLog?: EnableLog): Promise<any>;
/**
 * Returns the current page Title.
 * @param enableLog
 * @returns {*}
 */
export declare function getTitle(enableLog?: EnableLog): Promise<any>;
/**
 * Logs browser console content.
 *
 * @returns {Promise.<TResult>}
 */
export declare function printSelBrowserLogs(): Promise<void>;
export declare function printCaughtExceptions(includeExtAjaxFailures?: boolean): Promise<void>;
/**
 *
 * @param includingExtJsAjaxFailures
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function cleanExceptions(includingExtJsAjaxFailures: boolean, enableLog?: EnableLog): Promise<any>;
/**
 * Set browser window position.
 *
 * @param x
 * @param y
 * @param enableLog
 *
 * @return {Promise}
 */
export declare function setWindowPosition(x: number, y: number, enableLog?: EnableLog): Promise<any>;
/**
 * Sets browser window size.
 * @param {Number} width
 * @param {Number} height
 * @param enableLog
 *
 * @return {Promise}
 */
export declare function setWindowSize(width: number, height: number, enableLog?: EnableLog): Promise<any>;
/**
 * Saves screen resolution into inner variables.
 * @param enableLog
 * @returns {*}
 */
export declare function getScreenResolution(enableLog?: EnableLog): Promise<any>;
/**
 * Maximizes browser window.
 */
export declare function maximize(enableLog?: EnableLog): Promise<any>;
export declare function screenshot(enableLog?: EnableLog): Promise<any>;
/**
 * Adds a cookie using name and value.
 * @param name
 * @param value
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function addCookie(name: string, value: string, enableLog?: EnableLog): Promise<any>;
export declare function addCookieEx(args: IWebDriverOptionsCookie, enableLog?: EnableLog): Promise<any>;
/**
 * Deletes specified cookie.
 * @param name
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function deleteCookie(name: string, enableLog?: EnableLog): Promise<any>;
/**
 * Gets cookie with specified name.
 * @param name
 * @param enableLog
 * @returns {Object} - JSON object.
 */
export declare function getCookie(name: string, enableLog?: EnableLog): Promise<any>;
/**
 * Cleans up the directory with browser profile.
 * @param enableLog
 * @returns {Promise.<TResult>}
 */
export declare function cleanProfile(enableLog?: EnableLog): Promise<any>;
