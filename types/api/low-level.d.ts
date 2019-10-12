/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
export declare function setPassed(newCount: number): void;
/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
export declare function setFailed(newCount: number): void;
/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
export declare function getPassed(): number;
/**
 * Gets fails count for current test.
 * @returns {number}
 */
export declare function getFailed(): number;
/**
 * Enables/disables pass counting.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new value for pass counting.
 * @returns {boolean} - old pass counting value.
 */
export declare function setLlPassCounting(enable: boolean): boolean;
export declare function setLlPassPrinting(enable: boolean): boolean;
/**
 * Enables/disables low level actions logging.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new Log Action value.
 * @returns {boolean} - old Log Action value.
 */
export declare function setDefaultLlLogAction(enable: boolean): boolean;
