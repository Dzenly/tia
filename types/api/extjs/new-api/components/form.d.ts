import { Teq } from '../types/ej-types';
import { ElementIdForLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.form.a or gT.eC.form.actions
 */
export declare class FormActions extends ComponentActions {
    static compName: string;
}
/**
 * gT.eC.form.c or gT.eC.form.checks
 */
export declare class FormChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.form.l or gT.eC.form.logs
 */
export declare class FormLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints the form content to the test log.
     * @includingStores - use true to just include store and print displayField,
     * 1 - to print only displayField, name and text fields (if exist)
     * and 2 to force store printing all fields.
     */
    static content(tEQ: Teq, includingStores: boolean | number, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class FormAPI {
    static a: typeof FormActions;
    static actions: typeof FormActions;
    static c: typeof FormChecks;
    static checks: typeof FormChecks;
    static l: typeof FormLogs;
    static logs: typeof FormLogs;
}
