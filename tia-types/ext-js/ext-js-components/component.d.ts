import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';

/**
 * gT.eC.component.actions or gT.eC.component.a
 */
export interface ComponentActions {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

  /**
   * Left mouse button click on Component.
   * Default actionDesc is 'Click Cmp'.
   * Note: if it does not work, try clickInput().
   */
  click(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on Component.
   * Default actionDesc is 'Right Click Cmp'.
   * Note: if it does not work, try clickInput().
   */
  rClick(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on Component.
   * Default actionDesc is 'Click Cmp'.
   * * Note: if it does not work, try dblClickInput().
   */
  doubleClick(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  clickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Right mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  rClickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  dblClickInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Moves the mouse cursor to the center of the specified Component.
   * Default actionDesc is 'Move mouse to Cmp'.
   * Note: if it does not work, try moveMouseToInput().
   */
  moveMouse(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Moves the mouse cursor to the center of the Component's input element.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Move mouse to Cmp input'.
   */
  moveMouseToInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends ESC key to the component.
   * Can be used, e.g. to close boundlist in combobox.
   */
  sendEsc(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends DOWN key to the component.
   * Can be used to open boundlist, e.g. in combobox, or splitbutton.
   * Or to move selection in a table.
   */
  sendDown(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendUp(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends ENTER key to the component.
   * E.g. for save value to form.
   */
  sendEnter(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends TAB key to the component.
   * E.g. to move to next form field.
   */
  sendTab(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_DOWN key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendPgDown(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendPgUp(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends keys to the component.
   * Default actionDesc is 'Send keys'.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, and send keys to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys'
   */
  sendCtrlAAndKeys(tEQ: Teq, keys: SeleniumKeys, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, keys, ENTER to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys, Enter'
   */
  sendCtrlAKeysEnter(tEQ: Teq, keys: SeleniumKeys, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Waits for the component to become enabled and not masked.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isMasked
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#method-isDisabled
   * @param [timeout = 5000] - milliseconds to wait.
   */
  waitForEnabledAndNotMasked(tEQ: Teq, timeout?: number, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

/**
 * gT.eC.component.checks or gT.eC.component.c
 */
export interface ComponentChecks {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

}

/**
 * gT.eC.component.logs or gT.eC.component.l
 */
export interface ComponentLogs {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;
}

/**
 * gT.eC.component
 */
export interface Component {
  actions: ComponentActions;
  /**
   * alias for actions.
   */
  a: ComponentActions;
  checks: ComponentChecks;
  /**
   * alias for checks.
   */
  c: ComponentChecks;
  logs: ComponentLogs;
  /**
   * alias for logs.
   */
  l: ComponentLogs;
}

