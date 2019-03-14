import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface TabActions extends ComponentActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface TabChecks extends ComponentChecks {

}

interface TabLogs extends ComponentLogs {

}

export interface Tab {
  actions: TabActions;
  /**
   * alias for actions.
   */
  a: TabActions;
  checks: TabChecks;
  /**
   * alias for checks.
   */
  c: TabChecks;
  logs: TabLogs;
  /**
   * alias for logs.
   */
  l: TabLogs;
}

