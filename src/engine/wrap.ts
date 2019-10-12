

// const { inspect } = require('util');

/* globals gIn, gT: true */

import { EnableLog } from '../api/common-types';

/**
 * Starts the timer to track action time.
 *
 * @returns {*|Array}
 */
function startTimer() {
  if (gT.config.enableTimings) {
    return process.hrtime();
  }
}

/**
 * Stops the timer which tracks action time.
 *
 * @param startTime
 * @returns {*} - time dif in milliseconds
 * @private
 */
function stopTimer(startTime?: [number, number]) {
  if (gT.config.enableTimings) {
    const dif = process.hrtime(startTime);
    return ` (${dif[0] * 1000 + dif[1] / 1e6} ms)`;
  }
  return '';
}

/**
 * Pause. Time interval is specified in config.
 */
async function pause() {
  if (gT.cLParams.selActsDelay) {
    await gT.u.promise.delayed(gT.cLParams.selActsDelay);
  }
}

/**
 * Measures time from action start, pauses (if needed) execution, then prints 'OK'.
 * @param enableLog
 * @param startTime
 * @param noConsoleAndExceptions
 */
async function pauseAndLogOk(
  enableLog: boolean | undefined,
  startTime: [number, number] | undefined,
  noConsoleAndExceptions: boolean | undefined
) {
  const timeDiff = stopTimer(startTime);
  await pause();
  await gIn.logger.logIfNotDisabled(`OK${timeDiff}\n`, enableLog);

  if (noConsoleAndExceptions) {
    return;
  }
  if (gT.config.selPrintClExcAfterEachCommand) {
    await gT.s.browser.printCaughtExceptions();
  }

  if (gT.config.selPrintClConsoleAfterEachCommand) {
    await gT.s.browser.printSelBrowserLogs();
  }

  await gT.s.driver.printSelDriverLogs(900);
}

