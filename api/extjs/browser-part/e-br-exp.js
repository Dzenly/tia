// jscs:ignore
(function () {
  'use strict';

  window.tiaEJExp = {

    consts: {
      bigSepLn: '\n==================================\n',
      avgSep: '======================',
      smallSep: '--------------------------',
      tinySep: '------------',
      nA: 'N/A'
    },

    getSingleComponentInfo: function (c, indent) {

    },

    logCompHierarchyToConsole: function (c, indent, parents) {
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
          console.log(indent + this.consts.avgSep);
          for (var i = 0; i < cnt; i++) {
            console.log(indent + this.consts.avgSep);
            console.log(indent + '*|' + 'child ' + i + ' for cmp: ' + parent);
            var child = c.items.get(i);
            this.logCompHierarchyToConsole(child, indent + '*|', parents + '/' + parent);
          }

          console.log(indent + this.consts.smallSep);
        }
      }
    },

    showCompHierarchy: function () {
      var mainView = tiaEJ.getMainView();
      this.logCompHierarchyToConsole(mainView);
    },

    getControllerInfo: function (controller) {
      var controllerStr = 'N/A';
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

        controllerStr = 'CONTROLLER INFO:\ncontroller: isViewController: ' + controller.isViewController +
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
      var getReferencesStr = '';
      var childrenCount = 0;

      if (comp.isContainer) {
        compRefs = comp.getReferences();
        if (compRefs) {
          getReferencesStr = Ext.Object.getKeys(compRefs).join(' ');
        }
        childrenCount = comp.items.getCount();
      }

      var refHolder = comp.lookupReferenceHolder();
      var refHolderStr = '';
      if (refHolder) {
        var rHXTypes = refHolder.isComponent ? refHolder.getXTypes() : '';
        var rHClName = refHolder.$className;
        refHolderStr += 'xtypes: ' + rHXTypes + ', clName: ' + rHClName + ', isViewController: ' + refHolder.isViewController;
      }

      var controller = comp.getController();
      var getControllerStr = this.getControllerInfo(controller);
      var lookupControllerStr = this.getControllerInfo(comp.lookupController(false));
      var lookupControllerSkipThisStr = this.getControllerInfo(comp.lookupController(true));

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

      var attrsStr = tiaEJ.ctMisc.getAttributes(comp);

      // 'DOM id: ' + id +
      // '\nDom Class: ' + comp.getEl().getAttribute('class') +
      // '\nDom name: ' + comp.getEl().getAttribute('name') +
      // '\nisContainer: ' + isContainer;
      // '\nitemCount: ' + itemCount;

      var localeKeys = this.consts.nA;
      var text = '';
      if (comp.getText) {
        text = comp.getText();
        localeKeys = tiaEJ.getLocKeysByText(text);
      }

      var viewModel = comp.lookupViewModel();
      var session = comp.lookupSession();

      var viewModelStr = this.consts.nA;
      if (viewModel) {
        viewModelStr = viewModel.$className
      }

      var sessionStr = this.consts.nA;
      if (session) {
        sessionStr = session.$className;
      }

      var confItemIdStr = this.consts.nA;
      try {
        confItemIdStr = comp.getConfig('itemId', true);
      } catch(e){
      }

      var outStr =
        'ariaRole: ' + comp.ariaRole +
        '\nclName: ' + clName +
        '\nid: ' + comp.getId() + (comp.autoGenId ? ' (autogenerated)' : '') +
        '\nreference: ' + ref +
        '\nitemId: ' + itemId +
        '\nitemId from config: ' + confItemIdStr +
        '\nLocale Keys: ' + localeKeys + '; getText:' + text +
        '\nxtypes: ' + xtypes +
        '\nfieldLabel: ' + comp.fieldLabel +
        '\nAttrs: \n' + attrsStr + '------\n' +

        '\nviewModel: ' + viewModelStr +
        '\nsession: ' + sessionStr +
        '\nisRefHolderCfg: ' + refHolderCfg +
        '\nrefHolder: ' + refHolderStr +
        '\ncompRefs: ' + getReferencesStr +
        '\nChildren count: ' + childrenCount +
        '\nisViewport: ' + comp.isViewport +
        '\ngetController\n' + getControllerStr + this.consts.smallSep +
        '\nlookupController()\n' + lookupControllerStr + this.consts.smallSep +
        '\nlookupController(skipThis)\n' + lookupControllerSkipThisStr;

      outStr += this.consts.bigSepLn + this.collectCompInfo(comp.up());
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
      // console.log('getHtml: ' + extDomEl.getHtml());
      window.e1 = extDomEl;
      var comp = Ext.Component.fromElement(extDomEl);

      var record = null;
      var recordStr = 'Record info: ';

      try {
        record = comp.getRecord(extDomEl);
        recordStr += '\n' + tiaEJ.ctMisc.stringifyAllRecord(record, true);
        recordStr += this.consts.bigSepLn;
      } catch (e) {
        recordStr += this.consts.nA;
        console.log('Exp exc:' + e);
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
