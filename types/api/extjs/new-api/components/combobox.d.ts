import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';
/**
 * gT.eC.combobox.a or gT.eC.combobox.actions
 */
export declare class ComboBoxActions extends FormFieldBaseActions {
    static compName: string;
    /**
     * Ctrl + a, Send text by keys, and ENTER to the component.
     */
    static setByKbd(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Set the text using expand() ExtJs API + mouse click in BoundList.
     * Note, that for tagfield setting already selected tag will reset this tag.
     */
    static setByMouse(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Clears the combobox selection using ExtJs API.
     */
    static clearByEJ(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.combobox.c or gT.eC.combobox.checks
 */
export declare class ComboBoxChecks extends FormFieldBaseChecks {
    static compName: string;
}
/**
 * gT.eC.combobox.l or gT.eC.combobox.logs
 */
export declare class ComboBoxLogs extends FormFieldBaseLogs {
    static compName: string;
    /**
     * Prints the selected value or values to the test log.
     */
    static rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
    /**
     * Prints the entire content to the test log.
     */
    static content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class ComboBoxAPI {
    static a: typeof ComboBoxActions;
    static actions: typeof ComboBoxActions;
    static c: typeof ComboBoxChecks;
    static checks: typeof ComboBoxChecks;
    static l: typeof ComboBoxLogs;
    static logs: typeof ComboBoxLogs;
}
