/**
 * Inner utilities for logging.
 * **gIn.logger**.
 */
export declare function setLogFile(newLogFile: string): void;
export declare function getLogFile(): string;
import { TestInfo } from '../test-info';
/**
 * Logs to file and writes to console (if console output is enabled).
 * @param msg
 * @param noConsole
 */
export declare function log(msg: string, dontWriteToFile?: boolean): void;
export declare function logln(msg: string): void;
export declare function logResourcesUsage(prefix?: string): void;
export declare function logBold(msg: string): void;
export declare function fail(msg: string): void;
export declare function pass(msg: string): void;
/**
 * Report about some error.
 * @param msg
 */
export declare function error(msg: string): void;
export declare function errorln(msg: string): void;
/**
 * Report about some exception.
 * @param msg
 * @param e
 */
export declare function exception(msg: string, e: Error): void;
/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean}[enable]. If true log is enabled, othwerwise log is disabled.
 */
export declare function logIfEnabled(msg: string, enable?: boolean): void;
/**
 * Logs a message.
 * @param msg - A message to be logged.
 * @param {Boolean} [enable = gIn.loggerCfg.defLLLogAction] - If false - log is disabled,
 * otherwise - log is enabled.
 */
export declare function logIfNotDisabled(msg: string, enable?: boolean): void;
export declare function testSummary(): void;
/**
 * Saves suite log.
 * @param dirInfo
 * @param log
 * @parem noTime
 * @returns {string} - Verbose info for the root test directory.
 */
export declare function saveSuiteLog({ dirInfo, log, noTime, noTestDifs, }: {
    dirInfo: TestInfo;
    log: string;
    noTime?: boolean;
    noTestDifs?: boolean;
}): string;
export declare function printSuiteLog(dirInfo: any, noTestDifs?: boolean): void;
