/* Test helper for ExtJs pages */
// Returns true, if Ext exists.
var initRvTestHelperExt = function () {

    if (typeof Ext === 'undefined' || typeof Ext.onReady === 'undefined' || typeof Ext.Ajax === 'undefined' || typeof Ext.Ajax.on === 'undefined') {
        return false;
    }

    var RvTestHelperExt = {
    ajaxFailuresArr: [],

    // ownerCt vs up - show difference.

    cmpInfo: function (c, indent, parents) {
        if (!indent) {
            indent = '';
        }
      if (!parents) {
          parents = '';
      }
        var parent = c.getItemId();
      console.log('Parents: ' + parents);
      console.log([
        indent + 'Component:',
        indent + 'Id: ' + c.getId() + ', itemId: ' + c.getItemId() + ', reference: ' + c.getReference() + ', xtypes: ' + c.getXTypes(),
        indent + 'clName: ' + c.$className + ', focusable: ' + c.focusable + ', visible: ' + c.isVisible(true)
      ].join('\n'));

      if (c.isContainer) {
        console.log([
          indent + 'Container:',
          indent + 'ariaRole: ' + c.ariaRole + ', ch.cnt: ' + c.items.getCount()
        ].join('\n'));
        console.log('Container children:');
        var cnt = c.items.getCount();
        if (cnt) {
          console.log(indent + "==========================");
          for (var i = 0; i < cnt; i++) {
            console.log(indent + "==========================");
            console.log(indent + '*|' + 'child ' + i + ' for cmp: ' + parent);
            var child = c.items.get(i);
            this.cmpInfo(child, indent + '*|', parents + '/' + parent);
          }
          console.log(indent + "--------------------------");
        }
      }
    },

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

    getTabId: function (tabItemId) {
      var cmp = Ext.getCmp('r-main').getTabBar().down('#' + tabItemId);
      var res = cmp ? cmp.getId() : null;
      //console.log('getTabId ' + res);
      return res;
    },
  };

  //console.log('TestHelperExt loaded');

  window.rvTestHelperExt = RvTestHelperExt;
  window.cmpInfo = RvTestHelperExt.cmpInfo;

  var onAjaxError = function (conn, response, options, eOpts) {
    rvTestHelperExt.ajaxFailuresArr.push('Ajax Exception: response.status: ' + response.status);
  };

  Ext.onReady(function () {
    Ext.Ajax.on({
      requestexception: onAjaxError
    });
  });

  return true;
};
