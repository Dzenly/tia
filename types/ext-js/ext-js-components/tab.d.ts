import {ElementNameForLog, LogAction, Teq} from '../common';

interface TabActions {
  /**
   * Left mouse button click.
   */
  click(tEQ: Teq, elNameForLog: ElementNameForLog, logAction: LogAction): Promise<undefined>;
}

interface TabChecks {

}

interface TabLogs {

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

