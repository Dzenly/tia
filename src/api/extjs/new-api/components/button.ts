import { Teq } from '../types/ej-types';
import { ElementIdForLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentGrabs, ComponentLogs } from './component';

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
 * gT.eC.button.g or gT.eC.button.grabs
 */
export class ButtonGrabs extends ComponentGrabs {
  static compName = compName;
  /**
   * Returns info about the button which user can see on the display.
   */
  static async info(tEQ: Teq, idForLog?: ElementIdForLog): Promise<string> {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCompDispIdProps(cmp);',
      idForLog,
      enableLog: false,
    });
    return getCISRVal(tEQ, compName, idForLog, result);
  }
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
    const str = await ButtonGrabs.info(tEQ, idForLog);
    gIn.logger.logln(str);
  }
}

export class ButtonAPI {
  static a = ButtonActions;
  static actions = ButtonActions;
  static c = ButtonChecks;
  static checks = ButtonChecks;
  static g = ButtonGrabs;
  static grabs = ButtonGrabs;
  static l = ButtonLogs;
  static logs = ButtonLogs;
}
