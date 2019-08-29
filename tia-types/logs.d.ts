/**
 * API to write strings to the Test log.
 */
import { LogMode, OptionalMsg } from './common';

/**
 * gT.l
 */
export interface TiaLogs {
  /**
   * Logs the specified msg.
   */
  print(msg: string): void;

  /**
   * Logs the msg and EOL.
   */
  println(msg: string): void;

  /**
   * Logs separator.
   */
  sep(): void;

  /**
   * Logs End of Line.
   */
  eol(): void;

  /**
   * Logs fail with optional msg.
   * Increases fails count.
   */
  fail(msg: OptionalMsg): void;

  /**
   * Logs Pass with optional msg.
   * Increases passes count.
   * Default value for mode is { passSilently: false, noPassIncrement: false }.
   */
  pass(msg: OptionalMsg, mode?: LogMode): void;
}
