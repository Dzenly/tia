import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import {
  FormFieldBaseActions,
  FormFieldBaseChecks,
  FormFieldBaseGrabs,
  FormFieldBaseLogs,
} from './form-field-base';
import { queryAndAction } from '../tia-extjs-query';

const compName = 'CheckBox';

/**
 * gT.eC.checkbox.a or gT.eC.checkbox.actions
 */
export class CheckBoxActions extends FormFieldBaseActions {
  static compName = compName;

  /**
   * Clicks on input checkbox element if checkbox is not checked.
   */
  static async check(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void> {
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
  /**
   * Clicks on input checkbox element if checkbox is checked.
   */
  static async uncheck(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void> {
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
  /**
   * Sets checkbox to checked state using ExtJs API.
   */
  static async checkByEJ(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
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
  /**
   * Sets checkbox to unchecked state using ExtJs API.
   */
  static async uncheckByEJ(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
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

/**
 * gT.eC.checkbox.c or gT.eC.checkbox.checks
 */
export class CheckBoxChecks extends FormFieldBaseChecks {
  static compName = compName;
}

/**
 * gT.eC.checkbox.g or gT.eC.checkbox.grabs
 */
export class CheckBoxGrabs extends FormFieldBaseGrabs {
  static compName = compName;
  /**
   * Returns 'checked' or 'unchecked'.
   */
  static async rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    return await gT.eC.formFieldBase.g.rawValue(
      tEQ,
      idForLog,
      val => `${val ? 'checked' : 'unchecked'}`
    );
  }
}

/**
 * gT.eC.checkbox.l or gT.eC.checkbox.logs
 */
export class CheckBoxLogs extends FormFieldBaseLogs {
  static compName = compName;
  /**
   * Prints 'checked' or 'unchecked'.
   */
  static async rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    await gT.eC.formFieldBase.l.rawValue(tEQ, idForLog, val => `${val ? 'checked' : 'unchecked'}`);
  }
}

export class CheckBoxAPI {
  static a = CheckBoxActions;
  static actions = CheckBoxActions;
  static c = CheckBoxChecks;
  static checks = CheckBoxChecks;
  static g = CheckBoxGrabs;
  static grabs = CheckBoxGrabs;
  static l = CheckBoxLogs;
  static logs = CheckBoxLogs;
}
