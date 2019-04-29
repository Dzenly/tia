import {EnableLog} from './common';

/**
 * Milliseconds to wait.
 * By default gT.engineConsts.defaultWaitTimeout will be used.
 * https://github.com/Dzenly/tia/blob/master/config/engine-constants.js
 */
type WaitTimeout = number | undefined;

/**
 * Use this API to make you tests more stable.
 */
export interface ExtJsWaits {
  /**
   * Waits until all ajax requests will be completed.
   * I.e. where Ext.Ajax.isLoading() will be false.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Ajax.html#method-isLoading
   */
  ajaxRequestsFinish(timeout: WaitTimeout, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Waits for Ext.isReady &&  !Ext.Ajax.isLoading() + ExtJs 'idle' event + window.requestIdleCallback.
   * https://docs.sencha.com/extjs/6.5.3/classic/Ext.GlobalEvents.html#event-idle
   * So it is supposed to mean that all inner browser scripts work is finished
   * and all components are ready to interact with.
   */
  idle(timeout: WaitTimeout, enableLog?: EnableLog): Promise<undefined>;
}
