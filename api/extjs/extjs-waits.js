'use strict';
/* globals gT: true */
/* globals gIn: true */

/**
 * Waits for finish for all Ajax calls.
 *
 * @param [timeout=20 seconds]
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.ajaxRequestsFinish = function (timeout, logAction) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap('Waiting for AJAX requests finish ... ', logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper('return tiaEJ.isThereActiveAjaxCalls();')
        .then(function (res) {
          return !res;
        });
    }, timeout);
  });
};

exports.formFieldEnabled = function (formId, name, timeout, logAction) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for enabling of form (id: ${formId}) item (name: ${name}) ... `, logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldEnabled('${formId}', '${name}');`)
    }, timeout);
  });
};

exports.formFieldDisabled = function (formId, name, timeout, logAction) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for disabling of form (id: ${formId}) item (name: ${name}) ... `, logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldDisabled('${formId}', '${name}');`)
    }, timeout);
  });
};
