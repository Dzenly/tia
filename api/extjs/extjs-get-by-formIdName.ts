'use strict';

/* globals gT, gIn */

const util = require('util');

export function rawValue(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Getting raw value of form ${id.logStr} field: name: ${name} ... `,
    enableLog,
    () =>
      gT.s.browser.executeScriptWrapper(
        `return tiaEJ.ctById.getFormFieldRawValue('${id.id}', '${name}');`
      )
  );
}

export function isDisabled(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Getting isDisabled() for form ${id.logStr} field (name: ${name}) ... `,
    enableLog,
    () =>
      gT.s.browser.executeScriptWrapper(
        `return tiaEJ.ctById.isFormFieldDisabled('${id.id}', '${name}');`
      )
  );
}
