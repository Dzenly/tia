'use strict';
/* globals gT, gIn */

var util = require('util');

exports.rawValue = function (id, name, logAction) {
  return gIn.wrap(`Getting raw value of form (id: ${id}) field: name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldRawValue('${id}', '${name}');`
    );
  });
};

exports.isDisabled = function (id, name, logAction) {
  return gIn.wrap(`Checking if form (id: ${id}) field (name: ${name}) disabled ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.isFormFieldDisabled('${id}', '${name}');`
    );
  });
};

