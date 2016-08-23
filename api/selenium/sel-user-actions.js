'use strict';
/* globals gT: true */
/* globals gIn: true */

/**
 * Clicks to element specified by id.
 *
 * @param id
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.clickById = function (id, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Click on element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).click();
  });
};

// /**
//  * Clicks to element specified by id. msg is logged instead of id.
//  *
//  * @param id
//  * @param msg
//  * @param logAction -  enable/disable logging for this action.
//  * @returns {Promise.<TResult>}
//  */
// exports.clickByDynamicId = function (id, msg, logAction) {
//   return gIn.wrap('Click on element : "' + msg + '" ... ', logAction, function () {
//     return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
//   });
// };

/**
 * Send keys to the web element with specified id.
 *
 * @param id
 * @param keys
 * @param logAction
 * @returns {Promise.<TResult>}
 */
exports.sendKeysById = function (id, keys, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Sending keys: "${keys}", to element ${id.logStr} ... `, logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.id(id.id)).sendKeys(keys);
  });
};

// /**
//  * Sends keys to element by dynamically generated id.
//  * Logs msg instead of id.
//  *
//  * @param id
//  * @param keys
//  * @param msg
//  * @param logAction
//  * @returns {Promise.<TResult>}
//  */
// exports.sendKeysByDynamicId = function (id, keys, msg, logAction) {
//   return gIn.wrap('Sending keys: "' + keys + '", to element: "' + msg + '" ... ', logAction, function () {
//     return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).sendKeys(keys);
//   });
// };

exports.sendKeysToBody = function (keys, logAction) {
  return gIn.wrap('Sending keys: "' + keys + '", to body ... ', logAction, function () {
    return gT.sOrig.driver.findElement(gT.sOrig.by.css('body')).sendKeys(keys);
  });
};

