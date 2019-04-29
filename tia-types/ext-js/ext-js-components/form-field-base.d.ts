import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface FormFieldBaseActions extends ComponentActions {
  /**
   * Sets value to any form field.
   * Note: use this method only if other methods do not work (except setRawValueByEJ, which is very last resort).
   * Because it does not emulate user action,
   * and uses pure ExtJs API to set the control value.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setValue
   * @param value - value to set to the form field.
   */
  setValueByEJ(tEQ: Teq, value: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;


  /**
   * Sets raw value to any form field.
   * Note: use this method only as very last resort, if other methods do not work (even setValueByEJ).
   * Because it does not emulate user action,
   * and uses pure ExtJs API to set the control value.
   * Also it does not send onChange event to ExtJs component.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setRawValue
   * @param value - value to set to the form field.
   */
  setRawValueByEJ(tEQ: Teq, value: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

interface FormFieldBaseChecks extends ComponentChecks {
}

interface FormFieldBaseLogs extends ComponentLogs {
  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

  /**
   * Prints raw form field value to the log.
   * See ExtJs docs on getRawValue for the corresponding Component.
   * @param compName - the Component name (textfield, checkbox, etc.)
   * @param mapperCallback - callback to map a raw value to a log string. if omitted - val is used as is.
   */
  rawValue(tEQ: Teq, compName: string, idForLog?: ElementIdForLog, mapperCallback?: (val: string) => string): Promise<undefined>;
}

export interface FormFieldBase {
  actions: FormFieldBaseActions;
  /**
   * alias for actions.
   */
  a: FormFieldBaseActions;
  checks: FormFieldBaseChecks;
  /**
   * alias for checks.
   */
  c: FormFieldBaseChecks;
  logs: FormFieldBaseLogs;
  /**
   * alias for logs.
   */
  l: FormFieldBaseLogs;
}

