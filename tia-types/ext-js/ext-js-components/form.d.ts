import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface FormActions extends ComponentActions {
}

interface FormChecks extends ComponentChecks {

}

interface FormLogs extends ComponentLogs {
  /**
   * Prints the form content to the test log.
   * @includingStores - use true to just include store and print displayField,
   * 1 - to print only displayField, name and text fields (if exist)
   * and 2 to force store printing all fields.
   */
  content(tEQ: Teq, includingStores: boolean, idForLog?: ElementIdForLog): Promise<undefined>;
}

/**
 * gT.eC.form
 */
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

