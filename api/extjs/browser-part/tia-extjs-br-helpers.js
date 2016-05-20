// jscs:ignore
(function () {
  'use strict';

  window.tiaExtJs = {

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

    getTabIdByItemId: function (compId, tabItemId) {
      var cmp = Ext.getCmp(compId).getTabBar().down('#' + tabItemId);
      var res = cmp ? cmp.getId() : null;
      return res;
    },

    getTabIdByText: function (compId, text) {
      var items = Ext.getCmp(compId).getTabBar().items;
      var cmp = items.findBy(function (item) {
        return item.text === text;
      });
      var res = cmp ? cmp.getId() : null;
      return res;
    }

  };

  var onAjaxError = function (conn, response, options, eOpts) {
    tiaExtJs.ajaxFailuresArr.push('Ajax Exception: response.status: ' + response.status);
  };

  Ext.onReady(function () {
    Ext.Ajax.on({
      requestexception: onAjaxError
    });
  });

})();
