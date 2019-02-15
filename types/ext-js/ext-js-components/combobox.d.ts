import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementNameForLog, LogAction, Teq} from '../common';

interface ComboBoxActions {
  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;

  /**
   * Ctrl + a, Send text by keys, and ENTER to the component.
   */
  select(tEQ: Teq, text: string, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;
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

