'use strict';
/* globals gT, gIn */

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

exports.table = function (id, msg, options, logAction) {
  return gIn.wrap('Logging content of table: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.get('${id}', '${gIn.miscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.tree = function (id, msg, options, logAction) {
  return gIn.wrap('Logging content of tree: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getTree('${id}', '${gIn.miscUtils.optsToJson(options)}')`
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
