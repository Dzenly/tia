/**
 * **Test description**.
 */
/**
 * Safely runs generator.
 * All exceptions are catched and logged.
 *
 * @param gen
 */
declare function iterateIterator(iterator: Iterator<any>): Promise<unknown>;
export { iterateIterator as iterate };
export declare function iterateSafe(iterator: Iterator<any>): Promise<unknown>;
export declare function execGenSafe(gen: Function, ...params: any): Promise<unknown>;
/**
 * Runs function - generator.
 * Note: the function uses flow and Promise from selenium webdriver.
 *
 * @param gen - function - generator.
 * @returns {Promise}
 */
export declare function execGen(gen: Function, param1: any, param2: any): Promise<unknown>;
export declare function setHangTimeout(newTimeout: number): number;
export declare function isWindows(): boolean;
