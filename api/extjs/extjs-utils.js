'use strict';

/**
 * Returns locale keys for which values are equal to given text.
 * Requires gT.e.setLocaleObject(expression) call before.
 * @param text
 * @returns {string}
 */
exports.getLocKeysByText = function (text) {
  var res = [];
  for (var key in gT.e.locale) {
    if (gT.e.locale.hasOwnProperty(key)) {
      if (text === gT.e.locale[key]) {
        res.push(key);
      }
    }
  }
  return res.join(', ');
};
