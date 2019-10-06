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
  return gIn.wrap({
    msg: 'Waiting for AJAX requests finish ... ',
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(
        () =>
          gT.s.browser
            .executeScriptWrapper('return tiaEJ.isThereActiveAjaxCalls();')
            .then(res => !res),
        timeout
      ),
  });
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

  return gIn.wrap({
    msg: 'Waiting for idle ... ',
    enableLog,
    act: async () => {
      await gT.s.browser.executeScriptWrapper('tia.resetIdle();tiaEJ.resetExtJsIdle();');
      await gT.sOrig.driver.wait(
        () => gT.s.browser.executeScriptWrapper('return tiaEJ.isExtJsIdle();'),
        timeout
      );
    },
  });
}

// TODO: Describe and test.
// TODO: redundant call to webdriver ?
function logFormFieldInfo(formId, name, enableLog?: EnableLog) {
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
export function formFieldEnabled(formId, name, timeout, enableLog?: EnableLog) {
  formId = gT.s.idToIdForLogObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap({
    msg: `Waiting for enabling field (name: ${name}) on form ${formId.logStr}`,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .wait(
          () =>
            gT.s.browser.executeScriptWrapper(
              `return tiaEJ.check.formFieldEnabled('${formId.id}', '${name}');`
            ),
          timeout
        )
        .then(logFormFieldInfo(formId, name, enableLog)),
  });
}

// TODO: Describe and test.
export function formFieldDisabled(
  formId: string,
  name: string,
  timeout?: number,
  enableLog?: EnableLog
) {
  formId = gT.s.idToIdForLogObj(formId);
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap({
    msg: `Waiting for disabling field (name: ${name}) onform ${formId.logStr}`,
    enableLog,
    act: () =>
      gT.sOrig.driver
        .wait(
          () =>
            gT.s.browser.executeScriptWrapper(
              `return tiaEJ.check.formFieldDisabled('${formId.id}', '${name}');`
            ),
          timeout
        )
        .then(logFormFieldInfo(formId, name, enableLog)),
  });
}

// TODO: Describe and test.
export function isReady(timeout?: number, enableLog?: EnableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap({
    msg: 'Waiting for Ext.isReady ... ',
    enableLog,
    act: () =>
      gT.sOrig.driver.wait(() => gT.s.browser.executeScriptWrapper('return Ext.isReady;'), timeout),
  });
}

// TODO: Describe and test.
export function isCmpRendered(id: string, timeout?: number, enableLog?: EnableLog) {
  timeout = timeout || gT.engineConsts.defaultWaitTimeout;
  return gIn.wrap({
    msg: `Waiting for cmp (id: ${id}) rendered ... `,
    enableLog,
    act: () =>
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
      ),
  });
}
