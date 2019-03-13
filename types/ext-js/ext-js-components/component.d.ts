import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';

/**
 * Action description.
 * E.g. by default selectAllSendKeysEnter will print 'Send keys and ENTER',
 * but for combobox you could use 'select'.
 */
type ComponentActionDescription = string | undefined;

interface ComponentCommonParams {
  tEQ: Teq,

  /**
   * Component name, used for logging.
   * Default value is 'ANY Cmp', so it makes sense to always specify this parameter.
   */
  compName: string;

  /**
   * Extra info to identify the component for log.
   * '' by default.
   *
   * Note: This property is needed only if your xtypes, references, ids names are ugly and uninformative.
   * So you should force your coders to use beauty and informative ones and dont use idForLog.
   *
   */
  idForLog: ElementIdForLog,

  actionDesc: ComponentActionDescription,

  enableLog: EnableLog,
}

interface ComponentSendKeysParams extends ComponentCommonParams {
  keys: SeleniumKeys;
}


interface ComponentActions {
  /**
   * Left mouse button click on Component.
   * Default actionDesc is 'Click Cmp'.
   */
  clickCmp(params: ComponentCommonParams): Promise<undefined>;

  /**
   * Left mouse button click on Component's input element by its id.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input by id'.
   */
  clickInputById(params: ComponentCommonParams): Promise<undefined>;

  /**
   * Left mouse button click on Component's input element by WebElement.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  clickInput(params: ComponentCommonParams): Promise<undefined>;

  /**
   * Send keys to the component.
   * Default actionDesc is 'Send keys'.
   */
  sendKeys(params: ComponentSendKeysParams): Promise<undefined>;

  /**
   * Ctrl + a, and send keys to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys'
   */
  selectAllAndSendKeys(params: ComponentSendKeysParams): Promise<undefined>;

  /**
   * Ctrl + a, keys, ENTER to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys, Enter'
   */
  selectAllSendKeysEnter(params: ComponentSendKeysParams): Promise<undefined>;
}

interface ComponentChecks {

}

interface ComponentLogs {

  /**
   * Prints Raw component value to the log.
   * See ExtJs docs on getRawValue for the corresponding Component.
   * @param compName - the Component name (textfield, checkbox, etc.)
   * @param mapperCb - callback to map a raw value to a log string. if omitted - val is used as is.
   */
  rawValue(tEQ: Teq, compName: string, idForLog: ElementIdForLog, mapperCb?: (val: string) => string): Promise<undefined>
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

