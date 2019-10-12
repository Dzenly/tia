/**
 * Saves some object to share it between tests.
 * If an object with the specified key already exist, it is replaced.
 *
 * @param {String} key
 * @param {} value
 */
export declare function save(key: string, value: any): void;
/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
export declare function load(key: string): any;
/**
 * Deletes previously shared object.
 * @param key
 */
declare function deleteData(key: string): void;
export { deleteData as delete };
/**
 * Deletes all shared data.
 */
export declare function clear(): void;
