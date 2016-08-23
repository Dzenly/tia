'use strict';
/* globals gT: true */
/* globals gIn: true */


exports.id = function (id, keys, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Send keys to: table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
    return gT.s.browser.executeScript(`return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`, false)
      .then(createFuncPrintTextAndClickTableRow(logAction));
  });
};

// exports.formIdName = function (formId, name, keys, logAction) {
//   return gIn.wrap(`Send keys: table '${tableName}' item by index '${itemIndex}'`, logAction, function () {
//     return gT.s.browser.executeScript(`return tiaEJ.hEById.getTableItemByIndex('${tableId}', ${itemIndex});`, false)
//       .then(createFuncPrintTextAndClickTableRow(logAction));
//   });
// };
