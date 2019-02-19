'use strict';

const { queryCmpInputId, queryCmpId, queryAndAction } = require('../tia-extjs-query');

const { getCIS, getCISRVal } = require('../../extjs-utils');

const defaultCompName = 'ANY Cmp';

const actions = {
  async clickCmp({
    tEQ,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Click Cmp',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async clickInput({
    tEQ,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Click Input',
    enableLog,
  }) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async sendKeys({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Send keys',
    enableLog,
  }) {
    const realKeys = gT.e.utils.locKeyToStr(keys);

    if (realKeys !== keys && gT.e.utils.debugLocale) {
      keys += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keys}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendKeysById(id, realKeys, false);
      },
    });
  },
  async selectAllAndSendKeys({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Ctrl +a, Send keys',
    enableLog,
  }) {
    const realKeys = gT.e.utils.locKeyToStr(keys);

    if (realKeys !== keys && gT.e.utils.debugLocale) {
      keys += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keys}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.selectAllAndSendKeysById(id, realKeys, false);
      },
    });
  },
  async selectAllSendKeysEnter({
    tEQ,
    keys,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Ctrl +a, Send keys, Enter',
    enableLog,
  }) {
    const realKeys = gT.e.utils.locKeyToStr(keys);

    if (realKeys !== keys && gT.e.utils.debugLocale) {
      keys += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keys}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.selectAllSendKeysEnterById(id, realKeys, false);
      },
    });
  },
};

const checks = {};

const logs = {
  async rawValue(tEQ, compName, idForLog, mapperCb) {
    const { val, disp } = await queryAndAction({
      tEQ,
      action: 'return { val: cmp.getRawValue(), disp: tiaEJ.ctByObj.getCompDispIdProps(cmp)};',
      idForLog,
      enableLog: false,
    });

    const result = mapperCb ? mapperCb(val) : val;
    gIn.logger.logln(getCISRVal(
      tEQ, compName, `${idForLog ? `${idForLog} ` : ''}${disp}:`, result
    ));
  },
};

module.exports = {
  actions,
  checks,
  logs,
};
