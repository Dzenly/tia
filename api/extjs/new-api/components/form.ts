'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

const _ = require('lodash');

// const { queryCmpInputId } = require('../tia-extjs-query');
// const { actions: cmpActions } = require('./component');
const { queryAndAction } = require('../tia-extjs-query');
const { getCISRVal, getCISContent } = require('../../extjs-utils');

const compName = 'Form';

export class FormActions extends ComponentActions {
  static compName = compName;
}

export class FormChecks extends ComponentChecks {
  static compName = compName;
}

export class FormLogs extends ComponentLogs {
  static compName = compName;
  static async content(tEQ, includingStores, idForLog) {
    const result = await queryAndAction({
      tEQ,
      action: `return tiaEJ.ctByObj.getForm(cmp, ${includingStores});`,
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));
  }
}
