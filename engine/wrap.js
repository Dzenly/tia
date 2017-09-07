'use strict';

let inspect = require('util').inspect;

/* globals gIn: true */

/* globals gT: true */

/**
 * Starts the timer to track action time.
 *
 * @returns {*|Array}
 */
function startTimer() {
  if (gIn.config.enableTimings) {
    return process.hrtime();
  }
}

/**
 * Stops the timer which tracks action time.
 *
 * @param startTime
 * @returns {*} - time diff in milliseconds
 * @private
 */
function stopTimer(startTime) {
  if (gIn.config.enableTimings) {
    let diff = process.hrtime(startTime);
    return ' (' + (diff[0] * 1000 + diff[1] / 1e6) + ' ms)';
  }
  return '';
}

/**
 * Pause. Time interval is specified in config.
 */
function* pause() {
  if (gIn.config.selActionsDelay !== 0) {
    yield Bluebird.delay(gIn.config.selActionsDelay);
  }
}

/**
 * Measures time from action start, pauses (if needed) execution, then prints 'OK'.
 * @param logAction
 * @param startTime
 * @param noConsoleAndExceptions
 */
function* pauseAndLogOk(logAction, startTime, noConsoleAndExceptions) {
  let timeDiff = stopTimer(startTime);
  yield* pause();
  yield gIn.logger.logIfNotDisabled('OK' + timeDiff + '\n', logAction);

  if (noConsoleAndExceptions) {
    return;
  }
  if (gIn.config.selPrintClExcAfterEachCommand) {
    yield gT.s.browser.printCaughtExceptions();
  }

  if (gIn.config.selPrintClConsoleAfterEachCommand) {
    yield gT.s.browser.printSelBrowserLogs();
  }

  yield s.driver.printSelDriverLogs(900);
}

function handleErrAtErrorHandling(msg) {
  gIn.logger.errorln(`${msg} at error handling. The test will be canceled.`);
  gIn.cancelThisTest = true;
  if (gIn.errRecursionCount > gT.engineConsts.maxRecursiveErrCountForTest) {
    if (!gIn.suiteErrRecursionCount) {
      gIn.suiteErrRecursionCount = 1;
    } else {
      gIn.suiteErrRecursionCount++;
      if (gIn.suiteErrRecursionCount > gT.engineConsts.maxTestCountWithRecursiveError) {
        gIn.cancelSuite = true;
        throw new Error(gT.engineConsts.CANCELLING_THE_SUITE);
      }
    }
  }
  throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
}

/**
 *
 * @return {Promise.<TResult>}
 */
function quitDriver() {
  if (gT.sOrig.driver) {
    if (!gIn.params.keepBrowserAtError) {
      gIn.tracer.msg1('A.W.: Driver quit');
      return gT.s.driver.quit(true)
        .then(function () {
          // gIn.logger.errorln('========== Err Info End ==========');
          gIn.tracer.msg1('A.W.: Driver deletion');
          delete gT.sOrig.driver;
          // yield will generate exception with this object.
          throw new Error('A.W.: Force throw error (sel. driver was existed)');
        }).catch(function (err) {
          gIn.logger.errorln('A.W.: catch for driver quit or deletion: ' + err);
          return handleErrAtErrorHandling('Error at quit');
        });
    }
  } else {
    gIn.tracer.msg1('A.W.: quitDriver: Driver is absent');
  }
}

/**
 * Handles an error when webdriver exists and recursion count is zero.
 * Reports various info about the error and quits the driver if there is not
 * keepBrowserAtError flag. Also see gT.s.driver.quit code for conditions when driver
 * will not quit.
 * Then tries to stop the current test case by throwing according error.
 */
