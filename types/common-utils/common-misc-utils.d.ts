import { Teq } from '../api/extjs/new-api/types/ej-types';
export declare const getDebugMode: () => boolean;
export declare function copyObject(obj: any): {
    [index: string]: any;
    [index: number]: any;
};
export declare const optsToJson: (options: any) => string;
/**
 * Merges src options with default ones.
 * @param {object} src
 * @param {function} def - factory for default object.
 * Arrays are not supportetd.
 * @returns - object with merged options.
 * @throws - exception if there are options which are not presented in default options.
 * Note: this means that default options must contain all possible options.
 *
 */
export declare function mergeOptions(src: any, def: any): any;
export declare enum dumpObjErrMode {
    exception = 0,
    showNA = 1,
    omitString = 2,
    omitStringIfUndefined = 3
}
export interface PathsForDump {
    path: string;
    /**
     * Note - only arrays are supported.
     *   when function is met in path, next argument from args array is used.
     */
    args?: any[][];
    /**
     * name to log, instead of funcName.
     */
    alias?: string;
    /**
     * if true - values will be wrapped in double quotes.
     */
    quotes?: boolean;
}
/**
 * Prints given object properties to string.
 * @param obj - Object which properties to print.
 * @param {Array} propPaths - Names for properties to print.
 * @param dstArr - Destination array to place strings to.
 * @param [errMode] - dumpObjErrMode
 */
export declare function dumpObj(obj: any, propPaths: Array<string | PathsForDump>, dstArr: string[], errMode: dumpObjErrMode): string[];
export declare function result(origVal: any, path: string, defaultValue: any): any;
export interface CUMap {
    [index: string]: string;
}
/**
 * Inverted object {'key': 'value'} -> {'value': 'key'}
 * @param {Object} map
 * @return {Object} - inverted maps.
 * {
 *   invertedMapFirst, - object where for not unique values of input object,
 *   only first key will be used as a value.
 *   invertedMapAll, object where for not unique values of input object,
 *   all keys, separated by comma, will be used as a value.
 * }
 */
export declare function invertMapObj(map: CUMap): {
    invertedMapFirstKey: {
        [index: string]: string;
    };
    invertedMapAllKeys: {
        [index: string]: string;
    };
};
/**
 * Replaces xtype by xtype(true) in TEQ string.
 * @param tEQ
 * @return {String}
 */
export declare function replaceXTypesInTeq(tEQ: Teq): string;
