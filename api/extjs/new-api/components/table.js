'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

// const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: anyActions } = require('./any');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const compName = 'Table';

const actions = {

  // No, setSelection or setSelectionModel work unstable.
  // async selectRowByEJ(tEQ, rowData, idForLog, enableLog) {},

  async clickCellByColTexts(tEQ, cellData, idForLog, enableLog) {
    const args = gIn.tU.v2s(cellData);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const cell = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTableCell(cmp, ${args});`,
          idForLog,
          enableLog: false,
        });

        cell.click();
      },
      actionDesc: `Click cell by Col Texts: ${args}`,
      enableLog,
    });
  },

  async clickCellByFieldNames(tEQ, cellData, idForLog, enableLog) {
  },

  // ? setVisibleColumns
  // ? setSort

};

const checks = {};

const logs = {
  async rawValue(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCBSelectedVals(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, compName, idForLog, result));
  },

  async content(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCB(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISContent('Content', tEQ, compName, idForLog, result));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
