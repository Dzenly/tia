'use strict';

/* globals gT, gIn */

const util = require('util');

exports.rawValue = function rawValue(id, name, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Getting raw value of form ${id.logStr} field: name: ${name} ... `, logAction, () => gT.s.browser.executeScriptWrapper(
    `return tiaEJ.ctById.getFormFieldRawValue('${id.id}', '${name}');`
  ));
};

exports.isDisabled = function isDisabled(id, name, logAction) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Getting isDisabled() for form ${id.logStr} field (name: ${name}) ... `, logAction, () => gT.s.browser.executeScriptWrapper(
    `return tiaEJ.ctById.isFormFieldDisabled('${id.id}', '${name}');`
  ));
};
