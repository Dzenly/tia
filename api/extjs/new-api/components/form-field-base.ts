'use strict';

import { ElementIdForLog, EnableLog, Teq } from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

import { queryAndAction } from '../tia-extjs-query';
import { getCISRVal } from '../../extjs-utils';

const compName = 'FormFieldBase';

/**
 * gT.eC.formFieldBase.a or gT.eC.formFieldBase.actions
 */
export class FormFieldBaseActions extends ComponentActions {
  static compName = compName;
  /**
   * Sets value to any form field.
   * Note: use this method only if other methods do not work (except setRawValueByEJ, which is very last resort).
   * Because it does not emulate user action,
   * and uses pure ExtJs API to set the control value.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setValue
   * @param value - value to set to the form field.
   */
  static async setValueByEJ(
    tEQ: Teq,
    strValue: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void>{
    let realValue = gT.e.utils.locKeyToStrAndEscapeSlashes(strValue);

    if (realValue !== strValue && gT.e.utils.debugLocale) {
      realValue += ` ("${strValue}")`;
    }

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: `cmp.setValue('${realValue}');`,
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Set Value',
      enableLog,
    });
  }
  /**
   * Sets raw value to any form field.
   * Note: use this method only as very last resort, if other methods do not work (even setValueByEJ).
   * Because it does not emulate user action,
   * and uses pure ExtJs API to set the control value.
   * Also it does not send onChange event to ExtJs component.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.field.Base.html#method-setRawValue
   * @param value - value to set to the form field.
   */
  static async setRawValueByEJ(
    tEQ: Teq,
    strValue: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void>{
    let realValue = gT.e.utils.locKeyToStrAndEscapeSlashes(strValue);

    if (realValue !== strValue && gT.e.utils.debugLocale) {
      realValue += ` ("${strValue}")`;
    }

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: `cmp.setRawValue('${realValue}');`,
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Set Raw Value',
      enableLog,
    });
  }
}

/**
 * gT.eC.formFieldBase.c or gT.eC.formFieldBase.checks
 */
export class FormFieldBaseChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.formFieldBase.l or gT.eC.formFieldBase.logs
 */
export class FormFieldBaseLogs extends ComponentLogs {
  static compName = compName;
  /**
   * Prints raw form field value to the log.
   * See ExtJs docs on getRawValue for the corresponding Component.
   * @param mapperCallback - callback to map a raw value to a log string. if omitted - val is used as is.
   */
  static async rawValue(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    mapperCallback?: (val: string) => string
  ): Promise<void>{
    const { val, disp } = await queryAndAction({
      tEQ,
      action: 'return { val: cmp.getRawValue(), disp: tiaEJ.ctByObj.getCompDispIdProps(cmp)};',
      idForLog,
      enableLog: false,
    });

    const result = mapperCallback ? mapperCallback(val) : val;
    gIn.logger.logln(
      getCISRVal(tEQ, this.compName, `${idForLog ? `${idForLog} ` : ''}${disp}:`, result)
    );


  }
}
