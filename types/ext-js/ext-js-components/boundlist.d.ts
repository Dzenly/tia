import {ElementIdForLog, EnableLog, Teq} from '../common';

interface BoundListActions {
}

interface BoundListChecks {

}

interface BoundListLogs {
}

export interface BoundList {
  actions: BoundListActions;
  /**
   * alias for actions.
   */
  a: BoundListActions;
  checks: BoundListChecks;
  /**
   * alias for checks.
   */
  c: BoundListChecks;
  logs: BoundListLogs;
  /**
   * alias for logs.
   */
  l: BoundListLogs;
}

