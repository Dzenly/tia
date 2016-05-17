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

    // ownerCt vs up - show difference.

    componentsInfo: function (c, indent, parents) {
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
          console.log(indent + '==========================');
          for (var i = 0; i < cnt; i++) {
            console.log(indent + '==========================');
            console.log(indent + '*|' + 'child ' + i + ' for cmp: ' + parent);
            var child = c.items.get(i);
            this.componentsInfo(child, indent + '*|', parents + '/' + parent);
          }
          console.log(indent + '--------------------------');
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

    getTabIdByItemId: function (compId, tabItemId) {
      var cmp = Ext.getCmp(compId).getTabBar().down('#' + tabItemId);
      var res = cmp ? cmp.getId() : null;
      return res;
    },

    getTabIdByText : function (compId, text) {
      var items = Ext.getCmp(compId).getTabBar().items;
      var cmp = items.findBy(function (item) {
        return item.text === text;
      });
      var res = cmp ? cmp.getId() : null;
      return res;
    },

    // TODO: form.down('[fieldLabel=Тип риска]').inputEl

  collectCompInfo: function (comp) {

    if (!comp) {// jscs:ignore
      return '';
    }

    // getController?

    // Private member.
    //var refHolder = comp.lookupReferenceHolder();
    //alert(refHolder.$className);

    var controller = comp.getController();
    var controllerStr = '';
    var modelStr = '';

    if (controller) {
      var refsObj = controller.getReferences();
      var refsStr = Ext.Object.getKeys(refsObj).join(' ');

      var routesObj = controller.getRoutes();
      var routesStr = Ext.Object.getKeys(routesObj).join(' ');

      // TODO: getStore ?? или это есть во ViewModel?

      var viewModel = controller.getViewModel();
      if (viewModel) {
        modelStr += 'Model clName: ' + viewModel.$className;
      }

      controllerStr = '----------\ncontroller: ' +
        '\nclName: ' + controller.$className +
        '\nid: ' + controller.id +
        '\nrefs: ' + refsStr +
        '\nroutes: ' + routesStr +
        '\n' + modelStr + '\n-------\n';

    }

    var itemId = comp.getItemId();
    var ref = comp.getReference();
    var xtypes = comp.getXTypes();
    var clName = comp.$className;
    var refHolder = comp.initialConfig.referenceHolder;
    // var isContainer = comp.isContainer;
    // var id = comp.getId();
    // var itemCount;
    // if (isContainer) {
    //   itemCount = comp.items.getCount();
    // }

    var attrsObj = comp.getEl().getAttributes();
    var attrsStr = '';

    Ext.Object.each(attrsObj, function (key, value) {
      if (key !== 'style' && key !== 'tabindex') {
        attrsStr += key + ': ' + value + '\n';
      }
    });

    // 'DOM id: ' + id +
    // '\nDom Class: ' + comp.getEl().getAttribute('class') +
    // '\nDom name: ' + comp.getEl().getAttribute('name') +
    // '\nisContainer: ' + isContainer;
    // '\nitemCount: ' + itemCount;

    var outStr =
      'ref: ' + ref +
      '\nrefHolder: ' + refHolder +
      '\n' + controllerStr +
      '\nitemId: ' + itemId +
      '\nxtypes: ' + xtypes +
      '\nclName: ' + clName +
      '\nAttrs: \n' + attrsStr;

    outStr += '\n=============\n' + this.collectCompInfo(comp.up());
    return outStr;
  }
  ,

  // var comp = extDomEl.component; undefined for unknown reason.
  // viewModel
  // parent / childs ?
  // tooltip, label

  // Shows info (alert + console.log) for object under mouse cursor, e - MouseEvent object.
  showCompInfo: function (e) {
    var str = Ext.dom.Element.fromPoint(e.clientX, e.clientY);
    var extDomEl = Ext.dom.Element.get(str);
    var comp = Ext.Component.fromElement(extDomEl);
    var outStr = this.collectCompInfo(comp);
    // var msgBox = Ext.Msg.prompt('', outStr.replace(/\n/g, '<br>'));

    var msgBox = Ext.Msg.show({
      message: outStr.replace(/\n/g, '<br>'),
      width: 1100,
      minWidth: 1100,
      modal: true
    });

    // msgBox.setWidth(1000);
    // msgBox.setHeight(1000);
    console.log(outStr);
  }
}
  ;

  var onAjaxError = function (conn, response, options, eOpts) {
    tiaExtJs.ajaxFailuresArr.push('Ajax Exception: response.status: ' + response.status);
  };

  Ext.onReady(function () {
    Ext.Ajax.on({
      requestexception: onAjaxError
    });
  });

  return true;
})();
