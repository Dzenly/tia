'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

import { ElementIdForLog, EnableLog, Teq } from '../types/ej-types';
import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';
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
  ): Promise<undefined> {
    // Inherited from Component.
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
  ): Promise<undefined> {
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
  ): Promise<undefined> {
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
 * gT.eC.combobox.l or gT.eC.combobox.logs
 */
export class ComboBoxLogs extends FormFieldBaseLogs {
  static compName = compName;
  /**
   * Prints the selected value or values to the test log.
   */
  static async rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCBSelectedVals(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, this.compName, idForLog, result));

    return undefined;
  }

  /**
   * Prints the entire content to the test log.
   */
  static async content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCB(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result));

    return undefined;
  }
}
