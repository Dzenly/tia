import { ElementIdForLog, EnableLog, Teq } from '../common';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

/**
 * gT.eC.tabpanel.actions or gT.eC.tabpanel.a
 */
interface TabPanelActions extends ComponentActions {
  /**
   * Sets the active card using card id.
   * This is non - Selenium action based on
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.tab.Panel.html#method-setActiveTab
   * Note: If you are not ExtJs programmer - just avoid this method.
   * Use EJ Explorer to get component and TEQ for click.
   * @param cardId - id of the card to set.
   */
  setActiveTabByCardId(
    tEQ: Teq,
    cardId: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined>;
}

/**
 * gT.eC.tabpanel.checks or gT.eC.tabpanel.c
 */
interface TabPanelChecks extends ComponentChecks {}

/**
 * gT.eC.tabpanel.logs or gT.eC.tabpanel.l
 */
interface TabPanelLogs extends ComponentLogs {}

/**
 * gT.eC.tabpanel
 */
export interface TabPanel {
  actions: TabPanelActions;
  /**
   * alias for actions.
   */
  a: TabPanelActions;
  checks: TabPanelChecks;
  /**
   * alias for checks.
   */
  c: TabPanelChecks;
  logs: TabPanelLogs;
  /**
   * alias for logs.
   */
  l: TabPanelLogs;
}
