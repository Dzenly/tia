import { ElementIdForLog, EnableLog, Teq } from '../common';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

/**
 * gT.eC.gridcolumn.actions or gT.eC.gridcolumn.a
 */
interface GridColumnActions extends ComponentActions {
  /**
   * Left mouse click on GridColumn trigger element.
   */
  clickTrigger(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

/**
 * gT.eC.gridcolumn.checks or gT.eC.gridcolumn.c
 */
interface GridColumnChecks extends ComponentChecks {}

/**
 * gT.eC.gridcolumn.logs or gT.eC.gridcolumn.l
 */
interface GridColumnLogs extends ComponentLogs {}

/**
 * gT.eC.gridcolumn
 */
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
