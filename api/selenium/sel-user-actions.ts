'use strict';

/* eslint-disable no-param-reassign */

// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

import { EnableLog, IdForLog } from '../extjs/new-api/types/ej-types';

const wdKey = gT.sOrig.key;

/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function clickById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Click on element ${id.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).click();
    },
  });
}

/**
 * Right Click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function rClickById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Right Click on element ${id.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id));

      await gT.sOrig.driver
        .actions({ bridge: true })
        .contextClick(el)
        .perform();
    },
  });
}

/**
 * Left mouse button double click to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function dblClickById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Double Click on element ${id.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id));
      await gT.sOrig.driver
        .actions({ bridge: true })
        .doubleClick(el)
        .perform();
    },
  });
}

export function sendEscById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Esc to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.ESCAPE),
  });
}

export function sendDownById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send DOWN to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.DOWN),
  });
}

export function sendEnterById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send ENTER to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.ENTER),
  });
}

export function sendTabById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send TAB to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.TAB),
  });
}

export function sendPgDownById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send PAGE_DOWN to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.PAGE_DOWN),
  });
}

export function sendPgUpById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send PAGE_UP to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.PAGE_UP),
  });
}

export function sendUpById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send UP to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(wdKey.UP),
  });
}

/**
 * Send keys to the web element with specified id.
 *
 * @param id
 * @param keys
 * @param enableLog
 * @returns {Promise.<TResult>}
 */
export function sendKeysById(id, keys, enableLog?: EnableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send keys: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(...keys),
  });
}

export function sendCtrlAAndKeysById(id, keys, enableLog?: EnableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + a and keys: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(id.id))
        .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, ...keys),
  });
}

export function sendCtrlAKeysEnterById(id, keys, enableLog?: EnableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + A, keys, ENTER: "${keys}", to element ${id.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(id.id))
        .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, ...keys, wdKey.ENTER),
  });
}

export function sendCtrlAAndDeleteById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + a and press DELETE for element ${id.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(id.id))
        .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, wdKey.DELETE, wdKey.NULL),
  });
}

export function clearById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Clear element ${id.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).clear(),
  });
}

export function sendKeysToBody(keys, enableLog?: EnableLog) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  return gIn.wrap({
    msg: `Send keys: "${keys}", to body ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(...keys),
  });
}

export function moveMouse(webElement, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: `Move mouse to element with id "${webElement.getId()}" ... `,
    enableLog,
    act: async () => {
      await gT.sOrig.driver
        .actions({ bridge: true })
        .move({
          duration: gT.engineConsts.moveDuration,
          origin: webElement,
          x: 0,
          y: 0,
        })
        .perform();
    },
  });
}

export function moveMouseById(id: IdForLog, enableLog?: EnableLog) {
  id = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Move mouse to element with id "${id.logStr}" ... `,
    enableLog,
    act: async () => {
      await gT.sOrig.driver
        .actions({ bridge: true })
        .move({
          duration: gT.engineConsts.moveDuration,
          origin: gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)),
          x: 0,
          y: 0,
        })
        .perform();
    },
  });
}
