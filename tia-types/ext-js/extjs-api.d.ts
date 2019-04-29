import { TeqApi } from './teq';
import { ExtJsUtils } from './utils';
import { ExtJsWaits } from './wait';

export interface ExtJsApi {
  utils: ExtJsUtils;
  api: Object;
  explore: Object;
  search: Object;
  sendKeys: Object;
  logCtById: Object;
  logCtByFormIdName: Object;
  logUtils: Object;
  getByFormIdName: Object;
  msgBox: Object;
  hL: Object;
  wait: ExtJsWaits;
  q: TeqApi;
}
