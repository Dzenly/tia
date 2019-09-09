'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const { queryAndAction } = require('../tia-extjs-query');
const { getCISContent } = require('../../extjs-utils');

const compName = 'TreeView';

export class TreeViewActions extends ComponentActions {
  static compName = compName;

  static async clickItem(tEQ, text, idForLog, enableLog) {
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
  }

  static async rClickItem(tEQ, text, idForLog, enableLog) {
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

        await gT.sOrig.driver
          .actions({ bridge: true })
          .contextClick(item)
          .perform();
      },
      actionDesc: `Right Click Item (${text})`,
      enableLog,
    });
  }

  static async doubleClickItem(tEQ, text, idForLog, enableLog) {
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

        await gT.sOrig.driver
          .actions({ bridge: true })
          .doubleClick(item)
          .perform();
      },
      actionDesc: `Double Click Item (${text})`,
      enableLog,
    });
  }
}

export class TreeViewChecks extends ComponentChecks {
  static compName = compName;
}

export class TreeViewLogs extends ComponentLogs {
  static compName = compName;

  static async content(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getTree(cmp);',
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  }
}
