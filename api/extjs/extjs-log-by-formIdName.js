'use strict';

/* globals gT, gIn */

const util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

// exports.comboBox = function (id, logAction) {
//   return gIn.wrap('Logging content of combobox ... ', logAction, function () {
//     return gT.s.browser.executeScriptWrapper(
//       `return tiaEJ.ctById.getCB('${id}');`
//     )
//       .then(function (res) {
//         gIn.logger.log('\n' + res);
//       });
//   });
// };

exports.field = function field(id, name, includingStores, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging content of form ${id.logStr} field (name: ${name}) ... `, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormChildByFormName('${id.id}', '${name}', ${includingStores});`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.fields = function fields(id, names, includingStores, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging choosen fields of form ${id.logStr} fields ... `, logAction, () => {
    let namesJson = JSON.stringify(names);
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormChildrenByFormNames('${id.id}', '${namesJson}', ${includingStores});`
    )
      .then(function (arr) {
        let str = arr.join('');
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(str));
      });
  });
};

exports.fieldEnabledDisabledInfo = function fieldEnabledDisabledInfo(id, name, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Enabled/Disabled info of form ${id.logStr} field: name: ${name}`, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldEnabledDisabledInfo('${id.id}', '${name}');`
    )
      .then(function (res) {
        gIn.logger.log(', ' + res + ' ... ');
      });
  });
};

exports.fieldShortInfo = function fieldShortInfo(id, name, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Info of form ${id.logStr} field: name: ${name}`, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldShortInfo('${id.id}', '${name}');`
    )
      .then(function (res) {
        gIn.logger.log(', ' + res + ' ... ');
      });
  });
};

exports.fieldError = function fieldError(id, name, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Error of form ${id.logStr} field (name: ${name}):`, logAction, () => {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldErrorByFormName('${id.id}', '${name}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(res + '\n'));
      });
  });
};
