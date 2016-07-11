(function () {
  'use strict';

  var container;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    container = exports;
  } else {
    container = window.tia.u;
  }

  container.copyObject = function (obj) {
    var result = {};
    for (var prop in obj) {
      result[prop] = obj[prop];
    }
    return result;
  };

  container.optsToJson = function (options) {
    if (typeof options === 'undefined') {
      options = null;
    }
    return JSON.stringify(options);
  };

  /**
   * Merges src options with default ones.
   * @param {object} src
   * @param {function} def - factory for default object.
   * Arrays are not supportetd.
   * @returns - object with merged options.
   * @throws - exception if there are options which are not presented in default options.
   * Note: this means that default options must contain all possible options.
   *
   */
  container.mergeOptions = function mergeOptions(src, def) {
    var dst = def();

    function handleObj(src, dst) {
      var props = Object.getOwnPropertyNames(src);
      for (var prop of props) {
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

    if (!src) {
      src = {};
    }

    handleObj(src, dst);

    return dst;
  };

  /**
   * Prints given object properies to string.
   * @param obj - Object which properties to print.
   * @param propPaths - Names for properties to print.
   * @param dstArr - Destination array to place strings to.
   * @param [safe] - do not generate error if property does not exists.
   */
  container.dumpObj = function (obj, propPaths, dstArr, safe) {

    for (var i = 0, len1 = propPaths.length; i < len1; i++) {
      var propPath = propPaths[i];
      var subPropNames = propPath.split('.');
      var propPathVal = obj;
      for (var j = 0, len2 = subPropNames.length; j < len2; j++) {
        var subPropName = subPropNames[j]
        if (safe && (!propPathVal)) {
          propPathVal = 'N/A';
          break;
        }
        if (subPropName.slice(-2) === '()') {
          propPathVal = propPathVal[subPropName.slice(0, -2)]();
        } else {
          propPathVal = propPathVal[subPropName];
        }
      }
      dstArr.push(propPath + ': ' + propPathVal);
    }
  };

})();
