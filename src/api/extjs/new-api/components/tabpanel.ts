

import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentGrabs, ComponentLogs } from './component';
import { queryAndAction } from '../tia-extjs-query';

const compName = 'TabPanel';

/**
 * gT.eC.tabpanel.a or gT.eC.tabpanel.actions
 */
export class TabPanelActions extends ComponentActions {
  static compName = compName;

  /**
   * Sets the active card using card id.
   * This is non - Selenium action based on
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.tab.Panel.html#method-setActiveTab
   * Note: If you are not ExtJs programmer - just avoid this method.
   * Use EJ Explorer to get component and TEQ for click.
   * @param cardId - id of the card to set.
   */
  static async setActiveTabByCardId(
    tEQ: Teq,
    cardId: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${compName} ${
        idForLog ? `${idForLog} ` : ''
      }"${tEQ}": select tab by cardId: "${cardId}" ... `,
      enableLog,
      act: () =>
        queryAndAction({
          tEQ,
          action: `cmp.setActiveTab('${cardId}');`,
          enableLog: false,
        }),
    });
  }
}

/**
 * gT.eC.tabpanel.c or gT.eC.tabpanel.checks
 */
export class TabPanelChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.tabpanel.g or gT.eC.tabpanel.grabs
 */
export class TabPanelGrabs extends ComponentGrabs {
  static compName = compName;
}

/**
 * gT.eC.tabpanel.l or gT.eC.tabpanel.logs
 */
export class TabPanelLogs extends ComponentLogs {
  static compName = compName;
}

export class TabPanelAPI {
  static a = TabPanelActions;
  static actions = TabPanelActions;
  static c = TabPanelChecks;
  static checks = TabPanelChecks;
  static g = TabPanelGrabs;
  static grabs = TabPanelGrabs;
  static l = TabPanelLogs;
  static logs = TabPanelLogs;
}
