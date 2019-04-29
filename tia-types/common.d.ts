/**
 * Optional msg to pass to the Test log.
 */
export type OptionalMsg = string | undefined;

export interface LogMode {

  /**
   * Do not show message for passed assertion.
   */
  passSilently?: boolean;

  /**
   * Do not increment pass counter
   */
  noPassIncrement?: boolean;

  /**
   * The name for result accumulator which will be reset to false
   * if some assertion is failed.
   */
  accName?: string
}
