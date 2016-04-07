'use strict';

/* globals gT: true */

/*
 Low level utilities for tests.
 */

var tInfo = gIn.tInfo;

/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
exports.setPassed = function (passed) {
  tInfo.data.passed = passed;
};

/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
exports.setFailed = function (failed) {
  tInfo.data.failed = failed;
};

/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
exports.getPassed = function () {
  return tInfo.data.passed;
};

/**
 * Gets fails count for current test.
 * @returns {number}
 */
exports.getFailed = function () {
  return tInfo.data.failed;
};

/**
 * Enables/disables pass counting.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new value for pass counting.
 * @returns {boolean} - old pass counting value.
 */
exports.setLlPassCounting = function (enable) {
  var old = gIn.tInfo.isPassCountingEnabled;
  gIn.tInfo.isPassCountingEnabled = enable;
  return old;
};

/**
 * Enables/disables low level actions logging.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new Log Action value.
 * @returns {boolean} - old Log Action value.
 */
exports.setDefaultLlLogAction = function (enable) {
  var old = gIn.logger.defLlLogAction;
  gIn.logger.defLlLogAction = enable;
  return old;
};
