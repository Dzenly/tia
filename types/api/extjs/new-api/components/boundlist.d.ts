import { ComponentActions, ComponentChecks, ComponentLogs } from './component';
import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
/**
 * gT.eC.boundlist.a or gT.eC.boundlist.actions
 */
export declare class BoundListActions extends ComponentActions {
    static compName: string;
    /**
     * Left mouse button click on the item containing the given text.
     * @param text - text for row to click.
     */
    static clickRow(tEQ: Teq, text: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Ctrl + Left mouse button click on the items containing the given texts.
     * So it selects given string.
     * @param texts - texts for rows to click.
     */
    static ctrlClickRows(tEQ: Teq, texts: string[], idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.boundlist.c or gT.eC.boundlist.checks
 */
export declare class BoundListChecks extends ComponentChecks {
    static compName: string;
}
export declare class BoundListLogs extends ComponentLogs {
    static compName: string;
    /**
     * Prints all displayField values from the store.
     * TODO: Incompleted?
     */
    static contentByStore(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
    /**
     * Prints all innerText DOM element properties for items.
     */
    static contentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
    /**
     * Prints innerText DOM element properties for selected items.
     */
    static selectedContentByInnerText(tEQ: Teq, idForLog?: ElementIdForLog): Promise<void>;
}
export declare class BoundListAPI {
    static a: typeof BoundListActions;
    static actions: typeof BoundListActions;
    static c: typeof BoundListChecks;
    static checks: typeof BoundListChecks;
    static l: typeof BoundListLogs;
    static logs: typeof BoundListLogs;
}
