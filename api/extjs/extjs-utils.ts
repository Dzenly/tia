'use strict';

import { inspect } from 'util';
import { ElementIdForLog, EnableLog, Teq } from './new-api/types/ej-types';

export let debugLocale = false;

export interface LocaleEntries {
  [key: string]: string;
}

let locale: LocaleEntries = {};
let invertedLocaleFirstKey: LocaleEntries = {};
let invertedLocaleAllKeys: LocaleEntries = {};

/**
 * Sets locale object. Locale object is key-value object for localization.
 * Key is english text, and value is any utf8 text.
 *
 * @param objExpression - expression how to get locale object.
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
export function setLocaleObject(objExpression: string, enableLog: EnableLog) {
  return gIn.wrap({
    msg: 'setLocaleObject ... ',
    enableLog,
    act: () => {
      const scriptStr = `return tiaEJ.setLocale(${objExpression});`;
      return gT.s.browser.executeScriptWrapper(scriptStr).then(res => {
        locale = res.locale;
        invertedLocaleFirstKey = res.invertedLocaleFirstKey;
        invertedLocaleAllKeys = res.invertedLocaleAllKeys;
      });
    },
  });
}

// TODO:
// export setImagesMap

let extraLocale: LocaleEntries = {};
let invertedExtraLocaleFirstKey: LocaleEntries = {};
let invertedExtraLocaleAllKeys: LocaleEntries = {};

function setExtraLocale(newExtraLocale: LocaleEntries) {
  extraLocale = newExtraLocale;
  const invertedExtraObject = gT.commonMiscUtils.invertMapObj(newExtraLocale);

  invertedExtraLocaleFirstKey = invertedExtraObject.invertedMapFirstKey;
  invertedExtraLocaleAllKeys = invertedExtraObject.invertedMapAllKeys;
}

export function setExtraLocaleObject(localeObj: LocaleEntries, enableLog: EnableLog) {
  setExtraLocale(localeObj);

  const objStr = inspect(localeObj, { compact: true, breakLength: 200 });
  return gIn.wrap({
    msg: 'setExtraLocaleObject ... ',
    enableLog,
    act: () => {
      const scriptStr = `return tiaEJ.setExtraLocale(${objStr});`;
      return gT.s.browser.executeScriptWrapper(scriptStr).then(res => {
        if (res !== true) {
          throw new Error('setExtraLocaleObject: Unexpected return value');
        }
      });
    },
  });
}

export function getLocStr(key: string) {
  const str = locale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in locale`);
  }
  return str;
}

export function getExtraLocStr(key: string): string {
  const str = extraLocale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in extra locale`);
  }
  return str;
}

export function locKeyToStr(str: string) {
  const reExtra = /el"(.*?)"/g;
  const result = str.replace(reExtra, (m, key) => getExtraLocStr(key));
  const re = /l"(.*?)"/g;
  return result.replace(re, (m, key) => getLocStr(key));
}

export function locKeyToStrAndEscapeSlashes(str: string) {
  let result = locKeyToStr(str);
  result = result.replace(/\\/g, '\\\\');
  return result;
}

export function getFirstLocaleKey(value: string, extra?: boolean) {
  if (extra) {
    return invertedExtraLocaleFirstKey[value];
  }
  return invertedLocaleFirstKey[value];
}

export function getAllLocaleKeys(value: string, extra?: boolean) {
  if (extra) {
    return invertedExtraLocaleAllKeys[value];
  }
  return invertedLocaleAllKeys[value];
}

export function convertTextToFirstLocKey(text: string) {
  let locKey = getFirstLocaleKey(text);
  let result;

  let locFound = false;

  if (locKey) {
    locFound = true;
    result = `l"${locKey}"`;
  } else {
    locKey = getFirstLocaleKey(text, true);
    if (locKey) {
      locFound = true;
      result = `el"${locKey}"`;
    } else {
      result = text;
    }
  }

  if (locFound && debugLocale) {
    result += ` ("${text}")`;
  }

  return result;
}

// Component info string.
export function getCIS(tEQ: Teq, compName: string, idForLog = '') {
  return `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}":`;
}

// CIS + Raw val.
export function getCISRVal(tEQ: Teq, compName: string, idForLog = '', val: string) {
  return `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": Raw val: '${val}'`;
}

// eslint-disable-next-line max-params
export function getCISContent(
  prefix: string,
  tEQ: Teq,
  compName: string,
  idForLog: ElementIdForLog = '',
  val: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  noWrap = false
) {
  const valArg = noWrap ? val : gT.cC.content.wrap(val);
  return `${prefix}: ${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}":\n${valArg}`;
}

/**
 * Returns locale keys for which values are equal to given text.
 * Requires gT.e.utils.setLocaleObject(expression) call before.
 * @param text
 * @returns {string}
 */
// export function getLocKeysByText(text) {
//   const res = [];
//   for (const key of locale) {
//     if (locale.hasOwnProperty(key)) {
//       if (text === locale[key]) {
//         res.push(key);
//       }
//     }
//   }
//   return res.join(', ');
// };

/**
 * The mode in which native language text is added after locale keys.
 * @param newMode
 * @param enableLog
 * @return {*}
 */
export function setDebugLocaleMode(newMode: boolean, enableLog: EnableLog) {
  debugLocale = newMode;

  return gIn.wrap({
    msg: `Set debugLocale mode to '${newMode} ... '`,
    enableLog,
    act: () => gT.s.browser.executeScript(`return tiaEJ.setDebugLocaleMode(${newMode});`, false),
  });
}
