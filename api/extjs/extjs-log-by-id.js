'use strict';
/* globals gT, gIn */

var util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

exports.table = function (id, tableName, options, logAction) {
  return gIn.wrap('Logging content of table: "' + tableName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.get('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tree = function (id, treeName, options, logAction) {
  return gIn.wrap('Logging content of tree: "' + treeName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getTree('${id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.comboBox = function (id, logAction) {
  return gIn.wrap('Logging content of combobox ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getCB('${id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemTexts = function (id, viewName, logAction) {
  return gIn.wrap('Logging selected items for view: "' + viewName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.getSelectedItemTexts('${id}');`)
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
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getSelectedItemFields('${id}', ${fieldsToPrint}, ${printFieldName});`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.formSubmitValues = function (id, formName, logAction) {
  return gIn.wrap('Logging submit values for form: "' + formName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.getFormSubmitValues('${id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(util.inspect(res) + '\n'));
      });
  });
};
