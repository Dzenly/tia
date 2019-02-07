import {Checkbox} from './checkbox';
import {Teq} from '../common';

export interface ExtJsComponents {
  /**
   * Function description.
   *
   * @param tEQ - Tia ExtJS Query.
   * @param elNameForLog
   * @param logAction
   */
  checkbox(tEQ: Teq, elNameForLog?: string, logAction?: boolean): Promise<Checkbox>;
}
