'use strict';
/* globals gT: true */
/* globals gIn: true */

function clickWrapper(webEl) {
  if (gT.engineConsts.extJsClickDelay) {
    gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
  return webEl.click();
}

function dblClickWrapper(webEl) {
  if (gT.engineConsts.extJsClickDelay) {
    gT.s.driver.sleep(gT.engineConsts.extJsClickDelay, false);
  }
  return new gT.sOrig.ActionSequence(gT.sOrig.driver).doubleClick(webEl).perform();
}

function printTextAndDblClick(logAction) {
  return function (webEl) {
    webEl.getText()
      .then(function (text) { // Using of selenium queue, so not then.then.
        gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
      });
    return dblClickWrapper(webEl);
  };
}

function printTextAndClick(logAction) {
  return function (webEl) {
    webEl.getText()
      .then(function (text) { // Using of selenium queue, so not then.then.
        gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
      });
    return clickWrapper(webEl);
  };
}

function printTextAndClickTextItem(logAction) {
  return function (webEl) {
    return webEl.findElement(gT.sOrig.by.css('.x-tree-node-text'))
      .then(function (el) {
        el.getText()
          .then(function (text) { // Using of selenium queue, so not then.then.
            gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
          });
        return clickWrapper(el);
      });
    // webEl.getAttribute('class')
    //   .then(function (attrVal) {
    //     gIn.logger.logIfNotDisabled(', Item class: "' + attrVal + '"', logAction);
    //   });
    // webEl.getText()
    //   .then(function (text) { // Using of selenium queue, so not then.then.
    //     gIn.logger.logIfNotDisabled(', Item text: "' + text + '" ... ', logAction);
    //   });

  };
}

/**
 * Some ExtJs API functions require parameter to be numeric type and not equal string.
 * @param val
 * @returns {string}
 */
function valueToParameter(val) {
  if (typeof val === 'number') {
    return `${val}`;
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
}

// Note that for tree only expanded nodes are taking into account.
exports.tableItemByIndex = function (tableId, tableName, itemIndex, logAction) {
  return gIn.wrap(`Click table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`, false)
      .then(printTextAndClickTextItem(logAction));
  });
};

exports.tableItemByField = function (tableId, tableName, fieldValue, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: ${valueToParameter(fieldValue)}, fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByField('${tableId}', ${valueToParameter(fieldValue)}, '${fieldName}');`
        , false
      ).then(printTextAndClickTextItem(logAction));
    });
};

exports.tableItemByFieldLocKey = function (tableId, tableName, fieldValueKey, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: '${fieldValueKey}', fieldName: '${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getTableItemByFieldLocKey('${tableId}', '${fieldValueKey}', '${fieldName}');`
        , false
      ).then(printTextAndClickTextItem(logAction));
    });
};

exports.tableItemByFieldId = function (tableId, tableName, id, logAction) {
  return gIn.wrap(`Click table '${tableName}' item, with id: '${id}'`, logAction, function () {
    return gT.s.browser.executeScript(
      `return tiaEJ.hEById.getTableItemByField('${tableId}', ${valueToParameter(id)}, 'id');`
      , false
    ).then(printTextAndClickTextItem(logAction));
  });
};

exports.comboBoxItemByIndex = function (cbId, itemIndex, logAction) {
  return gIn.wrap(``, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(function (obj) {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), item #${itemIndex}`, logAction);
      })
      .then(function () {
        return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputEl('${cbId}');`, false);
      })
      .then(function (inputEl) {
        return clickWrapper(inputEl);
      })
      .then(function () {
        return gT.sOrig.driver.wait(function () {
          return gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisible('${cbId}');`);
        }, 5000);
      })
      .then(function () {
        return gT.s.browser.executeScript(`return tiaEJ.hEById.getCBItemByIndex('${cbId}', ${itemIndex});`, false);
      })
      .then(printTextAndClick(logAction));
  });
};

exports.comboBoxItemByField = function (cbId, fieldValue, fieldName, logAction) {
  return gIn.wrap(``, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(function (obj) {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), by field (name: ${fieldName}, value: ${fieldValue})`,
          logAction);
      })
      .then(function () {
        return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputEl('${cbId}');`, false);
      })
      .then(function (inputEl) {
        return clickWrapper(inputEl);
      })
      .then(function () {
        return gT.sOrig.driver.wait(function () {
          return gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisible('${cbId}');`);
        }, 5000);
      })
      .then(function () {
        return gT.s.browser.executeScript(
          `return tiaEJ.hEById.getCBItemByField('${cbId}', ${valueToParameter(fieldValue)}, '${fieldName}');`,
          false);
      })
      .then(printTextAndClick(logAction));
  });
};

exports.comboBoxItemByFormIdNameIndex = function (formId, name, index, logAction) {
  return gIn.wrap(`Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return clickWrapper(inputEl);
        })
        .then(function () {
          return gT.sOrig.driver.wait(function () {
            return gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}');`);
          }, 5000);
        })
        .then(function () {
          return gT.s.browser.executeScript(
            `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,
            false);
        })
        .then(printTextAndClick(logAction));
    });
};

exports.dblComboBoxItemByFormIdNameIndex = function (formId, name, index, logAction) {
  return gIn.wrap(`Double Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return clickWrapper(inputEl);
        })
        .then(function () {
          return gT.sOrig.driver.wait(function () {
            return gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}');`);
          }, 5000);
        })
        .then(function () {
          return gT.s.browser.executeScript(
            `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,
            false);
        })
        .then(printTextAndDblClick(logAction));
    });
};

exports.fieldByFormIdName = function (formId, name, logAction) {
  return gIn.wrap(`Click form field item by formId: ${formId}, name: ${name} ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return clickWrapper(inputEl);
        });
    });
};

exports.checkBoxByFormIdName = function (formId, name, logAction) {
  return gIn.wrap(`Click checkBox (name: ${name}) on form (id: ${formId}) ... `,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getElByFormName('${formId}', '${name}');`, false)
        .then(printTextAndClick(logAction));
    });
};

exports.comboBoxItemByFormIdNameField = function (formId, name, fieldValue, fieldName, logAction) {
  return gIn.wrap(`Click combobox item by formId: ${formId}, name: ${name}, fieldName: ${fieldName}, fieldValue: ${fieldValue}`,
    logAction, function () {
      return gT.s.browser.executeScript(`return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`, false)
        .then(function (inputEl) {
          return clickWrapper(inputEl);
        })
        .then(function () {
          return gT.sOrig.driver.wait(function () {
            return gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}');`);
          }, 5000);
        })
        .then(function () {
          return gT.s.browser.executeScript(
            `return tiaEJ.hEById.getCBItemByFormNameField('${formId}', '${name}', ${valueToParameter(fieldValue)}, '${fieldName}');`,
            false);
        })
        .then(printTextAndClick(logAction));
    });
};

function clickById(fName) {
  return function (dynId) {
    gIn.tracer.trace3(`${fName}:, id of found element: ${dynId}`);
    return clickWrapper(gT.sOrig.driver.findElement(gT.sOrig.by.id(dynId)));
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
      .then(clickById('clickTabByIdItemId'));
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
      .then(clickById('clickTabByIdText'));
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
      .then(clickById('clickTabByIdLocKey'));
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
      .then(clickById('clickByIdRefKey'));
  });
};
