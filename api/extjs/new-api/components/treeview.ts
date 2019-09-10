'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

import { ElementIdForLog, EnableLog, Teq } from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import { queryAndAction } from '../tia-extjs-query';
import { getCISContent } from '../../extjs-utils';

const compName = 'TreeView';

/**
 * gT.eC.treeview.a or gT.eC.treeview.actions
 */
export class TreeViewActions extends ComponentActions {
  static compName = compName;

  /**
   * Left mouse button click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  static async clickItem(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined> {
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

  /**
   * Right mouse button click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  static async rClickItem(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined> {
    // TODO: wait for idle ?
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

  /**
   * Left mouse button double click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  static async doubleClickItem(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined> {
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

/**
 * gT.eC.treeview.c or gT.eC.treeview.checks
 */
export class TreeViewChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.treeview.l or gT.eC.treeview.logs
 */
export class TreeViewLogs extends ComponentLogs {
  static compName = compName;

  /**
   * Prints the tree content to the test log.
   */
  static async content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getTree(cmp);',
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));

    return undefined;
  }
}
