'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
exports.waitForElementById = function waitForElementById(id, timeout, logAction) {

  // eslint-disable-next-line no-param-reassign
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Waiting for element by id ${id.logStr} ... `,
    logAction,
    () => gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.id(id.id)), timeout)
  );
};

exports.waitForElementEnabledAndVisibleById = function waitForElementEnabledAndVisibleById(
  id,
  timeout,
  logAction
) {
  // eslint-disable-next-line no-param-reassign
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Waiting for element enabled and visible by id ${id.logStr} ... `,
    logAction,
    async () => {
      const el = await gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.id(id.id)), timeout);
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsVisible(el, timeout));
      await gT.sOrig.driver.wait(gT.sOrig.until.elementIsEnabled(el, timeout));
    }
  );
};

/**
 * Waits for element with specified CSS class.
 *
 * @param className
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
exports.waitForElementByClassName = function waitForElementByClassName(className, timeout, logAction) {
  return gIn.wrap(
    `Waiting for element by class name : "${className}" ... `,
    logAction,
    () => gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.className(className)), timeout)
  );
};

/**
 * Waits for element with specified CSS selector.
 *
 * @param selector
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
exports.waitForElementByCssSelector = function waitForElementByCssSelector(selector, timeout, logAction) {
  return gIn.wrap(
    `Waiting for element by css selector : "${selector}" ... `,
    logAction,
    () => gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.css(selector)), timeout)
  );
};

/**
 * Waits for specified page title.
 *
 * @param title
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.waitForTitle = function waitForTitle(title, timeout, logAction) {
  return gIn.wrap(
    `Waiting for windows title: "${title}" ... `,
    logAction,
    () => gT.sOrig.driver.wait(gT.sOrig.until.titleIs(title), timeout)
  );
};

/**
 * Waits for specified URL.
 * @param url
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.waitForUrl = function waitForUrl(url, timeout, logAction) {
  return gIn.wrap(
    `Waiting for URL: "${url}" ... `,
    logAction,
    () => gT.sOrig.driver.wait(
      () => gT.sOrig.driver.getCurrentUrl()
        .then(actUrl => url === gIn.textUtils.collapseHost(actUrl)),
      timeout
    )
  );
};

/**
 * Waits for some URL which starts with specified urlPrefix.
 *
 * @param urlPrefix
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.waitForUrlPrefix = function waitForUrlPrefix(urlPrefix, timeout, logAction) {
  return gIn.wrap(
    `Waiting for URL prefix: "${urlPrefix}" ... `,
    logAction,
    () => gT.sOrig.driver.wait(
      () => gT.sOrig.driver.getCurrentUrl()
        .then(actUrl => gIn.textUtils.collapseHost(actUrl).indexOf(urlPrefix) === 0),
      timeout
    )
  );
};
