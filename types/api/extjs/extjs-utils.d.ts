import { EnableLog } from '../common-types';
import { Teq } from './new-api/types/ej-types';
export declare let debugLocale: boolean;
export interface LocaleEntries {
    [key: string]: string;
}
/**
 * Sets locale object. Locale object is key-value object for localization.
 * Key is english text, and value is any utf8 text.
 *
 * @param objExpression - expression how to get locale object.
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
export declare function setLocaleObject(objExpression: string, enableLog?: EnableLog): Promise<any>;
export declare function setExtraLocaleObject(localeObj: LocaleEntries, enableLog?: EnableLog): Promise<any>;
export declare function getLocStr(key: string): string;
export declare function getExtraLocStr(key: string): string;
export declare function locKeyToStr(str: string): string;
export declare function locKeyToStrAndEscapeSlashes(str: string): string;
export declare function getFirstLocaleKey(value: string, extra?: boolean): string;
export declare function getAllLocaleKeys(value: string, extra?: boolean): string;
export declare function convertTextToFirstLocKey(text: string): string;
export declare function getCIS(tEQ: Teq, compName: string, idForLog?: string): string;
export declare function getCISRVal(tEQ: Teq, compName: string, idForLog: string | undefined, val: string): string;
export declare function getCISContent(prefix: string, tEQ: Teq, compName: string, idForLog: string | undefined, val: any, // eslint-disable-line @typescript-eslint/no-explicit-any
noWrap?: boolean): string;
/**
 * Returns locale keys for which values are equal to given text.
 * Requires gT.e.utils.setLocaleObject(expression) call before.
 * @param text
 * @returns {string}
 */
/**
 * The mode in which native language text is added after locale keys.
 * @param newMode
 * @param enableLog
 * @return {*}
 */
export declare function setDebugLocaleMode(newMode: boolean, enableLog?: EnableLog): Promise<any>;
