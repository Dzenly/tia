

import * as path from 'path';
import * as fs from 'fs';
import { inspect } from 'util';

import * as utils from './extjs-utils';
import * as api from './extjs-api-actions';
import * as explore from './extjs-exploration';
import * as query from './new-api/tia-extjs-query';

import { EnableLog } from '../common-types';

import * as msgBox from './extjs-msgbox';
import * as wait from './extjs-waits';

async function setEJSelectors(enableLog?: EnableLog) {
  const objStr = inspect(gT.globalConfig.ejSelectors, { compact: true, breakLength: 200 });
  return gIn.wrap({
    msg: 'setEJSelectors ... ',
    enableLog,
    act: () => {
      const scriptStr = `return tiaEJ.setSelectors(${objStr});`;
      return gT.s.browser.executeScriptWrapper(scriptStr).then(res => {
        if (res !== true) {
          throw new Error('setEJSelectors: Unexpected return value');
        }
      });
    },
  });
}

// for gT.e.initTiaExtJsBrHelpers
const brHelpers = [
  'e-br.js',
  'e-br-actions.js',
  'e-br-check.js',
  'e-br-cmp-wrappers.js',
  'e-br-content.js',
  'e-br-get-html-els.js',
  'e-br-msgbox.js',
  'e-br-search.js',
];

export class ExtJsAPI {
  static utils = utils;

  static explore = explore;
  static msgBox = msgBox;
  static wait = wait;
  static query = query;
  static q = query;

  /**
   * Initializes TIA ExtJs Browser helpers.
   * Loads and runs scripts from the extjs/browser-part directory in context of current browser window.
   * Adds some ExtJs helpers to window object.
   *
   * @param {boolean} [enableLog=true] - is logging needed for this action.
   *
   * @returns {Promise}.
   */
  static initTiaExtJsBrHelpers(enableLog?: EnableLog) {
    return gIn.wrap({
      msg: 'Initialization of TIA ExtJs helpers ... ',
      enableLog,
      act: async () => {
        for (const fName of brHelpers) {
          // eslint-disable-line no-restricted-syntax
          const scriptStr = fs.readFileSync(
            path.join(gT.tiaDir, 'api', 'extjs', 'browser-part', fName),
            'utf8'
          );
          await gT.s.browser.executeScriptWrapper(scriptStr);
        }

        await setEJSelectors(enableLog);

        if (gT.cLParams.debugLocale) {
          await gT.e.utils.setDebugLocaleMode(true);
        }
      },
    });
  }
}
