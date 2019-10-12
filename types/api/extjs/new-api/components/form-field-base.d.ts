import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.formFieldBase.a or gT.eC.formFieldBase.actions
 */
export declare class FormFieldBaseActions extends ComponentActions {
    static compName: string;
    /**
     * Sets value to any form field.
     * Note: use this method only if other methods do not work (except setRawValueByEJ, which is very last resort).
     * Because it does not emulate user action,
     * and uses pure ExtJs API to set the control value.
     * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setValue
     * @param value - value to set to the form field.
     */
    static setValueByEJ(tEQ: Teq, strValue: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sets raw value to any form field.
     * Note: use this method only as very last resort, if other methods do not work (even setValueByEJ).
     * Because it does not emulate user action,
     * and uses pure ExtJs API to set the control value.
     * Also it does not send onChange event to ExtJs component.
     * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setRawValue
     * @param value - value to set to the form field.
     */
    static setRawValueByEJ(tEQ: Teq, strValue: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.formFieldBase.c or gT.eC.formFieldBase.checks
 */
export declare class FormFieldBaseChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.formFieldBase.l or gT.eC.formFieldBase.logs
 */
export declare class FormFieldBaseLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints raw form field value to the log.
     * See ExtJs docs on getRawValue for the corresponding Component.
     * @param mapperCallback - callback to map a raw value to a log string. if omitted - val is used as is.
     */
    static rawValue(tEQ: Teq, idForLog?: ElementIdForLog, mapperCallback?: (val: string) => string): Promise<void>;
}
export declare class FormFieldBaseAPI {
    static a: typeof FormFieldBaseActions;
    static actions: typeof FormFieldBaseActions;
    static c: typeof FormFieldBaseChecks;
    static checks: typeof FormFieldBaseChecks;
    static l: typeof FormFieldBaseLogs;
    static logs: typeof FormFieldBaseLogs;
}
