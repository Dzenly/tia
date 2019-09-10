'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const compName = 'Tab';

/**
 * gT.eC.tab.a or gT.eC.tab.actions
 */
export class TabActions extends ComponentActions {
  static compName = compName;
}

/**
 * gT.eC.tab.c or gT.eC.tab.checks
 */
export class TabChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.tab.l or gT.eC.tab.logs
 */
export class TabLogs extends ComponentLogs {
  static compName = compName;
}
