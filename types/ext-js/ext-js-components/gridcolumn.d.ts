import {ElementIdForLog, EnableLog, Teq} from '../common';

interface GridColumnActions {
  /**
   * Left mouse GridColumn click.
   */
  click(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse clock on GridColumn trigger element.
   */
  clickTrigger(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface GridColumnChecks {

}

interface GridColumnLogs {
}

export interface GridColumn {
  actions: GridColumnActions;
  /**
   * alias for actions.
   */
  a: GridColumnActions;
  checks: GridColumnChecks;
  /**
   * alias for checks.
   */
  c: GridColumnChecks;
  logs: GridColumnLogs;
  /**
   * alias for logs.
   */
  l: GridColumnLogs;
}

