'use strict';

import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';
import { queryAndAction } from '../tia-extjs-query';

const compName = 'CheckBox';

export class CheckBoxActions extends FormFieldBaseActions {
  static compName = compName;
  static async check(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { checked, id } = await queryAndAction({
          tEQ,
          action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
          idForLog,
          enableLog: false,
        });
        if (!checked) {
          await gT.s.uA.clickById(id, false);
        }
      },
      actionDesc: 'Check',
      enableLog,
    });
  }
  static async uncheck(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { checked, id } = await queryAndAction({
          tEQ,
          action: 'return { checked: cmp.getRawValue(), id: cmpInfo.constProps.inputId };',
          idForLog,
          enableLog: false,
        });
        if (checked) {
          await gT.s.uA.clickById(id, false);
        }
      },
      actionDesc: 'Uncheck',
      enableLog,
    });
  }
  static async checkByEJ(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.setValue(true);',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Check by EJ',
      enableLog,
    });
  }
  static async uncheckByEJ(tEQ, idForLog, enableLog) {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        await queryAndAction({
          tEQ,
          action: 'cmp.setValue(false);',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Uncheck by EJ',
      enableLog,
    });
  }
}

export class CheckBoxChecks extends FormFieldBaseChecks {
  static compName = compName;
}

export class CheckBoxLogs extends FormFieldBaseLogs {
  static compName = compName;
  static async rawValue(tEQ, idForLog) {
    await gT.eC.component.l.rawValue(tEQ, idForLog, val => `${val ? 'checked' : 'unchecked'}`);
  }
}
