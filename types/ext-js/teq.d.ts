import { Teq } from './common';

interface TeqParamsForCmpInfo {
  tEQ: Teq;

  /**
   * Extra element name for log. E.g. if there is no id.
   */
  idForLog?: string;

  /**
   * Should action be logged? By default - default settings will be used,
   * e.g. don't log actions inside high level action and log other actions.
   */
  enableLog?: boolean;
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
  tEQ: Teq,

  /**
   * Component name.
   */
  compName: string,

  /**
   * Extra element name for log. E.g. if there is no id.
   */
  idForLog?: string;

  /**
   * Function to wrap.
   */
  act: () => Promise<any>,

  /**
   * Action description.
   */
  actionDesc: string,

  /**
   * Should action be logged? By default - default settings will be used,
   * e.g. don't log actions inside high level action and log other actions.
   */
  enableLog?: boolean;
}

export interface TeqApi {
  queryAndAction(args: TeqParams): Promise<any>;
  queryCmpInfo(args: TeqParamsForCmpInfo): Promise<CmpInfo>;
  queryCmpId(tEQ: Teq, idForLog ?: string, enableLog ?: boolean): Promise<string>;
  queryCmpInputId(tEQ: Teq, idForLog ?: string, enableLog ?: boolean): Promise<string>;
  setFakeId(tEQ: Teq, fakeId: string, enableLog ?: boolean): Promise<undefined>;
  wrap(params: WrapParams): Promise<any>;
}
