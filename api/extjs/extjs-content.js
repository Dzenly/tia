'use strict';
/* globals gT, gIn */

// TODO: support different range options.
// TODO: function for convertation object to its text representation (smth, like JSON).

exports.logTableById = function (id, msg, logAction) {
  return gIn.wrap('Logging content of table: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.get('${id}')`)
      .then(function (res) {
        gIn.logger.log(res);
      });
  });
};

exports.logTreeById = function (id, msg, logAction) {
  return gIn.wrap('Logging content of tree: "' + msg + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.getTree('${id}')`)
      .then(function (res) {
        gIn.logger.log(res);
      });
  });
};
