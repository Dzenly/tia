(function runCommonMiscUtils() {

    console.log('TIA: runCommonMiscUtils');
    window.tia.cU.getDebugMode = function getDebugMode() {
      return window.tia.debugMode;
    };


  window.tia.cU.copyObject = function copyObject(obj) {
    var result = {};
    for (var prop in obj) {
      result[prop] = obj[prop];
    }
    return result;
  };

  window.tia.cU.optsToJson = function optsToJson(options) {
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
  window.tia.cU.mergeOptions = function mergeOptions(src, def) {
    var dst = def();

    if (typeof dst !== 'object' && typeof src === 'undefined') {
      return dst;
    }

    function handleObj(srcArg, dstArg) {
      var props = Object.getOwnPropertyNames(srcArg);
      props.forEach(function (prop) {
        if (typeof srcArg[prop] === 'undefined') {
          return;
        }
        if (typeof dstArg[prop] !== 'undefined' && typeof dstArg[prop] !== typeof srcArg[prop]) {
          throw Error('Unexpected type for prop: ' + prop + ', expected: ' + typeof dstArg[prop] +
            ', actual: ' + typeof srcArg[prop]);
        }
        if (typeof dstArg[prop] === 'object') {
          handleObj(srcArg[prop], dstArg[prop]);
        } else {
          dstArg[prop] = srcArg[prop];
        }
      });
    }

    if (!src) {
      src = {};
    }

    handleObj(src, dst);

    return dst;
  };

  // Behaviour for access to property of undefined object.
  window.tia.cU.dumpObjErrMode = {
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
  window.tia.cU.dumpObj = function dumpObj(obj, propPaths, dstArr, errMode) {
    if (typeof errMode === 'undefined') {
      errMode = window.tia.cU.dumpObjErrMode.showNA;
    }
    if (typeof dstArr === 'undefined' || dstArr === null) {
      dstArr = [];
    }
    var actualPropPathArr;
    var actPropPathStr;
    try {
      outerLoop:
      for (var i = 0, len1 = propPaths.length; i < len1; i++) {
        var propPath = propPaths[i];

        var argsArr = void (0);
        var alias = void (0);
        var quotes = void (0);

        if (typeof propPath === 'object') {
          argsArr = propPath.args;
          alias = propPath.alias;
          quotes = propPath.quotes;
          propPath = propPath.path;
        }
        var subPropNames = propPath.split('.');
        var propPathVal = obj;
        var argsIndex = 0;
        actualPropPathArr = [];
        for (var j = 0, len2 = subPropNames.length; j < len2; j++) {
          var subPropName = subPropNames[j];

          if (!propPathVal) {
            if (errMode === window.tia.cU.dumpObjErrMode.showNA) {
              propPathVal = 'N/A';
              break;
            }
            if (errMode >= window.tia.cU.dumpObjErrMode.omitString) {
              continue outerLoop;
            }
          }

          var braceCount = (subPropName.match(/\(\)/g) || []).length;

          if (braceCount) {
            var funcName = subPropName.slice(0, subPropName.indexOf('('));
            var thisObj = propPathVal;
            propPathVal = propPathVal[funcName];

            actPropPathStr = funcName;

            while (braceCount--) {
              if (!propPathVal) {
                if (errMode === window.tia.cU.dumpObjErrMode.showNA) {
                  propPathVal = 'N/A';
                  break;
                }
                if (errMode >= window.tia.cU.dumpObjErrMode.omitString) {
                  continue outerLoop;
                }
              }

              var args = void (0);
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
        if (typeof propPathVal === 'undefined' && errMode === window.tia.cU.dumpObjErrMode.omitStringIfUndefined) {
          continue;
        }

        dstArr.push(
          (alias ? alias : actualPropPathArr.join('.')) + ': ' +
          (quotes ? ('"' + propPathVal + '"') : propPathVal)
        );
      }
    } catch (e) {
      actualPropPathArr.push(actPropPathStr);
      e.message += '; Path: ' + actualPropPathArr.join('.');
      if (window.tia.cU.getDebugMode()) {
        console.log(e.stack);
      }
      throw e;
    }
    return dstArr;
  };

  // Gets object property by path.
  // If some property is function - it will be called without arguments.
  window.tia.cU.result = function result(origVal, path, defaultValue) {

    var val = origVal;

    try {

      // eslint-disable-next-line eqeqeq
      if (val == null) {
        return defaultValue;
      }

      var pathArr = path.split('.');
      var len = pathArr.length;

      for (var i = 0; i < len; i++) {
        var key = pathArr[i];
        var prevVal = val;

        val = val[key];
        if (typeof val === 'function') {
          val = val.call(prevVal);
          // eslint-disable-next-line eqeqeq
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
  };

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
  window.tia.cU.invertMapObj = function invertMapObj(map) {
    var invertedMapFirstKey = Object.create(null);
    var invertedMapArrAllKeys = Object.create(null); // temporary.

    var mapEntries = Object.entries(map);

    mapEntries.forEach(function (entry) {
      var key = entry[0];
      var value = entry[1];

      if (typeof invertedMapFirstKey[value] === 'undefined') {
        invertedMapFirstKey[value] = key;
        invertedMapArrAllKeys[value] = [key];
      } else {
        invertedMapArrAllKeys[value].push(key);
      }
    });

    var invertedMapAllKeys = Object.create(null);
    var invertedMapEntries = Object.entries(invertedMapArrAllKeys);
    invertedMapEntries.forEach(function (entry) {
      var key = entry[0];
      var value = entry[1];
      invertedMapAllKeys[key] = value.join(', ');
    });

    return {
      invertedMapFirstKey: invertedMapFirstKey,
      invertedMapAllKeys: invertedMapAllKeys,
    };
  };

  /**
   * Replaces xtype by xtype(true) in TEQ string.
   * @param tEQ
   * @return {String}
   */
  window.tia.cU.replaceXTypesInTeq = function replaceXTypesInTeq(tEQ) {
    var re = /((^|[\)\],\s}>])[\w\d\-_\\\.]+)/g;
    return tEQ.replace(re, '$&(true)');
  };


}());
