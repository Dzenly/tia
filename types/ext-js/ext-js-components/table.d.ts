import {ElementIdForLog, EnableLog, Teq} from '../common';

interface TableActions {
}

interface TableChecks {

}

interface TableLogs {
}

export interface Table {
  actions: TableActions;
  /**
   * alias for actions.
   */
  a: TableActions;
  checks: TableChecks;
  /**
   * alias for checks.
   */
  c: TableChecks;
  logs: TableLogs;
  /**
   * alias for logs.
   */
  l: TableLogs;
}

