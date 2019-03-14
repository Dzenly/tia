import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';

export interface ComponentActions {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

  /**
   * Left mouse button click on Component.
   * Default actionDesc is 'Click Cmp'.
   */
  clickCmp(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on Component.
   * Default actionDesc is 'Click Cmp'.
   */
  doubleClickCmp(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  clickInput(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Left mouse button double click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  dblClickInput(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends DOWN key to the component.
   * Can be used to open boundlist, e.g. in combobox, or splitbutton.
   * Or to move selection in a table.
   */
  sendDown(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendUp(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends ENTER key to the component.
   * E.g. for save value to form.
   */
  sendEnter(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends TAB key to the component.
   * E.g. to move to next form field.
   */
  sendTab(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_DOWN key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendPgDown(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_UP key to the component.
   * Can be used e.g. to move selection in a table.
   */
  sendPgUp(tEQ: Teq, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Sends keys to the component.
   * Default actionDesc is 'Send keys'.
   */
  sendKeys(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, and send keys to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys'
   */
  sendCtrlAAndKeys(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, keys, ENTER to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys, Enter'
   */
  sendCtrlAKeysEnter(tEQ: Teq, keys: SeleniumKeys, idForLog: ElementIdForLog, enableLog: EnableLog): Promise<undefined>;
}

export interface ComponentChecks {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

}

export interface ComponentLogs {

  /**
   * Component name for logs.
   * Overridden in descendants.
   */
  compName: string;

  /**
   * Prints Raw component value to the log.
   * See ExtJs docs on getRawValue for the corresponding Component.
   * @param compName - the Component name (textfield, checkbox, etc.)
   * @param mapperCallback - callback to map a raw value to a log string. if omitted - val is used as is.
   */
  rawValue(tEQ: Teq, compName: string, idForLog: ElementIdForLog, mapperCallback?: (val: string) => string): Promise<undefined>
}

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

