'use strict';

const { queryCmpInputId, queryCmpId, queryAndAction } = require('../tia-extjs-query');

const { getCIS, getCISRVal } = require('../../extjs-utils');

const defaultCompName = 'ANY Cmp';

function checkTEQ(tEQ) {
  if (!tEQ) {
    throw new Error('No TEQ string, remember that function takes object as parameters.');
  }

}

const actions = {
  async clickCmp({
    tEQ,
    compName = defaultCompName,
    idForLog = '',
    actionDesc = 'Click Cmp',
    enableLog,
  }) {
    checkTEQ(tEQ);
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
    checkTEQ(tEQ);
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
    checkTEQ(tEQ);
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keysArg}' ... `,
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
    checkTEQ(tEQ);
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keysArg}' ... `,
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
    checkTEQ(tEQ);
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, compName, idForLog)} ${actionDesc} '${keysArg}' ... `,
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
