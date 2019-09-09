'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const { queryAndAction } = require('../tia-extjs-query');
const { actions: cmpActions, checks: anyChecks, logs: anyLogs } = require('./component');
const { getCISRVal } = require('../../extjs-utils');

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
  };
}
