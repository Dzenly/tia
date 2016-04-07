'use strict';
/* globals gT: true */
/* globals gIn: true */

// exports.waitAppReady = function(timeout, logAction) {
// 	return gIn.wrap('Waiting for App Ready ... ', logAction, function() {
// 		return gT.sOrig.driver.wait(gT.rv.isExtAppReady, timeout).then(
// 				function() {
// 					return gT.sOrig.driver.executeScript("return rvTestHelper.getScreenResolution()").then(function(res) {
// 						// Save resolution to emulate maximize.
// 						gT.browser.width = res.width;
// 						gT.browser.height = res.height;
// 					});
// 				}
// 		);
// 	});
// };

/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
exports.waitForElementById = function (id, timeout, logAction) {
  return gIn.wrap('Waiting for element by id : "' + id + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(by.id(id)), timeout);
  });
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
exports.waitForElementByClassName = function (className, timeout, logAction) {
  return gIn.wrap('Waiting for element by class name : "' + className + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.className(className)), timeout);
  });
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
exports.waitForElementByCssSelector = function (selector, timeout, logAction) {
  return gIn.wrap('Waiting for element by css selector : "' + selector + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.sOrig.until.elementLocated(gT.sOrig.by.css(selector)), timeout);
  });
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
exports.waitForTitle = function (title, timeout, logAction) {
  return gIn.wrap('Waiting for windows title: "' + title + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.sOrig.until.titleIs(title), timeout);
  });
};

/**
 * Waits for specified URL.
 * @param expUrl
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.waitForUrl = function (expUrl, timeout, logAction) {
  return gIn.wrap('Waiting for URL: "' + expUrl + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.sOrig.driver.getCurrentUrl().then(function (actUrl) {
        return expUrl === gIn.textUtils.collapseHost(actUrl);
      });
    }, timeout);
  });
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
exports.waitForUrlPrefix = function (urlPrefix, timeout, logAction) {
  return gIn.wrap('Waiting for URL prefix: "' + urlPrefix + '" ... ', logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.sOrig.driver.getCurrentUrl().then(function (actUrl) {
        return 0 === gIn.textUtils.collapseHost(actUrl).indexOf(urlPrefix);
      });
    }, timeout);
  });
};
