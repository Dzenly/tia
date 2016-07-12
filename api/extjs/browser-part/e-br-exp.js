// jscs:ignore
(function () {
  'use strict';

  window.tiaEJExp = {

    consts: {
      lnBigSepLn: '\n==================================\n',
      avgSep: '======================',
      lnAvgSep: '\n======================',
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
          modelStr += 'viewModel.$className: ' + viewModel.$className;
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

    collectCompInfo: function (comp, extended) {

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

      var getReferences = null;
      var getReferencesStr = '';
      var itemsGetCount = 0;

      if (comp.isContainer) {
        getReferences = comp.getReferences();
        if (getReferences) {
          getReferencesStr = Ext.Object.getKeys(getReferences).join(' ');
        }
        itemsGetCount = comp.items.getCount();
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

      // var isContainer = comp.isContainer;
      // var id = comp.getId();
      // var itemCount;
      // if (isContainer) {
      //   itemCount = comp.items.getCount();
      // }

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
      var viewModelStr = this.consts.nA;
      if (viewModel) {
        viewModelStr = viewModel.$className
      }

      var session = comp.lookupSession();
      var sessionStr = this.consts.nA;
      if (session) {
        sessionStr = session.$className;
      }

      var formFieldStr = '';

      if (comp.isFormField) {

        formFieldStr = this.consts.lnAvgSep +
          '\nForm Field Info: ' +
          '\ngetName(): ' + comp.getName() +
          '\ngetValue(): ' + comp.getValue() +

          '\ngetRawValue(): ' + comp.getRawValue() +
          '\ngetSubmitValue(): ' + comp.getSubmitValue() +
          '\ngetInputId(): ' + comp.getInputId() +
          '\ngetFieldLabel(): ' + comp.getFieldLabel() +
          '\ngetActiveError(): ' + comp.getActiveError() +

          '\ngetErrors(): ' + comp.getErrors().join('\n') +

          this.consts.lnAvgSep
      }

      var outStr =
        'ariaRole: ' + comp.ariaRole +
        '\ngetXType(): ' + comp.getXType() +
        '\n$className: ' + comp.$className +
        '\nid: ' + comp.getId() + (comp.autoGenId ? ' (autogenerated)' : '') +
        '\ninitialConfig.id: ' + comp.initialConfig.id +
        '\ninitialConfig.reference: ' + comp.initialConfig.reference +
        '\ngetReference(): ' + comp.getReference() +
        '\ngetItemId(): ' + comp.getItemId() +
        '\ninitialConfig.itemId: ' + comp.initialConfig.itemId +
        '\ngetText:' + text + ', Locale Keys: ' + localeKeys +
        '\ngetXTypes(): ' + comp.getXTypes() +

        '\ninitialConfig.itemSelector: ' + comp.initialConfig.itemSelector +
        '\nisPanel: ' + comp.isPanel +
        '\n------\nAttrs: \n' + tiaEJ.ctMisc.getAttributes(comp) + '------';

      if (formFieldStr) {
        outStr += formFieldStr;
      }

      if (extended) {
        outStr +=
          '\nlookupViewModel().$className: ' + viewModelStr +
          '\nlookupSession().$className: ' + sessionStr +
          '\ninitialConfig.referenceHolder: ' + comp.initialConfig.referenceHolder +
          '\nlookupReferenceHolder(): ' + refHolderStr +
          '\ngetReferences(): ' + getReferencesStr +
          '\nitems.getCount(): ' + itemsGetCount +
          '\nisViewport: ' + comp.isViewport +

          '\ngetController\n' + getControllerStr + this.consts.smallSep +
          '\nlookupController()\n' + lookupControllerStr + this.consts.smallSep +
          '\nlookupController(skipThis)\n' + lookupControllerSkipThisStr;
      }
      outStr += this.consts.lnBigSepLn + this.collectCompInfo(comp.up());
      return outStr;
    },

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
        recordStr += this.consts.lnBigSepLn;
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
