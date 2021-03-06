/**
 * Test description.
 * **[[GlobalTiaObjects|gT]].a**
 */

/**
 * for typedoc.
 */

import { AssertionMode } from './common-types';

/* eslint-disable max-params, no-param-reassign */

interface StrBoolMap {
  [key: string]: boolean;
}

/**
 * Assertions can use results accumulators.
 * I.e. the map which remembers if there was some error for current name.
 */

const resultAccumulators: StrBoolMap = {};

function checkAccName(name: string) {
  if (typeof name !== 'string') {
    throw new Error('Use string type for accumulator name');
  }
}

export function initResultsAccumulator(name: string) {
  checkAccName(name);
  resultAccumulators[name] = true;
}

export function getResultFromAccumulator(name: string) {
  checkAccName(name);
  return resultAccumulators[name];
}

export function deleteResultAccumulator(name: string) {
  checkAccName(name);
  delete resultAccumulators[name];
}

export function mergeResultToAccumulator(res: boolean, name: string) {
  checkAccName(name);
  resultAccumulators[name] = resultAccumulators[name] && res;
}

/**
 * For shortening the code.
 * Adds result accumulators usage to fail call.
 * @param msg
 */
function failWrapper(msg: string, mode?: AssertionMode) {
  gT.l.fail(msg);
  if (mode && mode.accName) {
    checkAccName(mode.accName);
    resultAccumulators[mode.accName] = false;
  }
}

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
function checkIfTrue(condition: boolean, msg: string, mode?: AssertionMode) {
  if (condition) {
    gT.l.pass(msg, mode);
    return true;
  }
  failWrapper(msg, mode);
  return false;
}

export { checkIfTrue as true };

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg - message to describe the entity which you expect.
 * param {Object} mode - see 'true' assertion description.
 */
function checkIfFalse(condition: boolean, msg: string, mode?: AssertionMode) {
  return checkIfTrue(!condition, msg, mode);
}

export { checkIfFalse as false };

/**
 * Checks that value equals to expected value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export function value(actVal: any, expVal: any, msg: string, mode?: AssertionMode) {
  if (typeof msg !== 'undefined') {
    if (actVal === expVal) {
      gT.l.pass(`${msg}: ${actVal}`, mode);
      return true;
    }
    msg += `\nAct: ${actVal}\nExp: ${expVal}`;
    failWrapper(msg, mode);
    return false;
  }
  if (actVal === expVal) {
    msg = `Act: "${actVal}" = Exp: "${expVal}"`;

    // TODO: (Yellow color ??) It is strange situation to compare smth without message.
    gT.l.pass(msg, mode);
    return true;
  }
  msg = `Equality checking:\nAct: ${actVal}\nExp: ${expVal}`;
  failWrapper(msg, mode);
  return false;
}

/**
 * Checks that string value representation equals to expected string.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export function valueStr(actVal: any, expVal: any, msg: string, mode?: AssertionMode) {
  actVal = String(actVal);
  expVal = String(expVal);
  return value(actVal, expVal, msg, mode);
}

/**
 * Checks that number value representation equals to expected number.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export function valueNumber(actVal: any, expVal: any, msg: string, mode?: AssertionMode) {
  actVal = Number(actVal);
  expVal = Number(expVal);
  return value(actVal, expVal, msg, mode);
}

/**
 * Checks that bool value representation equals to expected bool value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
export function valueBool(actVal: any, expVal: any, msg: string, mode?: AssertionMode) {
  actVal = Boolean(actVal);
  expVal = Boolean(expVal);
  return value(actVal, expVal, msg, mode);
}

/**
 * Checks that two objects or values are equal.
 * Functions are not supported.
 * @param actVal - actual value.
 * @param expVal - expected value.
 * @param msg - message to describe the entity which you expect.
 * @returns {boolean}
 */
