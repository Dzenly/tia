'use strict';

import {
  ComponentActions,
  ComponentChecks,
  ComponentLogs,
} from './component';

import { queryAndAction } from '../tia-extjs-query';

import { getCISRVal } from '../../extjs-utils';

const compName = 'Button';

// TODO: задействовать везде idForLog.

export class ButtonActions extends ComponentActions {
  static compName = compName;
}

export class ButtonChecks extends ComponentChecks {
  static compName = compName;
}

export class ButtonLogs extends ComponentLogs {
  static compName = compName;
  static async info(tEQ, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: 'return tiaEJ.ctByObj.getCompDispIdProps(cmp);',
      idForLog,
      enableLog: false,
    });

    gIn.logger.logln(getCISRVal(tEQ, compName, idForLog, result));
  }
}
