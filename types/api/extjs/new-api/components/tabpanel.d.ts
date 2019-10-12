import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.tabpanel.a or gT.eC.tabpanel.actions
 */
export declare class TabPanelActions extends ComponentActions {
    static compName: string;
    /**
     * Sets the active card using card id.
     * This is non - Selenium action based on
     * https://docs.sencha.com/extjs/6.5.3/classic/Ext.tab.Panel.html#method-setActiveTab
     * Note: If you are not ExtJs programmer - just avoid this method.
     * Use EJ Explorer to get component and TEQ for click.
     * @param cardId - id of the card to set.
     */
    static setActiveTabByCardId(tEQ: Teq, cardId: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.tabpanel.c or gT.eC.tabpanel.checks
 */
export declare class TabPanelChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.tabpanel.l or gT.eC.tabpanel.logs
 */
export declare class TabPanelLogs extends ComponentLogs {
    static compName: string;
}
export declare class TabPanelAPI {
    static a: typeof TabPanelActions;
    static actions: typeof TabPanelActions;
    static c: typeof TabPanelChecks;
    static checks: typeof TabPanelChecks;
    static l: typeof TabPanelLogs;
    static logs: typeof TabPanelLogs;
}
