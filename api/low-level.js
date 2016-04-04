'use strict';

/* globals gT: true */

/*
 Low level utilities for tests.
 */

var tInfo = gT.tInfo;
var logger = gT.logger;

/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
gT.ll.setPassed = function (passed) {
  tInfo.data.passed = passed;
};

/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
gT.ll.setFailed = function (failed) {
  tInfo.data.failed = failed;
};

/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
gT.ll.getPassed = function () {
  return tInfo.data.passed;
};

/**
 * Gets fails count for current test.
 * @returns {number}
 */
gT.ll.getFailed = function () {
  return tInfo.data.failed;
};

/**
 * Enables/disables pass counting.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new value for pass counting.
 * @returns {boolean} - old pass counting value.
 */
gT.ll.setLlPassCounting = function (enable) {
  var old = gT.tInfo.isPassCountingEnabled;
  gT.tInfo.isPassCountingEnabled = enable;
  return old;
};

/**
 * Enables/disables low level actions logging.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new Log Action value.
 * @returns {boolean} - old Log Action value.
 */
gT.ll.setDefaultLlLogAction = function (enable) {
  var old = gT.logger.defLlLogAction;
  gT.logger.defLlLogAction = enable;
  return old;
};
