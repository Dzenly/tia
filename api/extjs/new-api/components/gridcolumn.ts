'use strict';

import { ElementIdForLog, EnableLog, Teq } from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import { queryAndAction } from '../tia-extjs-query';

const compName = 'GridColumn';

/**
 * gT.eC.gridcolumn.a or gT.eC.gridcolumn.actions
 */
export class GridColumnActions extends ComponentActions {
  static compName = compName;

  /**
   * Left mouse click on GridColumn trigger element.
   */
  static async clickTrigger(
    tEQ: Teq,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<void> {
    return gT.e.q.wrap({
      tEQ,
      compName,
      idForLog,
      act: async () => {
        const { el, trigger } = await queryAndAction({
          tEQ,
          action:
            'return { el: cmpInfo.constProps.domEl, trigger: cmpInfo.constProps.triggerEl } ;',
          idForLog,
          enableLog: false,
        });

        await gT.sOrig.driver
          .actions({ bridge: true })
          .move({
            origin: el,
            x: 1,
            y: 1,
            duration: 0,
          })
          .perform();

        await gT.sOrig.driver.wait(gT.sOrig.until.elementIsVisible(trigger));

        await trigger.click();
      },
      actionDesc: 'Click trigger',
      enableLog,
    });
  }
}

/**
 * gT.eC.gridcolumn.c or gT.eC.gridcolumn.checks
 */
export class GridColumnChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.gridcolumn.l or gT.eC.gridcolumn.logs
 */
export class GridColumnLogs extends ComponentLogs {
  static compName = compName;
}
