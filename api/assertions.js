'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Checks that specified condition is true.
 * @param condition
 * @param msg
 */
exports.true = function (condition, msg) {
  var logStr;
  if (Boolean(condition)) {
    logStr = msg;
    gT.l.pass(logStr);
  } else {
    logStr = msg;
    gT.l.fail(logStr);
  }
};

/**
 * Checks that specified condition is false.
 * @param condition
 * @param msg
 */
exports.false = function (condition, msg) {
  return exports.true(!Boolean(condition), false);
};

/**
 * Checks that value equals to expected value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to log.
 * @returns {Boolean} comparision result.
 */
exports.equal = function (actVal, expVal, msg) {
  if (typeof msg !== 'undefined') {
    if (actVal === expVal) {
      gT.l.pass(msg + ': ' + actVal);
      return true;
    } else {
      msg += '\nAct: ' + actVal + '\nExp: ' + expVal;
      gT.l.fail(msg);
      return false;
    }
  } else {
    if (actVal === expVal) {
      msg = 'Act: "' + actVal + '" = Exp: "' + expVal + '"';
      // TODO: (Yellow color ??) It is strange situation to compare smth without message.
      gT.l.pass(msg);
      return true;
    } else {
      msg = 'Equality checking:\nAct: ' + actVal + '\nExp: "' + expVal;
      gT.l.fail(msg);
      return false;
    }
  }
};

/**
 * Checks that two objects or values are equal.
 * Functions are not supported.
 * @param actVal - actual value.
 * @param expVal - expected value.
 * @param msg - message to log.
 * @returns {boolean}
 */
exports.equalDeep = function (actVal, expVal, msg) {

  function handleVals(actVal, expVal, path) {
    let actType = typeof actVal;
    let expType = typeof expVal;

    if (actType !== expType) {
      msg += `\nPath: '${path}', Act type: ${actType}, 'Exp type: ${expType}`;
      gT.l.fail(msg);
      return false;
    }

    if (actType === 'object' && actVal !== null && expVal !== null) {
      let actProps = Object.getOwnPropertyNames(actVal).sort();
      let expProps = Object.getOwnPropertyNames(expVal).sort();

      if (actProps.length !== expProps.length) {
        msg += `\nDifferent property counts, \nPath: '${path}', \nAct props: ${actProps}\nExp props: ${expProps}`;
        gT.l.fail(msg);
        return false;
      }

      for (var i = 0, len = actProps.length; i < len; i++) {
        let actSubProp = actProps[i];
        let expSubProp = expProps[i];

        if (actSubProp !== expSubProp) {
          msg += `\nPath: '${path}', Property names are different: Act : ${actSubProp}, Exp : ${expSubProp}`;
          gT.l.fail(msg);
          return false;
        }

        if (!handleVals(actVal[actSubProp], expVal[expSubProp], path + '/' + actSubProp)) {
          return false;
        }
      }
    } else {
      if (actVal !== expVal) {
        msg += `\nPath: ${path}, \nAct val: ${actVal}\nExp val: ${expVal}`;
        gT.l.fail(msg);
        return false;
      }
    }
    return true;
  }

  var res = handleVals(actVal, expVal, '');
  if (res) {
    gT.l.pass(msg); // There is no sense to print [object Object].
    return true;
  }
  return false;
};

exports.exception = function (func, expExc) {
  try {
    func();
    var msg;
    if (typeof expExc === 'undefined') {
      msg = 'There is not any exception';
    } else {
      msg = `There is not expected exception: '${expExc}'`;
    };
    gT.l.fail(msg);
    return false;
  } catch (e) {
    var str = e.toString();

    if (typeof expExc === 'undefined') {
      gT.l.pass(`Expected any exception: '${str}'`)
      return true;
    }

    if (str === expExc) {
      gT.l.pass(`Expected exception: '${expExc}'`);
      return true;
    }
    gT.l.fail(`Actual Exception: '${str}'\nExpected Exception: '${expExc}'`);
    return false;

  }
};
