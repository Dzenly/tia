import * as utils from './extjs-utils';
import * as explore from './extjs-exploration';
import * as query from './new-api/tia-extjs-query';
import { EnableLog } from '../common-types';
import * as msgBox from './extjs-msgbox';
import * as wait from './extjs-waits';
export declare class ExtJsAPI {
    static utils: typeof utils;
    static explore: typeof explore;
    static msgBox: typeof msgBox;
    static wait: typeof wait;
    static query: typeof query;
    static q: typeof query;
    /**
     * Initializes TIA ExtJs Browser helpers.
     * Loads and runs scripts from the extjs/browser-part directory in context of current browser window.
     * Adds some ExtJs helpers to window object.
     *
     * @param {boolean} [enableLog=true] - is logging needed for this action.
     *
     * @returns {Promise}.
     */
    static initTiaExtJsBrHelpers(enableLog?: EnableLog): Promise<any>;
}
