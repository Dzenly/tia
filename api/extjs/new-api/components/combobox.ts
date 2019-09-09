'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';

const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

// const { inspect } = require('util');

const compName = 'ComboBox';

export class ComboBoxActions extends FormFieldBaseActions {
  static compName = compName;

  static async setByKbd(tEQ, text, idForLog, enableLog) {
    // Унаследована от Component.
    return this.sendCtrlAKeysEnter(tEQ, text, idForLog, enableLog);
  }
  static async setByMouse(tEQ, text, idForLog, enableLog) {
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

  static async clearByEJ(tEQ, idForLog, enableLog) {
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

export class ComboBoxChecks extends FormFieldBaseChecks {
  static compName = compName;
}

export class ComboBoxLogs extends FormFieldBaseLogs {
  static compName = compName;
  static async rawValue(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCBSelectedVals(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, this.compName, idForLog, result));
  }

  static async content(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCB(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result));
  }
}
