// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import {
  FormFieldBaseActions,
  FormFieldBaseChecks,
  FormFieldBaseGrabs,
  FormFieldBaseLogs,
} from './form-field-base';
import { queryAndAction } from '../tia-extjs-query';
import { getCISContent, getCISRVal } from '../../extjs-utils';

const compName = 'ComboBox';

/**
 * gT.eC.combobox.a or gT.eC.combobox.actions
 */
export class ComboBoxActions extends FormFieldBaseActions {
  static compName = compName;

  /**
   * Ctrl + a, Send text by keys, and ENTER to the component.
   */
  static async setByKbd(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    // Inherited from Component.
    await this.click(tEQ, idForLog, false);
    return this.sendCtrlAKeysEnter(tEQ, text, idForLog, enableLog);
  }

  /**
   * Set the text using expand() ExtJs API + mouse click in BoundList.
   * Note, that for tagfield setting already selected tag will reset this tag.
   */
  static async setByMouse(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);

    let actionDesc = `Set by mouse: '${text}'`;
    if (valueStr !== text && gT.e.utils.debugLocale) {
      actionDesc += `("${valueStr}")`;
    }

    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        // TODO: honestly I should change cmp.expand() to key.Down.
        const { id, fieldName } = await queryAndAction({
          tEQ,
          action:
            'cmp.expand(); return { id: cmpInfo.constProps.realId, fieldName: cmp.displayField }',
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver.wait(
          () =>
            gT.s.browser.executeScriptWrapper(`return tiaEJ.hEById.isCBPickerVisible('${id}');`),
          gT.engineConsts.cbBoundListTimeout
        );

        const el = await gT.s.browser.executeScriptWrapper(
          `return tiaEJ.hEById.getCBItemByField('${id}', ${gT.s.browser.valueToParameter(
            valueStr
          )}, '${fieldName}');`
        );

        await el.click();

        await gT.e.wait.ajaxRequestsFinish(undefined, false);
      },
      actionDesc,
      enableLog,
    });
  }
  /**
   * Clears the combobox selection using ExtJs API.
   */
  static async clearByEJ(
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
          action: 'cmp.clearValue();',
          idForLog,
          enableLog: false,
        });
      },
      actionDesc: 'Clear by EJ',
      enableLog,
    });
  }
}

/**
 * gT.eC.combobox.c or gT.eC.combobox.checks
 */
export class ComboBoxChecks extends FormFieldBaseChecks {
  static compName = compName;
}

/**
 * gT.eC.combobox.g or gT.eC.combobox.grabs
 */
export class ComboBoxGrabs extends FormFieldBaseGrabs {
  static compName = compName;
  /**
   * Returns the selected value or values to the test log.
   */
  static async rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCBSelectedVals(cmp);',
      idForLog,
      enableLog: false,
    });

    return getCISRVal(tEQ, this.compName, idForLog, result);
  }

  /**
   * Returns the entire content to the test log.
   */
  static async content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCB(cmp);',
      idForLog,
      enableLog: false,
    });

    return getCISContent('Content', tEQ, this.compName, idForLog, result);
  }
}

/**
 * gT.eC.combobox.l or gT.eC.combobox.logs
 */
export class ComboBoxLogs extends FormFieldBaseLogs {
  static compName = compName;
  /**
   * Prints the selected value or values to the test log.
   */
  static async rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const str = await ComboBoxGrabs.rawValue(tEQ, idForLog);
    gIn.logger.logln(str);
  }

  /**
   * Prints the entire content to the test log.
   */
  static async content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const str = await ComboBoxGrabs.content(tEQ, idForLog);
    gIn.logger.logln(str);
  }
}

export class ComboBoxAPI {
  static a = ComboBoxActions;
  static actions = ComboBoxActions;
  static c = ComboBoxChecks;
  static checks = ComboBoxChecks;
  static g = ComboBoxGrabs;
  static grabs = ComboBoxGrabs;
  static l = ComboBoxLogs;
  static logs = ComboBoxLogs;
}
