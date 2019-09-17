'use strict';

import { ElementIdForLog, Teq } from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

import { queryAndAction } from '../tia-extjs-query';

import { getCISRVal } from '../../extjs-utils';

const compName = 'Button';

// TODO: задействовать везде idForLog.

/**
 * gT.eC.button.a or gT.eC.button.actions
 */
export class ButtonActions extends ComponentActions {
  static compName = compName;
}

/**
 * gT.eC.button.c or gT.eC.button.checks
 */
export class ButtonChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.button.l or gT.eC.button.logs
 */
export class ButtonLogs extends ComponentLogs {
  static compName = compName;
  /**
   * Prints info about the button which user can see on the display.
   */
  static async info(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCompDispIdProps(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, compName, idForLog, result));


  }
}
