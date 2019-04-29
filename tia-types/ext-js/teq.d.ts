import { ElementIdForLog, EnableLog, Teq } from './common';

interface TeqParamsForCmpInfo {
  tEQ: Teq;

  idForLog?: ElementIdForLog;

  enableLog?: EnableLog;
}

interface TeqParams extends TeqParamsForCmpInfo {
  /**
   * Action to perform.
   * This is arbitrary javascript code.
   * The scope contains variables cmp and cmpInfo, and your script can use them,
   * and return whatever you want.
   */
  action: string;
}

type CmpInfo = any;

interface WrapParams {
  tEQ: Teq;

  /**
   * Component name.
   */
  compName: string;

  idForLog?: ElementIdForLog;

  /**
   * Function to wrap.
   */
  act: () => Promise<any>;

  /**
   * Action description.
   */
  actionDesc: string;

  enableLog?: EnableLog;
}

export interface TeqApi {
  queryAndAction(args: TeqParams): Promise<any>;
  queryCmpInfo(args: TeqParamsForCmpInfo): Promise<CmpInfo>;
  queryCmpId(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<string>;

  /**
   * Returns inputEl.
   */
  queryCmpInput(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<string>;

  /**
   * Returns inputId.
   */
  queryCmpInputId(tEQ: Teq, idForLog?: ElementIdForLog, enableLog?: EnableLog): Promise<string>;

  setFakeId(tEQ: Teq, fakeId: string, enableLog?: EnableLog): Promise<undefined>;
  removeAllFakeIds(enableLog?: EnableLog): Promise<undefined>;
  wrap(params: WrapParams): Promise<any>;
}
