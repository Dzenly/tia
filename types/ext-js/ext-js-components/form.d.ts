import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface FormActions extends ComponentActions {
}

interface FormChecks extends ComponentChecks {

}

interface FormLogs extends ComponentLogs {
  /**
   * Prints the form content to the test log.
   * @includingStores - Is inner content of controls to be printed.
   */
  content(tEQ: Teq, includingStores: boolean, idForLog: ElementIdForLog): Promise<undefined>;
}

export interface Form {
  actions: FormActions;
  /**
   * alias for actions.
   */
  a: FormActions;
  checks: FormChecks;
  /**
   * alias for checks.
   */
  c: FormChecks;
  logs: FormLogs;
  /**
   * alias for logs.
   */
  l: FormLogs;
}

