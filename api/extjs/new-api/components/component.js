'use strict';

const _ = require('lodash');

const {
  queryCmpInput, queryCmpInputId, queryCmpId, queryAndAction,
} = require('../tia-extjs-query');

const { getCIS, getCISRVal } = require('../../extjs-utils');

const compName = 'Component';

const actions = {
  compName,
  async click(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)}: Click Cmp: ... `,
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
  async dblClick(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)}: Dbl Click Cmp: ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.dblClickById(id, false);
      },
    });
  },
  async clickInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.clickById(id, false);
      },
    });
  },
  async dblClickInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Dbl Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.dblClickById(id, false);
      },
    });
  },
  async sendEsc(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ESC ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendEscById(id, false);
      },
    });
  },
  async sendDown(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendDownById(id, false);
      },
    });
  },
  async sendUp(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendUpById(id, false);
      },
    });
  },
  async sendEnter(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ENTER ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendEnterById(id, false);
      },
    });
  },
  async sendTab(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send TAB ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendTabById(id, false);
      },
    });
  },
  async sendPgDown(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendPgDownById(id, false);
      },
    });
  },
  async sendPgUp(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendPgUpById(id, false);
      },
    });
  },
  async sendKeys(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} sendKeys: '${keysArg}' ... `,
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
  async sendCtrlAAndKeys(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A and keys: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendCtrlAAndKeysById(id, realKeys, false);
      },
    });
  },
  async sendCtrlAKeysEnter(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStr(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A, keys, ENTER: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(
          tEQ,
          idForLog,
          false
        );
        await gT.s.uA.sendCtrlAKeysEnterById(id, realKeys, false);
      },
    });
  },
};

const checks = {
  compName,
};

const logs = {
  compName,
};

module.exports = {
  actions,
  checks,
  logs,
};
