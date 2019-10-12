/**
 * Clears 'require' cache for specified node module.
 * @param {String} resolvedModulePath
 */
export declare function clearRequireCache(resolvedModulePath: string): void;
/**
 * Wrapper for 'require'. Allows to clean cache.
 *
 * @param {String} modPath - path to module.
 * @param {Boolean} clearCache - Set to true if cache should be deleted immediately.
 * @returns {{res: *, resolvedModPath: String}}
 * @throws {*} - Exceptions from 'require' calls.
 */
export declare function requireEx(modPath: string, clearCache?: boolean): {
    result: any;
    resolvedModPath: string;
};
/**
 * Wrapper for require,  do not generate exception if path is absent.
 * @param modPath - path to module.
 * @return {*} - exports from existing module or empty object if module is absent.
 */
export declare function requireIfExists(modPath: string): any;
export declare function getResourcesUsage(isTestLog?: boolean): string;
export declare function getProcInfo(): string;
export declare function isPromise(p: any): boolean;
export declare function checkNodeJsVersion(): void;
export declare function requireArray(modules: string[]): void;
