/**
 * **gT.u**
 */
import * as sharedData from './utils-shared-data';
import * as misc from './utils-misc';
import * as promise from './promise-utils';
export default class UtilsAPI {
    static sharedData: typeof sharedData;
    static misc: typeof misc;
    static promise: typeof promise;
}
