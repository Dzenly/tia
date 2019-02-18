import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';

/**
 * Action description.
 * E.g. by default selectAllSendKeysEnter will print 'Send keys and ENTER',
 * but for combobox you could use 'select'.
 */
type AnyComponentActionDescription = string | undefined;

interface AnyComponentCommonParams {
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

  actionDesc: AnyComponentActionDescription,

  enableLog: EnableLog,
}

interface AnyComponentSendKeysParams extends AnyComponentCommonParams {
  keys: SeleniumKeys;
}


interface AnyComponentActions {
  /**
   * Left mouse button click on Component.
   * Default actionDesc is 'Click Cmp'.
   */
  clickCmp(params: AnyComponentCommonParams): Promise<undefined>;

  /**
   * Left mouse button click on Component's input element.
   * Note: not all Components have an input element.
   * Default actionDesc is 'Click Input'.
   */
  clickInput(params: AnyComponentCommonParams): Promise<undefined>;

  /**
   * Send keys to the component.
   * Default actionDesc is 'Send keys'.
   */
  sendKeys(params: AnyComponentSendKeysParams): Promise<undefined>;

  /**
   * Ctrl + a, and send keys to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys'
   */
  selectAllAndSendKeysr(params: AnyComponentSendKeysParams): Promise<undefined>;

  /**
   * Ctrl + a, keys, ENTER to the Component.
   * Default actionDesc is 'Ctrl +a, Send keys, Enter'
   */
  selectAllSendKeysEnter(params: AnyComponentSendKeysParams): Promise<undefined>;
}

interface AnyComponentChecks {

}

interface AnyComponentLogs {

}

export interface AnyComponent {
  actions: AnyComponentActions;
  /**
   * alias for actions.
   */
  a: AnyComponentActions;
  checks: AnyComponentChecks;
  /**
   * alias for checks.
   */
  c: AnyComponentChecks;
  logs: AnyComponentLogs;
  /**
   * alias for logs.
   */
  l: AnyComponentLogs;
}

