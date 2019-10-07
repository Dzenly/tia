

import { EnableLog } from '../common-types';

export function expandAllGroupsById(id: string, tableName: string, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Expanding table: "' + tableName + '" ... ',
    enableLog,
    act: function() {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllGroups('${id}')`);
    },
  });
}

export function collapseAllGroupsById(id: string, tableName: string, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Collapsing table: "' + tableName + '" ... ',
    enableLog,
    act: function() {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllGroups('${id}')`);
    },
  });
}

export function expandAllTreeById(id: string, treeName: string, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Expanding tree: "' + treeName + '" ... ',
    enableLog,
    act: function() {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.expandAllTree('${id}')`);
    },
  });
}

export function collapseAllTreeById(id: string, treeName: string, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Collapsing tree: "' + treeName + '" ... ',
    enableLog,
    act: function() {
      return gT.s.browser.executeScriptWrapper(`return tiaEJ.ctById.collapseAllTree('${id}')`);
    },
  });
}
