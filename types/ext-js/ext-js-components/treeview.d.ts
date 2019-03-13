import {ElementIdForLog, EnableLog, Teq} from '../common';

interface TreeViewActions {
}

interface TreeViewChecks {

}

interface TreeViewLogs {
}

export interface TreeView {
  actions: TreeViewActions;
  /**
   * alias for actions.
   */
  a: TreeViewActions;
  checks: TreeViewChecks;
  /**
   * alias for checks.
   */
  c: TreeViewChecks;
  logs: TreeViewLogs;
  /**
   * alias for logs.
   */
  l: TreeViewLogs;
}

