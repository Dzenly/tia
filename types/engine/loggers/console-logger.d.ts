/**
 * Inner utilities for logging into console.
 * gIn.cLogger.
 */
/**
 * Writes message to stdout as is.
 * @param message
 */
export declare function msg(message: string): void;
export declare function msgln(message: string): void;
export declare function logResourcesUsage(prefix?: string): void;
/**
 *
 * @param chalkProps - string or array.
 * @param message
 * @returns {*}
 */
export declare function chalkWrap(chalkProps: string | string[], message: string): string;
/**
 * Writes string from dif to console.
 * @param message
 */
export declare function msgDifStr(message: string): void;
/**
 * Writes string for debug tracing.
 * @param message
 */
export declare function msgDbg(message: string): void;
/**
 * Writes msg to stdout using red ANSI color code.
 * @param message
 */
export declare function err(message: string): void;
export declare function errln(message: string): void;
/**
 * Writes msg to stdout if corresponding parameter is specified in cmd line.
 * Otherwise - does nothing.
 * @param message
 */
export declare function logIfEnabled(message: string): void;
/**
 *
 * @param message
 * Prefix should be set in caller.
 */
export declare function errIfEnabled(message: string): void;
export declare function passIfEnabled(message: string): void;
export declare function failIfEnabled(message: string): void;
export declare function logBold(message: string): void;
