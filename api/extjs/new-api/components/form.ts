'use strict';

import { ElementIdForLog, Teq } from '../types/ej-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import { queryAndAction } from '../tia-extjs-query';
import { getCISContent } from '../../extjs-utils';

const compName = 'Form';

/**
 * gT.eC.form.a or gT.eC.form.actions
 */
export class FormActions extends ComponentActions {
  static compName = compName;
}

/**
 * gT.eC.form.c or gT.eC.form.checks
 */
export class FormChecks extends ComponentChecks {
  static compName = compName;
}

/**
 * gT.eC.form.l or gT.eC.form.logs
 */
export class FormLogs extends ComponentLogs {
  static compName = compName;

  /**
   * Prints the form content to the test log.
   * @includingStores - use true to just include store and print displayField,
   * 1 - to print only displayField, name and text fields (if exist)
   * and 2 to force store printing all fields.
   */
  static async content(tEQ: Teq, includingStores: boolean | number, idForLog?: ElementIdForLog): Promise<undefined>{
    const result = await queryAndAction({
      tEQ,
      action: `return tiaEJ.ctByObj.getForm(cmp, ${includingStores});`,
      idForLog,
      enableLog: false,
    });
    gIn.logger.logln(getCISContent('Content', tEQ, this.compName, idForLog, result, true));

    return undefined;
  }
}
