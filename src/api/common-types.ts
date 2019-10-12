/**
 * Alias which writes to log for the given element along with TEQ string.
 *
 * TODO: Don't print TEQ to logs if idForLog is passed.
 *
 * TODO: Add cmd line option '--force-print-teq', to print TEQ strings even if idForLogs are passed,
 * just for debug.
 */
export type ElementIdForLog = string;

/**
 * Whether the action is to be written to log.
 *
 * If true - the action is written.
 *
 * If false - the action is not written.
 *
 * Say, you create a high level function: 'login'.
 * Say, your login consists of sendKeys to 'name', sendKeys to 'password', and press 'submit' button.
 * You can use 'false' for these inner calls, and print some your string like 'login ... OK'.
 * See also gT.e.q.wrap and gIn.wrap functions.
 *
 * If this parameter is omitted - default 'enableLog' will be used.
 * Note: Default enableLog is 'true' (gT.engineConsts.defLLLogAction).
 *
 * Some API functions can use its own default enableLog, it this case such function description contains
 * an explanation.
 *
 * Note: the '--force-log-actions' cmd line option works as if all enableLog are true,
 * so use it to debug your high level functions.
 */
export type EnableLog = boolean;

/**
 * Used in logging of actions with an HTML element.
 */
export interface IdForLogObj {
  /**
   * HTML element id.
   */
  id: string;

  /**
   * More human readable Id to be logged.
   */
  nameForLog?: string;

  /**
   * String to be logged.
   */
  logStr?: string;
}

export type IdForLog = IdForLogObj | string;

/**
 * Result accumulator mode.
 */
export interface AssertionMode {
  /**
   * do not show message.
   */
  passSilently?: boolean;
  /**
   * do not increment pass counter
   */
  noPassIncrement?: boolean;
  /**
   * The name for result accumulator which will be falsed
   * if some assertion is failed.
   */
  accName?: string;
}

export type SeleniumKeys = string | number | Array<string | number>;
