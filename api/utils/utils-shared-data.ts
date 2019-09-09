'use strict';

let shared = {};

//  TODO shared data - sd.

// Utilities for work with files.

/**
 * Saves some object to share it between tests.
 * If an object with the specified key already exist, it is replaced.
 *
 * @param {String} key
 * @param {} value
 */
export function save(key, value) {
  // TODO: move it to some gT.u ? (utils)
  shared[key] = value;
};

/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
export function load(key) {
  return shared[key];
};

/**
 * Deletes previously shared object.
 * @param key
 */
function deleteData(key) { // TODO: change.
  delete shared[key];
};

export { deleteData as delete };

/**
 * Deletes all shared data.
 */
export function clear() {
  shared = {};
};
