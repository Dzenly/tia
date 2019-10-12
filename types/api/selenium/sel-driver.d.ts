import { EnableLog } from '../common-types';
export declare function init(cleanProfile: boolean, enableLog?: EnableLog): Promise<any>;
export declare function sleep(ms: number, enableLog?: EnableLog): Promise<any>;
/**
 * This function creates function for stupid sleep.
 * It is stupid sleep instead of smart waiting for something.
 */
export declare function getStupidSleepFunc(): () => Promise<any>;
export declare function quit(enableLog?: EnableLog): Promise<any>;
export declare function quitIfInited(): Promise<void> | Promise<string>;
export declare function printSelDriverLogs(minLevel: number): Promise<void>;
