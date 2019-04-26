'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const { queryAndAction } = require('../tia-extjs-query');
const { getCISContent } = require('../../extjs-utils');

const compName = 'TreeView';

const actions = {
  compName,

  async clickItem(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const item = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTreeListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await item.click();
      },
      actionDesc: `Click Item (${text})`,
      enableLog,
    });
  },

  async rClickItem(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const item = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTreeListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver.actions({ bridge: true })
          .contextClick(item)
          .perform();
      },
      actionDesc: `Right Click Item (${text})`,
      enableLog,
    });
  },

  async doubleClickItem(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const item = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getTreeListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver.actions({ bridge: true })
          .doubleClick(item)
          .perform();
      },
      actionDesc: `Double Click Item (${text})`,
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
