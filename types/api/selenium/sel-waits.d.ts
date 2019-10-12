import { IdForLog } from '../common-types';
/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export declare function waitForElementById(id: IdForLog, timeout: number, enableLog: boolean): Promise<any>;
export declare function waitForElementEnabledAndVisibleById(id: IdForLog, timeout: number, enableLog: boolean): Promise<any>;
/**
 * Waits for element with specified CSS class.
 *
 * @param className
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export declare function waitForElementByClassName(className: string, timeout: number, enableLog: boolean): Promise<any>;
/**
 * Waits for element with specified CSS selector.
 *
 * @param selector
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export declare function waitForElementByCssSelector(selector: string, timeout: number, enableLog: boolean): Promise<any>;
/**
 * Waits for specified page title.
 *
 * @param title
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export declare function waitForTitle(title: string, timeout: number, enableLog: boolean): Promise<any>;
/**
 * Waits for specified URL.
 * @param url
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export declare function waitForUrl(url: string, timeout: number, enableLog: boolean): Promise<any>;
/**
 * Waits for some URL which starts with specified urlPrefix.
 *
 * @param urlPrefix
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export declare function waitForUrlPrefix(urlPrefix: string, timeout: number, enableLog: boolean): Promise<any>;
