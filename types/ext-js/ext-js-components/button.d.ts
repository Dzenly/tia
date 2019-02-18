import {ElementIdForLog, EnableLog, Teq} from '../common';

interface ButtonActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface ButtonChecks {

}

interface ButtonLogs {

  /**
   * Prints info about the button which user can see on the display.
   */
  info(tEQ: Teq, idForLog: ElementIdForLog): Promise<undefined>;
}

export interface Button {
  actions: ButtonActions;
  /**
   * alias for actions.
   */
  a: ButtonActions;
  checks: ButtonChecks;
  /**
   * alias for checks.
   */
  c: ButtonChecks;
  logs: ButtonLogs;
  /**
   * alias for logs.
   */
  l: ButtonLogs;
}

