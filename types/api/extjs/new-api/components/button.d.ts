import { Teq } from '../types/ej-types';
import { ElementIdForLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.button.a or gT.eC.button.actions
 */
export declare class ButtonActions extends ComponentActions {
    static compName: string;
}
/**
 * gT.eC.button.c or gT.eC.button.checks
 */
export declare class ButtonChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.button.l or gT.eC.button.logs
 */
export declare class ButtonLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints info about the button which user can see on the display.
     */
    static info(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class ButtonAPI {
    static a: typeof ButtonActions;
    static actions: typeof ButtonActions;
    static c: typeof ButtonChecks;
    static checks: typeof ButtonChecks;
    static l: typeof ButtonLogs;
    static logs: typeof ButtonLogs;
}
