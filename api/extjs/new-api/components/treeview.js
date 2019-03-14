'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

// const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: cmpActions } = require('./component');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const { inspect } = require('util');

const compName = 'TreeView';

const actions = {
  compName,

  // async selectRowByEJ(tEQ, rowData, idForLog, enableLog) {
  //
  //   // Если это панель - найти вью.
  //   // getStore().
  //   // s.find()
  //   //
  //
  //   // await gT.e.wait.idle(undefined, false);
  //
  //
  //   // const objStr = inspect(localeObj, { compact: true, breakLength: 200 });
  //
  //   return gT.e.q.wrap({
  //     tEQ,
  //     compName,
  //     idForLog,
  //     act: async () => {
  //       await queryAndAction({
  //         tEQ,
  //         action: 'cmp.clearValue();',
  //         idForLog,
  //         enableLog: false,
  //       });
  //     },
  //     actionDesc: `Select row (${JSON.stringify(rowData)}) by EJ`,
  //     enableLog,
  //   });
  // },
  // async clickRow(tEQ, rowData, idForLog, enableLog) {
  //   // Дождаться idle?
  //
  //   // Если это панель - найти вью.
  //
  //   //
  //
  //   return gT.e.q.wrap({
  //     tEQ,
  //     compName,
  //     idForLog,
  //     act: async () => {
  //       await queryAndAction({
  //         tEQ,
  //         action: 'cmp.clearValue();',
  //         idForLog,
  //         enableLog: false,
  //       });
  //     },
  //     actionDesc: 'Clear by EJ',
  //     enableLog,
  //   });
  // },
  //
  // async clickColumn(tEQ, rowData, colData, idForLog, enableLog) {
  // },

  // ? setVisibleColumns
  // ? setSort

};

const checks = {
  compName,
};

const logs = {
  compName,

  async content(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getTree(cmp);',
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
