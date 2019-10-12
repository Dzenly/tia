import { TestInfo } from '../engine/test-info';
/**
 * Checks that file or directory absent by statSync, without checking for catch reason (ENOENT or no).
 *
 * @param fileOrDirPath
 * @returns {boolean}
 */
export declare function isAbsent(fileOrDirPath: string): boolean;
export declare function isEtalonAbsent(jsPath: string): boolean;
export declare function safeUnlink(fileOrDirPath: string): void;
export declare function safeReadFile(fileOrDirPath: string): string;
export declare function backupDif(fileOrDirPath: string): void;
export declare function isDirectory(fileOrDirPath: string): boolean;
export declare function rmPngs(jsPath: string): void;
export declare function rmDir(dir: string, removeSelf?: boolean): void;
export declare function emptyDir(dir: string): void;
export declare function safeRename(oldPath: string, newPath: string): void;
export declare function createEmptyFileSync(fileOrDirPath: string): void;
export declare function createEmptyLog(fileOrDirPath: string): void;
export declare function fileToStdout(file: string): void;
export declare function fileToStderr(file: string): void;
export declare function saveJson(obj: any, file: string): void;
export declare function getDirectoryAlias(dirPath: string): string;
export declare function archiveSuiteDir(dirInfo: TestInfo): string | null;
export declare function mkdir(dirPath: string): void;
export declare function mkDirRecursive(targetDir: string, subDirsArr: string[]): void;
export declare function rmLastDirSep(dir: string): string;
export declare function whichDirContain(base: string, fileNames: string[], excludeThisBase?: string): string | null;
