import { Teq } from '../types/ej-types';
import { ElementIdForLog, EnableLog } from '../../../common-types';
/**
 * gT.eC.component.a or gT.eC.component.actions
 */
export declare class ComponentActions {
    static compName: string;
    /**
     * Left mouse button click on Component.
     * Default actionDesc is 'Click Cmp'.
     * Note: if it does not work, try clickInput().
     */
    static click(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on Component.
     * Default actionDesc is 'Right Click Cmp'.
     * Note: if it does not work, try clickInput().
     */
    static rClick(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button double click on Component.
     * Default actionDesc is 'Click Cmp'.
     * * Note: if it does not work, try dblClickInput().
     */
    static dblClick(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button click on Component's input element by WebElement.
     * Note: not all Components have an input element.
     * Default actionDesc is 'Click Input'.
     */
    static clickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Right mouse button click on Component's input element by WebElement.
     * Note: not all Components have an input element.
     * Default actionDesc is 'Click Input'.
     */
    static rClickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Left mouse button double click on Component's input element by WebElement.
     * Note: not all Components have an input element.
     * Default actionDesc is 'Click Input'.
     */
    static dblClickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Moves the mouse cursor to the center of the specified Component.
     * Default actionDesc is 'Move mouse to Cmp'.
     * Note: if it does not work, try moveMouseToInput().
     */
    static moveMouse(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Moves the mouse cursor to the center of the Component's input element.
     * Note: not all Components have an input element.
     * Default actionDesc is 'Move mouse to Cmp input'.
     */
    static moveMouseToInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends ESC key to the component.
     * Can be used, e.g. to close boundlist in combobox.
     */
    static sendEsc(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends DOWN key to the component.
     * Can be used to open boundlist, e.g. in combobox, or splitbutton.
     * Or to move selection in a table.
     */
    static sendDown(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends UP key to the component.
     * Can be used e.g. to move selection in a table.
     */
    static sendUp(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends ENTER key to the component.
     * E.g. for save value to form.
     */
    static sendEnter(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends TAB key to the component.
     * E.g. to move to next form field.
     */
    static sendTab(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends PAGE_DOWN key to the component.
     * Can be used e.g. to move selection in a table.
     */
    static sendPgDown(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends PAGE_UP key to the component.
     * Can be used e.g. to move selection in a table.
     */
    static sendPgUp(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Sends keys to the component.
     * Default actionDesc is 'Send keys'.
     */
    static sendKeys(tEQ: Teq, keys: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Ctrl + a, and send keys to the Component.
     * Default actionDesc is 'Ctrl +a, Send keys'
     */
    static sendCtrlAAndKeys(tEQ: Teq, keys: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Ctrl + a, keys, ENTER to the Component.
     * Default actionDesc is 'Ctrl +a, Send keys, Enter'
     */
    static sendCtrlAKeysEnter(tEQ: Teq, keys: string, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
    /**
     * Waits for the component to become enabled and not masked.
     * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isMasked
     * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isDisabled
     * @param [timeout = 5000] - milliseconds to wait.
     */
    static waitForEnabledAndNotMasked(tEQ: Teq, timeout?: number, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<void>;
}
/**
 * gT.eC.component.c or gT.eC.component.checks
 */
export declare class ComponentChecks {
    static compName: string;
}
/**
 * gT.eC.component.l or gT.eC.component.logs
 */
export declare class ComponentLogs {
    static compName: string;
}
export declare class ComponentAPI {
    static a: typeof ComponentActions;
    static actions: typeof ComponentActions;
    static c: typeof ComponentChecks;
    static checks: typeof ComponentChecks;
    static l: typeof ComponentLogs;
    static logs: typeof ComponentLogs;
}
