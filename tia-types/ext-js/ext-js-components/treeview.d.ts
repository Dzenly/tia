import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';
import {TableViewActions, TableViewChecks, TableViewLogs} from './tableview';

/**
 * gT.eC.treeview.actions or gT.eC.treeview.a
 */
interface TreeViewActions extends TableViewActions {

  /**
   * Left mouse button click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  clickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  rClickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on the item containing the given text.
   * @param text - Text for the item to click.
   */
  doubleClickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

/**
 * gT.eC.treeview.checks or gT.eC.treeview.c
 */
interface TreeViewChecks extends TableViewChecks {
}

/**
 * gT.eC.treeview.logs or gT.eC.treeview.l
 */
interface TreeViewLogs extends TableViewLogs {
  /**
   * Prints the tree content to the test log.
   */
  content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;
}

/**
 * gT.eC.treeview
 */
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

