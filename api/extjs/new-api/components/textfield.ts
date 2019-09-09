'use strict';

import { FormFieldBaseActions, FormFieldBaseChecks, FormFieldBaseLogs } from './form-field-base';

const { queryCmpInputId, queryAndAction } = require('../tia-extjs-query');
const { actions: cmpActions, checks: anyChecks, logs: anyLogs } = require('./component');
const { getCISRVal } = require('../../extjs-utils');

const compName = 'TextField';

// TODO: задействовать везде idForLog.

export class TextFieldActions extends FormFieldBaseActions {
  static compName = compName;
}

export class TextFieldChecks extends FormFieldBaseChecks {
  static compName = compName;
}

export class TextFieldLogs extends FormFieldBaseLogs {
  static compName = compName;
}
