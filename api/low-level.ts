'use strict';

/* globals gIn: true */

/*
 Low level utilities for tests.
 */

/**
 * Sets passes count for current test.
 * Can be used for debug.
 */
export function setPassed(newCount: number) {
  gIn.tracer.msg3(`Changing passed tests count to ${newCount}`);
  gIn.tInfo.setPassed(newCount);
};

/**
 * Sets fails count for current test.
 * Can be used for debug.
 */
export function setFailed(newCount: number) {
  gIn.tracer.msg3(`Changing failed tests count to ${newCount}`);
  gIn.tInfo.setFailed(newCount);
};

/**
 * Gets passes count for current test.
 *
 * @returns {number}
 */
export function getPassed() {
  return gIn.tInfo.getPassed();
};

/**
 * Gets fails count for current test.
 * @returns {number}
 */
export function getFailed() {
  return gIn.tInfo.getFailed();
};

/**
 * Enables/disables pass counting.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new value for pass counting.
 * @returns {boolean} - old pass counting value.
 */
export function setLlPassCounting(enable: boolean) {
  const old = gIn.tInfo.getPassCountingEnabled();
  gIn.tInfo.setPassCountingEnabled(enable);
  return old;
};

export function setLlPassPrinting(enable: boolean) {
  const old = gIn.tInfo.getPassPrintingEnabled();
  gIn.tInfo.setPassPrintingEnabled(enable);
  return old;
};

/**
 * Enables/disables low level actions logging.
 * It can be useful for high level functions creation.
 *
 * @param {boolean} enable - new Log Action value.
 * @returns {boolean} - old Log Action value.
 */
export function setDefaultLlLogAction(enable: boolean) {
  const old = gIn.loggerCfg.getDefLLLogAction();
  gIn.loggerCfg.setDefLLLogAction(enable);
  return old;
};
