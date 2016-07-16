(function () {
  'use strict';

  var container;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    container = exports;
  } else {
    container = window.tia.cU;
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
   * @param {Array} propPaths - Names for properties to print.
   * This can be array of strings or array with objects, like
   * {
   *   path: <path>,
   *   args: <array of arrays of arguments> Note - only arrays are supported.
   *   when function is met in path, next arguments array is used.
   * }
   * @param dstArr - Destination array to place strings to.
   * @param [unsafe] - generate error if property does not exists.
   */
  container.dumpObj = function (obj, propPaths, dstArr, unsafe) {

    if (typeof dstArr === 'undefined' || dstArr === null) {
      dstArr = [];
    }

    try {

      for (var i = 0, len1 = propPaths.length; i < len1; i++) {
        var propPath = propPaths[i];

        var argsArr = void(0);
        if (typeof propPath === 'object') {
          argsArr = propPath.args;
          propPath = propPath.path;
        }
        var subPropNames = propPath.split('.');
        var propPathVal = obj;
        var argsIndex = 0;
        var actualPropPathArr = [];
        for (var j = 0, len2 = subPropNames.length; j < len2; j++) {
          var subPropName = subPropNames[j];
          if (!unsafe && (!propPathVal)) {
            propPathVal = 'N/A';
            break;
          }

          var braceCount = (subPropName.match(/\(\)/g) || []).length;

          if (braceCount) {

            var funcName = subPropName.slice(0, subPropName.indexOf('('));
            var thisObj = propPathVal;
            propPathVal = propPathVal[funcName];

            var actPropPathStr = funcName;

            while (braceCount--) {

              if (!unsafe && (!propPathVal)) {
                propPathVal = 'N/A';
                break;
              }

              var args = void(0);
              if (argsArr) {
                args = argsArr[argsIndex];
                argsIndex++;
              }
              var argsStr = '';
              if (typeof args !== 'undefined' && args !== null) {
                argsStr = JSON.stringify(args).slice(1, -1);
              }

              actPropPathStr += '(' + argsStr + ')';
              propPathVal = propPathVal.apply(thisObj, args);
              thisObj = propPathVal
            }
            actualPropPathArr.push(actPropPathStr);
            actPropPathStr = '';

          } else {
            propPathVal = propPathVal[subPropName];
            actualPropPathArr.push(subPropName);
          }
        }

        if (typeof propPathVal === 'object') {
          propPathVal = JSON.stringify(propPathVal);
        }

        dstArr.push(actualPropPathArr.join('.') + ': ' + propPathVal);
      }
    } catch(e){
      actualPropPathArr.push(actPropPathStr);
      e.message += '; Path: ' + actualPropPathArr.join('.');
      throw e;
    }

    return dstArr;
  };

})();
