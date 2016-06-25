'use strict';
/* globals gT: true */
/* globals gIn: true */

/**
 * Waits for finish for all Ajax calls.
 *
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.ajaxRequestsFinish = function (urlPrefix, timeout, logAction) {
  return gIn.wrap('Waiting for AJAX requests finish ... ', logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScript('return tiaEJ.isThereActiveAjaxCalls();', false)
        .then(function (res) {
          return !res;
        });
    }, timeout);
  });
};
