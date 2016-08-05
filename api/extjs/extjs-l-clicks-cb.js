'use strict';
/* globals gT: true */
/* globals gIn: true */

function createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, logAction) {
  return function clickCb(inputEl, count, noPrint) {
    count = count || 0;
    if (count > gT.engineConsts.cbRetryClicksCount) {
      var errStr = 'Exceeded count of attempts to click combobox, wait condition: ' + jsWaitBoundList;
      gIn.tracer.err(errStr);
      return gT.sOrig.promise.rejected(new Error(errStr));
    }
    return gT.e.lClick.clickAndWaitForAjaxFinish(inputEl)
      .then(function () {
        gIn.tracer.msg3('Before wait after cb inputEl click');
        return gT.sOrig.driver.wait(
          function () {
            return gT.s.browser.executeScriptWrapper(jsWaitBoundList);
          }, gT.engineConsts.cbBoundListTimeout
        )
          .catch(function (err) {
            gIn.tracer.exc(err);
            // Sometimes combobox treated one click as two and closes immediately after open.
            // So this code gives a second chance to it.
            gIn.tracer.msg1('Using one more chance to click combo box (wait failed)');
            return clickCb(inputEl, count + 1, noPrint);
          });
      })
      .catch(function (err) {
        gIn.tracer.exc(err);
        gIn.tracer.msg1('Using one more chance to click combo box (inputEl click failed)');
        return clickCb(inputEl, count + 1, noPrint);
      })
      .then(function () {
        gIn.tracer.msg3('Before get list item');
        return gT.s.browser.executeScript(jsGetListItem, false);
      })
      .then(gT.e.lClick.createFuncPrintTextDelayClick(isDblClick, noPrint , logAction))
      .catch(function (err) {
        gIn.tracer.exc(err);
        gIn.tracer.msg1('Using one more chance to click combo box (item click failed)');
        if (err !== gT.engineConsts.elGetTextFail) {
          noPrint = true;
        }
        return clickCb(inputEl, count + 1, noPrint);
      });
  };
}

function createFuncClickCbByJsToGetInputEl(jsGetInputEl, jsWaitBoundList, jsGetListItem, isDblClick, logAction) {
  return function () {
    return gT.s.browser.executeScript(jsGetInputEl, false)
      .then(createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, logAction));
  }
}

function clickCb(logText, jsGetInputEl, jsWaitBoundList, jsGetListItem, isDblClick, logAction) {
  return gIn.wrap(logText, logAction, function () {
    return gT.s.browser.executeScript(jsGetInputEl, false)
      .then(createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, logAction));
  });
}

exports.idIndex = function (cbId, itemIndex, logAction) {
  return gIn.wrap(``, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(function (obj) {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), item #${itemIndex}`, logAction);
      })
      .then(createFuncClickCbByJsToGetInputEl(
        `return tiaEJ.hEById.getInputEl('${cbId}');`,
        `return tiaEJ.hEById.isCBPickerVisible('${cbId}', ${itemIndex});`,
        `return tiaEJ.hEById.getCBItemByIndex('${cbId}', ${itemIndex});`,
        false,
        logAction
      ));
  });
};

exports.idField = function (cbId, fieldValue, fieldName, logAction) {
  return gIn.wrap(``, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(function (obj) {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), by field (name: ${fieldName}, value: ${fieldValue})`,
          logAction);
      })
      .then(createFuncClickCbByJsToGetInputEl(
        `return tiaEJ.hEById.getInputEl('${cbId}');`,
        `return tiaEJ.hEById.isCBPickerVisible('${cbId}');`,
        `return tiaEJ.hEById.getCBItemByField('${cbId}', ${gT.s.browser.valueToParameter(fieldValue)}, '${fieldName}');`,
        false,
        logAction
      ));
  });
};

exports.formIdNameIndex = function (formId, name, index, logAction) {
  return clickCb(
    // logText
    `Double Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,
    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,
    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}', ${index});`,
    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,
    // isDblClick
    false,
    // logAction
    logAction
  );
};

exports.dblFormIdNameIndex = function (formId, name, index, logAction) {
  return clickCb(
    // logText
    `Double Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,
    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,
    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}', ${index});`,
    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,
    // isDblClick
    true,
    // logAction
    logAction
  );
};

exports.formIdNameField = function (formId, name, fieldValue, fieldName, logAction) {
  return clickCb(
    // logText
    `Click combobox item by formId: ${formId}, name: ${name}, fieldName: ${fieldName}, fieldValue: ${fieldValue}`,
    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,
    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}');`,
    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameField('${formId}', '${name}', ${gT.s.browser.valueToParameter(fieldValue)}, '${fieldName}');`,
    // isDblClick
    false,
    // logAction
    logAction
  );
};
