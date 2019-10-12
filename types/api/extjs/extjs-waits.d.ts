import { EnableLog, IdForLog } from '../common-types';
/**
 * Waits until all ajax requests will be completed.
 * I.e. where Ext.Ajax.isLoading() will be false.
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Ajax.html#method-isLoading
 * @param timeout - milliseconds to wait. 40000 by default.
 */
export declare function ajaxRequestsFinish(timeout?: number, enableLog?: EnableLog): Promise<void>;
/**
 * Waits for Ext.isReady &&  !Ext.Ajax.isLoading() + ExtJs 'idle' event + window.requestIdleCallback.
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.GlobalEvents.html#event-idle
 * So it is supposed to mean that all inner browser scripts work is finished
 * and all components are ready to interact with.
 * @param timeout - milliseconds to wait. 40000 by default.
 */
export declare function idle(timeout?: number, enableLog?: EnableLog): Promise<void>;
export declare function formFieldEnabled(formId: IdForLog, name: string, timeout?: number, enableLog?: EnableLog): Promise<any>;
export declare function formFieldDisabled(formId: IdForLog, name: string, timeout?: number, enableLog?: EnableLog): Promise<any>;
export declare function isReady(timeout?: number, enableLog?: EnableLog): Promise<any>;
export declare function isCmpRendered(id: string, timeout?: number, enableLog?: EnableLog): Promise<any>;
