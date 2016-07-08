// jscs:ignore
(function () {
  'use strict';

  // ownerCt vs up - show difference.

  window.tiaEJExp = {

    consts: {
      bigSep: '\n=============================\n'
    },

    getSingleComponentInfo: function (c, indent) {

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
      var mainView = tiaEJ.getMainView();
      this.componentsInfo(mainView);
    },

    getControllerInfo: function (controller) {
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

        controllerStr = '^^^^^^^^^^\ncontroller: isViewController: ' + controller.isViewController +
          '\nclName: ' + controller.$className +
          '\nid: ' + controller.id +
          '\nrefs: ' + refsStr +
          '\nroutes: ' + routesStr +
          '\n' + modelStr + '\n++++++++++\n';

      }

      return controllerStr;
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
          compRefsStr = Ext.Object.getKeys(compRefs).join(' ');
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
      var controllerStr = this.getControllerInfo(controller);
      var controllerStr1 = this.getControllerInfo(comp.lookupController(false));
      var controllerStr2 = this.getControllerInfo(comp.lookupController(true));

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

      var locKeys;
      var text = '';
      if (comp.getText) {
        text = comp.getText();
        console.log('Text: ' + text);
        locKeys = tiaEJ.getLocKeysByText(text);
        console.log('LocKeys: ' + locKeys);
      }

      var sep = '-------------';

      var outStr =
        'ref: ' + ref +
        '\nitemId: ' + itemId +
        '\nLoc Keys: ' + locKeys + '; Text:' + text +
        '\nxtypes: ' + xtypes +
        '\nclName: ' + clName +
        '\nariaRole: ' + comp.ariaRole +
        '\nfieldLabel: ' + comp.fieldLabel +
        '\nAttrs: \n' + attrsStr +
        '\nisRefHolderCfg: ' + refHolderCfg +
        '\nrefHolder: ' + refHolderStr +
        '\ncompRefs: ' + compRefsStr +
        '\nchCnt: ' + chCnt +
        '\nisViewport: ' + comp.isViewport +
        '\nget\n' + controllerStr + sep +
        '\nlookup\n' + controllerStr1 + sep +
        '\nlookup(true)\n' + controllerStr2;

      outStr += '\n=======================================\n' + this.collectCompInfo(comp.up());
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
      console.log('getHtml: ' + extDomEl.getHtml());
      window.e1 = extDomEl;
      var comp = Ext.Component.fromElement(extDomEl);

      var record = null;
      var recordStr = 'Record Placeholder';

      try {
        record = comp.getRecord(extDomEl);
        recordStr = tiaEJ.ctMisc.stringifyAllRecord(record, true);
        recordStr += this.consts.bigSep;
      } catch (e) {
        console.log(e);
      }

      if (tia.debugMode) {
        window.c1 = comp;
      }
      var outStr = recordStr + '\n' + this.collectCompInfo(comp);

      tiaEJ.showMsgBox(outStr);
      // console.log(outStr);
    }
  };
})();
