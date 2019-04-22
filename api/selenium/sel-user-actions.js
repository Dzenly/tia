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
 * Right Click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.rClickById = function rClickById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Right Click on element ${id.logStr} ... `,
    enableLog,
    async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id));

      await gT.sOrig.driver.actions({ bridge: true })
        .contextClick(el)
        .perform();
    }
  );
};

/**
 * Left mouse button double click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.dblClickById = function dblClickById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Double Click on element ${id.logStr} ... `,
    enableLog,
    async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id));
      await gT.sOrig.driver.actions({ bridge: true })
        .doubleClick(el)
        .perform();
    }
  );
};

exports.sendEscById = function sendDownById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send Esc to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.ESCAPE));
};

exports.sendDownById = function sendDownById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send DOWN to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.DOWN));
};

exports.sendEnterById = function sendEnterById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send ENTER to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.ENTER));
};

exports.sendTabById = function sendTabById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send TAB to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.TAB));
};

exports.sendPgDownById = function sendPgDownById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send PAGE_DOWN to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.PAGE_DOWN));
};

exports.sendPgUpById = function sendPgUpById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send PAGE_UP to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.PAGE_UP));
};

exports.sendUpById = function sendUpById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send UP to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.UP));
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
    `Send keys: "${keys}", to element ${id.logStr} ... `,
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
    `Send Ctrl + a and keys: "${keys}", to element ${id.logStr} ... `,
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
    `Send Ctrl + A, keys, ENTER: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, ...keys, wdKey.ENTER));
};

exports.sendCtrlAAndDeleteById = function sendCtrlAAndDeleteById(id, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Send Ctrl + a and press DELETE for element ${id.logStr} ... `,
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
    `Send keys: "${keys}", to body ... `,
    enableLog,
    () => gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(...keys)
  );
};
