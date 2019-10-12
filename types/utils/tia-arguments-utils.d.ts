export declare function containsSuite(dir: string): boolean;
export declare function isRootDirInited(rootDir: string): boolean;
export declare function isSuiteDirInited(dir: string): boolean;
export declare function resolveRootDirFromArgsAndEnv(argsTiaRootDir: string): string | null;
export declare function findTiaRootInParents(dir: string): string | null;
export declare function getTiaSuiteFromParents(dir: string): string;
export declare function isTiaSuiteInParents(dir: string): boolean;
export declare function findTiaRootInChildren(dir: string): string | null;
/**
 * Resolves path specified by cmd line option or environment variable.
 * Non mandatory path resolved to CWD.
 * Relative paths resolved relative to CWD.
 * @return {String} - resolved path.
 */
export declare function resolveRootDirEx(argsTiaRootDir: string): string;
export declare function initTiaSuite(): void;
export declare function initTiaRoot(argsTiaRootDir: string): void;
/**
 * Resolves path specified by cmd line option or environment variable.
 * Relative paths resolved relative to gT.cLParams.rootDir.
 * @param {Object} argsObj
 * @return {String} - resolved path or empty string.
 */
export declare function resolvePathOptionRelativeToRootDir({ cmdLineArgsPath, envVarName, description, cutLastDirSep, mandatory, }: {
    cmdLineArgsPath: string;
    envVarName: string;
    description: string;
    cutLastDirSep: boolean;
    mandatory: boolean;
}): string;
