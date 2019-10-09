import { Teq } from '../api/extjs/new-api/types/ej-types';

export const getDebugMode = function() {
  return false;
};

export function copyObject(obj: any) {
  const result = {};
  for (const prop in obj) {
    result[prop] = obj[prop];
  }
  return result;
}

export const optsToJson = function optsToJson(options: any) {
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
export function mergeOptions(src: any, def: any) {
  const dst = def();

  if (typeof dst !== 'object' && typeof src === 'undefined') {
    return dst;
  }

  function handleObj(src: any, dst: any) {
    const props = Object.getOwnPropertyNames(src);
    for (const prop of props) {
      if (typeof src[prop] === 'undefined') {
        continue;
      }
      if (typeof dst[prop] !== 'undefined' && typeof dst[prop] !== typeof src[prop]) {
        throw Error(
          'Unexpected type for prop: ' +
            prop +
            ', expected: ' +
            typeof dst[prop] +
            ', actual: ' +
            typeof src[prop]
        );
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
}

// Behaviour for access to property of undefined object.
export const dumpObjErrMode = {
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
 *   when function is met in path, next argument from args array is used.
 *   alias: name to log, instead of funtName().
 *   quotes: if true - values will be wrapped in double quotes.
 *
 * }
 * @param dstArr - Destination array to place strings to.
 * @param [errMode] - see dumpObjErrMode
 */
export function dumpObj(obj: any, propPaths, dstArr, errMode) {
  if (typeof errMode === 'undefined') {
    errMode = dumpObjErrMode.showNA;
  }
  if (typeof dstArr === 'undefined' || dstArr === null) {
    dstArr = [];
  }
  let actualPropPathArr;
  let actPropPathStr;
  try {
    outerLoop: for (let i = 0, len1 = propPaths.length; i < len1; i++) {
      let propPath = propPaths[i];

      let argsArr = void 0;
      let alias = void 0;
      let quotes = void 0;

      if (typeof propPath === 'object') {
        argsArr = propPath.args;
        alias = propPath.alias;
        quotes = propPath.quotes;
        propPath = propPath.path;
      }
      const subPropNames = propPath.split('.');
      let propPathVal = obj;
      let argsIndex = 0;
      actualPropPathArr = [];
      for (let j = 0, len2 = subPropNames.length; j < len2; j++) {
        const subPropName = subPropNames[j];

        if (!propPathVal) {
          if (errMode === dumpObjErrMode.showNA) {
            propPathVal = 'N/A';
            break;
          }
          if (errMode >= dumpObjErrMode.omitString) {
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
              if (errMode === dumpObjErrMode.showNA) {
                propPathVal = 'N/A';
                break;
              }
              if (errMode >= dumpObjErrMode.omitString) {
                continue outerLoop;
              }
            }

            let args = void 0;
            if (argsArr) {
              args = argsArr[argsIndex];
              argsIndex++;
            }
            let argsStr = '';
            if (typeof args !== 'undefined' && args !== null) {
              argsStr = JSON.stringify(args).slice(1, -1);
            }

            actPropPathStr += '(' + argsStr + ')';
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
      if (typeof propPathVal === 'undefined' && errMode === dumpObjErrMode.omitStringIfUndefined) {
        continue;
      }

      dstArr.push(
        (alias ? alias : actualPropPathArr.join('.')) +
          ': ' +
          (quotes ? '"' + propPathVal + '"' : propPathVal)
      );
    }
  } catch (e) {
    actualPropPathArr.push(actPropPathStr);
    e.message += '; Path: ' + actualPropPathArr.join('.');
    if (getDebugMode()) {
      console.log(e.stack);
    }
    throw e;
  }
  return dstArr;
}

// Gets object property by path.
// If some property is function - it will be called without arguments.
export function result(origVal, path, defaultValue) {
  let val = origVal;

  try {
    if (val == null) {
      return defaultValue;
    }

    const pathArr = path.split('.');
    const len = pathArr.length;

    for (let i = 0; i < len; i++) {
      const key = pathArr[i];
      const prevVal = val;

      val = val[key];
      if (typeof val === 'function') {
        val = val.call(prevVal);
      } else if (val == null) {
        return defaultValue;
      }
    }

    return val;
  } catch (err) {
    console.error('Invalid path: ' + path);
    console.dir(origVal);
    throw err;
  }
}

/**
 * Inverted object {'key': 'value'} -> {'value': 'key'}
 * @param {Object} map
 * @return {Object} - inverted maps.
 * {
 *   invertedMapFirst, - object where for not unique values of input object,
 *   only first key will be used as a value.
 *   invertedMapAll, object where for not unique values of input object,
 *   all keys, separated by comma, will be used as a value.
 * }
 */
export function invertMapObj(map) {
  const invertedMapFirstKey = Object.create(null);
  const invertedMapArrAllKeys = Object.create(null); // temporary.

  const mapEntries = Object.entries(map);

  mapEntries.forEach(function(entry) {
    const key = entry[0];
    const value = entry[1];

    if (typeof invertedMapFirstKey[value] === 'undefined') {
      invertedMapFirstKey[value] = key;
      invertedMapArrAllKeys[value] = [key];
    } else {
      invertedMapArrAllKeys[value].push(key);
    }
  });

  const invertedMapAllKeys = Object.create(null);
  const invertedMapEntries = Object.entries(invertedMapArrAllKeys);
  invertedMapEntries.forEach(function(entry) {
    const key = entry[0];
    const value = entry[1];
    invertedMapAllKeys[key] = value.join(', ');
  });

  return {
    invertedMapFirstKey: invertedMapFirstKey,
    invertedMapAllKeys: invertedMapAllKeys,
  };
}

/**
 * Replaces xtype by xtype(true) in TEQ string.
 * @param tEQ
 * @return {String}
 */
export function replaceXTypesInTeq(tEQ: Teq) {
  const re = /((^|[)\],\s}>])[\w\d\-_\\.]+)/g;
  return tEQ.replace(re, '$&(true)');
}
