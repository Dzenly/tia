import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';
/**
 * gT.eC.textfield.a or gT.eC.textfield.actions
 */
export declare class TextFieldActions extends FormFieldBaseActions {
    static compName: string;
}
/**
 * gT.eC.textfield.c or gT.eC.textfield.checks
 */
export declare class TextFieldChecks extends FormFieldBaseChecks {
    static compName: string;
}
/**
 * gT.eC.textfield.l or gT.eC.textfield.logs
 */
export declare class TextFieldLogs extends FormFieldBaseLogs {
    static compName: string;
}
export declare class TextFieldAPI {
    static a: typeof TextFieldActions;
    static actions: typeof TextFieldActions;
    static c: typeof TextFieldChecks;
    static checks: typeof TextFieldChecks;
    static l: typeof TextFieldLogs;
    static logs: typeof TextFieldLogs;
}
