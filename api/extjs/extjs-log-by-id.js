'use strict';
/* globals gT, gIn */

var util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

// Use -1 as stop index to show only table header.
exports.table = function (id, options, logAction) {
  return gIn.wrap('Logging content of table with id: "' + id + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTable('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tableByDynId = function (id, tableName, options, logAction) {
  return gIn.wrap('Logging content of table: "' + tableName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTable('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tree = function (id, options, logAction) {
  return gIn.wrap('Logging content of tree with id: "' + id + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTree('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.treeByDynId = function (id, treeName, options, logAction) {
  return gIn.wrap('Logging content of tree: "' + treeName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTree('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.comboBox = function (id, logAction) {
  return gIn.wrap('Logging content of combobox ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getCB('${id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemTexts = function (id, viewName, logAction) {
  return gIn.wrap('Logging selected items for view: "' + viewName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getSelectedItemTexts('${id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemFields = function (id, viewName, fieldsToPrint, printFieldName, logAction) {
  return gIn.wrap('Logging selected items for view: "' + viewName + '" ... ', logAction, function () {

    if (fieldsToPrint) {
      fieldsToPrint = `JSON.parse('${JSON.stringify(fieldsToPrint)}')`;
    }
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getSelectedItemFields('${id}', ${fieldsToPrint}, ${printFieldName});`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.formSubmitValues = function (id, formName, logAction) {
  return gIn.wrap('Logging submit values for form: "' + formName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getFormSubmitValues('${id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(util.inspect(res) + '\n'));
      });
  });
};

exports.form = function (id, includingStores, logAction) {
  return gIn.wrap('Logging content of form with id: "' + id + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getForm('${id}', ${includingStores});`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(res));
      });
  });
};

exports.formByDynId = function (id, formName, includingStores, logAction) {
  return gIn.wrap('Logging content of form: "' + formName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getForm('${id}', ${includingStores});`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(res));
      });
  });
}

// exports.formByDynId = function (id, formName, includingStores, logAction) {
//   return gIn.wrap('Logging content of form: "' + formName + '" ... ', logAction, function () {
//     var idPromise;
//     if (gT.sOrig.promise.isPromise(id)) {
//       idPromise = id;
//     } else {
//       idPromise = gT.sOrig.promise.fulfilled(id)
//     }
//     return idPromise.then(function () {
//       return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getForm('${id}', ${includingStores});`)
//         .then(function (res) {
//           gIn.logger.log('\n' + gT.commonConsts.content.wrap(res) + '\n');
//         });
//     });
//   });
// };
