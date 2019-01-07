'use strict';

/* globals gT, gIn */

const util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

// Use -1 as stop index to show only table header.
exports.table = function table(id, options, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of table ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTable('${id.id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tree = function tree(id, options, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of tree ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getTree('${id.id}', '${gT.commonMiscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.comboBox = function comboBox(id, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of combobox ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getCB('${id.id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemTexts = function selectedItemTexts(id, viewName, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging selected items for view ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getSelectedItemTexts('${id.id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.selectedItemFields = function selectedItemFields(id, fieldsToPrint, printFieldName, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging selected items for view ${id.logStr} ... `, logAction, () => {
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

exports.formSubmitValues = function formSubmitValues(id, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging submit values for form ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getFormSubmitValues('${id.id}');`)
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(util.inspect(res) + '\n'));
      });
  });
};

/**
 *
 * @param id
 * @param includingStores - number 1, 2
 * @param logAction
 * @return {*}
 */
exports.form = function form(id, includingStores, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of form ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getForm('${id.id}', ${includingStores});`)
      .then(function (formContent) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(formContent));
      });
  });
};

exports.formField = function formField(id, includingStores, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of form field ${id.logStr} ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.getFormChild('${id.id}', ${includingStores});`)
      .then(function (fieldContent) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(fieldContent));
      });
  });
};
