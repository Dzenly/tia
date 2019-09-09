'use strict';

import * as _ from 'lodash';

import { queryCmpInput, queryCmpInputId, queryCmpId, queryAndAction } from '../tia-extjs-query';

import { getCIS, getCISRVal } from '../../extjs-utils';

const compName = 'Component';

export class ComponentActions {
  static compName = compName;

  static async click(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(tEQ, idForLog, false);
        await gT.s.uA.clickById(id, false);
      },
    });
  }
  static async rClick(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Right Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(tEQ, idForLog, false);
        await gT.s.uA.rClickById(id, false);
      },
    });
  }

  static async dblClick(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Dbl Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(tEQ, idForLog, false);
        await gT.s.uA.dblClickById(id, false);
      },
    });
  }

  static async clickInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(tEQ, idForLog, false);
        await gT.s.uA.clickById(id, false);
      },
    });
  }
  static async rClickInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Right Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(tEQ, idForLog, false);
        await gT.s.uA.rClickById(id, false);
      },
    });
  }
  static async dblClickInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Dbl Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(tEQ, idForLog, false);
        await gT.s.uA.dblClickById(id, false);
      },
    });
  }
  static async moveMouse(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Move mouse to Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId(tEQ, idForLog, false);
        await gT.s.uA.moveMouseById(id, false);
      },
    });
  }
  static async moveMouseToInput(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Move mouse to Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput(tEQ, idForLog, false);
        await gT.s.uA.moveMouseById(id, false);
      },
    });
  }
  static async sendEsc(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ESC ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendEscById(id, false);
      },
    });
  }
  static async sendDown(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendDownById(id, false);
      },
    });
  }
  static async sendUp(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendUpById(id, false);
      },
    });
  }
  static async sendEnter(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ENTER ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendEnterById(id, false);
      },
    });
  }
  static async sendTab(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send TAB ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendTabById(id, false);
      },
    });
  }
  static async sendPgDown(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendPgDownById(id, false);
      },
    });
  }
  static async sendPgUp(tEQ, idForLog = '', enableLog) {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendPgUpById(id, false);
      },
    });
  }
  static async sendKeys(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} sendKeys: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendKeysById(id, realKeys, false);
      },
    });
  }
  static async sendCtrlAAndKeys(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A and keys: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendCtrlAAndKeysById(id, realKeys, false);
      },
    });
  }
  static async sendCtrlAKeysEnter(tEQ, keys, idForLog = '', enableLog) {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A, keys, ENTER: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId(tEQ, idForLog, false);
        await gT.s.uA.sendCtrlAKeysEnterById(id, realKeys, false);
      },
    });
  }

  static async waitForEnabledAndNotMasked(
    tEQ,
    timeout = gT.engineConsts.timeoutForEnabledByTEQ,
    idForLog,
    enableLog
  ) {
    const realId = await queryCmpId(tEQ, idForLog, enableLog);

    return gIn.wrap({
      msg: `${getCIS(
        tEQ,
        this.compName,
        idForLog
      )} Wait for component to become enabled and non masked: ... `,
      enableLog,
      act: () =>
        gT.sOrig.driver.wait(async () => {
          const res = await gT.s.browser.executeScriptWrapper(
            `return !(Ext.getCmp('${realId}').isDisabled()) && !(Ext.getCmp('${realId}').isMasked(true));`
          );

          // console.log(`HERE: ${realId} ${res}`);
          return res;
        }, timeout),
    });
  }
}

export class ComponentChecks {
  static compName = compName;
}

export class ComponentLogs {
  static compName = compName;
}
