'use strict';

exports.delayed = function delayed(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
};

exports.timeoutError = 'timeoutError';

/**
 * Waits a promise for specified timeout.
 *
 * @param {Promise} promiseToWait - promise to wait.
 * @param {number} ms - timeout in milliseconds
 * @returns {Promise} - promise which can be rejected with timeout or with error from promiseToWait.
 * or resolved with result of promiseToWait.
 */
exports.wait = function wait(promiseToWait, ms) {
  let rejectBecauseTimeout = true;
  return new Promise((resolve, reject) => {
    promiseToWait.then((result) => {
      rejectBecauseTimeout = false;
      resolve(result);
    }).catch((err) => {
      rejectBecauseTimeout = false;
      reject(err);
    });

    setTimeout(() => {
      if (rejectBecauseTimeout) {
        reject(exports.timeoutError);
      }
    }, ms);
  });
};
