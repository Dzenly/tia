import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface TableViewActions extends ComponentActions {
  /**
   * Left mouse button click on the specified table cell.
   */
  clickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified table cell.
   */
  clickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the first table row.
   * @colText - the column header text or tooltip.
   */
  clickFirstRowCellByColText(tEQ: Teq, colText: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the first table row.
   * The cell column is specified by the model field name.
   */
  clickFirstRowCellByModelField(tEQ: Teq, fieldName: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the last table row.
   * @colText - the column header text or tooltip.
   */
  clickLastRowCellByColText(tEQ: Teq, colText: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the last table row.
   * The cell column is specified by the model field name.
   */
  clickLastRowCellByModelField(tEQ: Teq, fieldName: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  ctrlClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  ctrlClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table cell.
   */
  doubleClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table cell.
   */
  doubleClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

export interface TableViewChecks extends ComponentChecks {

}

export interface TableViewLogs extends ComponentLogs {
  /**
   * Prints the table content to the test log.
   */
  content(tEQ: Teq, idForLog: ElementIdForLog): Promise<undefined>;
}

export interface TableView {
  actions: TableViewActions;
  /**
   * alias for actions.
   */
  a: TableViewActions;
  checks: TableViewChecks;
  /**
   * alias for checks.
   */
  c: TableViewChecks;
  logs: TableViewLogs;
  /**
   * alias for logs.
   */
  l: TableViewLogs;
}

