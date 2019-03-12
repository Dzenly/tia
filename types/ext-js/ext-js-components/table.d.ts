import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';

interface TableActions {
  /**
   * Left mouse button click on the specified table row and cell.
   */
  clickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified table row and cell.
   */
  clickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table row and cell.
   * Can be used to select many rows.
   */
  ctrlClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table row and cell.
   * Can be used to select many rows.
   */
  ctrlClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table row and cell.
   */
  doubleClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table row and cell.
   */
  doubleClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
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

