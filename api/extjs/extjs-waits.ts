'use strict';

/* globals gT: true */
/* globals gIn: true */

import { EnableLog } from './new-api/types/ej-types';

/**
 * Waits until all ajax requests will be completed.
 * I.e. where Ext.Ajax.isLoading() will be false.
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Ajax.html#method-isLoading
 * @param timeout - milliseconds to wait. 40000 by default.
 */
export function ajaxRequestsFinish(timeout?: number, enableLog?: EnableLog): Promise<void> {
  // eslint-disable-next-line no-param-reassign
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap('Waiting for AJAX requests finish ... ', enableLog, () =>
    gT.sOrig.driver.wait(
      () =>
        gT.s.browser
          .executeScriptWrapper('return tiaEJ.isThereActiveAjaxCalls();')
          .then(res => !res),
      timeout
    )
  );
}

/**
 * Waits for Ext.isReady &&  !Ext.Ajax.isLoading() + ExtJs 'idle' event + window.requestIdleCallback.
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.GlobalEvents.html#event-idle
 * So it is supposed to mean that all inner browser scripts work is finished
 * and all components are ready to interact with.
 * @param timeout - milliseconds to wait. 40000 by default.
 */
export function idle(timeout?: number, enableLog?: EnableLog): Promise<void> {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  if (process.env.TIA_NO_IDLE) {
    return ajaxRequestsFinish(timeout, enableLog);
  }

  return gIn.wrap('Waiting for idle ... ', enableLog, async () => {
    await gT.s.browser.executeScriptWrapper('tia.resetIdle();tiaEJ.resetExtJsIdle();');
    await gT.sOrig.driver.wait(
      () => gT.s.browser.executeScriptWrapper('return tiaEJ.isExtJsIdle();'),
      timeout
    );
  });
}

// TODO: Describe and test.
// TODO: redundant call to webdriver ?
function logFormFieldInfo(formId, name, enableLog) {
  return function() {
    return gT.s.browser
      .executeScriptWrapper(
        `return tiaEJ.ctById.getFormFieldEnabledDisabledInfo('${formId.id}', '${name}');`
      )
      .then(res => {
        gIn.logger.logIfNotDisabled(`, ${res} ... `, enableLog);
      });
  };
}

// TODO: Describe and test.
export function formFieldEnabled(formId, name, timeout, enableLog) {
  formId = gT.s.idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(
    `Waiting for enabling field (name: ${name}) on form ${formId.logStr}`,
    enableLog,
    () =>
      gT.sOrig.driver
        .wait(
          () =>
            gT.s.browser.executeScriptWrapper(
              `return tiaEJ.check.formFieldEnabled('${formId.id}', '${name}');`
            ),
          timeout
        )
        .then(logFormFieldInfo(formId, name, enableLog))
  );
}

// TODO: Describe and test.
export function formFieldDisabled(formId, name, timeout, enableLog) {
  formId = gT.s.idToIdObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(
    `Waiting for disabling field (name: ${name}) onform ${formId.logStr}`,
    enableLog,
    () =>
      gT.sOrig.driver
        .wait(
          () =>
            gT.s.browser.executeScriptWrapper(
              `return tiaEJ.check.formFieldDisabled('${formId.id}', '${name}');`
            ),
          timeout
        )
        .then(logFormFieldInfo(formId, name, enableLog))
  );
}

// TODO: Describe and test.
export function isReady(timeout, enableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap('Waiting for Ext.isReady ... ', enableLog, () =>
    gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper('return Ext.isReady;'), timeout)
  );
}

// TODO: Describe and test.
export function isCmpRendered(id, timeout, enableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap(`Waiting for cmp (id: ${id}) rendered ... `, enableLog, () =>
    gT.sOrig.driver.wait(
      () =>
        gT.s.browser.executeScriptWrapper(
          `return Ext.getCmp('${id}') && Ext.getCmp('${id}').rendered;`
        ),

      // .then(function (res) {
      //   console.log('IS RENDERED: ' + res);
      //   return res;
      // });
      timeout
    )
  );
}
