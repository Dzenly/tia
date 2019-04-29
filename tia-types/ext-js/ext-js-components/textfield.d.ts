import {FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs} from './form-field-base';

interface TextFieldActions extends FormFieldBaseActions {
}

interface TextFieldChecks extends FormFieldBaseChecks {
}

interface TextFieldLogs extends FormFieldBaseLogs {
}

export interface TextField {
  actions: TextFieldActions;
  /**
   * alias for actions.
   */
  a: TextFieldActions;
  checks: TextFieldChecks;
  /**
   * alias for checks.
   */
  c: TextFieldChecks;
  logs: TextFieldLogs;
  /**
   * alias for logs.
   */
  l: TextFieldLogs;
}

