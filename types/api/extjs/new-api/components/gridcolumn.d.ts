import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.gridcolumn.a or gT.eC.gridcolumn.actions
 */
export declare class GridColumnActions extends ComponentActions {
    static compName: string;
    /**
     * Left mouse click on GridColumn trigger element.
     */
    static clickTrigger(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.gridcolumn.c or gT.eC.gridcolumn.checks
 */
export declare class GridColumnChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.gridcolumn.l or gT.eC.gridcolumn.logs
 */
export declare class GridColumnLogs extends ComponentLogs {
    static compName: string;
}
export declare class GridColumnAPI {
    static a: typeof GridColumnActions;
    static actions: typeof GridColumnActions;
    static c: typeof GridColumnChecks;
    static checks: typeof GridColumnChecks;
    static l: typeof GridColumnLogs;
    static logs: typeof GridColumnLogs;
}
