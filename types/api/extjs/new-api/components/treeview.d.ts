import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
/**
 * gT.eC.treeview.a or gT.eC.treeview.actions
 */
export declare class TreeViewActions extends ComponentActions {
    static compName: string;
    /**
     * Left mouse button click on the item containing the given text.
     * @param text - Text for the item to click.
     */
    static clickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on the item containing the given text.
     * @param text - Text for the item to click.
     */
    static rClickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button double click on the item containing the given text.
     * @param text - Text for the item to click.
     */
    static doubleClickItem(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.treeview.c or gT.eC.treeview.checks
 */
export declare class TreeViewChecks extends ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.treeview.l or gT.eC.treeview.logs
 */
export declare class TreeViewLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints the tree content to the test log.
     */
    static content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class TreeViewAPI {
    static a: typeof TreeViewActions;
    static actions: typeof TreeViewActions;
    static c: typeof TreeViewChecks;
    static checks: typeof TreeViewChecks;
    static l: typeof TreeViewLogs;
    static logs: typeof TreeViewLogs;
}
