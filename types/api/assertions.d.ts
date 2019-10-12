/**
 * Test description.
 * **[[GlobalTiaObjects|gT]].a**
 */
/**
 * for typedoc.
 */
import { AssertionMode } from './common-types';
export declare function initResultsAccumulator(name: string): void;
export declare function getResultFromAccumulator(name: string): boolean;
export declare function deleteResultAccumulator(name: string): void;
export declare function mergeResultToAccumulator(res: boolean, name: string): void;
/**
 * The parameter for all assertions.
 * @param {Object} [mode] the mode for pass case.
 * @param {Boolean} [mode.passSilently] - do not show message.
 * @param {Boolean} [mode.noPassIncrement] - do not increment pass counter.
 * @param {Boolean} [mode.accName] - the name for result accumulator which will be falsed
 * if some assertion is failed.
 * /

 /**
 * Checks that specified condition is true.
 * @param condition
 * @param msg - message to describe the entity which you expect.
 */
declare function checkIfTrue(condition: boolean, msg: string, mode: AssertionMode): boolean;
export { checkIfTrue as true };
/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg - message to describe the entity which you expect.
 * param {Object} mode - see 'true' assertion description.
 */
declare function checkIfFalse(condition: boolean, msg: string, mode: AssertionMode): boolean;
export { checkIfFalse as false };
/**
 * Checks that value equals to expected value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export declare function value(actVal: any, expVal: any, msg: string, mode: AssertionMode): boolean;
/**
 * Checks that string value representation equals to expected string.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export declare function valueStr(actVal: any, expVal: any, msg: string, mode: AssertionMode): boolean;
/**
 * Checks that number value representation equals to expected number.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export declare function valueNumber(actVal: any, expVal: any, msg: string, mode: AssertionMode): boolean;
/**
 * Checks that bool value representation equals to expected bool value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export declare function valueBool(actVal: any, expVal: any, msg: string, mode: AssertionMode): boolean;
/**
 * Checks that two objects or values are equal.
 * Functions are not supported.
 * @param actVal - actual value.
 * @param expVal - expected value.
 * @param msg - message to describe the entity which you expect.
 * @returns {boolean}
 */
export declare function valueDeep(actVal: any, expVal: any, msg: string, mode: AssertionMode): boolean;
/**
 * Checks that given func will throw given exception.
 * @param func
 * @param expExc
 * @param mode
 * @return {boolean}
 */
export declare function exception(func: Function, expExc?: string, mode?: any): boolean;
/**
 * Checks that given async func will throw given exception.
 * @param asyncFunc
 * @param expExc
 * @param mode
 * @return {Promise}
 */
export declare function exceptionAsync(asyncFunc: Function, expExc?: string, mode?: any): any;
export declare function equal(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues: boolean, mode: AssertionMode): boolean;
export declare function equalBool(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues: boolean, mode: AssertionMode): boolean;
export declare function notEqualBool(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues: boolean, mode: AssertionMode): boolean;
