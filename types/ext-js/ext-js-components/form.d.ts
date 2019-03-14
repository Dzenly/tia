import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface FormActions extends ComponentActions {
}

interface FormChecks extends ComponentChecks {

}

interface FormLogs extends ComponentLogs {
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

