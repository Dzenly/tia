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

  async clickItem(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStr(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const row = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTreeListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await row.click();
      },
      actionDesc: `Click Item (${text})`,
      enableLog,
    });
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
