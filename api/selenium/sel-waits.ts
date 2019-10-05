'use strict';

/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export function waitForElementById(id: any, timeout: number, enableLog: boolean) {
  // eslint-disable-next-line no-param-reassign
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Waiting for element by id ${id.logStr} ... `, enableLog, () =>
    gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.id(id.id)), timeout)
  );
}

export function waitForElementEnabledAndVisibleById(
  id: string,
  timeout: number,
  enableLog: boolean
) {
  // eslint-disable-next-line no-param-reassign
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Waiting for element enabled and visible by id ${id.logStr} ... `,
    enableLog,
    async () => {
      const el = await gT.sOrig.driver.wait(
        gT.sOrig.until.elementLocated(gT.sOrig.by.id(id.id)),
        timeout
      );
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsVisible(el, timeout));
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsEnabled(el, timeout));
    }
  );
}

/**
 * Waits for element with specified CSS class.
 *
 * @param className
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export function waitForElementByClassName(className, timeout: number, enableLog: boolean) {
  return gIn.wrap(`Waiting for element by class name : "${className}" ... `, enableLog, () =>
    gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.className(className)), timeout)
  );
}

/**
 * Waits for element with specified CSS selector.
 *
 * @param selector
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export function waitForElementByCssSelector(selector, timeout: number, enableLog: boolean) {
  return gIn.wrap(`Waiting for element by css selector : "${selector}" ... `, enableLog, () =>
    gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.css(selector)), timeout)
  );
}

/**
 * Waits for specified page title.
 *
 * @param title
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export function waitForTitle(title, timeout: number, enableLog: boolean) {
  return gIn.wrap(`Waiting for windows title: "${title}" ... `, enableLog, () =>
    gT.sOrig.driver.wait(gT.sOrig.until.titleIs(title), timeout)
  );
}

/**
 * Waits for specified URL.
 * @param url
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export function waitForUrl(url, timeout: number, enableLog: boolean) {
  return gIn.wrap(`Waiting for URL: "${url}" ... `, enableLog, () =>
    gT.sOrig.driver.wait(
      () =>
        gT.sOrig.driver.getCurrentUrl().then(actUrl => url === gIn.textUtils.collapseHost(actUrl)),
      timeout
    )
  );
}

/**
 * Waits for some URL which starts with specified urlPrefix.
 *
 * @param urlPrefix
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export function waitForUrlPrefix(urlPrefix, timeout: number, enableLog: boolean) {
  return gIn.wrap(`Waiting for URL prefix: "${urlPrefix}" ... `, enableLog, () =>
    gT.sOrig.driver.wait(
      () =>
        gT.sOrig.driver
          .getCurrentUrl()
          .then(actUrl => gIn.textUtils.collapseHost(actUrl).startsWith(urlPrefix)),
      timeout
    )
  );
}
