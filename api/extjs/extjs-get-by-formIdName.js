'use strict';
/* globals gT, gIn */

var util = require('util');

exports.rawValue = function (id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Getting raw value of form ${id.logStr} field: name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormFieldRawValue('${id.id}', '${name}');`
    );
  });
};

exports.isDisabled = function (id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Getting isDisabled() for form ${id.logStr} field (name: ${name}) ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.isFormFieldDisabled('${id.id}', '${name}');`
    );
  });
};
