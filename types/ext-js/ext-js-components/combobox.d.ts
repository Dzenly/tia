import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementNameForLog, EnableLog, Teq} from '../common';

interface ComboBoxActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, Send text by keys, and ENTER to the component.
   */
  select(tEQ: Teq, text: SeleniumKeys, idForLog: ElementNameForLog, enableLog: EnableLog): Promise<undefined>;
}

interface ComboBoxChecks {

}

interface ComboBoxLogs {

}

export interface ComboBox {
  actions: ComboBoxActions;
  /**
   * alias for actions.
   */
  a: ComboBoxActions;
  checks: ComboBoxChecks;
  /**
   * alias for checks.
   */
  c: ComboBoxChecks;
  logs: ComboBoxLogs;
  /**
   * alias for logs.
   */
  l: ComboBoxLogs;
}

