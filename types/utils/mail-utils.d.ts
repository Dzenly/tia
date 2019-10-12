/**
 * Sends email.
 *
 * @param subj
 * @param {Array of Strings} txtAttachments
 * @param {Array of Strings} [zipAttachments]
 * @returns {Promise<T>}
 */
export declare function send(subj: string, htmlDif: string, txtDif: string, txtAttachments: string[], zipAttachments?: string[]): Promise<unknown> | undefined;
