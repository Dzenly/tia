'use strict';

import {
  ElementIdForLog,
  EnableLog,
  TableCellByColumns,
  TableCellByModelFields,
  Teq,
} from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import * as _ from 'lodash';
import { queryAndAction } from '../tia-extjs-query';
import { getCISContent } from '../../extjs-utils';

const compName = 'TableView';

function prepareCellData(cellData) {
  // eslint-disable-next-line no-param-reassign
  cellData.row = cellData.row.map(item => [
    gT.e.utils.locKeyToStr(item[0]),
    gT.e.utils.locKeyToStr(item[1]),
  ]);

  if (cellData.column) {
    // eslint-disable-next-line no-param-reassign
    cellData.column = gT.e.utils.locKeyToStr(cellData.column);
  }

  if (cellData.field) {
    // eslint-disable-next-line no-param-reassign
    cellData.field = gT.e.utils.locKeyToStr(cellData.field);
  }
  return cellData;
}

/**
 * gT.eC.tableview.a or gT.eC.tableview.actions
 */
export class TableViewActions extends ComponentActions {
  static compName = compName;

  // No, setSelection or setSelectionModel work unstable.
  // async selectRowByEJ(tEQ, rowData, idForLog, enableLog) {},

  /**
   * Left mouse button click on the specified group name.
   */
  static async clickGroupRoot(
    tEQ: Teq,
    groupName: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(groupName);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const groupRootEl = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getGroupRoot(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await groupRootEl.click();
      },
      actionDesc: `Click Group Root (${groupName})`,
      enableLog,
    });
  }

  /**
   * Left mouse button click on the specified table cell.
   */
  static async clickCellByColTexts(
    tEQ: Teq,
    cellData: TableCellByColumns,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByColumnTexts(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified table cell.
   */
  static async rClickCellByColTexts(
    tEQ: Teq,
    cellData: TableCellByColumns,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByColumnTexts(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Left mouse button click on the specified column in the first table row.
   * @colText - the column header text or tooltip.
   */
  static async clickFirstRowCellByColText(
    tEQ: Teq,
    colText: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const colTextArg = gT.e.utils.locKeyToStr(colText);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getFirstRowCellByColumnText(cmp, '${colTextArg}');`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click first row cell by Col Text: ${colText}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified column in the first table row.
   * @colText - the column header text or tooltip.
   */
  static async rClickFirstRowCellByColText(
    tEQ: Teq,
    colText: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const colTextArg = gT.e.utils.locKeyToStr(colText);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getFirstRowCellByColumnText(cmp, '${colTextArg}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click first row cell by Col Text: ${colText}`,
      enableLog,
    });
  }

  /**
   * Left mouse button click on the specified column in the last table row.
   * @colText - the column header text or tooltip.
   */
  static async clickLastRowCellByColText(
    tEQ: Teq,
    colText: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const colTextArg = gT.e.utils.locKeyToStr(colText);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getLastRowCellByColumnText(cmp, '${colTextArg}');`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click last row cell by Col Text: ${colText}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified column in the last table row.
   * @colText - the column header text or tooltip.
   */
  static async rClickLastRowCellByColText(
    tEQ: Teq,
    colText: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const colTextArg = gT.e.utils.locKeyToStr(colText);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getLastRowCellByColumnText(cmp, '${colTextArg}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click last row cell by Col Text: ${colText}`,
      enableLog,
    });
  }

  /**
   * Left mouse button click on the specified column in the first table row.
   * The cell column is specified by the model field name.
   */
  static async clickFirstRowCellByModelField(
    tEQ: Teq,
    fieldName: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getFirstRowCellByModelField(cmp, '${fieldName}');`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click first row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified column in the first table row.
   * The cell column is specified by the model field name.
   */
  static async rClickFirstRowCellByModelField(tEQ, fieldName, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getFirstRowCellByModelField(cmp, '${fieldName}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click first row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  }

  /**
   * Left mouse button click on the specified column in the last table row.
   * The cell column is specified by the model field name.
   */
  static async clickLastRowCellByModelField(
    tEQ: Teq,
    fieldName: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getLastRowCellByModelField(cmp, '${fieldName}');`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click last row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified column in the last table row.
   * The cell column is specified by the model field name.
   */
  static async rClickLastRowCellByModelField(
    tEQ: Teq,
    fieldName: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getLastRowCellByModelField(cmp, '${fieldName}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click last row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  }

  /**
   * Left mouse button double click on the specified table cell.
   */
  static async doubleClickCellByColTexts(
    tEQ: Teq,
    cellData: TableCellByColumns,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByColumnTexts(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Double Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  static async ctrlClickCellByColTexts(
    tEQ: Teq,
    cellData: TableCellByColumns,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByColumnTexts(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .click(cell)
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl + Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
   *
   * @param column - Column header text or tooltip, specifying column to click
   * @param values - array of values for cells in the specified column.
   */
  /* eslint-disable-next-line max-params */
  static async ctrlClickCellsByColTexts(
    tEQ: Teq,
    column: string,
    values: string[],
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    for (const value of values) {
      await this.ctrlClickCellByColTexts(
        tEQ,
        {
          row: [[column, value]],
          column,
        },
        idForLog,
        enableLog
      );
    }
  }

  /**
   * Left mouse button click on the specified table cell.
   */
  static async clickCellByModelFields(
    tEQ: Teq,
    cellData: TableCellByModelFields,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByModelFields(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await cell.click();
      },
      actionDesc: `Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Right mouse button click on the specified table cell.
   */
  static async rClickCellByModelFields(
    tEQ: Teq,
    cellData: TableCellByModelFields,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByModelFields(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Right Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Left mouse button double click on the specified table cell.
   */
  static async doubleClickCellByModelFields(
    tEQ: Teq,
    cellData: TableCellByModelFields,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByModelFields(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Double Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Ctrl + Left mouse button click on the specified table cell.
   */
  static async ctrlClickCellByModelFields(
    tEQ: Teq,
    cellData: TableCellByModelFields,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const cellDataArg = prepareCellData(_.cloneDeep(cellData));

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCellByModelFields(cmp, ${gIn.tU.v2s(cellDataArg)});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .click(cell)
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl + Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  }

  /**
   * Multi-selection by Ctrl + Left mouse button click on the specified table cell on several rows.
   *
   * @param fieldName - field name.
   * @param values - array of values for cells in the column corresponding to the field name.
   */
  /* eslint-disable-next-line max-params */
  static async ctrlClickCellsByModelFields(
    tEQ: Teq,
    fieldName: string,
    values: string[],
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    for (const value of values) {
      await this.ctrlClickCellByModelFields(
        tEQ,
        {
          row: [[fieldName, value]],
          field: fieldName,
          useRowIfCellAbsent: true,
        },
        idForLog,
        enableLog
      );
    }
  }
}

/**
 * gT.eC.tableview.c or gT.eC.tableview.checks
 */
export class TableViewChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.tableview.l or gT.eC.tableview.logs
 */
export class TableViewLogs extends ComponentLogs {
  static compName = compName;

  /**
   * Prints the table content to the test log.
   */
  static async content(tEQ: Teq, idForLog?: ElementIdForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getTable(cmp);',
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  }

  // static async contentByStore(tEQ, idForLog) {
  //   let result = await queryAndAction({
  //     tEQ,
  //     action: 'return tiaEJ.ctByObj.getBoundListByStore(cmp);',
  //     idForLog,
  //     enableLog: false,
  //   });
  //
  //   result = result.join('\n');
  //
  //   gIn.logger.logln(getCISContent('Content by store', tEQ, this.compName, idForLog, result));
  // },
  //
  // async contentByInnerText(tEQ, idForLog) {
  //   let result = await queryAndAction({
  //     tEQ,
  //     action: 'return tiaEJ.ctByObj.getBoundListByInnerText(cmp);',
  //     idForLog,
  //     enableLog: false,
  //   });
  //
  //   result = result.join('\n');
  //
  //   gIn.logger.logln(getCISContent('Content by inner text', tEQ, this.compName, idForLog, result));
  // },
  //
  // async selectedContentByInnerText(tEQ, idForLog) {
  //   let result = await queryAndAction({
  //     tEQ,
  //     action: 'return tiaEJ.ctByObj.getBoundListSelectedItemsByInnerText(cmp);',
  //     idForLog,
  //     enableLog: false,
  //   });
  //
  //   result = result.join('\n');
  //
  //   gIn.logger.logln(getCISContent('Selected content by inner text', tEQ, this.compName, idForLog, result));
  // }
}

export class TableViewAPI {
  static a = TableViewActions;
  static actions = TableViewActions;
  static c = TableViewChecks;
  static checks = TableViewChecks;
  static l = TableViewLogs;
  static logs = TableViewLogs;
}
