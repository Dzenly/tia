import { TeqApi } from './teq';
import {ExtJsWaits} from './wait';

export interface ExtJsApi {
  utils : Object;
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
