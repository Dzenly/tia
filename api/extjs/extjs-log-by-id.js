'use strict';
/* globals gT, gIn */

var util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

// Use -1 as stop index to show only table header.
exports.table = function (id, options, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging content of table ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTable('${id.id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tree = function (id, options, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging content of tree ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTree('${id.id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.comboBox = function (id, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging content of combobox ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getCB('${id.id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemTexts = function (id, viewName, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging selected items for view ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getSelectedItemTexts('${id.id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemFields = function (id, fieldsToPrint, printFieldName, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging selected items for view ${id.logStr} ... `, logAction, function () {
    if (fieldsToPrint) {
      fieldsToPrint = `JSON.parse('${JSON.stringify(fieldsToPrint)}')`;
    }
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getSelectedItemFields('${id.id}', ${fieldsToPrint}, ${printFieldName});`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.formSubmitValues = function (id, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging submit values for form ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getFormSubmitValues('${id.id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(util.inspect(res) + '\n'));
      });
  });
};

exports.form = function (id, includingStores, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Logging content of form ${id.logStr} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getForm('${id.id}', ${includingStores});`)
      .then(function (formContent) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(formContent));
      });
  });
};

