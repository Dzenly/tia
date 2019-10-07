

let shared: any = {};

//  TODO shared data - sd.

// Utilities for work with files.

/**
 * Saves some object to share it between tests.
 * If an object with the specified key already exist, it is replaced.
 *
 * @param {String} key
 * @param {} value
 */
export function save(key: string, value: any) {
  // TODO: move it to some gT.u ? (utils)
  shared[key] = value;
};

/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
export function load(key: string) {
  return shared[key];
};

/**
 * Deletes previously shared object.
 * @param key
 */
function deleteData(key: string) { // TODO: change.
  delete shared[key];
};

export { deleteData as delete };

/**
 * Deletes all shared data.
 */
export function clear() {
  shared = {};
};
