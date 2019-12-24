

import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseGrabs, FormFieldBaseLogs } from './form-field-base';

const compName = 'TextField';

// TODO: задействовать везде idForLog.

/**
 * gT.eC.textfield.a or gT.eC.textfield.actions
 */
export class TextFieldActions extends FormFieldBaseActions {
  static compName = compName;
}

/**
 * gT.eC.textfield.c or gT.eC.textfield.checks
 */
export class TextFieldChecks extends FormFieldBaseChecks {
  static compName = compName;
}

/**
 * gT.eC.textfield.g or gT.eC.textfield.grabs
 */
export class TextFieldGrabs extends FormFieldBaseGrabs {
  static compName = compName;
}

/**
 * gT.eC.textfield.l or gT.eC.textfield.logs
 */
export class TextFieldLogs extends FormFieldBaseLogs {
  static compName = compName;
}

export class TextFieldAPI {
  static a = TextFieldActions;
  static actions = TextFieldActions;
  static c = TextFieldChecks;
  static checks = TextFieldChecks;
  static g = TextFieldGrabs;
  static grabs = TextFieldGrabs;
  static l = TextFieldLogs;
  static logs = TextFieldLogs;
}
