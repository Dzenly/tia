import { EnableLog } from '../api/common-types';
/**
 * Function to be wrapped.
 */
export declare type actFunc = () => Promise<any>;
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
export default function wrap({ msg, enableLog, act, noConsoleAndExceptions, }: {
    msg: string;
    enableLog?: EnableLog;
    act: actFunc;
    noConsoleAndExceptions?: boolean;
}): Promise<any>;
