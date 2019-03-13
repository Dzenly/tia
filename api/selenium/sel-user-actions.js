'use strict';

/* eslint-disable no-param-reassign */

/* globals gT: true */
/* globals gIn: true */

// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

const wdKey = gT.sOrig.key;

/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.clickById = function clickById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Click on element ${id.logStr} ... `,
    enableLog,
    async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).click();
    }
  );
};

/**
 * Send keys to the web element with specified id.
 *
 * @param id
 * @param keys
 * @param enableLog
 * @returns {Promise.<TResult>}
 */
exports.sendKeysById = function sendKeysById(id, keys, enableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Sending keys: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(...keys)
  );
};

exports.sendCtrlAAndKeysById = function sendCtrlAAndKeysById(id, keys, enableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Select all and sending keys: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, ...keys));
};

exports.sendCtrlAKeysEnterById = function sendCtrlAKeysEnterById(id, keys, enableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Select all, sending keys, enter: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, ...keys, wdKey.ENTER));
};

exports.sendCtrlAAndDeleteById = function sendCtrlAAndDeleteById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Select all and press delete for element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, wdKey.DELETE, wdKey.NULL));
};

exports.clearById = function clearById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Clear element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .clear()
  );
};

exports.sendKeysToBody = function sendKeysToBody(keys, enableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  return gIn.wrap(
    `Sending keys: "${keys}", to body ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(...keys)
  );
};
