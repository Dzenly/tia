import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';
import {TableViewActions, TableViewChecks, TableViewLogs} from './tableview';

interface TreeViewActions extends TableViewActions {

  /**
   * Left mouse button click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  clickItem(tEQ: Teq, text: string, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

interface TreeViewChecks extends TableViewChecks {
}

interface TreeViewLogs extends TableViewLogs {
  /**
   * Prints the tree content to the test log.
   */
  content(tEQ: Teq, idForLog: ElementIdForLog): Promise<undefined>;
}

export interface TreeView {
  actions: TreeViewActions;
  /**
   * alias for actions.
   */
  a: TreeViewActions;
  checks: TreeViewChecks;
  /**
   * alias for checks.
   */
  c: TreeViewChecks;
  logs: TreeViewLogs;
  /**
   * alias for logs.
   */
  l: TreeViewLogs;
}

