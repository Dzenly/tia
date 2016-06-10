// jscs:ignore
(function () {
  'use strict';

  window.tiaEJ = {

    // It if returns true there is not a bad chance that ExtJs application is ready to use.
    // Deprecated.
    isExtJsReady: function () {
      if (typeof Ext === 'undefined' || !Ext.isReady || typeof Ext.onReady === 'undefined' ||
        typeof Ext.Ajax === 'undefined' || typeof Ext.Ajax.on === 'undefined') {
        return false;
      }
      return true;
    },

    ajaxFailuresArr: [],

    //hasAjaxFailures: function() {
    //	return this.ajaxFailuresArr.length > 0;
    //},

    cleanAjaxFailures: function () {
      this.ajaxFailuresArr = [];
    },

    getAjaxFailures: function () {
      var tmp = this.ajaxFailuresArr;
      this.cleanAjaxFailures();
      return tmp;
    },

    activeAjaxCallsCount: function () {
      if (!Ext.Ajax.requests) {
        return 0;
      }
      return Ext.Ajax.requests.length;
    },

    // If field is omited - all data will be fetched.
    getStoreData: function (storeId, field) {
      var arr = Ext.StoreManager.get(storeId).getRange();
      var res = arr.map(function (elem) {
        return elem[field];
      });
      return res;
    },

    getLocKeysByText: function (text) {
      var res = [];
      for (var key in this.locale) {
        if (this.locale.hasOwnProperty(key)) {
          if (text === this.locale[key]) {
            res.push(key);
          }
        }
      }
      return res.join(', ');
    },

    getTextByLocKey: function (key) {
      return this.locale[key];
    },

    showMsgBox: function(msg) {
      var msgBox = Ext.Msg.show({
        message: msg.replace(/\n/g, '<br>'),
        width: 1100,
        minWidth: 1100,
        modal: false
      });
    },

    getMainView: function() {
      return Ext.Component.fromElement(Ext.getBody());
    },

    getAppName: function() {
      return Ext.app.Application.instance.getName();
    },

    getApp: function() {
      return window[this.getAppName()];
    }

  };

  var onAjaxError = function (conn, response, options, eOpts) {
    tiaEJ.ajaxFailuresArr.push('Ajax Exception: response.status: ' + response.status);
  };

  Ext.onReady(function () {
    Ext.Ajax.on({
      requestexception: onAjaxError
    });
  });

})();