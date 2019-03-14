import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';
import {TableViewActions, TableViewChecks, TableViewLogs} from './tableview';

interface TreeViewActions extends TableViewActions {
}

interface TreeViewChecks extends TableViewChecks {
}

interface TreeViewLogs extends TableViewLogs {
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

