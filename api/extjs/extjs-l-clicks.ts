'use strict';

// TODO: Deprected API, remove.

async function delayIfNeeded() {
  if (gT.engineConsts.extJsClickDelay) {
    await gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
}

export function clickAndWaitForAjaxFinish(webEl, waitTimeout) {
  waitTimeout = waitTimeout || gT.engineConsts.ajaxTimeoutAfterClick;
  return delayIfNeeded().then(() => webEl.click().then(() => gT.e.wait.idle(waitTimeout, false)));
}

export function delayClickAndWaitForAjaxFinish(webEl, isDblClick) {
  return delayIfNeeded().then(() => {
    gIn.tracer.msg3('delayAndClick: before click');
    return (isDblClick
      ? new gT.sOrig.driver.actions({ bridge: true }).doubleClick(webEl).perform()
      : webEl.click()
    ).then(() => gT.e.wait.idle(undefined, false));
  });
}

export function createFuncPrintTextDelayClick(isDblClick, noPrint, enableLog?: boolean) {
  if (noPrint) {
    return function delayClickAndWaitForAjaxFinishWrapper(webEl) {
      return delayClickAndWaitForAjaxFinish(webEl, isDblClick);
    };
  }
  return function(webEl) {
    return webEl
      .getText()
      .then(
        text => {
          // Using of selenium queue, so not then.then.
          gIn.logger.logIfNotDisabled(`, Item text: "${text}" ... `, enableLog);
        },
        err => {
          gIn.tracer.err(err);
          throw new Error(gT.engineConsts.elGetTextFail);
        }
      )
      .then(() => delayClickAndWaitForAjaxFinish(webEl, isDblClick));
  };
}

function createFuncPrintTextAndClickTableRow(enableLog?: boolean) {
  return function(webEl) {
    return webEl.findElement(gT.sOrig.by.css('.x-tree-node-text')).then(el =>
      el.getText().then(text => {
        // Using of selenium queue, so not then.then.
        gIn.logger.logIfNotDisabled(`, Item text: "${text}" ... `, enableLog);
        return delayClickAndWaitForAjaxFinish(el);
      })
    );
  };
}

// Note that for tree only expanded nodes are taking into account.
export function tableItemByIndex(tableId, tableName, itemIndex, enableLog?: boolean) {
  return gIn.wrap(
    `Click table '${tableName}' item by index '${itemIndex}'`,
    enableLog,
    () =>
      gT.s.browser
        .executeScript(
          `return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`,
          false
        )
        .then(createFuncPrintTextAndClickTableRow(enableLog))
        .then(gT.s.driver.getStupidSleepFunc()) // Stupid assurance.;
  );
}

export function tableItemByField(tableId, tableName, fieldValue, fieldName, enableLog?: boolean) {
  fieldName = fieldName || 'name';
  return gIn.wrap(
    `Click table '${tableName}' item, fieldValue: ${gT.s.browser.valueToParameter(
      fieldValue
    )}, fieldName: '${fieldName}'`,
    enableLog,
    () =>
      gT.s.browser
        .executeScript(
          `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(
            fieldValue
          )}, '${fieldName}');`,
          false
        )
        .then(createFuncPrintTextAndClickTableRow(enableLog))
        .then(gT.s.driver.getStupidSleepFunc()) // Stupid assurance.
  );
}

export function tableItemByFieldLocKey(tableId, tableName, fieldValueKey, fieldName, enableLog?: boolean) {
  fieldName = fieldName || 'name';
  return gIn.wrap(
    `Click table '${tableName}' item, fieldValue: '${fieldValueKey}', fieldName: '${fieldName}'`,
    enableLog,
    () =>
      gT.s.browser
        .executeScript(
          `return tiaEJ.hEById.getTableItemByFieldLocKey('${tableId}', '${fieldValueKey}', '${fieldName}');`,
          false
        )
        .then(createFuncPrintTextAndClickTableRow(enableLog))
        .then(gT.s.driver.getStupidSleepFunc()) // Stupid assurance.
  );
}

// TODO: probably it is safe now to print tableId.
export function tableItemByFieldId(tableId, tableName, id, enableLog?: boolean) {
  return gIn.wrap(
    `Click table '${tableName}' item, with id: '${id}'`,
    enableLog,
    () =>
      gT.s.browser
        .executeScript(
          `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(
            id
          )}, 'id');`,
          false
        )
        .then(createFuncPrintTextAndClickTableRow(enableLog))
        .then(gT.s.driver.getStupidSleepFunc()) // Stupid assurance.
  );
}

export function fieldByFormIdName(formId, name, enableLog?: boolean) {
  return gIn.wrap(`Click form field item by formId: ${formId}, name: ${name} ... `, enableLog, () =>
    gT.s.browser
      .executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
      .then(inputEl => delayClickAndWaitForAjaxFinish(inputEl))
  );
}

export function checkBoxByFormIdName(formId, name, enableLog?: boolean) {
  formId = gT.s.idToIdObj(formId);
  return gIn.wrap(`Click checkBox (name: ${name}) on form ${formId.logStr} ... `, enableLog, () =>
    gT.s.browser
      .executeScript(`return tiaEJ.hEById.getElByFormName('${formId.id}', '${name}');`, false)
      .then(createFuncPrintTextDelayClick(false, false, enableLog))
  );
}

function createFuncDelayAndClickById(callerName) {
  return function(dynId) {
    gIn.tracer.msg3(`${callerName}:, id of element: ${dynId}`);
    return delayClickAndWaitForAjaxFinish(gT.sOrig.driver.findElement(gT.sOrig.by.id(dynId)));
  };
}

/**
 * Clicks on tab with specified itemId of component specified by id.
 * @param id - component HTML id.
 * @param itemId - tab itemId
 * @param enableLog - enable/disalbe logging for this action.
 * @returns {*}
 */
export function tabByIdItemId(id, itemId, enableLog?: boolean) {
  return gIn.wrap(`Click on tab ${itemId} of component ${id} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchId.tabByIdItemId('${id}', '${itemId}')`)
      .then(createFuncDelayAndClickById('clickTabByIdItemId'))
  );
}

/**
 * Clicks on tab with specified text of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} text - tab itemId
 * @param enableLog - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
export function tabByIdText(id, text, enableLog?: boolean) {
  return gIn.wrap(`Click on tab with text ${text} of component ${id} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchId.tabByIdText ('${id}', '${text}')`)
      .then(createFuncDelayAndClickById('clickTabByIdText'))
  );
}

/**
 * Clicks on tab with specified locale key of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} locKey - tab itemId
 * @param enableLog - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
export function tabByIdLocKey(id, locKey, enableLog?: boolean) {
  return gIn.wrap(`Click on tab with locale key ${locKey} of component ${id} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchId.tabByIdLocKey('${id}', '${locKey}')`)
      .then(createFuncDelayAndClickById('clickTabByIdLocKey'))
  );
}

/**
 * Clicks on a component using id, reference, localization key.
 * @param id - component HTML id.
 * @param ref - reference inside component found by id.
 * @param key - key in locale.
 * @param enableLog - enable/disalbe logging for this action.
 * @returns {*}
 * Object: str for search, str for log.
 */
export function compByIdRefKey(id, ref, key, enableLog?: boolean) {
  return gIn.wrap(
    `Click component by id (${id}), reference (${ref}), key ${key} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(`return tiaEJ.searchId.byIdRefKey('${id}', '${ref}', '${key}')`)
        .then(createFuncDelayAndClickById('clickByIdRefKey'))
  );
}
