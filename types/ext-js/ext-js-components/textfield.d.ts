import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementNameForLog, LogAction, Teq} from '../common';

interface TextFieldActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;

  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;

  /**
   * Ctrl + a, then keys.
   */
  setText(tEQ: Teq, text: string, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;
}

interface TextFieldChecks {

}

interface TextFieldLogs {

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

