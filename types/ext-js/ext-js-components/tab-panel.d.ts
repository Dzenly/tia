import {ElementNameForLog, LogAction, Teq} from '../common';

interface TabPanelActions {
  /**
   * Sets the active card using card id.
   * This is non - Selenium action based on
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.tab.Panel.html#method-setActiveTab
   * @param elNameForLog
   * @param logAction
   */
  setActiveTabByCardId(tEQ: Teq, cardId: string, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;
}

interface TabPanelChecks {

}

interface TabPanelLogs {

}

export interface TabPanel {
  actions: TabPanelActions,
  a: TabPanelActions,
  checks: TabPanelChecks,
  c: TabPanelChecks,
  logs: TabPanelLogs,
  l: TabPanelLogs,
}

