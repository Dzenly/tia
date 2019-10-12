

export function delayed(ms: number, value?: any) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

export const timeoutError = 'timeoutError';

/**
 * Waits a promise for specified timeout.
 *
 * @param {Promise} promiseToWait - promise to wait.
 * @param {number} ms - timeout in milliseconds
 * @returns {Promise} - promise which can be rejected with timeout or with error from promiseToWait.
 * or resolved with result of promiseToWait.
 */
export function wait(promiseToWait: Promise<unknown>, ms: number) {
  let rejectBecauseTimeout = true;
  return new Promise((resolve, reject) => {
    let timeoutId: NodeJS.Timeout | null = null;

    promiseToWait
      .then(result => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        rejectBecauseTimeout = false;
        resolve(result);
      })
      .catch(err => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        rejectBecauseTimeout = false;
        reject(err);
      });

    timeoutId = setTimeout(() => {
      if (rejectBecauseTimeout) {
        reject(timeoutError);
      }
    }, ms);
  });
}
