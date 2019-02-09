import { ExtJsComponents } from './ext-js/ext-js-components/extjs-components';
import { ExtJsApi } from './ext-js/extjs-api';
import {SeleniumOriginalApi} from './selenium/original-api';

interface GlobalTiaObjects {
  e: ExtJsApi;
  eC: ExtJsComponents;
  sOrig: SeleniumOriginalApi;
}

declare namespace NodeJS {
  interface Global {
    gT: GlobalTiaObjects
  }
}

declare const gT: GlobalTiaObjects;
