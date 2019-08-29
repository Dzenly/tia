/* eslint-disable @typescript-eslint/no-explicit-any */

import { TeqApi } from './teq';
import { ExtJsUtils } from './utils';
import { ExtJsWaits } from './wait';

/**
 * gT.e.explore
 */
interface EJExplore {
  /**
   * Initializes TIA ExtJs exploration helpers.
   * Loads and runs the e-br-explore.js script in context of current browser window.
   *
   * Sets default handlers for debug and explorations.
   * Ctrl/Meta + Alt + LClick - shows info about ExtJs component under mouse cursor.
   * And Ctrl/Meta + Alt + t - shows components hierarchy.
   * Removes previous handlers (if they exist).
   *
   * Sets debug mode for browser JS TIA part.
   *
   * Sets body clicker to avoid session expiration.
   *
   * See also `tia --help` from cmd line.
   *
   * @param {boolean} [enableLog] - is logging needed for this action.
   *
   * @returns a promise which will be resolved with script return value.
   */
  init(enableLog: boolean): Promise<undefined>;
}

/**
 * gT.e
 */
export interface ExtJsApi {
  utils: ExtJsUtils;
  /**
   * Deprecated.
   */
  api: Record<string, any>;
  explore: EJExplore;
  /**
   * Deprecated.
   */
  search: Record<string, any>;
  /**
   * Deprecated.
   */
  logCtById: Record<string, any>;
  /**
   * Deprecated.
   */
  logCtByFormIdName: Record<string, any>;
  /**
   * Some inner utils for mocking streams and winston.
   */
  logUtils: Record<string, any>;
  /**
   * Deprecated.
   */
  getByFormIdName: Record<string, any>;
  /**
   * TODO: move to gT.eC.msgbox.
   */
  msgBox: Record<string, any>;
  /**
   * Deprecated.
   */
  hL: Record<string, any>;
  wait: ExtJsWaits;
  q: TeqApi;
}
