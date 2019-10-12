import { EnableLog } from '../common-types';
/**
 * Initializes TIA ExtJs exploration helpers.
 * Loads and runs the e-br-explore.js script in context of current browser window.
 *
 * Sets default handlers for debug and explorations.
 * Ctrl/Meta + Alt + LClick - shows info about ExtJs component under mouse cursor.
 * And Ctrl/Meta + Alt + t - shows components hierarchy.
 * Removes previous handlers (if they exist).
 *
 * Sets debug mode for browser JS TIA part.
 *
 * Sets body clicker to avoid session expiration.
 *
 * @param {boolean} [enableLog] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
export declare function init(enableLog?: EnableLog): Promise<any>;
