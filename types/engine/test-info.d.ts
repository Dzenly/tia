export declare function getPassCountingEnabled(): boolean;
export declare function setPassCountingEnabled(enable: boolean): void;
export declare function getPassPrintingEnabled(): boolean;
export declare function setPassPrintingEnabled(enable: boolean): void;
export declare class TestInfo {
    path: string;
    title: string;
    run: number;
    passed: number;
    failed: number;
    diffed: number;
    expDiffed: number;
    skipped: number;
    screenShotCounter: number;
    children: null | TestInfo[];
    time: number;
    isSuiteRoot: boolean;
    suiteLogDiff?: boolean;
    os?: string;
    constructor(isDir: boolean, title: string, path: string);
}
export declare function getData(): TestInfo | null;
export declare function setData(newData: TestInfo): void;
export declare function setPassed(newCount: number): void;
export declare function setFailed(newCount: number): void;
export declare function getPassed(): number;
export declare function getFailed(): number;
export declare function setSkipped(newCount: number): void;
export declare function setRun(newCount: number): void;
export declare function setDiffed(newCount: number): void;
export declare function setExpDiffed(newCount: number): void;
export declare function setTime(newTime: number): void;
export declare function setTitle(title: string): void;
/**
 * Forms the string for test statistics for tests and for directories.
 * @param parameters
 * @param parameters.curInfo - Directory info or Test info structure.
 * @param parameters.isDir
 * @param parameters.verbose
 * @param parameters.noTime
 * @param parameters.noTitle
 * @returns {String}
 */
export declare function testInfoToString(parameters: any): string;
/**
 *
 * @param isDir - true - directory, false - file.
 */
export declare function createTestInfo(isDir: boolean, title: string, path: string): TestInfo;
export declare function addFail(): void;
export declare function addPassForce(): void;
export declare function addPass(): void;
