import { ElementIdForLog, EnableLog, Teq } from '../common';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

interface BoundListActions extends ComponentActions {
  clickRow(
    tEQ: Teq,
    text: string,
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined>;

  /**
   * Ctrl + Left mouse button click on the items containing the given texts.
   * So it selects given string.
   * @param texts - texts for rows to click.
   */
  ctrlClickRows(
    tEQ: Teq,
    texts: string[],
    idForLog?: ElementIdForLog,
    enableLog?: EnableLog
  ): Promise<undefined>;
}

interface BoundListChecks extends ComponentChecks {}

interface BoundListLogs extends ComponentLogs {
  /**
   * Prints all displayField values from the store.
   */
  contentByStore(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;

  /**
   * Prints all innerText DOM element properties for items.
   */
  contentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;

  /**
   * Prints innerText DOM element properties for selected items.
   */
  selectedContentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;
}

/**
 * gT.eC.boundlist
 */
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
