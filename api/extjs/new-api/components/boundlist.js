'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

// const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: anyActions } = require('./any');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const { inspect } = require('util');

const compName = 'Table';

const actions = {
  async selectRowByEJ(tEQ, rowData, idForLog, enableLog) {

    // Если это панель - найти вью.
    // getStore().
    // s.find()
    //

    // await gT.e.wait.idle(undefined, false);

    // const objStr = inspect(localeObj, { compact: true, breakLength: 200 });

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.clearValue();',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: `Select row (${JSON.stringify(rowData)}) by EJ`,
      enableLog,
    });
  },
  async clickRow(tEQ, rowData, idForLog, enableLog) {
    // Дождаться idle?

    // Если это панель - найти вью.

    //

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.clearValue();',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Clear by EJ',
      enableLog,
    });
  },

  async clickColumn(tEQ, rowData, colData, idForLog, enableLog) {
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

    gIn.logger.logln(getCISContent(tEQ, compName, idForLog, result));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
