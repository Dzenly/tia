'use strict';

var inspect = require('util').inspect;

/* globals gIn: true */
/* globals gT: true */

var promise = gT.sOrig.promise;
var flow = gT.sOrig.flow;

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
    var diff = process.hrtime(startTime);
    return ' (' + (diff[0] * 1000 + diff[1] / 1e6) + ' ms)';
  }
  return '';
}

/**
 * Pauses execution flow. Time interval is specified in config.
 */
function *pause() {
  if (gIn.config.selActionsDelay !== 0) {
    yield flow.timeout(gIn.config.selActionsDelay);
  }
}

/**
 * Measures time from action start, pauses (if needed) execution, then prints 'OK'.
 * @param logAction
 * @param startTime
 * @param noConsoleAndExceptions
 */
function *pauseAndLogOk(logAction, startTime, noConsoleAndExceptions) {
  var timeDiff = stopTimer(startTime);
  yield *pause();
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

const CANCELLING_THE_TEST = 'Cancelling the test due to hanging';
const CANCELLING_THE_SUITE = 'Cancelling the suite due to hanging';

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
        return gT.sOrig.promise.rejected(CANCELLING_THE_SUITE);
      }
    }
  }
  return gT.sOrig.promise.rejected(CANCELLING_THE_TEST);
}

/**
 * Wraps Selenium actions for:
 * logging
 * time measurement purposes.
 * inserts pauses between actions for testing purpose.
 *
 * @param msg - a message to log.
 * @param logAction - is logging enabled.
 * @param act - function - generator.
 * @param noConsoleAndExceptions
 * @returns {*} - Promise will be resolved to value or to exception.
 * @private
 */
