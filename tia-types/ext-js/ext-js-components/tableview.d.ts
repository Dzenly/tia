import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

/**
 * gT.eC.tableview.actions or gT.eC.tableview.a
 */
interface TableViewActions extends ComponentActions {
  /**
   * Left mouse button click on the specified table cell.
   */
  clickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified table cell.
   */
  rClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified table cell.
   */
  clickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified table cell.
   */
  rClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the first table row.
   * @colText - the column header text or tooltip.
   */
  clickFirstRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified column in the first table row.
   * @colText - the column header text or tooltip.
   */
  rClickFirstRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the first table row.
   * The cell column is specified by the model field name.
   */
  clickFirstRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified column in the first table row.
   * The cell column is specified by the model field name.
   */
  rClickFirstRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified group name.
   * @param groupName - name of the group root to click.
   */
  clickGroupRoot(tEQ: Teq, groupName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the last table row.
   * @colText - the column header text or tooltip.
   */
  clickLastRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified column in the last table row.
   * @colText - the column header text or tooltip.
   */
  rClickLastRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on the specified column in the last table row.
   * The cell column is specified by the model field name.
   */
  clickLastRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the specified column in the last table row.
   * The cell column is specified by the model field name.
   */
  rClickLastRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  ctrlClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

    /**
   * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
   *
   * @param column - Column header text or tooltip, specifying column to click
   * @param values - array of values for cells in the specified column.
   */
  ctrlClickCellsByColTexts(tEQ: Teq, column: string, values: string[], idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  ctrlClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
   *
   * @param fieldName - field name.
   * @param values - array of values for cells in the column corresponding to the field name.
   */
  ctrlClickCellsByModelFields(tEQ: Teq, fieldName: string, values: string[], idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table cell.
   */
  doubleClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the specified table cell.
   */
  doubleClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

/**
 * gT.eC.tableview.checks or gT.eC.tableview.c
 */
export interface TableViewChecks extends ComponentChecks {

}

/**
 * gT.eC.tableview.logs or gT.eC.tableview.l
 */
export interface TableViewLogs extends ComponentLogs {
  /**
   * Prints the table content to the test log.
   */
  content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;
}

/**
 * gT.eC.tableview
 */
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

