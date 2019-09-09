'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const _ = require('lodash');

const { queryAndAction } = require('../tia-extjs-query');
const { getCISContent } = require('../../extjs-utils');

const compName = 'BoundList';

export class BoundListActions extends ComponentActions {
  static compName = compName;

  static async clickRow(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStrAndEscapeSlashes(text);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const row = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getBoundListItem(cmp, '${valueStr}');`,
          idForLog,
          enableLog: false,
        });

        await row.click();
      },
      actionDesc: `Click Row (${text})`,
      enableLog,
    });
  }

  static async ctrlClickRows(tEQ, texts, idForLog, enableLog) {
    // Дождаться idle?
    let textsArg = _.cloneDeep(texts);
    textsArg = textsArg.map(text => gT.e.utils.locKeyToStrAndEscapeSlashes(text));
    const args = gIn.textUtils.v2s(textsArg);
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const rows = await queryAndAction({
          tEQ,
          action: `return tiaEJActs.getBoundListItems(cmp, ${args});`,
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL)
          .perform();

        for (const row of rows) {
          await row.click();
        }

        await gT.sOrig.driver
          .actions({ bridge: true })
          .keyUp(gT.sOrig.key.CONTROL)
          .perform();
      },
      actionDesc: `Ctrl Click Rows (${gIn.textUtils.v2s(texts)})`,
      enableLog,
    });
  }
}

export class BoundListChecks extends ComponentChecks {
  static compName = compName;
}

export class BoundListLogs extends ComponentLogs {
  static compName = compName;

  // TODO: доделать.
  static async contentByStore(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByStore(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(getCISContent('Content by store', tEQ, this.compName, idForLog, result));
  }

  static async contentByInnerText(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(getCISContent('Content by inner text', tEQ, this.compName, idForLog, result));
  }

  static async selectedContentByInnerText(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListSelectedItemsByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(
      getCISContent('Selected content by inner text', tEQ, this.compName, idForLog, result)
    );
  }
}
