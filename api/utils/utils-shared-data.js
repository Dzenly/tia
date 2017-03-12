'use strict';

var shared = {};

//  TODO shared data - sd.

// Utilities for work with files.

/**
 * Saves some object to share it between tests.
 * If an object with the specified key already exist, it is replaced.
 *
 * @param {String} key
 * @param {} value
 */
exports.save = function save(key, value) {
  // TODO: move it to some gT.u ? (utils)
  shared[key] = value;
};

/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
exports.load = function load(key) {
  return shared[key];
};

/**
 * Deletes previously shared object.
 * @param key
 */
exports.delete = function delete1(key) { // TODO: change.
  delete shared[key];
};

/**
 * Deletes all shared data.
 */
exports.clear = function clear() {
  shared = {};
};
