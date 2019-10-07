

// import {gT} from '../../../types';

import { Teq } from './types/ej-types';
import { ElementIdForLog, EnableLog } from '../../common-types';

const tiaErrorPropName = 'TIA_ERR';

type CmpInfo = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface QueryParamsBase {
  tEQ: Teq;
  idForLog?: ElementIdForLog;
  enableLog?: EnableLog;
}

interface QueryAndActionParams extends QueryParamsBase {
  /**
   * Action to perform.
   * This is arbitrary javascript code.
   * The scope contains variables cmp and cmpInfo, and your script can use them,
   * and return whatever you want.
   */
  action: string;
}

interface SetFakeIdParams extends QueryParamsBase {
  fakeId: string;
}

interface WrapParams extends QueryParamsBase {
  /**
   * Component name.
   */
  compName: string;

  /**
   * Function to wrap.
   */
  act: () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Action description.
   */
  actionDesc: string;
}

export async function queryAndAction(args: QueryAndActionParams) {
  const { tEQ, action, idForLog, enableLog } = args;

  // Waiting for all ExtJs inner processes are finished and component is ready to work with.
  // await gT.e.wait.idle(undefined, false);
  await gT.e.wait.ajaxRequestsFinish(undefined, false);

  return gIn.wrap({
    msg: `Searching ExtJs cmp ${idForLog ? `${idForLog} ` : ''}by TEQ: ${tEQ} ... `,
    enableLog,
    act: async () => {
      // eslint-disable-next-line no-undef-init
      let result = undefined;
      let errorStr = 'Error Stub';

      try {
        await gT.sOrig.driver.wait(async () => {
          const escapedTEQ = tEQ.replace(/\\/g, '\\\\');
          const res = await gT.s.browser.executeScriptWrapper(
            `const { cmp, cmpInfo, tiaErr } = tiaEJ.searchAndWrap.byTeq('${escapedTEQ}', true);` +
              `if (tiaErr) return {${tiaErrorPropName}: tiaErr};` +
              `${action};`
          );
          if (typeof res === 'object' && res !== null && res[tiaErrorPropName]) {
            errorStr = res[tiaErrorPropName];
            return false;
          }
          result = res;
          errorStr = '';
          return true;
        }, gT.engineConsts.timeoutForSearchByTEQ);
        return result;
      } catch (err) {
        if (err.name !== 'TimeoutError') {
          throw err;
        }
        throw new Error(errorStr);
      }
    },
  });
}

/**
 * Returns and object with component info.
 * TODO: create type for this object.
 */
export async function queryCmpInfo(args: QueryParamsBase): Promise<CmpInfo> {
  const newArgs: QueryAndActionParams = {
    ...args,
    action: 'return cmpInfo;',
  };
  return queryAndAction(newArgs);
}

export async function queryCmpId(args: QueryParamsBase): Promise<string> {
  const newArgs: QueryAndActionParams = {
    ...args,
    action: 'return cmpInfo.constProps.realId;',
  };
  return queryAndAction(newArgs);
}

export async function queryCmpInput(args: QueryParamsBase) {
  const newArgs: QueryAndActionParams = {
    ...args,
    action: 'return cmpInfo.constProps.inputEl;',
  };
  return queryAndAction(newArgs);
}

export async function queryCmpInputId(args: QueryParamsBase) {
  const newArgs: QueryAndActionParams = {
    ...args,
    action: 'return cmpInfo.constProps.inputId;',
  };
  return queryAndAction(newArgs);
}

export async function queryCmpTrigger(args: QueryParamsBase) {
  const newArgs: QueryAndActionParams = {
    ...args,
    action: 'return cmpInfo.constProps.triggerEl;',
  };
  return queryAndAction(newArgs);
}

export async function setFakeId(args: SetFakeIdParams) {
  const { tEQ, idForLog, enableLog, fakeId } = args;
  const idForLogStr = idForLog ? `, idForLog: ${idForLog}` : '';
  return gIn.wrap({
    msg: `Setting fakeId "${fakeId}" for TEQ: ${tEQ}${idForLogStr} ... `,
    enableLog,
    act: async () =>
      queryAndAction({
        tEQ,
        action: `tiaEJ.idMap.add('${fakeId}', cmpInfo.constProps.realId);`,
        enableLog: false,
      }),
  });
}

export async function removeAllFakeIds(enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Removing fake Ids ... ',
    enableLog,
    act: async () => gT.s.browser.executeScriptWrapper('tiaEJ.idMap.removeAll()'),
  });
}

/**
 * Wrap some function with logger and error handling code.
 */
export async function wrap(args: WrapParams) {
  const { tEQ, compName, idForLog = '', act, actionDesc, enableLog } = args;
  return gIn.wrap({
    msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ... `,
    enableLog,
    act,
  });
}
