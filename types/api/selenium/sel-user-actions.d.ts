import { WebElement } from 'selenium-webdriver';
import { EnableLog, IdForLog, SeleniumKeys } from '../common-types';
/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function clickById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
/**
 * Right Click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function rClickById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
/**
 * Left mouse button double click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export declare function dblClickById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendEscById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendDownById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendEnterById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendTabById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendPgDownById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendPgUpById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendUpById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
/**
 * Send keys to the web element with specified id.
 *
 * @param id
 * @param keys
 * @param enableLog
 * @returns {Promise.<TResult>}
 */
export declare function sendKeysById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog): Promise<any>;
export declare function sendCtrlAAndKeysById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog): Promise<any>;
export declare function sendCtrlAKeysEnterById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog): Promise<any>;
export declare function sendCtrlAAndDeleteById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function clearById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
export declare function sendKeysToBody(keys: SeleniumKeys, enableLog?: EnableLog): Promise<any>;
export declare function moveMouse(webElement: WebElement, enableLog?: EnableLog): Promise<any>;
export declare function moveMouseById(id: IdForLog, enableLog?: EnableLog): Promise<any>;
