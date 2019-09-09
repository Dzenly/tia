'use strict';

import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import { queryAndAction } from '../tia-extjs-query';

const compName = 'TabPanel';

export class TabPanelActions extends ComponentActions {
  static compName = compName;

  static async setActiveTabByCardId(tEQ, cardId, idForLog, enableLog) {
    return gIn.wrap({
      msg: `${compName} ${
        idForLog ? `${idForLog} ` : ''
      }"${tEQ}": select tab by cardId: "${cardId}" ... `,
      enableLog,
      act: () =>
        queryAndAction({
          tEQ,
          action: `cmp.setActiveTab('${cardId}');`,
          enableLog: false,
        }),
    });
  }
}

export class TabPanelChecks extends ComponentChecks {
  static compName = compName;
}

export class TabPanelLogs extends ComponentLogs {
  static compName = compName;
}
