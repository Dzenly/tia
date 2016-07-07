'use strict';
/* globals gT: true */
/* globals gIn: true */

// Note that for tree only expanded nodes are taking into account.
exports.tableItemByIndex = function (tableId, tableName, itemIndex, logAction) {
  return gIn.wrap(`Click table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getFromTableByIndex('${tableId}', ${itemIndex});`, false)
      .then(function (webEl) {
        webEl.getText().then(function (text) { // Using of selenium queue, so not then.then.
          gIn.logger.logIfNotDisabled(', Item text: ' + text + '...', logAction);
        });
        return webEl.click();
      });
  });
};

exports.tableItemByField = function (tableId, tableName, fieldValue, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: ${fieldValue}, fieldName: ${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getFromTableByField('${tableId}', '${fieldValue}', '${fieldName}');`
        , false
      ).then(function (webEl) {
        webEl.getText().then(function (text) { // Using of selenium queue, so not then.then.
          gIn.logger.logIfNotDisabled(', Item text: ' + text + '...', logAction);
        });
        return webEl.click();
      });
    });
};

exports.tableItemByFieldLocKey = function (tableId, tableName, fieldValueKey, fieldName, logAction) {
  fieldName = fieldName ? fieldName : 'name';
  return gIn.wrap(`Click table '${tableName}' item, fieldValue: ${fieldValueKey}, fieldName: ${fieldName}'`,
    logAction, function () {
      return gT.s.browser.executeScript(
        `return tiaEJ.hEById.getFromTableByFieldLocKey('${tableId}', '${fieldValueKey}', '${fieldName}');`
        , false
      ).then(function (webEl) {
        webEl.getText().then(function (text) { // Using of selenium queue, so not then.then.
          gIn.logger.logIfNotDisabled(', Item text: ' + text + '...', logAction);
        });
        return webEl.click();
      });
    });
};
