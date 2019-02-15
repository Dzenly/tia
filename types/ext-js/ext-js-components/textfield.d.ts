import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementNameForLog, EnableLog, Teq} from '../common';

interface TextFieldActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, then keys.
   */
  setText(tEQ: Teq, text: string, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;
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

