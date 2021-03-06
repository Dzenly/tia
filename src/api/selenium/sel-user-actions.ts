/* eslint-disable no-param-reassign */

// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

import { WebElement } from 'selenium-webdriver';
import { EnableLog, IdForLog, SeleniumKeys } from '../common-types';

/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function clickById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Click on element ${idObj.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      await gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).click();
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
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Right Click on element ${idObj.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id));

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
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Double Click on element ${idObj.logStr} ... `,
    enableLog,
    act: async () => {
      // await gT.s.wait.waitForElementEnabledAndVisibleById(
      //   id,
      //   gT.engineConsts.defaultWaitTimeout,
      //   false,
      // );
      const el = await gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id));
      await gT.sOrig.driver
        .actions({ bridge: true })
        .doubleClick(el)
        .perform();
    },
  });
}

export function sendEscById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Esc to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.ESCAPE),
  });
}

export function sendDownById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send DOWN to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.DOWN),
  });
}

export function sendEnterById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send ENTER to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.ENTER),
  });
}

export function sendTabById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send TAB to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.TAB),
  });
}

export function sendPgDownById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send PAGE_DOWN to element ${idObj.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.PAGE_DOWN),
  });
}

export function sendPgUpById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send PAGE_UP to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.PAGE_UP),
  });
}

export function sendUpById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send UP to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(gT.sOrig.key.UP),
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
export function sendKeysById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog) {
  const selKeys = Array.isArray(keys) ? keys : [keys];
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send keys: "${selKeys}", to element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).sendKeys(...selKeys),
  });
}

export function sendCtrlAAndKeysById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog) {
  const selKeys = Array.isArray(keys) ? keys : [keys];
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + a and keys: "${selKeys}", to element ${idObj.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(idObj.id))
        .sendKeys(gT.sOrig.key.CONTROL, 'a', gT.sOrig.key.NULL, ...selKeys),
  });
}

export function sendCtrlAKeysEnterById(id: IdForLog, keys: SeleniumKeys, enableLog?: EnableLog) {
  const selKeys = Array.isArray(keys) ? keys : [keys];
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + A, keys, ENTER: "${selKeys}", to element ${idObj.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(idObj.id))
        .sendKeys(gT.sOrig.key.CONTROL, 'a', gT.sOrig.key.NULL, ...selKeys, gT.sOrig.key.ENTER),
  });
}

export function sendCtrlAAndDeleteById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Send Ctrl + a and press DELETE for element ${idObj.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .findElement(gT.sOrig.by.id(idObj.id))
        .sendKeys(
          gT.sOrig.key.CONTROL,
          'a',
          gT.sOrig.key.NULL,
          gT.sOrig.key.DELETE,
          gT.sOrig.key.NULL
        ),
  });
}

export function clearById(id: IdForLog, enableLog?: EnableLog) {
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Clear element ${idObj.logStr} ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)).clear(),
  });
}

export function sendKeysToBody(keys: SeleniumKeys, enableLog?: EnableLog) {
  const selKeys = Array.isArray(keys) ? keys : [keys];
  return gIn.wrap({
    msg: `Send keys: "${selKeys}", to body ... `,
    enableLog,
    act: () => gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(...selKeys),
  });
}

export function moveMouse(webElement: WebElement, enableLog?: EnableLog) {
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
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Move mouse to element with id "${idObj.logStr}" ... `,
    enableLog,
    act: async () => {
      await gT.sOrig.driver
        .actions({ bridge: true })
        .move({
          duration: gT.engineConsts.moveDuration,
          origin: gT.sOrig.driver.findElement(gT.sOrig.by.id(idObj.id)),
          x: 0,
          y: 0,
        })
        .perform();
    },
  });
}
