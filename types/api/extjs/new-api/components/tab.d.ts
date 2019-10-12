import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.tab.a or gT.eC.tab.actions
 */
export declare class TabActions extends ComponentActions {
    static compName: string;
}
/**
 * gT.eC.tab.c or gT.eC.tab.checks
 */
export declare class TabChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.tab.l or gT.eC.tab.logs
 */
export declare class TabLogs extends ComponentLogs {
    static compName: string;
}
export declare class TabAPI {
    static a: typeof TabActions;
    static actions: typeof TabActions;
    static c: typeof TabChecks;
    static checks: typeof TabChecks;
    static l: typeof TabLogs;
    static logs: typeof TabLogs;
}
