/* global window */
(function runCommonMiscUtils() {
  'use strict';

  let container;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    container = exports;
    container.getDebugMode = function () {
      return false;
    };
  } else {
    console.log('runCommonMiscUtils');
    container = window.tia.cU;
    container.getDebugMode = function getDebugMode() {
      return window.tia.debugMode;
    };
  }

  container.copyObject = function copyObject(obj) {
    const result = {};
    for (const prop in obj) {
      result[prop] = obj[prop];
    }
    return result;
  };

  container.optsToJson = function optsToJson(options) {
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
    const dst = def();

    if (typeof dst !== 'object' && typeof src === 'undefined') {
      return dst;
    }

    function handleObj(src, dst) {
      const props = Object.getOwnPropertyNames(src);
      for (const prop of props) {
        if (typeof src[prop] === 'undefined') {
          continue;
        }
        if (typeof dst[prop] !== 'undefined' && typeof dst[prop] !== typeof src[prop]) {
          throw Error(`Unexpected type for prop: ${prop}, expected: ${typeof dst[prop]}, actual: ${typeof src[prop]}`);
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

  // Behaviour for access to property of undefined object.
  container.dumpObjErrMode = {
    exception: 0, // Generate exception.
    showNA: 1, // Show N/A for erroneous path.
    omitString: 2, // Omit the string.
    omitStringIfUndefined: 3, // Omit the string if object exists but property is undefined.
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
   * @param [errMode] - see dumpObjErrMode
   */
  container.dumpObj = function dumpObj(obj, propPaths, dstArr, errMode) {
    if (typeof errMode === 'undefined') {
      errMode = container.dumpObjErrMode.showNA;
    }
    if (typeof dstArr === 'undefined' || dstArr === null) {
      dstArr = [];
    }
    let actualPropPathArr;
    let actPropPathStr;
    try {
      outerLoop:
      for (let i = 0, len1 = propPaths.length; i < len1; i++) {
        let propPath = propPaths[i];

        let argsArr = void (0);
        if (typeof propPath === 'object') {
          argsArr = propPath.args;
          propPath = propPath.path;
        }
        const subPropNames = propPath.split('.');
        let propPathVal = obj;
        let argsIndex = 0;
        actualPropPathArr = [];
        for (let j = 0, len2 = subPropNames.length; j < len2; j++) {
          const subPropName = subPropNames[j];

          if (!propPathVal) {
            if (errMode === container.dumpObjErrMode.showNA) {
              propPathVal = 'N/A';
              break;
            }
            if (errMode >= container.dumpObjErrMode.omitString) {
              continue outerLoop;
            }
          }

          let braceCount = (subPropName.match(/\(\)/g) || []).length;

          if (braceCount) {
            const funcName = subPropName.slice(0, subPropName.indexOf('('));
            let thisObj = propPathVal;
            propPathVal = propPathVal[funcName];

            actPropPathStr = funcName;

            while (braceCount--) {
              if (!propPathVal) {
                if (errMode === container.dumpObjErrMode.showNA) {
                  propPathVal = 'N/A';
                  break;
                }
                if (errMode >= container.dumpObjErrMode.omitString) {
                  continue outerLoop;
                }
              }

              let args = void (0);
              if (argsArr) {
                args = argsArr[argsIndex];
                argsIndex++;
              }
              let argsStr = '';
              if (typeof args !== 'undefined' && args !== null) {
                argsStr = JSON.stringify(args).slice(1, -1);
              }

              actPropPathStr += `(${argsStr})`;
              propPathVal = propPathVal.apply(thisObj, args);
              thisObj = propPathVal;
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
        if (typeof propPathVal === 'undefined' && errMode === container.dumpObjErrMode.omitStringIfUndefined) {
          continue;
        }
        dstArr.push(`${actualPropPathArr.join('.')}: ${propPathVal}`);
      }
    } catch (e) {
      actualPropPathArr.push(actPropPathStr);
      e.message += `; Path: ${actualPropPathArr.join('.')}`;
      if (container.getDebugMode()) {
        console.log(e.stack);
      }
      throw e;
    }
    return dstArr;
  };
}());
