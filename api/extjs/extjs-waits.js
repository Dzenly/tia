'use strict';

/* globals gT: true */
/* globals gIn: true */

/**
 * Waits for finish for all Ajax calls.
 *
 * @param [timeout=20 seconds]
 * @param enableLog - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
exports.ajaxRequestsFinish = function ajaxRequestsFinish(timeout, enableLog) {
  // eslint-disable-next-line no-param-reassign
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(
    'Waiting for AJAX requests finish ... ',
    enableLog,
    () => gT.sOrig.driver.wait(
      () => gT.s.browser.executeScriptWrapper('return tiaEJ.isThereActiveAjaxCalls();').then(res => !res),
      timeout)
  );
};

exports.idle = function idle(timeout = gT.engineConsts.defaultWaitTimeout, enableLog) {
  return gIn.wrap(
    'Waiting for idle ... ',
    enableLog,
    async () => {
      await gT.s.browser.executeScriptWrapper('tia.resetIdle();tiaEJ.resetExtJsIdle();');
      await gT.sOrig.driver.wait(
        () => gT.s.browser.executeScriptWrapper('return tiaEJ.isExtJsIdle();'),
        timeout
      );
    });
};

// TODO: redundant call to webdriver ?
function logFormFieldInfo(formId, name, enableLog) {
  return function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldEnabledDisabledInfo('${formId.id}', '${name}');`
    )
      .then((res) => {
        gIn.logger.logIfNotDisabled(`, ${res} ... `, enableLog);
      });
  };
}

exports.formFieldEnabled = function formFieldEnabled(formId, name, timeout, enableLog) {
  formId = gT.s.idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for enabling field (name: ${name}) on form ${formId.logStr}`, enableLog, () => gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldEnabled('${formId.id}', '${name}');`), timeout)
    .then(logFormFieldInfo(formId, name, enableLog)));
};

exports.formFieldDisabled = function formFieldDisabled(formId, name, timeout, enableLog) {
  formId = gT.s.idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for disabling field (name: ${name}) onform ${formId.logStr}`, enableLog, () => gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper(`return tiaEJ.check.formFieldDisabled('${formId.id}', '${name}');`), timeout)
    .then(logFormFieldInfo(formId, name, enableLog)));
};

exports.isReady = function isReady(timeout, enableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap('Waiting for Ext.isReady ... ', enableLog, () => gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper('return Ext.isReady;'), timeout));
};

exports.isCmpRendered = function isCmpRendered(id, timeout, enableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for cmp (id: ${id}) rendered ... `, enableLog, () => gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper(`return Ext.getCmp('${id}') && Ext.getCmp('${id}').rendered;`),

    // .then(function (res) {
    //   console.log('IS RENDERED: ' + res);
    //   return res;
    // });
     timeout));
};
