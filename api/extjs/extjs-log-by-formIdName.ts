'use strict';

/* globals gT, gIn */

const util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

// export function comboBox (id, enableLog) {
//   return gIn.wrap('Logging content of combobox ... ', enableLog, function () {
//     return gT.s.browser.executeScriptWrapper(
//       `return tiaEJ.ctById.getCB('${id}');`
//     )
//       .then(function (res) {
//         gIn.logger.log('\n' + res);
//       });
//   });
// };

export function field(id, name, includingStores, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Logging content of form ${id.logStr} field (name: ${name}) ... `,
    enableLog,
    () => {
      return gT.s.browser
        .executeScriptWrapper(
          `return tiaEJ.ctById.getFormChildByFormName('${id.id}', '${name}', ${includingStores});`
        )
        .then(function(res) {
          gIn.logger.log('\n' + res);
        });
    }
  );
}

export function fields(id, names, includingStores, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Logging choosen fields of form ${id.logStr} fields ... `, enableLog, () => {
    const namesJson = JSON.stringify(names);
    return gT.s.browser
      .executeScriptWrapper(
        `return tiaEJ.ctById.getFormChildrenByFormNames('${id.id}', '${namesJson}', ${includingStores});`
      )
      .then(function(arr) {
        const str = arr.join('');
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(str));
      });
  });
}

export function fieldEnabledDisabledInfo(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Enabled/Disabled info of form ${id.logStr} field: name: ${name}`,
    enableLog,
    () => {
      return gT.s.browser
        .executeScriptWrapper(
          `return tiaEJ.ctById.getFormFieldEnabledDisabledInfo('${id.id}', '${name}');`
        )
        .then(function(res) {
          gIn.logger.log(', ' + res + ' ... ');
        });
    }
  );
}

export function fieldShortInfo(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Info of form ${id.logStr} field: name: ${name}`, enableLog, () => {
    return gT.s.browser
      .executeScriptWrapper(`return tiaEJ.ctById.getFormFieldShortInfo('${id.id}', '${name}');`)
      .then(function(res) {
        gIn.logger.log(', ' + res + ' ... ');
      });
  });
}

export function fieldError(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Error of form ${id.logStr} field (name: ${name}):`, enableLog, () => {
    return gT.s.browser
      .executeScriptWrapper(
        `return tiaEJ.ctById.getFormFieldErrorByFormName('${id.id}', '${name}');`
      )
      .then(function(res) {
        gIn.logger.log('\n' + gT.commonConsts.content.wrap(res + '\n'));
      });
  });
}
