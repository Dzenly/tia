import {ElementNameForLog, EnableLog, Teq} from '../common';

interface CheckBoxActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Clicks on input checkbox element if checkbox is not checked.
   */
  check(tEQ: Teq, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Clicks on input checkbox element if checkbox is checked.
   */
  uncheck(tEQ: Teq, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;
}

interface CheckBoxChecks {

}

interface CheckBoxLogs {

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

