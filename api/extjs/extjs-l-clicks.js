'use strict';
/* globals gT: true */

/* globals gIn: true */

function delayIfNeeded() {
  if (gT.engineConsts.extJsClickDelay) {
    return gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
  return Bluebird.resolve();
}

exports.clickAndWaitForAjaxFinish = function clickAndWaitForAjaxFinish(webEl, waitTimeout) {
  waitTimeout = waitTimeout || gT.engineConsts.ajaxTimeoutAfterClick;
  return delayIfNeeded()
    .then(function () {
      return webEl.click()
        .then(function () {
          return gT.e.wait.ajaxRequestsFinish(waitTimeout, false);
        });
    });
};

exports.delayClickAndWaitForAjaxFinish = function delayClickAndWaitForAjaxFinish(webEl, isDblClick) {
  return delayIfNeeded()
    .then(function () {
      gIn.tracer.msg3('delayAndClick: before click');
      return (isDblClick ? (new gT.sOrig.ActionSequence(gT.sOrig.driver).doubleClick(webEl).perform()) : webEl.click())
        .then(function () {
          return gT.e.wait.ajaxRequestsFinish(undefined, false);
        });
    });
};

exports.createFuncPrintTextDelayClick = function createFuncPrintTextDelayClick(isDblClick, noPrint, logAction) {
  if (noPrint) {
    return function (webEl) {
      return exports.delayClickAndWaitForAjaxFinish(webEl, isDblClick);
    };
  }
  return function (webEl) {
    return webEl.getText()
      .then(
        function (text) { // Using of selenium queue, so not then.then.
          gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
        },
        function (err) {
          gIn.tracer.err(err);
          throw new Error(gT.engineConsts.elGetTextFail);
        })
      .then(function () {
        return exports.delayClickAndWaitForAjaxFinish(webEl, isDblClick);
      });
  };
};

function createFuncPrintTextAndClickTableRow(logAction) {
  return function (webEl) {
    return webEl.findElement(gT.sOrig.by.css('.x-tree-node-text'))
      .then(function (el) {
        return el.getText()
          .then(function (text) { // Using of selenium queue, so not then.then.
            gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
            return exports.delayClickAndWaitForAjaxFinish(el);
          });
      });
  };
}

// Note that for tree only expanded nodes are taking into account.
exports.tableItemByIndex = function tableItemByIndex(tableId, tableName, itemIndex, logAction) {
  return gIn.wrap(`Click table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`, false)
      .then(createFuncPrintTextAndClickTableRow(logAction))
      .then(gT.s.driver.getStupidSleepFunc()); // Stupid assurance.;
  });
};

exports.tableItemByField = function tableItemByField(tableId, tableName, fieldValue, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: ${gT.s.browser.valueToParameter(fieldValue)}, fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(fieldValue)}, '${fieldName}');`
        , false
      ).then(createFuncPrintTextAndClickTableRow(logAction))
        .then(gT.s.driver.getStupidSleepFunc()); // Stupid assurance.
    });
};

exports.tableItemByFieldLocKey = function tableItemByFieldLocKey(tableId, tableName, fieldValueKey, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: '${fieldValueKey}', fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByFieldLocKey('${tableId}', '${fieldValueKey}', '${fieldName}');`
        , false
      ).then(createFuncPrintTextAndClickTableRow(logAction))
        .then(gT.s.driver.getStupidSleepFunc()); // Stupid assurance.
    });
};

// TODO: probably it is safe now to print tableId.
exports.tableItemByFieldId = function tableItemByFieldId(tableId, tableName, id, logAction) {
  return gIn.wrap(`Click table '${tableName}' item, with id: '${id}'`, logAction, function () {
    return gT.s.browser.executeScript(
      `return tiaEJ.hEById.getTableItemByField('${tableId}', ${gT.s.browser.valueToParameter(id)}, 'id');`
      , false
    ).then(createFuncPrintTextAndClickTableRow(logAction))
      .then(gT.s.driver.getStupidSleepFunc()); // Stupid assurance.
  });
};

exports.fieldByFormIdName = function fieldByFormIdName(formId, name, logAction) {
  return gIn.wrap(`Click form field item by formId: ${formId}, name: ${name} ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return exports.delayClickAndWaitForAjaxFinish(inputEl);
        });
    });
};

exports.checkBoxByFormIdName = function checkBoxByFormIdName(formId, name, logAction) {
  formId = idToIdObj(formId);
  return gIn.wrap(`Click checkBox (name: ${name}) on form ${formId.logStr} ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getElByFormName('${formId.id}', '${name}');`, false)
        .then(exports.createFuncPrintTextDelayClick(false, false, logAction));
    });
};

function createFuncDelayAndClickById(callerName) {
  return function (dynId) {
    gIn.tracer.msg3(`${callerName}:, id of element: ${dynId}`);
    return exports.delayClickAndWaitForAjaxFinish(gT.sOrig.driver.findElement(gT.sOrig.by.id(dynId)));
  };
}

/**
 * Clicks on tab with specified itemId of component specified by id.
 * @param id - component HTML id.
 * @param itemId - tab itemId
 * @param logAction - enable/disalbe logging for this action.
 * @returns {*}
 */
exports.tabByIdItemId = function tabByIdItemId(id, itemId, logAction) {
  return gIn.wrap(`Click on tab ${itemId} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.tabByIdItemId('${id}', '${itemId}')`)
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
exports.tabByIdText = function tabByIdText(id, text, logAction) {
  return gIn.wrap(`Click on tab with text ${text} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.tabByIdText ('${id}', '${text}')`)
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
exports.tabByIdLocKey = function tabByIdLocKey(id, locKey, logAction) {
  return gIn.wrap(`Click on tab with locale key ${locKey} of component ${id} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.tabByIdLocKey('${id}', '${locKey}')`)
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
exports.compByIdRefKey = function compByIdRefKey(id, ref, key, logAction) {
  return gIn.wrap(`Click on tab by id (${id}), reference (${ref}), key ${key} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdRefKey('${id}', '${ref}', '${key}')`)
      .then(createFuncDelayAndClickById('clickByIdRefKey'));
  });
};
