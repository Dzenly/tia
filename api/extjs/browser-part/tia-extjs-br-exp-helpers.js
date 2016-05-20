// jscs:ignore
(function () {
  'use strict';

  // ownerCt vs up - show difference.

  window.tiaEJExp = {

    getSingleComponentInfo: function(c, indent) {

    },

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
          indent + 'ariaRole: ' + c.ariaRole + ', isViewport: ' + c.isViewport + ', ch.cnt: ' + c.items.getCount()
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

    showCompHierarchy: function () {
      var mainView = this.getMainView();
      this.componentsInfo(mainView);
    },

    // TODO: form.down('[fieldLabel=Тип риска]').inputEl

    collectCompInfo: function (comp) {

      if (!comp) {
        return '';
      }

      // TODO: fieldLabel for form fields.
      // And other stuff for form fields.

      // TODO: Ext.Component private autoGenId: boolean.

      // getController?

      // Private member.
      //var refHolder = comp.lookupReferenceHolder();
      //alert(refHolder.$className);

      var compRefs = null;
      var compRefsStr = '';
      var chCnt = 0;

      if (comp.isContainer) {
        compRefs = comp.getReferences();
        if (compRefs) {
          compRefsStr = Ext.Object.getKeys(refsObj).join(' ');
        }
        chCnt = comp.items.getCount();
      }

      var refHolder = comp.lookupReferenceHolder();
      var refHolderStr = '';
      if (refHolder) {
        //console.log('rh: ' + refHolder.$className);
        var rHXTypes = refHolder.isComponent ? refHolder.getXTypes() : '';
        var rHClName = refHolder.$className;
        refHolderStr += 'xtypes: ' + rHXTypes + ', clName: ' + rHClName + ', isViewController: ' + refHolder.isViewController;

      }

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

        controllerStr = '----------\ncontroller: isViewController: ' + controller.isViewController +
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
      var refHolderCfg = comp.initialConfig.referenceHolder;
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
        '\nitemId: ' + itemId +
        '\nxtypes: ' + xtypes +
        '\nclName: ' + clName +
        '\nariaRole: ' + comp.ariaRole +
        '\nAttrs: \n' + attrsStr +
        '\nisRefHolderCfg: ' + refHolderCfg +
        '\nrefHolder: ' + refHolderStr +
        '\ncompRefs: ' + compRefsStr +
        '\nchCnt: ' + chCnt +
        '\nisViewport: ' + comp.isViewport +
        '\n' + controllerStr;


      outStr += '\n=============\n' + this.collectCompInfo(comp.up());
      return outStr;
    }
    ,

    // var comp = extDomEl.component; undefined for unknown reason.
    // viewModel
    // parent / childs ?
    // tooltip, label

    // Shows info (alert + console.log) for object under mouse cursor, e - MouseEvent object.
    showCompInfoFromPoint: function (e) {
      var str = Ext.dom.Element.fromPoint(e.clientX, e.clientY);
      var extDomEl = Ext.dom.Element.get(str);
      var comp = Ext.Component.fromElement(extDomEl);
      var outStr = this.collectCompInfo(comp);
      // var msgBox = Ext.Msg.prompt('', outStr.replace(/\n/g, '<br>'));

      this.showMsgBox(outStr);
      // console.log(outStr);
    },

    showMsgBox: function(msg) {
      var msgBox = Ext.Msg.show({
        message: msg.replace(/\n/g, '<br>'),
        width: 1100,
        minWidth: 1100,
        modal: true
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
})();
