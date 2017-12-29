'use strict';

const co = require('co');

/* globals gT: true */
/* globals gIn: true */


/*
 Assertions can use results accumulators.
 I.e. the map which remembers if there was some error for current name.
 */

const resultAccumulators = {};

function checkAccName(name) {
  if (typeof name !== 'string') {
    throw new Error('Use string type for accumulator name');
  }
}

exports.initResultsAccumulator = function initResultsAccumulator(name) {
  checkAccName(name);
  resultAccumulators[name] = true;
};

exports.getResultFromAccumulator = function getResultFromAccumulator(name) {
  checkAccName(name);
  return resultAccumulators[name];
};

exports.deleteResultAccumulator = function deleteResultAccumulator(name) {
  checkAccName(name);
  delete resultAccumulators[name];
};

exports.mergeResultToAccumulator = function mergeResultToAccumulator(res, name) {
  checkAccName(name);
  resultAccumulators[name] = resultAccumulators[name] && res;
};

/**
 * For shortening the code.
 * Adds result accumulators usage to fail call.
 * @param msg
 * @param mode
 */
function failWrapper(msg, mode) {
  gT.l.fail(msg);
  if (mode && mode.accName) {
    mode.accName = false;
  }
}

/**
 * The parameter for all assertions.
 * @param {Object} [mode] the mode for pass case.
 * @param {Boolean} [mode.passSilently] - do not show message.
 * @param {Boolean} [mode.noPassIncrement] - do not increment pass counter.
 * @param {Boolean} [mode.accName] - the name for result accumulator which will be falsed if some assertion is failed.
 * /

 /**
 * Checks that specified condition is true.
 * @param condition
 * @param msg - message to describe the entity which you expect.
 */
exports.true = function checkIfTrue(condition, msg, mode) {
  if (condition) {
    gT.l.pass(msg, mode);
    return true;
  }
  failWrapper(msg, mode);
  return false;
};

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg - message to describe the entity which you expect.
 * param {Object} mode - see 'true' assertin description.
 */
exports.false = function checkIfFalse(condition, msg, mode) {
  return exports.true(!condition, msg, mode);
};

/**
 * Checks that value equals to expected value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
exports.value = function value(actVal, expVal, msg, mode) {
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
};

/**
 * Checks that string value representation equals to expected string.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
exports.valueStr = function valueStr(actVal, expVal, msg, mode) {
  actVal = String(actVal);
  expVal = String(expVal);
  return exports.value(actVal, expVal, msg, mode);
};

/**
 * Checks that number value representation equals to expected number.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
exports.valueNumber = function valueNumber(actVal, expVal, msg, mode) {
  actVal = Number(actVal);
  expVal = Number(expVal);
  return exports.value(actVal, expVal, msg, mode);
};

/**
 * Checks that bool value representation equals to expected bool value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
exports.valueBool = function valueBool(actVal, expVal, msg, mode) {
  actVal = Boolean(actVal);
  expVal = Boolean(expVal);
  return exports.value(actVal, expVal, msg, mode);
};

/**
 * Checks that two objects or values are equal.
 * Functions are not supported.
 * @param actVal - actual value.
 * @param expVal - expected value.
 * @param msg - message to describe the entity which you expect.
 * @returns {boolean}
 */
exports.valueDeep = function valueDeep(actVal, expVal, msg, mode) {
  function handleVals(actVal, expVal, path) {
    const actType = typeof actVal;
    const expType = typeof expVal;

    if (actType !== expType) {
      msg += `\nPath: '${path}', Act type: ${actType}, 'Exp type: ${expType}`;
      failWrapper(msg, mode);
      return false;
    }

    if (actType === 'object' && actVal !== null && expVal !== null) {
      const actProps = Object.getOwnPropertyNames(actVal).sort();
      const expProps = Object.getOwnPropertyNames(expVal).sort();

      if (actProps.length !== expProps.length) {
        msg += `\nDifferent property counts, \nPath: '${path}', \nAct props: ${actProps}\nExp props: ${expProps}`;
        failWrapper(msg, mode);
        return false;
      }

      for (let i = 0, len = actProps.length; i < len; i++) {
        const actSubProp = actProps[i];
        const expSubProp = expProps[i];

        if (actSubProp !== expSubProp) {
          msg += `\nPath: '${path}', Property names are different: Act : ${actSubProp}, Exp : ${expSubProp}`;
          failWrapper(msg, mode);
          return false;
        }

        if (!handleVals(actVal[actSubProp], expVal[expSubProp], `${path}/${actSubProp}`)) {
          return false;
        }
      }
    } else if (actVal !== expVal) {
      msg += `\nPath: ${path}, \nAct val: ${actVal}\nExp val: ${expVal}`;
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
};

/**
 * Checks that given func will throw given exception.
 * @param func
 * @param expExc
 * @param mode
 * @return {boolean}
 */
exports.exception = function exception(func, expExc, mode) {
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
};

/**
 *
 * @param yieldable
 * @param expExc
 * @param mode
 * @return {Promise}
 */
exports.exceptionAsync = function exceptionAsync(yieldable, expExc, mode) {
  return gT.u.execGen(yieldable)
    .then((res) => {
      console.log('GOOD');
      let msg;
      if (typeof expExc === 'undefined') {
        msg = 'There is not any exception';
      } else {
        msg = `There is not expected exception: '${expExc}'`;
      }
      failWrapper(msg, mode);
      return false;
    }, (e) => {
      const str = e.toString();
      console.log(`BAD: ${str}`);
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
    });
};

exports.equal = function equal(val1, val2, msg1, msg2, doNotShowValues, mode) {
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
};

exports.equalBool = function equalBool(val1, val2, msg1, msg2, doNotShowValues, mode) {
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
};

exports.notEqualBool = function notEqualBool(val1, val2, msg1, msg2, doNotShowValues, mode) {
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
};

// Silent pass.
// exports.sP = {
//   true: function (condition, msg) {
//     if (Boolean(condition)) {
//       return true;
//     } else {
//       failWrapper(msg, mode);
//       return false;
//     }
//   }
// };