export function valueDeep(actVal: any, expVal: any, msg: string, mode?: AssertionMode) {
  function handleVals(actualValue: any, expectedValue: any, propPath: string) {
    const actType = typeof actualValue;
    const expType = typeof expectedValue;

    if (actType !== expType) {
      msg += `\nPath: '${propPath}', Act type: ${actType}, 'Exp type: ${expType}`;
      failWrapper(msg, mode);
      return false;
    }

    if (actType === 'object' && actualValue !== null && expectedValue !== null) {
      const actProps = Object.getOwnPropertyNames(actualValue).sort();
      const expProps = Object.getOwnPropertyNames(expectedValue).sort();

      if (actProps.length !== expProps.length) {
        // eslint-disable-next-line max-len
        msg += `\nDifferent property counts, \nPath: '${propPath}', \nAct props: ${actProps}\nExp props: ${expProps}`;
        failWrapper(msg, mode);
        return false;
      }

      for (let i = 0, len = actProps.length; i < len; i++) {
        const actSubProp = actProps[i];
        const expSubProp = expProps[i];

        if (actSubProp !== expSubProp) {
          msg += `\nPath: '${propPath}', Property names are different: Act : ${actSubProp}, Exp : ${expSubProp}`;
          failWrapper(msg, mode);
          return false;
        }

        if (
          !handleVals(
            actualValue[actSubProp],
            expectedValue[expSubProp],
            `${propPath}/${actSubProp}`
          )
        ) {
          return false;
        }
      }
    } else if (actualValue !== expectedValue) {
      msg += `\nPath: ${propPath}, \nAct val: ${actualValue}\nExp val: ${expectedValue}`;
      failWrapper(msg, mode);
      return false;
    }
    return true;
  }

  const res = handleVals(actVal, expVal, '');
  if (res) {
    gT.l.pass(msg, mode); // There is no sense to print [object Object].
    return true;
  }
  return false;
}

/**
 * Checks that given func will throw given exception.
 * @param func
 * @param expExc
 * @param mode
 * @return {boolean}
 */
export function exception(func: Function, expExc?: string, mode?: AssertionMode) {
  try {
    func();
    let msg;
    if (typeof expExc === 'undefined') {
      msg = 'There is not any exception';
    } else {
      msg = `There is not expected exception: '${expExc}'`;
    }
    failWrapper(msg, mode);
    return false;
  } catch (e) {
    const str = e.toString();

    if (typeof expExc === 'undefined') {
      gT.l.pass(`Expected any exception: '${str}'`, mode);
      return true;
    }

    if (str === expExc) {
      gT.l.pass(`Expected exception: '${expExc}'`, mode);
      return true;
    }
    failWrapper(`Actual Exception vs Expected one:\n'${str}'\n'${expExc}'`, mode);
    return false;
  }
}

// TODO exception in async func.

/**
 * Checks that given async func will throw given exception.
 * @param asyncFunc
 * @param expExc
 * @param mode
 * @return {Promise}
 */
export function exceptionAsync(asyncFunc: Function, expExc?: string, mode?: AssertionMode) {
  return asyncFunc().then(
    () => {
      let msg;
      if (typeof expExc === 'undefined') {
        msg = 'There is not any exception';
      } else {
        msg = `There is not expected exception: '${expExc}'`;
      }
      failWrapper(msg, mode);
      return false;
    },
    (e: Error) => {
      const str = e.toString();
      if (typeof expExc === 'undefined') {
        gT.l.pass(`Expected any exception: '${str}'`, mode);
        return true;
      }
      if (str === expExc) {
        gT.l.pass(`Expected exception: '${expExc}'`, mode);
        return true;
      }
      failWrapper(`Actual Exception vs Expected one:\n'${str}'\n'${expExc}'`, mode);
      return false;
    }
  );
}

export function equal(
  val1: any,
  val2: any,
  msg1: string,
  msg2: string,
  doNotShowValues?: boolean,
  mode?: AssertionMode
) {
  if (val1 === val2) {
    if (doNotShowValues) {
      gT.l.pass(`${msg1} === ${msg2}`, mode);
      return true;
    }
    gT.l.pass(`${msg1}: ${val1} === ${msg2}: ${val2}`, mode);
    return true;
  }
  failWrapper(`${msg1}: ${val1} !== ${msg2}: ${val2}`, mode);
  return false;
}

export function equalBool(
  val1: any,
  val2: any,
  msg1: string,
  msg2: string,
  doNotShowValues: boolean,
  mode?: AssertionMode
) {
  val1 = Boolean(val1);
  val2 = Boolean(val2);
  if (val1 === val2) {
    if (doNotShowValues) {
      gT.l.pass(`${msg1} === ${msg2}`, mode);
      return true;
    }
    gT.l.pass(`${msg1} === ${msg2} === ${val1}`, mode);
    return true;
  }
  failWrapper(`${msg1}: ${val1} !== ${msg2}: ${val2}`, mode);
  return false;
}

export function notEqualBool(
  val1: any,
  val2: any,
  msg1: string,
  msg2: string,
  doNotShowValues: boolean,
  mode?: AssertionMode
) {
  val1 = Boolean(val1);
  val2 = Boolean(val2);
  if (val1 !== val2) {
    if (doNotShowValues) {
      gT.l.pass(`${msg1} !== ${msg2}`, mode);
      return true;
    }
    gT.l.pass(`${msg1}: ${val1} !== ${msg2}: ${val2}`, mode);
    return true;
  }
  failWrapper(`${msg1} === ${msg2} === ${val1}`, mode);
  return false;
}
