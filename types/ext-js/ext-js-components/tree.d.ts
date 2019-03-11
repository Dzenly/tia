import {ElementIdForLog, EnableLog, Teq} from '../common';

interface TreeActions {
}

interface TreeChecks {

}

interface TreeLogs {
}

export interface Tree {
  actions: TreeActions;
  /**
   * alias for actions.
   */
  a: TreeActions;
  checks: TreeChecks;
  /**
   * alias for checks.
   */
  c: TreeChecks;
  logs: TreeLogs;
  /**
   * alias for logs.
   */
  l: TreeLogs;
}

