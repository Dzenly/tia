'use strict';

const { inspect } = require('util');

gT_.e.locale = {};

/**
 * Sets locale object. Locale object is key-value object for localization.
 * Key is english text, and value is any utf8 text.
 *
 * @param objExpression - expression how to get locale object.
 * @param {boolean} [enableLog=true] - is logging needed for this action.
 * @returns a promise which will be resolved with script return value.
 */
exports.setLocaleObject = function setLocaleObject(objExpression, enableLog) {
  return gIn.wrap('setLocaleObject ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setLocale(${objExpression});`;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then((res) => {
        gT_.e.locale = res.locale;
        gT_.e.invertedLocaleFirstKey = res.invertedLocaleFirstKey;
        gT_.e.invertedLocaleAllKeys = res.invertedLocaleAllKeys;
      });
  });
};

gT_.e.extraLocale = {};

exports.setExtraLocaleObject = function setLocaleObject(localeObj, enableLog) {
  const objStr = inspect(localeObj, { compact: true, breakLength: 200 });
  gT_.e.extraLocale = localeObj;

  return gIn.wrap('setExtraLocaleObject ... ', enableLog, () => {
    const scriptStr = `return tiaEJ.setExtraLocale(${objStr});`;
    return gT.s.browser.executeScriptWrapper(scriptStr)
      .then((res) => {
        if (res !== true) {
          throw new Error('setExtraLocaleObject: Unexpected return value');
        }
      });
  });
};

exports.getLocStr = function getLocStr(key) {
  const str = gT.e.locale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in locale`);
  }
  return str;
};

exports.getExtraLocStr = function getExtraLocStr(key) {
  const str = gT.e.extraLocale[key];
  if (!str) {
    throw new Error(`Key: "${key} is not found in extra locale`);
  }
  return str;
};

exports.locKeyToStr = function locKeyToStr(str) {
  const reExtra = /el"(.*?)"/g;
  const result = str.replace(reExtra, (m, key) => exports.getExtraLocStr(key));
  const re = /l"(.*?)"/g;
  return result.replace(re, (m, key) => exports.getLocStr(key));
};

/**
 * Returns locale keys for which values are equal to given text.
 * Requires gT.e.utils.setLocaleObject(expression) call before.
 * @param text
 * @returns {string}
 */
// exports.getLocKeysByText = function getLocKeysByText(text) {
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

/**
 * The mode in which native language text is added after locale keys.
 * @param newMode
 * @param enableLog
 * @return {*}
 */
exports.setDebugLocaleMode = function setDebugLocaleMode(newMode, enableLog) {
  return gIn.wrap(
    `Set debugLocale mode to '${newMode}'`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.setDebugLocaleMode(${newMode});`,
      false
    )
  );
};

/**
 *
 * @param parentCmp
 * @param enableLog
 * @return {*}
 */
exports.setParentCmp = function setParentContainer(cmp, enableLog) {
  return gIn.wrap(
    `Set container '${cmp.getLogInfo()}' as the parent for further search`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.search.settings.setParentContainer('${cmp.getId()}');`,
      false
    )
  );
};

exports.addFakeId = function addFakeId(fakeId, realId, enableLog) {
  return gIn.wrap(
    `Add fake id '${fakeId}' to idMap`,
    enableLog,
    () => gT.s.browser.executeScript(
      `return tiaEJ.idMap.add('${fakeId}', '${realId}');`,
      false
    )
  );
};
