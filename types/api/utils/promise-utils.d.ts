export declare function delayed(ms: number, value?: any): Promise<unknown>;
export declare const timeoutError = "timeoutError";
/**
 * Waits a promise for specified timeout.
 *
 * @param {Promise} promiseToWait - promise to wait.
 * @param {number} ms - timeout in milliseconds
 * @returns {Promise} - promise which can be rejected with timeout or with error from promiseToWait.
 * or resolved with result of promiseToWait.
 */
export declare function wait(promiseToWait: Promise<unknown>, ms: number): Promise<unknown>;
