'use strict';

import { inspect } from 'util';

gT_.e.locale = {};
gT_.e.invertedLocaleFirstKey = {};
gT_.e.invertedLocaleAllKeys = {};

/**
 * Sets locale object. Locale object is key-value object for localization.
 * Key is english text, and value is any utf8 text.
 *
 * @param objExpression - expression how to get locale object.
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
export function setLocaleObject(objExpression, enableLog) {
  return gIn.wrap('setLocaleObject ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setLocale(${objExpression});`;
    return gT.s.browser.executeScriptWrapper(scriptStr).then(res => {
      gT_.e.locale = res.locale;
      gT_.e.invertedLocaleFirstKey = res.invertedLocaleFirstKey;
      gT_.e.invertedLocaleAllKeys = res.invertedLocaleAllKeys;
    });
  });
}

// TODO:
// export setImagesMap

gT_.e.extraLocale = {};
gT_.e.invertedExtraLocaleFirstKey = {};
gT_.e.invertedExtraLocaleAllKeys = {};

function setExtraLocale(extraLocale) {
  gT_.e.extraLocale = extraLocale;
  const invertedExtraObject = gT.commonMiscUtils.invertMapObj(extraLocale);

  gT_.e.invertedExtraLocaleFirstKey = invertedExtraObject.invertedMapFirstKey;
  gT_.e.invertedExtraLocaleAllKeys = invertedExtraObject.invertedMapAllKeys;
}

export function setExtraLocaleObject(localeObj, enableLog) {
  setExtraLocale(localeObj);

  const objStr = inspect(localeObj, { compact: true, breakLength: 200 });
  return gIn.wrap('setExtraLocaleObject ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setExtraLocale(${objStr});`;
    return gT.s.browser.executeScriptWrapper(scriptStr).then(res => {
      if (res !== true) {
        throw new Error('setExtraLocaleObject: Unexpected return value');
      }
    });
  });
}

export function getLocStr(key) {
  const str = gT.e.locale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in locale`);
  }
  return str;
}

export function getExtraLocStr(key) {
  const str = gT.e.extraLocale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in extra locale`);
  }
  return str;
}

export function locKeyToStr(str) {
  const reExtra = /el"(.*?)"/g;
  const result = str.replace(reExtra, (m, key) => getExtraLocStr(key));
  const re = /l"(.*?)"/g;
  return result.replace(re, (m, key) => getLocStr(key));
}

export function locKeyToStrAndEscapeSlashes(str) {
  let result = locKeyToStr(str);
  result = result.replace(/\\/g, '\\\\');
  return result;
}

export function getFirstLocaleKey(value, extra) {
  if (extra) {
    return gT.e.invertedExtraLocaleFirstKey[value];
  }
  return gT.e.invertedLocaleFirstKey[value];
}

export function getAllLocaleKeys(value, extra) {
  if (extra) {
    return gT.e.invertedExtraLocaleAllKeys[value];
  }
  return gT.e.invertedLocaleAllKeys[value];
}

export function convertTextToFirstLocKey(text) {
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
export function getCIS(tEQ, compName, idForLog = '') {
  return `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}":`;
}

// CIS + Raw val.
export function getCISRVal(tEQ, compName, idForLog = '', val) {
  return `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": Raw val: '${val}'`;
}

// eslint-disable-next-line max-params
export function getCISContent(prefix, tEQ, compName, idForLog = '', val, noWrap) {
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
//   for (const key of gT.e.locale) {
//     if (gT.e.locale.hasOwnProperty(key)) {
//       if (text === gT.e.locale[key]) {
//         res.push(key);
//       }
//     }
//   }
//   return res.join(', ');
// };

export let debugLocale = false;

/**
 * The mode in which native language text is added after locale keys.
 * @param newMode
 * @param enableLog
 * @return {*}
 */
export function setDebugLocaleMode(newMode, enableLog) {
  debugLocale = newMode;

  return gIn.wrap(`Set debugLocale mode to '${newMode} ... '`, enableLog, () =>
    gT.s.browser.executeScript(`return tiaEJ.setDebugLocaleMode(${newMode});`, false)
  );
}

/**
 *
 * @param parentCmp
 * @param enableLog
 * @return {*}
 */
// export function setParentContainer(cmp, enableLog) {
//   return gIn.wrap(
//     `Set container '${cmp.getLogInfo()}' as the parent for further search`,
//     enableLog,
//     () => gT.s.browser.executeScript(
//       `return tiaEJ.search.settings.setParentContainer('${cmp.getId()}');`,
//       false
//     )
//   );
// };

// export function addFakeId(fakeId, realId, enableLog) {
//   return gIn.wrap(
//     `Add fake id '${fakeId}' to idMap`,
//     enableLog,
//     () => gT.s.browser.executeScript(
//       `return tiaEJ.idMap.add('${fakeId}', '${realId}');`,
//       false
//     )
//   );
// };
