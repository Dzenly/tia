export declare function removeSelSid(str: string): string;
export declare function filterStack(strStack: string): string;
export declare function excToStr(err: Error, noStack?: boolean): string;
export declare function winToUnixSep(path: string): string;
export declare function changeExt(jsPath: string, newExt: string): string;
export declare function jsToEt(jsPath: string): string;
export declare function jsToTs(jsPath: string): string;
/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
export declare function jsToLog(jsPath: string): string;
export declare function jsToDif(jsPath: string): string;
export declare function expandHost(str: string): string;
export declare function collapseHost(str: string): string;
export declare function valToStr(value: any): string;
export declare function v2s(value: any): string;
