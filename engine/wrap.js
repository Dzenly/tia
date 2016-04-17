'use strict';

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
  if (gIn.config.actionsDelay !== 0) {
    yield flow.timeout(gIn.config.actionsDelay);
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
  if (gIn.config.printClExcAfterEachCommand) {
    yield gT.s.browser.logExceptions();
  }

  if (gIn.config.printClConsoleAfterEachCommand) {
    yield gT.s.browser.logConsoleContent();
  }
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
  var startTime;
  flow.execute(function () {
    gIn.logger.logIfNotDisabled(msg, logAction);
    startTime = startTimer();
  });
  return flow.execute(act).then(
    function (val) {
      flow.execute(function * () {
        gIn.tInfo.addPass(); // will be taken from global sandbox.
        yield *pauseAndLogOk(logAction, startTime, noConsoleAndExceptions);
      });
      return val; // This value will be returned from yield.
    },
    function (err) {
      gIn.tInfo.addFail();
      gIn.logger.errorln('Act.Wrapper.FAIL' + stopTimer(startTime));
      gIn.logger.errorln('========== Err Info Begin ==========');
      gIn.logger.exception('Exception in wrapper: ', err);
      if (typeof gT.sOrig.driver !== 'undefined') {
        /* Here we use selenium GUI stuff when there was gT.s.driver.init call  */
        gIn.tracer.trace1('Act.Wrapper: scheduling screenshot, browser exceptions and browser console logs.');
        gT.s.browser.screenshot();
        gT.s.browser.logExceptions(true);
        gT.s.browser.logConsoleContent();
        gT.s.driver.quit().then(function () {
          gIn.logger.errorln('========== Err Info End ==========');
        });
        delete gT.sOrig.driver;
      } else {
        //gIn.logger.errorln('Info: No selenium driver');
        gIn.logger.errorln('========== Err Info End ==========');
      }

      // return; // If we will return smth here, it will be returned from yield.
      // It can be used for continue testing after fail. It is quite an exotic situation and logs will be undetermined.

      return promise.rejected('Error in action'); // yield will generate exception with this object.
      // Unsafe tests will break test engine.
      // Safe tests silently catch this object. See execGen implementation below for safe tests example.
    });

  // In principle we can do so:
  // var result = flow.execute(); result.then(bla bla bla); return result;
  // But variant above is more flexible.
};
