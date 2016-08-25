'use strict';
/* globals gT: true */
/* globals gIn: true */

// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

let wdKey = gT.sOrig.key;

/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.clickById = function (id, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Click on element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).click();
  });
};

/**
 * Send keys to the web element with specified id.
 *
 * @param id
 * @param keys
 * @param logAction
 * @returns {Promise.<TResult>}
 */
exports.sendKeysById = function (id, keys, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Sending keys: "${keys}", to element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(keys);
  });
};

exports.selectAllAndSendKeysById = function (id, keys, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Select all and sending keys: "${keys}", to element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, keys);
  });
};

exports.selectAllAndDeleteById = function (id, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Select all and press delete for element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .sendKeys(wdKey.CONTROL, 'a', wdKey.NULL, wdKey.DELETE, wdKey.NULL);
  });
};

exports.clearById = function (id, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Clear element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id))
      .clear();
  });
};

exports.sendKeysToBody = function (keys, logAction) {
  return gIn.wrap('Sending keys: "' + keys + '", to body ... ', logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(keys);
  });
};

