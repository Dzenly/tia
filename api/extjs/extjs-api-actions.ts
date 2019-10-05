'use strict';

export function expandAllGroupsById(id, tableName, enableLog?: boolean) {
  return gIn.wrap('Expanding table: "' + tableName + '" ... ', enableLog, function() {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllGroups('${id}')`);
  });
}

export function collapseAllGroupsById(id, tableName, enableLog?: boolean) {
  return gIn.wrap('Collapsing table: "' + tableName + '" ... ', enableLog, function() {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllGroups('${id}')`);
  });
}

export function expandAllTreeById(id, treeName, enableLog?: boolean) {
  return gIn.wrap('Expanding tree: "' + treeName + '" ... ', enableLog, function() {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllTree('${id}')`);
  });
}

export function collapseAllTreeById(id, treeName, enableLog?: boolean) {
  return gIn.wrap('Collapsing tree: "' + treeName + '" ... ', enableLog, function() {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllTree('${id}')`);
  });
}
