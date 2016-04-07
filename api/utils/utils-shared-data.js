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
exports.save = function (key, value) {
  // TODO: move it to some gT.u ? (utils)
  shared[key] = value;
};

/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
exports.load = function (key) {
  return shared[key];
};

/**
 * Deletes previously shared object.
 * @param key
 */
exports.delete = function (key) {
  delete shared[key];
};

/**
 * Deletes all shared data.
 */
exports.clear = function () {
  shared = {};
};
