'use strict';
/* globals gT, gIn */

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

exports.logTableById = function (id, msg, options, logAction) {
  return gIn.wrap('Logging content of table: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.get('${id}', '${gIn.miscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};

exports.logTreeById = function (id, msg, options, logAction) {
  return gIn.wrap('Logging content of tree: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getTree('${id}', '${gIn.miscUtils.optsToJson(options)}')`
    )
      .then(function (res) {
        gIn.logger.logln('\n' + res);
      });
  });
};
