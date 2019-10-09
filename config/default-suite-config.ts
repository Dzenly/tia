// Default suite config.
// These options are not overrided by directories configs.

/**
 * Should TIA write info about directories without tests (or with skip: true) into summary log.
 */
export const emptyDirToSuiteLog = false;

/**
 * IF true - TIA prints detailed log with timings to stdout.
 */
export const suiteLogToStdout = true;

/**
 * Need you to attach zip with test dir to the mail.
 */
export const attachArchiveToMail = true;

/**
 * Only diffs in attachment?
 */
export const attachOnlyDiffs = true;

/**
 * Remove zip after sending mail.
 */
export const removeZipAfterSend = true;

/**
 * Note: use tia-suite-config.js to specify email parameters.
 * To whom TIA should send emails.
 */
export const mailRecipientList = '';

/**
 * smtp host, e.g. smtp.yandex.ru
 */
export const mailSmtpHost = '';

/**
 * user to send mail on behalf of.
 */
export const mailUser = '';

/**
 * password of the user to send mail on behalf of.
 */
export const mailPassword = '';
