import {ElementIdForLog, EnableLog, Teq} from '../common';

interface CheckBoxActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Clicks on input checkbox element if checkbox is not checked.
   */
  check(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Clicks on input checkbox element if checkbox is checked.
   */
  uncheck(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sets checkbox to checked state using ExtJs API.
   */
  checkByEJ(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sets checkbox to unchecked state using ExtJs API.
   */
  uncheckByEJ(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface CheckBoxChecks {

}

interface CheckBoxLogs {

  /**
   * Prints 'checked' or 'unchecked'.
   */
  rawValue(tEQ: Teq, idForLog: ElementIdForLog): Promise<undefined>;
}

export interface CheckBox {
  actions: CheckBoxActions;
  /**
   * alias for actions.
   */
  a: CheckBoxActions;
  checks: CheckBoxChecks;
  /**
   * alias for checks.
   */
  c: CheckBoxChecks;
  logs: CheckBoxLogs;
  /**
   * alias for logs.
   */
  l: CheckBoxLogs;
}

