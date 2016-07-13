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

exports.logCBById = function (id, logAction) {
  return gIn.wrap('Logging content of combobox ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(
      `return tiaEJ.ctById.getCB('${id}');`
    )
      .then(function (res) {
        gIn.logger.log('\n' + res);
      });
  });
};

exports.expandAllGroupsById = function(id, tableName, logAction) {
  return gIn.wrap('Expanding table: "' + tableName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.expandAllGroups('${id}')`);
  });
};

exports.collapseAllGroupsById = function(id, tableName, logAction) {
  return gIn.wrap('Collapsing table: "' + tableName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.collapseAllGroups('${id}')`);
  });
};

exports.expandAllTreeById = function(id, treeName, logAction) {
  return gIn.wrap('Expanding tree: "' + treeName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.expandAllTree('${id}')`);
  });
};

exports.collapseAllTreeById = function(id, treeName, logAction) {
  return gIn.wrap('Collapsing tree: "' + treeName + '" ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(`return tiaEJ.ctById.collapseAllTree('${id}')`);
  });
};
