import {SeleniumKeys} from '../../selenium/user-actions';
import {ElementIdForLog, EnableLog, Teq} from '../common';
import {ComponentActions, ComponentChecks, ComponentLogs} from './component';

interface TextFieldActions extends ComponentActions {
}

interface TextFieldChecks extends ComponentChecks {
}

interface TextFieldLogs extends ComponentLogs {
}

export interface TextField {
  actions: TextFieldActions;
  /**
   * alias for actions.
   */
  a: TextFieldActions;
  checks: TextFieldChecks;
  /**
   * alias for checks.
   */
  c: TextFieldChecks;
  logs: TextFieldLogs;
  /**
   * alias for logs.
   */
  l: TextFieldLogs;
}

