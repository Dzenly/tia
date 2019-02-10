import {LogMode, OptionalMsg} from './common';

/**
 * TODO: support https://www.npmjs.com/package/validatorjs
 */
export interface TiaAssertions {

  /**
   * Result accumulators are used for changed assertions.
   * If some assertion failed the accumulator state is failed too.
   * See also: LogMode.accName.
   *
   * @param accName - accumulator name.
   */
  initResultsAccumulator(accName: string): void;

  getResultFromAccumulator(accName: string): boolean;

  deleteResultAccumulator(accName: string): void;

  /**
   * Accumulator value &&= result.
   * @param result - result to merge to accumulator.
   */
  mergeResultToAccumulator(result: boolean, accName: string): void;

  /**
   * Checks that specified condition is true.
   * @param condition - Some JS expression to check.
   * @param msg - condition description.
   */
  true(condition: any, msg: OptionalMsg, mode?: LogMode): boolean;

  false(condition: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that value equals to expected value.
   * @param {*} actVal - actual value.
   * @param {*} expVal - expected value.
   * @param {String} [msg] - message to describe the entities which you compare.
   * @returns {Boolean} comparison result.
   */
  value(actVal: any, expVal: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that string value representation equals to expected value.
   */
  valueStr(actVal: any, expVal: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that number value representation equals to expected value.
   */
  valueNumber(actVal: any, expVal: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that boolean value representation equals to expected value.
   */
  valueBool(actVal: any, expVal: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that two objects or values are equal.
   * Functions are not supported.
   * @param actVal - actual value.
   * @param expVal - expected value.
   * @param msg - message to describe the entities which you compare.
   * @returns {Boolean} comparison result.
   */
  valueDeep(actVal: any, expVal: any, msg: OptionalMsg, mode?: LogMode): boolean;

  /**
   * Checks that given func will throw given exception.
   * @param func - function which could generate an exception.
   * @param expExc - expected exception. If undefined - no exception is expected.
   * I.e. to check that function does not generate exceptions just pass undefined expExc.
   */
  exception(func: () => any , expExc?: string, mode?: LogMode): boolean;

  /**
   * Checks that given async func will throw given exception.
   * @param func - async function which could generate an exception.
   * @param expExc - expected exception. If undefined - no exception is expected.
   * I.e. to check that function does not generate exceptions just pass undefined expExc.
   */
  exceptionAsync(func: () => Promise<any> , expExc?: string, mode?: LogMode): boolean;


  /**
   * Checks that val1 === val2.
   * @param msg1 - message, describing val1 entity.
   * @param msg2 - message, describing val2 entity.
   * @param doNotShowValues - Do not show values for passed assertion.
   */
  equal(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues ?: boolean, mode ?: LogMode): boolean;

  /**
   * Checks that Boolean(val1) === Boolean(val2).
   * @param msg1 - message, describing val1 entity.
   * @param msg2 - message, describing val2 entity.
   * @param doNotShowValues - Do not show values for passed assertion.
   */
  equalBool(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues ?: boolean, mode ?: LogMode): boolean;

  /**
   * Checks that Boolean(val1) !== Boolean(val2).
   * @param msg1 - message, describing val1 entity.
   * @param msg2 - message, describing val2 entity.
   * @param doNotShowValues - Do not show values for passed assertion.
   */
  notEqualBool(val1: any, val2: any, msg1: string, msg2: string, doNotShowValues ?: boolean, mode ?: LogMode): boolean;
}
