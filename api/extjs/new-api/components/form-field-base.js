'use strict';

const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal } = require('../../extjs-utils');

const compName = 'FormFieldBase';

const actions = {
  compName,
  async setValueByEJ(tEQ, strValue, idForLog, enableLog) {
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
  },

  async setRawValueByEJ(tEQ, strValue, idForLog, enableLog) {
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
  },
};

const checks = {
  compName,
};

const logs = {
  compName,
  async rawValue(tEQ, idForLog, mapperCallback) {
    const { val, disp } = await queryAndAction({
      tEQ,
      action: 'return { val: cmp.getRawValue(), disp: tiaEJ.ctByObj.getCompDispIdProps(cmp)};',
      idForLog,
      enableLog: false,
    });

    const result = mapperCallback ? mapperCallback(val) : val;
    gIn.logger.logln(getCISRVal(
      tEQ, this.compName, `${idForLog ? `${idForLog} ` : ''}${disp}:`, result
    ));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
