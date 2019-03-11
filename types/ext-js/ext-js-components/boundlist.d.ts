import {ElementIdForLog, EnableLog, Teq} from '../common';

interface BoundListActions {

  /**
   * Left mouse button click on the item containing the given text.
   * @param text - text for row to click.
   */
  clickRow(tEQ: Teq, text: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the items containing the given texts.
   * So it selects given string.
   * @param texts - texts for rows to click.
   */
  ctrlClickRows(tEQ: Teq, texts: string[], idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface BoundListChecks {

}

interface BoundListLogs {
}

export interface BoundList {
  actions: BoundListActions;
  /**
   * alias for actions.
   */
  a: BoundListActions;
  checks: BoundListChecks;
  /**
   * alias for checks.
   */
  c: BoundListChecks;
  logs: BoundListLogs;
  /**
   * alias for logs.
   */
  l: BoundListLogs;
}

