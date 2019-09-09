'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const { queryAndAction } = require('../tia-extjs-query');

const { actions: cmpActions } = require('./component');

const compName = 'GridColumn';

export class GridColumnActions extends ComponentActions {
  static compName = compName;

  static async clickTrigger(tEQ, idForLog, enableLog) {
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

export class GridColumnChecks extends ComponentChecks {
  static compName = compName;
}

export class GridColumnLogs extends ComponentLogs {
  static compName = compName;
}
