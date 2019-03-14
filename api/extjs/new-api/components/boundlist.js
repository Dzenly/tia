'use strict';

// https://stackoverflow.com/questions/11000087/how-to-select-a-combobox-value-in-extjs

'use strict';

const _ = require('lodash');

// const { queryCmpInputId } = require('../tia-extjs-query');
const { actions: cmpActions } = require('./component');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const { inspect } = require('util');

const compName = 'BoundList';

const actions = {
  compName,

  async clickRow(tEQ, text, idForLog, enableLog) {
    // Дождаться idle?
    const valueStr = gT.e.utils.locKeyToStr(text);
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
      actionDesc: `clickRow (${text})`,
      enableLog,
    });
  },

  async ctrlClickRows(tEQ, texts, idForLog, enableLog) {
    // Дождаться idle?
    let textsArg = _.cloneDeep(texts);
    textsArg = textsArg.map(text => gT.e.utils.locKeyToStr(text));
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

        await gT.sOrig.driver.actions({ bridge: true })
          .keyDown(gT.sOrig.key.CONTROL).perform();

        for (const row of rows) {
          await row.click();
        }

        await gT.sOrig.driver.actions({ bridge: true })
          .keyUp(gT.sOrig.key.CONTROL).perform();
      },
      actionDesc: `ctrlClickRows (${gIn.textUtils.v2s(texts)})`,
      enableLog,
    });
  },
};

const checks = {
  compName,
};

const logs = {
  compName,

  // TODO: доделать.
  async contentByStore(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByStore(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(getCISContent('Content by store', tEQ, this.compName, idForLog, result));
  },

  async contentByInnerText(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(getCISContent('Content by inner text', tEQ, this.compName, idForLog, result));
  },

  async selectedContentByInnerText(tEQ, idForLog) {
    let result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getBoundListSelectedItemsByInnerText(cmp);',
      idForLog,
      enableLog: false,
    });

    result = result.join('\n');

    gIn.logger.logln(getCISContent('Selected content by inner text', tEQ, this.compName, idForLog, result));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
