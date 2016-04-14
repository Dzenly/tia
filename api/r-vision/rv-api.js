'use strict';
/* globals gT: true */
/* globals gIn: true */

// TODO: Заменить эти проверки ready на ожидание какого-то объекта.
// exports.isAppReady = function () {
//   return gT.sOrig.driver.executeScript('return !!window.tia');
// };
//
// exports.isExtAppReady = function () {
//   return gT.sOrig.driver.executeScript('return !!window.Ext')
//     .then(function (res) {
//       if (res) {
//         gIn.tracer.trace1('isExtAppReady: Ext found');
//         return gT.sOrig.driver.executeScript('return !!window.R && !!initTiaExtJs');
//       }
//     })
//     .then(function (res) {
//       if (res) {
//         gIn.tracer.trace1('isExtAppReady: R, initTiaExtJs');
//         return gT.sOrig.driver.executeScript('return initTiaExtJs()');
//       }
//     }).then(function (res) {
//       gIn.tracer.trace1('initTiaExtJs returned: ' + res);
//       return res;
//     });
// };

/**
 *  Waits for R-Vision non ExtJs objects to be ready.
 *  After this, one can start work with R-Vision non-ExtJs application (say, login window).
 *  TODO: move to separate module, probably private one.
 *
 * @param timeout
 * @param logAction
 *
 * @returns {Promise} - waiting result.
 */
// exports.waitForAppReady = function (timeout, logAction) {
//   return gIn.wrap('Waiting for Ext App Ready ... ', logAction, function () {
//     return gT.sOrig.driver.wait(gT.rv.isAppReady, timeout).then(
//       function () {
//         return gT.sOrig.driver.executeScript('return tia.getScreenResolution()').then(function (res) {
//           // Save resolution to emulate maximize.
//           gT.s.browser.width = res.width;
//           gT.s.browser.height = res.height;
//         });
//       }
//     );
//   });
// };

/**
 *  Waits for R-Vision ExtJs objects to be ready.
 *  After this, one can start work with ExtJs application.
 *  TODO: move to separate module, probably private one.
 *
 * @param timeout
 * @param logAction
 *
 * @returns {Promise} - waiting result.
 */
// exports.waitForExtAppReady = function (timeout, logAction) {
//   return gIn.wrap('Waiting for Ext App Ready ... ', logAction, function () {
//     return gT.sOrig.driver.wait(gT.rv.isExtAppReady, timeout).then(
//       function () {
//         return gT.sOrig.driver.executeScript('return tia.getScreenResolution()').then(function (res) {
//           // Save resolution to emulate maximize.
//           gT.s.browser.width = res.width;
//           gT.s.browser.height = res.height;
//           return gT.sOrig.driver.sleep(2000, false); // TODO: not very reliable.
//         });
//       }
//     );
//   });
// };

/**
 * Clicks on tab with specified ItemId.
 * @param itemId
 * @param logAction
 * @returns {*}
 */
exports.clickTabId = function (itemId, logAction) {
  return gIn.wrap('Click on element with itemId: "' + itemId + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript('return tiaExtJs.getTabId("' + itemId + '")').then(function (id) {
      gIn.tracer.trace3('clickTabId: id of found element: ' + id);
      return gT.sOrig.driver.findElement(gT.sOrig.by.id(id)).click();
    });
  });
};
