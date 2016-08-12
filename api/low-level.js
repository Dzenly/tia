'use strict';

/* globals gT: true */

/*
 Low level utilities for tests.
 */

/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
exports.setPassed = function (newCount) {
  gIn.tracer.msg3('Changing passed tests count to ' + newCount);
  gIn.tInfo.data.passed = newCount;
};

/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
exports.setFailed = function (newCount) {
  gIn.tracer.msg3('Changing failed tests count to ' + newCount);
  gIn.tInfo.data.failed = newCount;
};

/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
exports.getPassed = function () {
  return gIn.tInfo.data.passed;
};

/**
 * Gets fails count for current test.
 * @returns {number}
 */
exports.getFailed = function () {
  return gIn.tInfo.data.failed;
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

exports.setLlPassPrinting = function (enable) {
  var old = gIn.tInfo.isPassPrintingEnabled;
  gIn.tInfo.isPassPrintingEnabled = enable;
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
  var old = gIn.loggerCfg.defLLLogAction;
  gIn.loggerCfg.defLLLogAction = enable;
  return old;
};
