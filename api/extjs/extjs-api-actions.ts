'use strict';

/* globals gT: true */
/* globals gIn: true */

exports.expandAllGroupsById = function expandAllGroupsById(id, tableName, enableLog) {
  return gIn.wrap('Expanding table: "' + tableName + '" ... ', enableLog, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllGroups('${id}')`);
  });
};

exports.collapseAllGroupsById = function collapseAllGroupsById(id, tableName, enableLog) {
  return gIn.wrap('Collapsing table: "' + tableName + '" ... ', enableLog, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllGroups('${id}')`);
  });
};

exports.expandAllTreeById = function expandAllTreeById(id, treeName, enableLog) {
  return gIn.wrap('Expanding tree: "' + treeName + '" ... ', enableLog, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllTree('${id}')`);
  });
};

exports.collapseAllTreeById = function collapseAllTreeById(id, treeName, enableLog) {
  return gIn.wrap('Collapsing tree: "' + treeName + '" ... ', enableLog, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllTree('${id}')`);
  });
};
