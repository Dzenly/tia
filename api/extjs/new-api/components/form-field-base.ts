'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

import { queryAndAction } from '../tia-extjs-query';
import { getCISRVal } from '../../extjs-utils';

const compName = 'FormFieldBase';

export class FormFieldBaseActions extends ComponentActions {
  static compName = compName;

  static async setValueByEJ(tEQ, strValue, idForLog, enableLog) {
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

  static async setRawValueByEJ(tEQ, strValue, idForLog, enableLog) {
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

export class FormFieldBaseChecks extends ComponentChecks {
  static compName = compName;
}

export class FormFieldBaseLogs extends ComponentLogs {
  static compName = compName;
  static async rawValue(tEQ, idForLog, mapperCallback) {
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
