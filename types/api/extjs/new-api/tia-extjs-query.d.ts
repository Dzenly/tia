import { Teq } from './types/ej-types';
import { ElementIdForLog, EnableLog } from '../../common-types';
declare type CmpInfo = any;
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
    act: () => Promise<any>;
    /**
     * Action description.
     */
    actionDesc: string;
}
export declare function queryAndAction(args: QueryAndActionParams): Promise<any>;
/**
 * Returns and object with component info.
 * TODO: create type for this object.
 */
export declare function queryCmpInfo(args: QueryParamsBase): Promise<CmpInfo>;
export declare function queryCmpId(args: QueryParamsBase): Promise<string>;
export declare function queryCmpInput(args: QueryParamsBase): Promise<any>;
export declare function queryCmpInputId(args: QueryParamsBase): Promise<any>;
export declare function queryCmpTrigger(args: QueryParamsBase): Promise<any>;
export declare function setFakeId(args: SetFakeIdParams): Promise<any>;
export declare function removeAllFakeIds(enableLog?: EnableLog): Promise<any>;
/**
 * Wrap some function with logger and error handling code.
 */
export declare function wrap(args: WrapParams): Promise<any>;
export {};
