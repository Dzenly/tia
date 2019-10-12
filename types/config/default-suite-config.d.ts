/**
 * Should TIA write info about directories without tests (or with skip: true) into summary log.
 */
export declare const emptyDirToSuiteLog = false;
/**
 * IF true - TIA prints detailed log with timings to stdout.
 */
export declare const suiteLogToStdout = true;
/**
 * Need you to attach zip with test dir to the mail.
 */
export declare const attachArchiveToMail = true;
/**
 * Only diffs in attachment?
 */
export declare const attachOnlyDiffs = true;
/**
 * Remove zip after sending mail.
 */
export declare const removeZipAfterSend = true;
/**
 * Note: use tia-suite-config.js to specify email parameters.
 * To whom TIA should send emails.
 */
export declare const mailRecipientList = "";
/**
 * smtp host, e.g. smtp.yandex.ru
 */
export declare const mailSmtpHost = "";
/**
 * user to send mail on behalf of.
 */
export declare const mailUser = "";
/**
 * password of the user to send mail on behalf of.
 */
export declare const mailPassword = "";
