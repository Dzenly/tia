'use strict';

const _ = require('lodash');

// const { queryCmpInputId } = require('../tia-extjs-query');
// const { actions: cmpActions } = require('./component');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const compName = 'TableView';

function prepareCellData(cellData) {
  // eslint-disable-next-line no-param-reassign
  cellData.row = cellData.row.map(
    item => [
      gT.e.utils.locKeyToStr(item[0]),
      gT.e.utils.locKeyToStr(item[1]),
    ]
  );

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

const actions = {

  compName,

  // No, setSelection or setSelectionModel work unstable.
  // async selectRowByEJ(tEQ, rowData, idForLog, enableLog) {},

  async clickGroupRoot(tEQ, groupName, idForLog, enableLog) {
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
  },

  async clickCellByColTexts(tEQ, cellData, idForLog, enableLog) {
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
  },

  async rClickCellByColTexts(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  async clickFirstRowCellByColText(tEQ, colText, idForLog, enableLog) {
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
  },

  async rClickFirstRowCellByColText(tEQ, colText, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click first row cell by Col Text: ${colText}`,
      enableLog,
    });
  },

  async clickLastRowCellByColText(tEQ, colText, idForLog, enableLog) {
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
  },

  async rClickLastRowCellByColText(tEQ, colText, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click last row cell by Col Text: ${colText}`,
      enableLog,
    });
  },

  async clickFirstRowCellByModelField(tEQ, fieldName, idForLog, enableLog) {
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
  },

  async rClickFirstRowCellByModelField(tEQ, fieldName, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click first row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  },

  async clickLastRowCellByModelField(tEQ, fieldName, idForLog, enableLog) {
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
  },

  async rClickLastRowCellByModelField(tEQ, fieldName, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(cell)
          .perform();
      },
      actionDesc: `Right Click last row cell by Model Field: ${fieldName}`,
      enableLog,
    });
  },

  async doubleClickCellByColTexts(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Double Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  async ctrlClickCellByColTexts(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .click(cell)
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl + Click cell by Col Texts: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  /* eslint-disable-next-line max-params */
  async ctrlClickCellsByColTexts(tEQ, column, values, idForLog, enableLog) {
    for (const value of values) {
      await this.ctrlClickCellByColTexts(
        tEQ, {
          row: [[column, value]],
          column,
        },
        idForLog,
        enableLog
      );
    }
  },

  async clickCellByModelFields(tEQ, cellData, idForLog, enableLog) {
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
  },

  async rClickCellByModelFields(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Right Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  async doubleClickCellByModelFields(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .doubleClick(cell)
          .perform();
      },
      actionDesc: `Double Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  async ctrlClickCellByModelFields(tEQ, cellData, idForLog, enableLog) {
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

        await gT.sOrig.driver.actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .click(cell)
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl + Click cell by Model Fields: ${gIn.tU.v2s(cellData)}`,
      enableLog,
    });
  },

  /* eslint-disable-next-line max-params */
  async ctrlClickCellsByModelFields(tEQ, fieldName, values, idForLog, enableLog) {
    for (const value of values) {
      await this.ctrlClickCellByModelFields(
        tEQ, {
          row: [[fieldName, value]],
          field: fieldName,
          useRowIfCellAbsent: true,
        },
        idForLog,
        enableLog
      );
    }
  },

};

const checks = {
  compName,
};

const logs = {
  compName,

  async content(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getTable(cmp);',
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  },

  // async contentByStore(tEQ, idForLog) {
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
  // },
};

module.exports = {
  actions,
  checks,
  logs,
};
