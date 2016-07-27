'use strict';
/* globals gT, gIn */

var util = require('util');

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

exports.comboBox = function (id, logAction) {
  return gIn.wrap('Logging content of combobox ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getCB('${id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.field = function (id, name, includingStores, logAction) {
  return gIn.wrap(`Logging content of form (id: ${id}) field (name: ${name}) ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(
      `return tiaEJ.ctById.getFormChildByFormName('${id}', '${name}', ${includingStores});`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};
