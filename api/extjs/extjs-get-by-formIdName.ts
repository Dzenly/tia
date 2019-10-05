'use strict';

/* globals gT, gIn */

import * as util from 'util';

export function rawValue(id, name, enableLog?: boolean) {
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

export function isDisabled(id, name, enableLog?: boolean) {
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
