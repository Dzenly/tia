/**
 * Wraps some generator for high level actions.
 * @param gen
 * @param msg
 * @param options
 */
export declare function wrapGenerator(gen: Function, msg: string, options: any): IterableIterator<any>;
export declare function wrapAsync(func: Function, msg: string, options: any): Promise<any>;