function handleErrAtErrorHandling(msg: string) {
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
    if (!gT.cLParams.keepBrowserAtError) {
      gIn.tracer.msg1('A.W.: Driver quit');
      return gT.s.driver
        .quit(true)
        .then(() => {
          // gIn.logger.errorln('========== Err Info End ==========');
          gIn.tracer.msg1('A.W.: Driver deletion');
          delete gT.sOrig.driver;

          // await will generate exception with this object.
          throw new Error('A.W.: Force throw error (sel. driver was existed)');
        })
        .catch((err: Error) => {
          gIn.logger.errorln(`A.W.: catch for driver quit or deletion: ${err}`);
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
async function handleErrorWhenDriverExistsAndRecCountZero() {
  gIn.errRecursionCount = 1; // To prevent recursive error report on error report.
  /* Here we use selenium GUI stuff when there was gT.s.driver.init call  */
  gIn.tracer.msg1('A.W.: Error report: printSelDriverLogs');
  await gT.s.driver.printSelDriverLogs(900).catch(() => {
    gIn.tracer.msg1(
      `Error at printSelDriverLogs at error handling, driver exists: ${Boolean(gT.sOrig.driver)}`
    );
  });

  if (!gIn.brHelpersInitiated) {
    gIn.tracer.msg1('A.W.: Error report: initTiaBrHelpers');
    await gT.s.browser.initTiaBrHelpers(true).catch(() => {
      gIn.tracer.msg1(
        `Error at initTiaBrHelpers at error handling, driver exists: ${Boolean(gT.sOrig.driver)}`
      );
    });
  }

  gIn.tracer.msg1('A.W.: Error report: printCaughtExceptions');
  await gT.s.browser.printCaughtExceptions(true).catch(() => {
    gIn.tracer.msg1(
      `Error at logExceptions at error handling, driver exists: ${Boolean(gT.sOrig.driver)}`
    );
  });

  gIn.tracer.msg1('A.W.: Error report: printSelBrowserLogs');
  await gT.s.browser.printSelBrowserLogs().catch(() => {
    gIn.tracer.msg1(
      `Error at logConsoleContent at error handling, driver exists: ${Boolean(gT.sOrig.driver)}`
    );
  });

  gIn.tracer.msg1('A.W.: Error report: screenshot');
  await gT.s.browser.screenshot().catch(() => {
    gIn.tracer.msg1(
      `Error at screenshot at error handling, driver exists: ${Boolean(gT.sOrig.driver)}`
    );
  });

  await quitDriver();

  throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
}

/**
 * Function to be wrapped.
 */
export type actFunc = () => Promise<any>;

/**
 * Wraps Selenium actions for:
 * logging
 * time measurement purposes.
 * inserts pauses between actions for testing purpose.
 *
 * @param {Object|String} msg - a message to log. String msg is deprecated.
 * @param enableLog - is logging enabled.
 * @param act - function.
 * @param noConsoleAndExceptions (?? for error handling inside error handling ?)
 * @returns {*} - Promise will be resolved to value or to exception.
 * @throws - Various errors.
 */
// eslint-disable-next-line max-params
export default async function wrap({
  msg,
  enableLog,
  act,
  noConsoleAndExceptions,
}: {
  msg: string;
  enableLog?: EnableLog;
  act: actFunc;
  noConsoleAndExceptions?: boolean;
}): Promise<any> {
  // if (typeof msg === 'object') {
  //   // esling-disable-next-line no-param-reassign
  //   ({
  //     // eslint-disable-next-line no-param-reassign
  //     msg,
  //     enableLog,
  //     act,
  //     noConsoleAndExceptions,
  //   } = msg);
  // }

  gIn.tracer.msg3(`Inside wrapper, before start timer,  msg: ${msg}`);

  gIn.logger.logIfNotDisabled(msg, enableLog);
  const startTime = startTimer();
  gIn.tracer.msg3(`Inside wrapper, after start timer, msg: ${msg}`);

  if (gIn.cancelThisTest) {
    gIn.tracer.msg1('Cancelling action due to gIn.cancelThisTest flag');
    throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
  }

  if (gIn.cancelSuite) {
    gIn.tracer.msg1('Cancelling suite action due to gIn.cancelSuite flag');

    // No process.exit(1), we need to create suitelog, send e-mails, etc..
    throw new Error(gT.engineConsts.CANCELLING_THE_SUITE);
  }

  gIn.tracer.msg3(`Inside wrapper, before act() call,  msg: ${msg}`);

  const actResultPromise = act();

  let result; // Return value from wrapped function.

  try {
    result = await gT.u.promise.wait(actResultPromise, gT.cLParams.hangTimeout);
  } catch (err) {
    if (err.name === 'TimeoutError' || err === gT.u.promise.timeoutError) {
      gIn.logger.errorln('A.W.: Hanged action detected');
      if (!gIn.screenShotScheduled) {
        gIn.screenShotScheduled = true;
        gIn.tracer.msg1('A.W.: Getting a screenshot for hanged action.');
        return gT.s.browser.screenshot().catch(() => {
          gIn.tracer.err('A.W.: Error at screenshot for hanged action.');
        });
      }
      throw new Error('A.W.: Timeout expired, your action is considered as hanged.');
    }

    gIn.tInfo.addFail();
    gIn.logger.errorln(`\nA.W.: FAIL${stopTimer(startTime)}`);
    gIn.logger.errorln('A.W.: ========== Err Info Begin ==========');
    gIn.logger.errorln(`A.W.: Msg was: ${msg}`);
    gIn.logger.exception('A.W.: Exception in wrapper:\n', err.toString());
    gIn.logger.exception('A.W.: Exception stack:\n', err.stack);

    // if (!gIn.errRecursionCount) {
    //     gIn.logger.logResourcesUsage();
    // }

    if (gT.sOrig.driver && !gIn.errRecursionCount) {
      return handleErrorWhenDriverExistsAndRecCountZero();
    }

    const driverExisted = Boolean(gT.sOrig.driver);

    // No driver, or non zero errRecursionCount.
    if (!driverExisted) {
      // No driver.
      gIn.errRecursionCount = 1;
      throw new Error(gT.engineConsts.CANCELLING_THE_TEST);
    }

    // Driver exists and recursion count not zero.

    gIn.errRecursionCount++;
    if (gIn.errRecursionCount > gT.engineConsts.maxRecursiveErrCountForTest) {
      return handleErrAtErrorHandling('A.W.: Recursive error');
    }

    gIn.logger.errorln('A.W.: ========== Err Info End ==========');

    await quitDriver();

    throw new Error(
      `Error in action. Sel. driver existed: ${Boolean(driverExisted)}` +
        `, Error recursion count at error handling: ${gIn.errRecursionCount}`
    );
  }

  gIn.tracer.msg3(`A.W.: after action execute, msg: ${msg}`);
  gIn.tracer.msg3(`A.W.: after action execute, val: ${result}`);
  gIn.tracer.msg3(`A.W.: after action execute, act: ${act}`);
  await pauseAndLogOk(enableLog, startTime, noConsoleAndExceptions);
  return result;
}
