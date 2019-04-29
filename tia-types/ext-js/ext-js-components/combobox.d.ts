import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';
import {FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs} from './form-field-base';

interface ComboBoxActions extends FormFieldBaseActions {
  /**
   * Ctrl + a, Send text by keys, and ENTER to the component.
   */
  setByKbd(tEQ: Teq, text: SeleniumKeys, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Set the text using expand() ExtJs API + mouse click in BoundList.
   * Note, that for tagfield setting already selected tag will reset this tag.
   */
  setByMouse(tEQ: Teq, text: SeleniumKeys, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Clears the combobox selection using ExtJs API.
   */
  clearByEJ(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<undefined>;
}

interface ComboBoxChecks extends FormFieldBaseChecks {

}

interface ComboBoxLogs extends FormFieldBaseLogs {

  /**
   * Prints the selected value or values to the test log.
   */
  rawValue(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;

  /**
   * Prints the entire content to the test log.
   */
  content(tEQ: Teq, idForLog?: ElementIdForLog): Promise<undefined>;
}

export interface ComboBox {
  actions: ComboBoxActions;
  /**
   * alias for actions.
   */
  a: ComboBoxActions;
  checks: ComboBoxChecks;
  /**
   * alias for checks.
   */
  c: ComboBoxChecks;
  logs: ComboBoxLogs;
  /**
   * alias for logs.
   */
  l: ComboBoxLogs;
}

