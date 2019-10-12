import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';
/**
 * gT.eC.checkbox.a or gT.eC.checkbox.actions
 */
export declare class CheckBoxActions extends FormFieldBaseActions {
    static compName: string;
    /**
     * Clicks on input checkbox element if checkbox is not checked.
     */
    static check(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Clicks on input checkbox element if checkbox is checked.
     */
    static uncheck(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sets checkbox to checked state using ExtJs API.
     */
    static checkByEJ(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sets checkbox to unchecked state using ExtJs API.
     */
    static uncheckByEJ(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.checkbox.c or gT.eC.checkbox.checks
 */
export declare class CheckBoxChecks extends FormFieldBaseChecks {
    static compName: string;
}
/**
 * gT.eC.checkbox.l or gT.eC.checkbox.logs
 */
export declare class CheckBoxLogs extends FormFieldBaseLogs {
    static compName: string;
    /**
     * Prints 'checked' or 'unchecked'.
     */
    static rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class CheckBoxAPI {
    static a: typeof CheckBoxActions;
    static actions: typeof CheckBoxActions;
    static c: typeof CheckBoxChecks;
    static checks: typeof CheckBoxChecks;
    static l: typeof CheckBoxLogs;
    static logs: typeof CheckBoxLogs;
}
