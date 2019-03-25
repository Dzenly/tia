// jscs:ignore
(function setEBr() {
  'use strict';

  console.log('TIA: setEBr');

  window.tiaEJ = {

    ejIdle: false, //

    debugLocale: false,

    setDebugLocaleMode: function setDebugLocaleMode(newMode) {
      this.debugLocale = newMode;
    },

    // Extra (from node.js side) locale stuff.

    extraLocale: {},
    invertedExtraLocaleFirstKey: {}, // only first key is keeped for non unique values.
    invertedExtraLocaleAllKeys: {}, // all keys are keeped for non unique values

    setExtraLocale: function setExtraLocale(extraLocale) {
      this.extraLocale = extraLocale;
      var invertedExtraObject = tia.cU.invertMapObj(extraLocale);

      this.invertedExtraLocaleFirstKey = invertedExtraObject.invertedMapFirstKey;
      this.invertedExtraLocaleAllKeys = invertedExtraObject.invertedMapAllKeys;
      return true;
    },

    // Inner locale stuff.

    locale: {},
    invertedLocaleFirstKey: {}, // only first key is keeped for non unique values.
    invertedLocaleAllKeys: {}, // all keys are keeped for non unique values

    setLocale: function setLocale(newLocale) {
      this.locale = newLocale;
      var invertedObjs = tia.cU.invertMapObj(newLocale);

      this.invertedLocaleFirstKey = invertedObjs.invertedMapFirstKey;
      this.invertedLocaleAllKeys = invertedObjs.invertedMapAllKeys;

      return {
        locale: this.locale,
        invertedLocaleFirstKey: invertedObjs.invertedMapFirstKey,
        invertedLocaleAllKeys: invertedObjs.invertedMapAllKeys,
      };
    },

    // Common locale stuff.

    getLocaleValue: function getLocaleValue(key, extra) {
      if (extra) {
        return this.extraLocale[key];
      }
      return this.locale[key];
    },

    getFirstLocaleKey: function getFirstLocaleKey(value, extra) {
      if (extra) {
        return this.invertedExtraLocaleFirstKey[value];
      }
      return this.invertedLocaleFirstKey[value];
    },

    getAllLocaleKeys: function getAllLocaleKeys(value, extra) {
      if (extra) {
        return this.invertedExtraLocaleAllKeys[value];
      }
      return this.invertedLocaleAllKeys[value];
    },

    /**
     * Maps static fake id or itemId to real [autogenerated] id or itemId.
     */
    idMap: {
      fakeToReal: new Map(),
      realToFake: new Map(),
      add: function add(fakeId, realId) {
        if (this.fakeToReal.get(fakeId)) {
          throw new Error(fakeId + 'is already in fakeToReal map.');
        }
        if (this.realToFake.get(realId)) {
          throw new Error(realId + 'is already in realToFake map.');
        }
        this.fakeToReal.set(fakeId, realId);
        this.realToFake.set(realId, fakeId);
      },
      getFakeId: function getFakeId(realId) {
        return this.realToFake.get(realId);
      },
      getRealId: function getRealId(fakeId) {
        return this.fakeToReal.get(fakeId);
      },
      remove: function remove(fakeId) {
        var realId = this.fakeToReal.get(fakeId);
        if (!realId) {
          throw new Error(fakeId + 'is not in map.');
        }
        this.fakeToReal.delete(fakeId);
        this.realToFake.delete(realId);
      },
      removeAll: function removeAll() {
        this.fakeToReal.clear();
        this.realToFake.clear();
      },
    },

    // It if returns true there is not a bad chance that ExtJs application is ready to use.
    // Deprecated.
    isExtJsReady: function isExtJsReady() {
      return !(typeof Ext === 'undefined' || !Ext.isReady || typeof Ext.onReady === 'undefined' ||
        typeof Ext.Ajax === 'undefined' || typeof Ext.Ajax.on === 'undefined');
    },

    isExtJsIdle: function isExtJsIdle() {
      return this.isExtJsReady() && !this.isThereActiveAjaxCalls() && this.ejIdle && tia.isIdle();
    },

    resetExtJsIdle: function resetExtJsIdle() {
      this.ejIdle = false;
      function idleHandler() {
        window.tiaEJ.ejIdle = true;
      }

      Ext.on({ idle: { fn: idleHandler, scope: this, single: true } });
    },

    ajaxFailuresArr: [],

    // hasAjaxFailures: function() {
    //	return this.ajaxFailuresArr.length > 0;
    // },

    cleanAjaxFailures: function cleanAjaxFailures() {
      this.ajaxFailuresArr = [];
    },

    getAjaxFailures: function getAjaxFailures() {
      var tmp = this.ajaxFailuresArr;
      this.cleanAjaxFailures();
      return tmp;
    },

    isThereActiveAjaxCalls: function isThereActiveAjaxCalls() {
      return Ext.Ajax.isLoading();
    },

    // If field is omited - all data will be fetched.
    getStoreData: function getStoreData(storeId, field) {
      var arr = Ext.StoreManager.get(storeId).getRange();
      var res = arr.map(function (elem) {
        return elem[field];
      });
      return res;
    },

    /**
     * First localization key by text.
     * @param {String} text - text to be searched in localization.
     * @return {String} - found key or empty string.
     */
    getFirstLocKeyByText: function getFirstLocKeyByText(text, extra) {
      var candidate = this.getFirstLocaleKey(text, extra);
      return typeof candidate === 'undefined' ? '' : candidate;
    },

    /**
     * All localization keys by text.
     * @param {String} text - text to be searched in localization.
     * @return {String} - found keys separated by comma or empty string.
     */
    getLocKeysByText: function getLocKeysByText(text, extra) {
      var candidates = this.getAllLocaleKeys(text, extra);
      return typeof candidates === 'undefined' ? '' : candidates;
    },

    getTextByLocKey: function getTextByLocKey(key, extra) {
      var res = this.getLocaleValue(key, extra);
      if (typeof res === 'undefined') {
        throw new Error('No such key in locale: ' + key);
      }
      return res;
    },

    convertTextToLocKeys: function convertTextToLocKeys(text) {
      var locKeys = this.getLocKeysByText(text);
      var result;

      if (locKeys) {
        result = 'l"' + locKeys + '"';
      } else {
        locKeys = this.getLocKeysByText(text, true);
        if (locKeys) {
          result = 'el"' + locKeys + '"';
        } else {
          result = 'l""';
        }
      }

      if (!locKeys || this.debugLocale) {
        result += '("' + text + '")';
      }
      return result;
    },

    convertTextToFirstLocKey: function convertTextToFirstLocKey(text) {
      var locKey = this.getFirstLocKeyByText(text);
      var result;

      var locFound = false;

      if (locKey) {
        locFound = true;
        result = 'l"' + locKey + '"';
      } else {
        locKey = this.getFirstLocKeyByText(text, true);
        if (locKey) {
          locFound = true;
          result = 'el"' + locKey + '"';
        } else {
          result = text;
        }
      }

      if (locFound && this.debugLocale) {
        result += ' ("' + text + '")';
      }
      return result;
    },

    funcResultToLocale: function funcResultToLocale(destArr, cmp, funcName, alias) {
      if (cmp[funcName]) {
        var val = cmp[funcName]();
        destArr.push(alias + ': ' + this.convertTextToFirstLocKey(val));
      }
    },

    propToLocale: function propToLocale(destArr, cmp, propName) {
      var val = cmp[propName];
      if (typeof val !== 'undefined') {
        destArr.push(propName + ': ' + this.convertTextToFirstLocKey(val));
      }
    },

    /**
     * Replaces 'l"locale_key"' by '"text"', where text is the locale value for the given key.
     * @param {String} str - input string.
     * @return {String} - string with replaced text.
     */
    replaceLocKeys: function replaceLocKeys(str) {
      var reExtra = /el"(.*?)"/g;
      var result = str.replace(reExtra, function (m, key) {
        return '"' + tiaEJ.getLocaleValue(key, true) + '"';
      });
      var re = /l"(.*?)"/g;
      result = result.replace(re, function (m, key) {
        return '"' + tiaEJ.getLocaleValue(key) + '"';
      });

      result = result.replace(/,/g, '\\,');

      return result;
    },

    /**
     * Replaces '##some_my_fake-id3' by '#<real-temporary-id-from tiaEJ.idHash>'
     * @param str
     * @return {string|Object|void|*}
     */
    replaceFakeIds: function replaceFakeIds(str) {
      var re = /##([A-Za-z0-9_-]+)/g;
      return str.replace(re, function (m, fakeId) {
        return '[id="' + tiaEJ.idMap.getRealId(fakeId) + '"]';
      });
    },

    replaceAll: function replaceAll(str) {
      return this.replaceFakeIds(this.replaceLocKeys(str));
    },

    showMsgBox: function showMsgBox(msg, title) {
      var msgBox = Ext.Msg.show({
        title: 'TIA ExtJs exploration: ' + title,
        titleAlign: 'center', // Seems like does not work.
        message: msg.replace(/\n/g, '<br>'),
        width: 1200,
        minWidth: 1200,
        minHeight: 1200,
        modal: false,
        scrollable: true,
      });
    },

    getMainView: function getMainView() {
      return Ext.Component.fromElement(Ext.getBody());
    },

    getAppName: function getAppName() {
      return Ext.app.Application.instance.getName();
    },

    getApp: function getApp() {
      return window[this.getAppName()];
    },

  };

  var onAjaxError = function onAjaxError(conn, response, options, eOpts) {
    tiaEJ.ajaxFailuresArr.push('Ajax Exception: response.status: ' + response.status);
  };

  Ext.onReady(function () {
    Ext.Ajax.on({
      requestexception: onAjaxError,
    });
  });
})();
