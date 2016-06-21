'use strict';

exports.copyObject = function (obj) {
  var result = {};
  for (var prop in obj) {
    result[prop] = obj[prop];
  }
  return result;
};

/**
 * Merges src options with default ones.
 * @param {object} src
 * @param {function} def - factory for default object.
 * Arrays are not supported.
 * @returns - object with merged options.
 * @throws - exception if there are options which are not presented in default options.
 * Note: this means that default options must contain all possible options.
 *
 */
exports.mergeOptions = function mergeOptions(src, def)
{
  var dst = def();

  function handleObj(src, dst) {
    var props = Object.getOwnPropertyNames(src);
    for(var prop of props) {
      if (typeof src[prop] === 'undefined') {
        continue;
      }
      if (typeof dst[prop] !== typeof src[prop]) {
        throw Error('Unexpected type, expected: ' + typeof dst[prop] + ', actual: ' + typeof src[prop]);
      }
      if (typeof dst[prop] === 'object') {
        handleObj(src[prop], dst[prop]);
      } else {
        dst[prop] = src[prop];
      }
    }
  }

  handleObj(src, dst);

  return dst;
};
