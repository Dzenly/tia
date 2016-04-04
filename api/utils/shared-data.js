'use strict';

/* globals gT: true */

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
gT.u.sharedData.save = function (key, value) {
  // TODO: move it to some gT.u ? (utils)
  shared[key] = value;
};

/**
 * Loads previously saved object.
 *
 * @param {String} key
 * @returns {*}
 */
gT.u.sharedData.load = function (key) {
  return shared[key];
};

/**
 * Deletes previously shared object.
 * @param key
 */
gT.u.sharedData.delete = function (key) {
  delete shared[key];
};

/**
 * Deletes all shared data.
 */
gT.u.sharedData.clear = function () {
  shared = {};
};