function* handleErrorWhenDriverExistsAndRecCountZero() {

  gIn.errRecursionCount = 1; // To prevent recursive error report on error report.
  /* Here we use selenium GUI stuff when there was gT.s.driver.init call  */
  gIn.tracer.msg1('A.W.: Error report: printSelDriverLogs');
  yield s.driver.printSelDriverLogs(900).catch(function (err) {
    gIn.tracer.msg1('Error at printSelDriverLogs at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
  });

  if (!gIn.brHelpersInitiated) {
    gIn.tracer.msg1('A.W.: Error report: initTiaBrHelpers');
    yield gT.s.browser.initTiaBrHelpers(true).catch(function (err) {
      gIn.tracer.msg1('Error at initTiaBrHelpers at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
    });
  }

  gIn.tracer.msg1('A.W.: Error report: printCaughtExceptions');
  yield gT.s.browser.printCaughtExceptions(true).catch(function (err) {
    gIn.tracer.msg1('Error at logExceptions at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
  });

  gIn.tracer.msg1('A.W.: Error report: printSelBrowserLogs');
  yield gT.s.browser.printSelBrowserLogs().catch(function (err) {
    gIn.tracer.msg1('Error at logConsoleContent at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
  });

  gIn.tracer.msg1('A.W.: Error report: screenshot');
  yield gT.s.browser.screenshot().catch(function (err) {
    gIn.tracer.msg1('Error at screenshot at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
  });

  yield quitDriver();

  throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
}

/**
 * Wraps Selenium actions for:
 * logging
 * time measurement purposes.
 * inserts pauses between actions for testing purpose.
 *
 * @param msg - a message to log.
 * @param logAction - is logging enabled.
 * @param act - function.
 * @param noConsoleAndExceptions
 * @returns {*} - Promise will be resolved to value or to exception.
 * @throws - Various errors.
 */
module.exports = function wrap(msg, logAction, act, noConsoleAndExceptions) {
  gIn.tracer.msg3('Inside wrapper, before start timer,  msg: ' + msg);
  let startTime;

  gIn.logger.logIfNotDisabled(msg, logAction);
  startTime = startTimer();
  gIn.tracer.msg3('Inside wrapper, after start timer, msg: ' + msg);

  if (gIn.cancelThisTest) {
    gIn.tracer.msg1('Cancelling action due to gIn.cancelThisTest flag');
    throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
  }

  if (gIn.cancelSuite) {
    gIn.tracer.msg1('Cancelling suite action due to gIn.cancelSuite flag');
    // No process.exit(1), we need to create metalog, send e-mails, etc..
    throw new Error(gT.engineConsts.gT.engineConsts.CANCELLING_THE_SUITE);
  }

  gIn.tracer.msg3('Inside wrapper, before act() call,  msg: ' + msg);

  return Bluebird
    .try(act)
    .timeout(gIn.params.hangTimeout)
    .catch(Bluebird.TimeoutError, function (err) {
      gIn.logger.errorln('A.W.: Hanged action detected');
      if (!gIn.screenShotScheduled) {
        gIn.screenShotScheduled = true;
        gIn.tracer.msg1('A.W.: Getting a screenshot for hanged action.');
        return gT.s.browser.screenshot().catch(function (err) {
          gIn.tracer.err('A.W.: Error at screenshot for hanged action.');
        });
      }
      throw 'A.W.: Timeout expired, your action is considered as hanged.';
      // TODO: Try to cancel promise returned by act() ??.
    })
    .tap(function (val) {
      gIn.tracer.msg3('A.W.: after action execute, msg: ' + msg);
      gIn.tracer.msg3('A.W.: after action execute, val: ' + val);
      return gT.u.iterate(pauseAndLogOk(logAction, startTime, noConsoleAndExceptions));
    })
    .catch(function (err) {
      gIn.tInfo.addFail();
      gIn.logger.errorln('A.W.: FAIL' + stopTimer(startTime));
      gIn.logger.errorln('A.W.: ========== Err Info Begin ==========');
      gIn.logger.errorln('A.W.: Msg was: ' + msg);
      gIn.logger.exception('A.W.: Exception in wrapper: ', err);
      gIn.logger.exception('A.W.: Exception stack: ', err.stack);

      gIn.logger.logResourcesUsage();

      if (gT.sOrig.driver && !gIn.errRecursionCount) {

        return gT.u.execGen(handleErrorWhenDriverExistsAndRecCountZero);

      }

      let driverExisted = Boolean(gT.sOrig.driver);

      // No driver, or non zero errRecursionCount.
      if (!driverExisted) { // No driver.
        gIn.errRecursionCount = 1;
        throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
      }

      // Driver exists and recursion count not zero.

      gIn.errRecursionCount++;
      if (gIn.errRecursionCount > gT.engineConsts.maxRecursiveErrCountForTest) {
        return handleErrAtErrorHandling('A.W.: Recursive error');
      }

      // gIn.logger.errorln('Info: No selenium driver');
      // gIn.logger.errorln('A.W.: ========== Err Info End ==========');

      return quitDriver();

      // yield will generate exception with this object.
      // throw new Error('Error in action. Sel. driver existed: ' + Boolean(driverExisted) +
      //   ', Error recursion at error handling: ' + gIn.errRecursionCount);
    });
};
