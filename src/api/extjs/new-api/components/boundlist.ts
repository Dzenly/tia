// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

import { ComponentActions, ComponentChecks, ComponentGrabs, ComponentLogs } from './component';

import * as _ from 'lodash';

import { queryAndAction } from '../tia-extjs-query';
import { getCISContent } from '../../extjs-utils';
import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';

const compName = 'BoundList';

/**
 * gT.eC.boundlist.a or gT.eC.boundlist.actions
 */
export class BoundListActions extends ComponentActions {
  static compName = compName;

  /**
   * Left mouse button click on the item containing the given text.
   * @param text - text for row to click.
   */
  static async clickRow(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    // TODO: wait for idle?
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const row = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getBoundListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await row.click();
      },
      actionDesc: `Click Row (${text})`,
      enableLog,
    });
  }

  /**
   * Ctrl + Left mouse button click on the items containing the given texts.
   * So it selects given string.
   * @param texts - texts for rows to click.
   */
  static async ctrlClickRows(
    tEQ: Teq,
    texts: string[],
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    // Дождаться idle?
    let textsArg = _.cloneDeep(texts);
    textsArg = textsArg.map(text => gT.e.utils.locKeyToStrAndEscapeSlashes(text));
    const args = gIn.textUtils.v2s(textsArg);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const rows = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getBoundListItems(cmp, ${args});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .perform();

        for (const row of rows) {
          await row.click();
        }

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl Click Rows (${gIn.textUtils.v2s(texts)})`,
      enableLog,
    });
  }
}

/**
 * gT.eC.boundlist.c or gT.eC.boundlist.checks
 */
export class BoundListChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.boundlist.g or gT.eC.boundlist.grabs
 */
export class BoundListGrabs extends ComponentGrabs {
  static compName = compName;

  /**
   * Returns all displayField values from the store.
   * TODO: Incompleted?
   */
  static async contentByStore(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByStore(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    return getCISContent('Content by store', tEQ, this.compName, idForLog, result);
  }

  /**
   * Returns all innerText DOM element properties for items.
   */
  static async contentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    return getCISContent('Content by inner text', tEQ, this.compName, idForLog, result);
  }

  /**
   * Returns innerText DOM element properties for selected items.
   */
  static async selectedContentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListSelectedItemsByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    return getCISContent('Selected content by inner text', tEQ, this.compName, idForLog, result);
  }
}

export class BoundListLogs extends ComponentLogs {
  static compName = compName;

  /**
   * Prints all displayField values from the store.
   * TODO: Incompleted?
   */
  static async contentByStore(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const str = await BoundListGrabs.contentByStore(tEQ, idForLog);
    gIn.logger.logln(str);
  }

  /**
   * Prints all innerText DOM element properties for items.
   */
  static async contentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const str = await BoundListGrabs.contentByInnerText(tEQ, idForLog);
    gIn.logger.logln(str);
  }

  /**
   * Prints innerText DOM element properties for selected items.
   */
  static async selectedContentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const str = await BoundListGrabs.selectedContentByInnerText(tEQ, idForLog);
    gIn.logger.logln(str);
  }
}

export class BoundListAPI {
  static a = BoundListActions;
  static actions = BoundListActions;
  static c = BoundListChecks;
  static checks = BoundListChecks;
  static g = BoundListGrabs;
  static grabs = BoundListGrabs;
  static l = BoundListLogs;
  static logs = BoundListLogs;
}
