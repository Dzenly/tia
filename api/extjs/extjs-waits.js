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
exports.ajaxRequestsFinish = function ajaxRequestsFinish(timeout, logAction) {
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

// TODO: redundant call to webdriver ?
function logFormFieldInfo(formId, name, logAction) {
  return function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getFormFieldEnabledDisabledInfo('${formId.id}', '${name}');`)
      .then(function (res) {
        gIn.logger.logIfNotDisabled(', ' + res + ' ... ', logAction);
      });
  }
}

exports.formFieldEnabled = function formFieldEnabled(formId, name, timeout, logAction) {
  formId = idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for enabling field (name: ${name}) on form ${formId.logStr}`, logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldEnabled('${formId.id}', '${name}');`)
    }, timeout)
      .then(logFormFieldInfo(formId, name, logAction));
  });
};

exports.formFieldDisabled = function formFieldDisabled(formId, name, timeout, logAction) {
  formId = idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for disabling field (name: ${name}) onform ${formId.logStr}`, logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldDisabled('${formId.id}', '${name}');`)
    }, timeout)
      .then(logFormFieldInfo(formId, name, logAction));
  });
};

exports.isReady = function isReady(timeout, logAction) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap('Waiting for Ext.isReady ... ', logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper('return Ext.isReady;');
    }, timeout);
  });
};

exports.isCmpRendered = function isCmpRendered(id, timeout, logAction) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for cmp (id: ${id}) rendered ... `, logAction, function () {
    return gT.sOrig.driver.wait(function () {
      return gT.s.browser.executeScriptWrapper(`return Ext.getCmp('${id}') && Ext.getCmp('${id}').rendered;`);
        // .then(function (res) {
        //   console.log('IS RENDERED: ' + res);
        //   return res;
        // });
    }, timeout);
  });
};