module.exports = function (msg, logAction, act, noConsoleAndExceptions) {
  gIn.tracer.msg3('Inside wrapper, before start timer,  msg: ' + msg);
  var startTime;
  flow.execute(function () {
    gIn.logger.logIfNotDisabled(msg, logAction);
    startTime = startTimer();
    gIn.tracer.msg3('Inside wrapper, after start timer, msg: ' + msg);
  });
  return flow.execute(function () {
    if (gIn.cancelThisTest) {
      gIn.tracer.msg1('Cancelling action using gIn.cancelThisTest flag');
      return gT.sOrig.promise.rejected(CANCELLING_THE_TEST);
    }
    if (gIn.cancelSuite) {
      gIn.tracer.msg1('Cancelling action using gIn.cancelSuite flag');
      return gT.sOrig.promise.rejected(CANCELLING_THE_SUITE);
    }
    gIn.tracer.msg3('Inside wrapper, before act() call,  msg: ' + msg);
    var actResult = act();
    if (!actResult || !actResult.then) { // If result is not promise.
      return actResult;
    }
    var tId = setTimeout(function () {
      gIn.logger.errorln('Hanged action detected');
      gIn.logger.errorln('ControlFlow state: \n' + flow.getSchedule(false));
      // flow.reset();
      if (!gIn.screenShotScheduled) {
        gIn.screenShotScheduled = true;
        setTimeout(function () { // To use another queue, because next reject will clear this queue.
          flow.execute(function () {
            gIn.tracer.msg1('Getting a screenshot for hanged action.');
            return gT.s.browser.screenshot().catch(function (err) {
              gIn.tracer.err('Error at screenshot for hanged action.');
            });
          });
        }, 0);
      }
      actResult.cancel('Timeout expired, your action is considered as hanged.');
    }, gIn.params.hangTimeout);
    // http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/promise_exports_Promise.html
    // since thenFinally documentation says that it returns result of callback and not original promise,
    // I am really don't know what this function is needed for.
    return actResult
      .then(function (res) {
        gIn.tracer.msg3('Inside wrapper, act().then,  msg: ' + msg);
        clearTimeout(tId);
        return res;
      })
      .catch(function (err) {
        gIn.tracer.err('Inside wrapper, act().catch,  msg: ' + msg);
        gIn.tracer.exc(err);
        clearTimeout(tId);
        // throw err; // TODO: Check that selenium-webdriver implementation indeed complain to the PromiseA+ standard.
        return gT.sOrig.promise.rejected(err);
      });
  })
    .then(
      function (val) {
        gIn.tracer.msg3('Wrapper: after action execute, msg: ' + msg);
        flow.execute(function *() {
          // gIn.tInfo.addPass();
          yield *pauseAndLogOk(logAction, startTime, noConsoleAndExceptions);
        });
        return val; // This value will be returned from yield.
      },
      function (err) {
        gIn.tInfo.addFail();
        gIn.logger.errorln('Act.Wrapper.FAIL' + stopTimer(startTime));
        gIn.logger.errorln('========== Err Info Begin ==========');
        gIn.logger.errorln('Msg was: ' + msg);
        gIn.logger.exception('Exception in wrapper: ', err);
        gIn.logger.exception('Exception stack: ', err.stack);

        gIn.logger.logResourcesUsage();

        if (gT.sOrig.driver && !gIn.errRecursionCount) {
          gIn.errRecursionCount = 1; // To prevent recursive error report on error report.
          /* Here we use selenium GUI stuff when there was gT.s.driver.init call  */
          gIn.tracer.msg1('Act.Wrapper: scheduling screenshot, browser exceptions and browser console logs.');

          s.driver.printSelDriverLogs(900).catch(function (err) {
            gIn.tracer.msg1('Error at printSelDriverLogs at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
          });

          if (!gIn.brHelpersInitiated) {
            gT.s.browser.initTiaBrHelpers(true).catch(function (err) {
              gIn.tracer.msg1('Error at initTiaBrHelpers at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
            });
          }

          gT.s.browser.printCaughtExceptions(true).catch(function (err) {
            gIn.tracer.msg1('Error at logExceptions at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
          });

          gT.s.browser.printSelBrowserLogs().catch(function (err) {
            gIn.tracer.msg1('Error at logConsoleContent at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
          });

          gT.s.browser.screenshot().catch(function (err) {
            gIn.tracer.msg1('Error at screenshot at error handling, driver exists: ' + Boolean(gT.sOrig.driver));
          });

          if (!gIn.params.keepBrowserAtError) {
            return gT.s.driver.quit(true).then(function () {
              gIn.logger.errorln('========== Err Info End ==========');
              gIn.tracer.msg1('sOrig.driver deletion');
              delete gT.sOrig.driver;
              // yield will generate exception with this object.
              return promise.rejected('Error in action (sel. driver was existed)');
            }).catch(function (err) {
              return handleErrAtErrorHandling('Error at quit');
            });
          }
        } else {
          if (!gIn.errRecursionCount) {
            gIn.errRecursionCount = 1;
          } else {
            gIn.errRecursionCount++;
            if (gIn.errRecursionCount > gT.engineConsts.maxRecursiveErrCountForTest) {
              return handleErrAtErrorHandling('Recursive error');
            }
          }
          //gIn.logger.errorln('Info: No selenium driver');
          gIn.logger.errorln('========== Err Info End ==========');
          let driverExisted = Boolean(gT.sOrig.driver);
          if (gT.sOrig.driver) {
            if (!gIn.params.keepBrowserAtError) {
              return gT.s.driver.quit(true)
                .then(function () {
                  gIn.tracer.msg2('sOrig.driver deletion (error at error handling)');
                  delete gT.sOrig.driver;
                }).catch(function (err) {
                  return handleErrAtErrorHandling('Error at quit');
                });
            }
          }
          // yield will generate exception with this object.
          return promise.rejected('Error in action. Sel. driver existed: ' + Boolean(driverExisted) +
            ', Error recursion at error handling: ' + gIn.errRecursionCount);
        }

        // return; // If we will return smth here, it will be returned from yield.
        // It can be used for continue testing after fail. It is quite an exotic situation and logs will be undetermined.

        // Unsafe tests will break test engine.
        // Safe tests silently catch this object. See execGen implementation below for safe tests example.
      });

  // In principle we can do so:
  // var result = flow.execute(); result.then(bla bla bla); return result;
  // But variant above is more flexible.
};
