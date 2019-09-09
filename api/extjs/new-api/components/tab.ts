'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const compName = 'Tab';

export class TabActions extends ComponentActions {
  static compName = compName;
}

export class TabChecks extends ComponentChecks {
  static compName = compName;
}

export class TabLogs extends ComponentLogs {
  static compName = compName;
}
