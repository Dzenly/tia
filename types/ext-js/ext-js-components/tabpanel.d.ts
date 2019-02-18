import {ElementIdForLog, EnableLog, Teq} from '../common';

interface TabPanelActions {
  /**
   * Sets the active card using card id.
   * This is non - Selenium action based on
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.tab.Panel.html#method-setActiveTab
   * @param idForLog
   * @param enableLog
   */
  setActiveTabByCardId(tEQ: Teq, cardId: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface TabPanelChecks {

}

interface TabPanelLogs {

}

export interface TabPanel {
  actions: TabPanelActions,
  /**
   * alias for actions.
   */
  a: TabPanelActions,
  checks: TabPanelChecks,
  /**
   * alias for checks.
   */
  c: TabPanelChecks,
  logs: TabPanelLogs,
  /**
   * alias for logs.
   */
  l: TabPanelLogs,
}

