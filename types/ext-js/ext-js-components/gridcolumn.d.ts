import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface GridColumnActions extends ComponentActions {

  /**
   * Left mouse clock on GridColumn trigger element.
   */
  clickTrigger(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface GridColumnChecks extends ComponentChecks {

}

interface GridColumnLogs extends ComponentLogs {
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

