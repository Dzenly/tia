import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';

/**
 * gT.eC.textfield.actions or gT.eC.textfield.a
 */
interface TextFieldActions extends FormFieldBaseActions {}

/**
 * gT.eC.textfield.checks or gT.eC.textfield.c
 */
interface TextFieldChecks extends FormFieldBaseChecks {}

/**
 * gT.eC.textfield.logs or gT.eC.textfield.l
 */
interface TextFieldLogs extends FormFieldBaseLogs {}

/**
 * gT.eC.textfield
 */
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
