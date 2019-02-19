import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';

interface TextFieldActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, then keys.
   */
  setText(tEQ: Teq, text: SeleniumKeys, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface TextFieldChecks {

}

interface TextFieldLogs {

  /**
   * Prints the value to the test log.
   */
  rawValue(tEQ: Teq, idForLog: ElementIdForLog): Promise<undefined>;
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

