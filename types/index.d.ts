import { ExtJsComponents } from './ext-js/ext-js-components/extjs-components';
import { ExtJsApi } from './ext-js/extjs-api';

interface GlobalTiaObjects {
  e: ExtJsApi;
  eC: ExtJsComponents;
}

declare namespace NodeJS {
  interface Global {
    gT: GlobalTiaObjects
  }
}

declare const gT: GlobalTiaObjects;
