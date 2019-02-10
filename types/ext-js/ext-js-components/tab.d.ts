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
  a: TabActions;
  checks: TabChecks;
  c: TabChecks;
  logs: TabLogs;
  l: TabLogs;
}

