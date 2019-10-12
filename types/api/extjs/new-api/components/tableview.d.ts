import { TableCellByColumns, TableCellByModelFields, Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.tableview.a or gT.eC.tableview.actions
 */
export declare class TableViewActions extends ComponentActions {
    static compName: string;
    /**
     * Left mouse button click on the specified group name.
     */
    static clickGroupRoot(tEQ: Teq, groupName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on the specified table cell.
     */
    static clickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified table cell.
     */
    static rClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on the specified column in the first table row.
     * @colText - the column header text or tooltip.
     */
    static clickFirstRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified column in the first table row.
     * @colText - the column header text or tooltip.
     */
    static rClickFirstRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on the specified column in the last table row.
     * @colText - the column header text or tooltip.
     */
    static clickLastRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified column in the last table row.
     * @colText - the column header text or tooltip.
     */
    static rClickLastRowCellByColText(tEQ: Teq, colText: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on the specified column in the first table row.
     * The cell column is specified by the model field name.
     */
    static clickFirstRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified column in the first table row.
     * The cell column is specified by the model field name.
     */
    static rClickFirstRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<any>;
    /**
     * Left mouse button click on the specified column in the last table row.
     * The cell column is specified by the model field name.
     */
    static clickLastRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified column in the last table row.
     * The cell column is specified by the model field name.
     */
    static rClickLastRowCellByModelField(tEQ: Teq, fieldName: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button double click on the specified table cell.
     */
    static doubleClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Ctrl + Left mouse button click on the specified table cell.
     */
    static ctrlClickCellByColTexts(tEQ: Teq, cellData: TableCellByColumns, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
     *
     * @param column - Column header text or tooltip, specifying column to click
     * @param values - array of values for cells in the specified column.
     */
    static ctrlClickCellsByColTexts(tEQ: Teq, column: string, values: string[], idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on the specified table cell.
     */
    static clickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the specified table cell.
     */
    static rClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button double click on the specified table cell.
     */
    static doubleClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Ctrl + Left mouse button click on the specified table cell.
     */
    static ctrlClickCellByModelFields(tEQ: Teq, cellData: TableCellByModelFields, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
     *
     * @param fieldName - field name.
     * @param values - array of values for cells in the column corresponding to the field name.
     */
    static ctrlClickCellsByModelFields(tEQ: Teq, fieldName: string, values: string[], idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.tableview.c or gT.eC.tableview.checks
 */
export declare class TableViewChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.tableview.l or gT.eC.tableview.logs
 */
export declare class TableViewLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints the table content to the test log.
     */
    static content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class TableViewAPI {
    static a: typeof TableViewActions;
    static actions: typeof TableViewActions;
    static c: typeof TableViewChecks;
    static checks: typeof TableViewChecks;
    static l: typeof TableViewLogs;
    static logs: typeof TableViewLogs;
}
