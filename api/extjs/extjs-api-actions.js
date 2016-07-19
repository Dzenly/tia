'use strict';

/* globals gT: true */
/* globals gIn: true */

exports.expandAllGroupsById = function(id, tableName, logAction) {
  return gIn.wrap('Expanding table: "' + tableName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllGroups('${id}')`);
  });
};

exports.collapseAllGroupsById = function(id, tableName, logAction) {
  return gIn.wrap('Collapsing table: "' + tableName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllGroups('${id}')`);
  });
};

exports.expandAllTreeById = function(id, treeName, logAction) {
  return gIn.wrap('Expanding tree: "' + treeName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllTree('${id}')`);
  });
};

exports.collapseAllTreeById = function(id, treeName, logAction) {
  return gIn.wrap('Collapsing tree: "' + treeName + '" ... ', logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllTree('${id}')`);
  });
};
