import { IdForLog } from '../common-types';

/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
export function waitForElementById(id: IdForLog, timeout: number, enableLog?: boolean) {
  // eslint-disable-next-line no-param-reassign
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Waiting for element by id ${idObj.logStr} ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.id(idObj.id)), timeout),
  });
}

export function waitForElementEnabledAndVisibleById(
  id: IdForLog,
  timeout: number,
  enableLog?: boolean
) {
  // eslint-disable-next-line no-param-reassign
  const idObj = gT.s.idToIdForLogObj(id);
  return gIn.wrap({
    msg: `Waiting for element enabled and visible by id ${idObj.logStr} ... `,
    enableLog,
    act: async () => {
      const el = await gT.sOrig.driver.wait(
        gT.sOrig.until.elementLocated(gT.sOrig.by.id(idObj.id)),
        timeout
      );
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsVisible(el), timeout);
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsEnabled(el), timeout);
    },
  });
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
export function waitForElementByClassName(className: string, timeout: number, enableLog?: boolean) {
  return gIn.wrap({
    msg: `Waiting for element by class name : "${className}" ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(
        gT.sOrig.until.elementLocated(gT.sOrig.by.className(className)),
        timeout
      ),
  });
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
export function waitForElementByCssSelector(
  selector: string,
  timeout: number,
  enableLog?: boolean
) {
  return gIn.wrap({
    msg: `Waiting for element by css selector : "${selector}" ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.css(selector)), timeout),
  });
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
export function waitForTitle(title: string, timeout: number, enableLog?: boolean) {
  return gIn.wrap({
    msg: `Waiting for windows title: "${title}" ... `,
    enableLog,
    act: () => gT.sOrig.driver.wait(gT.sOrig.until.titleIs(title), timeout),
  });
}

/**
 * Waits for specified URL.
 * @param url
 * @param timeout
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
export function waitForUrl(url: string, timeout: number, enableLog?: boolean) {
  return gIn.wrap({
    msg: `Waiting for URL: "${url}" ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(
        () =>
          gT.sOrig.driver
            .getCurrentUrl()
            .then(actUrl => url === gIn.textUtils.collapseHost(actUrl)),
        timeout
      ),
  });
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
export function waitForUrlPrefix(urlPrefix: string, timeout: number, enableLog?: boolean) {
  return gIn.wrap({
    msg: `Waiting for URL prefix: "${urlPrefix}" ... `,
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(
        () =>
          gT.sOrig.driver
            .getCurrentUrl()
            .then(actUrl => gIn.textUtils.collapseHost(actUrl).startsWith(urlPrefix)),
        timeout
      ),
  });
}
