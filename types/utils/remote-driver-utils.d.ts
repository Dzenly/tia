export declare function saveSid(sid: string): void;
export declare function removeSid(): void;
export declare function getSid(): string | null;
export declare function start(): Promise<unknown>;
/**
 * starts remote chromedriver
 * @returns {Promise}
 */
/**
 * Stops remote chromedriver.
 */
export declare function stop(): void;
