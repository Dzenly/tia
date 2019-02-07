import {Checkbox} from './checkbox';

export interface ExtJsComponents {
  /**
   * Function description.
   *
   * @param tEQ - Tia ExtJS Query.
   * @param elNameForLog
   * @param logAction
   */
  checkbox(tEQ: string, elNameForLog?: string, logAction?: boolean): Promise<Checkbox>;
}
