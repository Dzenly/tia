import {EnableLog} from '../ext-js/common';
import {SeleniumIdOrObj} from './common';

export interface SeleniumWaitApi {

  /**
   * Waits for DOM element with specified id.
   */
  waitForElementById(id: SeleniumIdOrObj, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for DOM element with specified id to become enable and visible.
   */
  waitForElementEnabledAndVisibleById(id: SeleniumIdOrObj, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for element with specified CSS class.
   */
  waitForElementByClassName(className: string, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for element with specified CSS selector.
   */
  waitForElementByCssSelector(selector: string, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for specified page title.
   */
  waitForTitle(title: string, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for specified URL.
   */
  waitForUrl(url: string, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;

  /**
   * Waits for some URL which starts with specified urlPrefix.
   */
  waitForUrlPrefix(urlPrefix: string, timeoutMs: number, enableLog: EnableLog): Promise<undefined>;
}
