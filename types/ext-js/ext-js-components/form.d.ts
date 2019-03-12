import {ElementIdForLog, EnableLog, TableCellByColumns, TableCellByModelFields, Teq} from '../common';

interface FormActions {
}

interface FormChecks {

}

interface FormLogs {
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

