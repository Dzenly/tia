import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementNameForLog, LogAction, Teq} from '../common';

interface AnyComponentActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;

  /**
   * Send keys to the component.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;

  /**
   * Send keys and ENTER to the component.
   */
  sendKeysAndEnter(tEQ: Teq, keys: SeleniumKeys, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;
}

interface AnyComponentChecks {

}

interface AnyComponentLogs {

}

export interface AnyComponent {
  actions: AnyComponentActions;
  /**
   * alias for actions.
   */
  a: AnyComponentActions;
  checks: AnyComponentChecks;
  /**
   * alias for checks.
   */
  c: AnyComponentChecks;
  logs: AnyComponentLogs;
  /**
   * alias for logs.
   */
  l: AnyComponentLogs;
}

