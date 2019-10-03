'use strict';

import * as _ from 'lodash';

import { queryCmpInput, queryCmpInputId, queryCmpId, queryAndAction } from '../tia-extjs-query';

import { getCIS, getCISRVal } from '../../extjs-utils';
import { ElementIdForLog, EnableLog, Teq } from '../types/ej-types';

const compName = 'Component';

/**
 * gT.eC.component.a or gT.eC.component.actions
 */
export class ComponentActions {
  static compName = compName;

  /**
   * Left mouse button click on Component.
   * Default actionDesc is 'Click Cmp'.
   * Note: if it does not work, try clickInput().
   */
  static async click(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.clickById(id, false);
      },
    });
  }

  /**
   * Right mouse button click on Component.
   * Default actionDesc is 'Right Click Cmp'.
   * Note: if it does not work, try clickInput().
   */
  static async rClick(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Right Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.rClickById(id, false);
      },
    });
  }

  /**
   * Left mouse button double click on Component.
   * Default actionDesc is 'Click Cmp'.
   * * Note: if it does not work, try dblClickInput().
   */
  static async dblClick(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Dbl Click Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.dblClickById(id, false);
      },
    });
  }

  /**
   * Left mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  static async clickInput(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.clickById(id, false);
      },
    });
  }

  /**
   * Right mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  static async rClickInput(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Right Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.rClickById(id, false);
      },
    });
  }

  /**
   * Left mouse button double click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  static async dblClickInput(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Dbl Click Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.dblClickById(id, false);
      },
    });
  }

  /**
   * Moves the mouse cursor to the center of the specified Component.
   * Default actionDesc is 'Move mouse to Cmp'.
   * Note: if it does not work, try moveMouseToInput().
   */
  static async moveMouse(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Move mouse to Cmp ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.moveMouseById(id, false);
      },
    });
  }

  /**
   * Moves the mouse cursor to the center of the Component's input element.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Move mouse to Cmp input'.
   */
  static async moveMouseToInput(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Move mouse to Cmp Input ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInput({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.moveMouseById(id, false);
      },
    });
  }

  /**
   * Sends ESC key to the component.
   * Can be used, e.g. to close boundlist in combobox.
   */
  static async sendEsc(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ESC ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendEscById(id, false);
      },
    });
  }

  /**
   * Sends DOWN key to the component.
   * Can be used to open boundlist, e.g. in combobox, or splitbutton.
   * Or to move selection in a table.
   */
  static async sendDown(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendDownById(id, false);
      },
    });
  }

  /**
   * Sends UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  static async sendUp(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendUpById(id, false);
      },
    });
  }

  /**
   * Sends ENTER key to the component.
   * E.g. for save value to form.
   */
  static async sendEnter(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send ENTER ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendEnterById(id, false);
      },
    });
  }

  /**
   * Sends TAB key to the component.
   * E.g. to move to next form field.
   */
  static async sendTab(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send TAB ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendTabById(id, false);
      },
    });
  }

  /**
   * Sends PAGE_DOWN key to the component.
   * Can be used e.g. to move selection in a table.
   */
  static async sendPgDown(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_DOWN ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendPgDownById(id, false);
      },
    });
  }

  /**
   * Sends PAGE_UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  static async sendPgUp(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send PAGE_UP ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendPgUpById(id, false);
      },
    });
  }

  /**
   * Sends keys to the component.
   * Default actionDesc is 'Send keys'.
   */
  static async sendKeys(
    tEQ: Teq,
    keys: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} sendKeys: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendKeysById(id, realKeys, false);
      },
    });
  }

  /**
   * Ctrl + a, and send keys to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys'
   */
  static async sendCtrlAAndKeys(
    tEQ: Teq,
    keys: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A and keys: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendCtrlAAndKeysById(id, realKeys, false);
      },
    });
  }

  /**
   * Ctrl + a, keys, ENTER to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys, Enter'
   */
  static async sendCtrlAKeysEnter(
    tEQ: Teq,
    keys: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    let keysArg = _.clone(keys);
    const realKeys = gT.e.utils.locKeyToStrAndEscapeSlashes(keysArg);

    if (realKeys !== keysArg && gT.e.utils.debugLocale) {
      keysArg += ` ("${realKeys}")`;
    }

    return gIn.wrap({
      msg: `${getCIS(tEQ, this.compName, idForLog)} Send Ctrl + A, keys, ENTER: '${keysArg}' ... `,
      enableLog,
      act: async () => {
        const id = await queryCmpInputId({ tEQ, idForLog, enableLog: false });
        await gT.s.uA.sendCtrlAKeysEnterById(id, realKeys, false);
      },
    });
  }

  /**
   * Waits for the component to become enabled and not masked.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isMasked
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isDisabled
   * @param [timeout = 5000] - milliseconds to wait.
   */
  static async waitForEnabledAndNotMasked(
    tEQ: Teq,
    timeout = gT.engineConsts.timeoutForEnabledByTEQ,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    const realId = await queryCmpId({ tEQ, idForLog, enableLog });

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

/**
 * gT.eC.component.c or gT.eC.component.checks
 */
export class ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.component.l or gT.eC.component.logs
 */
export class ComponentLogs {
  static compName = compName;
}

export class ComponentAPI {
  static a = ComponentActions;
  static actions = ComponentActions;
  static c = ComponentChecks;
  static checks = ComponentChecks;
  static l = ComponentLogs;
  static logs = ComponentLogs;
}
