'use strict';
/* globals gT: true */
/* globals gIn: true */

exports.clickAndWaitForAjaxFinish = function(webEl) {
  if (gT.engineConsts.extJsClickDelay) {
    gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
  return webEl.click().then(function () {
    return gT.e.wait.ajaxRequestsFinish(gT.engineConsts.ajaxTimeoutAfterClick, false);
  });
};

exports.delayAndClick = function(webEl, isDblClick) {
  if (gT.engineConsts.extJsClickDelay) {
    gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
  return isDblClick ? new gT.sOrig.ActionSequence(gT.sOrig.driver).doubleClick(webEl).perform() : webEl.click();
};

exports.createFuncPrintTextDelayClick = function (isDblClick, logAction) {
  return function (webEl) {
    webEl.getText()
      .then(function (text) { // Using of selenium queue, so not then.then.
        gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
      });
    return exports.delayAndClick(webEl, isDblClick);
  };
};

function createFuncPrintTextAndClickTableRow(logAction) {
  return function (webEl) {
    return webEl.findElement(gT.sOrig.by.css('.x-tree-node-text'))
      .then(function (el) {
        el.getText()
          .then(function (text) { // Using of selenium queue, so not then.then.
            gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
          });
        return exports.delayAndClick(el);
      });
  };
}

// Note that for tree only expanded nodes are taking into account.
exports.tableItemByIndex = function (tableId, tableName, itemIndex, logAction) {
  return gIn.wrap(`Click table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`, false)
      .then(createFuncPrintTextAndClickTableRow(logAction));
  });
};

exports.tableItemByField = function (tableId, tableName, fieldValue, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: ${gT.s.browser.valueToParameter(fieldValue)}, fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(fieldValue)}, '${fieldName}');`
        , false
      ).then(createFuncPrintTextAndClickTableRow(logAction));
    });
};

exports.tableItemByFieldLocKey = function (tableId, tableName, fieldValueKey, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: '${fieldValueKey}', fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByFieldLocKey('${tableId}', '${fieldValueKey}', '${fieldName}');`
        , false
      ).then(createFuncPrintTextAndClickTableRow(logAction));
    });
};

exports.tableItemByFieldId = function (tableId, tableName, id, logAction) {
  return gIn.wrap(`Click table '${tableName}' item, with id: '${id}'`, logAction, function () {
    return gT.s.browser.executeScript(
      `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(id)}, 'id');`
      , false
    ).then(createFuncPrintTextAndClickTableRow(logAction));
  });
};

exports.fieldByFormIdName = function (formId, name, logAction) {
  return gIn.wrap(`Click form field item by formId: ${formId}, name: ${name} ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return exports.delayAndClick(inputEl);
        });
    });
};

exports.checkBoxByFormIdName = function (formId, name, logAction) {
  return gIn.wrap(`Click checkBox (name: ${name}) on form (id: ${formId}) ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getElByFormName('${formId}', '${name}');`, false)
        .then(exports.createFuncPrintTextDelayClick(logAction));
    });
};

function createFuncDelayAndClickById(callerName) {
  return function (dynId) {
    gIn.tracer.trace3(`${callerName}:, id of element: ${dynId}`);
    return exports.delayAndClick(gT.sOrig.driver.findElement(gT.sOrig.by.id(dynId)));
  };
}

/**
 * Clicks on tab with specified itemId of component specified by id.
 * @param id - component HTML id.
 * @param itemId - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 */
exports.tabByIdItemId = function (id, itemId, logAction) {
  return gIn.wrap(`Click on tab ${itemId} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.dynId.getTabIdByIdItemId('${id}', '${itemId}')`)
      .then(createFuncDelayAndClickById('clickTabByIdItemId'));
  });
};

/**
 * Clicks on tab with specified text of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} text - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
exports.tabByIdText = function (id, text, logAction) {
  return gIn.wrap(`Click on tab with text ${text} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.dynId.getTabIdByIdText ('${id}', '${text}')`)
      .then(createFuncDelayAndClickById('clickTabByIdText'));
  });
};

/**
 * Clicks on tab with specified locale key of component specified by id.
 * @param id - component HTML id.
 * @param {Object/string} locKey - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * TODO: Not sure for unicode text for logs (text value can be utf-8 encoded).
 * Object: str for search, str for log.
 */
exports.tabByIdLocKey = function (id, locKey, logAction) {
  return gIn.wrap(`Click on tab with locale key ${locKey} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.dynId.getTabIdByIdLocKey('${id}', '${locKey}')`)
      .then(createFuncDelayAndClickById('clickTabByIdLocKey'));
  });
};

/**
 * Clicks on a component using id, reference, localization key.
 * @param id - component HTML id.
 * @param ref - reference inside component found by id.
 * @param key - key in locale.
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 * Object: str for search, str for log.
 */
exports.compByIdRefKey = function (id, ref, key, logAction) {
  return gIn.wrap(`Click on tab by id (${id}), reference (${ref}), key ${key} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.dynId.getByIdRefKey('${id}', '${ref}', '${key}')`)
      .then(createFuncDelayAndClickById('clickByIdRefKey'));
  });
};
