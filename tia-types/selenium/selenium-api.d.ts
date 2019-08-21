import {SeleniumBrowserApi} from './browser';
import {SeleniumDriverApi} from './driver';
import {SeleniumUserActionsApi} from './user-actions';
import {SeleniumWaitApi} from './wait';

/**
 * gT.s
 */
export interface SeleniumApi {
  driver: SeleniumDriverApi;
  browser: SeleniumBrowserApi;
  wait: SeleniumWaitApi;
  uA: SeleniumUserActionsApi;
}
