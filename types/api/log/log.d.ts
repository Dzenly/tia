import { AssertionMode } from '../common-types';
/**
 * Logs the specified msg.
 */
export declare function print(msg: string): void;
/**
 * Logs the msg and EOL.
 */
export declare function println(msg: string): void;
/**
 * Logs separator.
 */
export declare function sep(): void;
/**
 * Logs End of Line.
 */
export declare function eol(): void;
/**
 * Logs fail with optional msg.
 * Increases fails count.
 * @param [msg] - message to print.
 */
export declare function fail(msg: string): void;
/**
 * Logs Pass with optional msg.
 * Increases passes count.
 * @param msg - msg to log.
 * @param {Object} [mode] the mode
 * @param {Boolean} [mode.passSilently] - do not show message.
 * @param {Boolean} [mode.noPassIncrement] - do not increment pass counter.
 */
export declare function pass(msg: string, mode?: AssertionMode): void;
