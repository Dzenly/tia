// jscs:ignore
(function () {
  'use strict';

  window.tiaEJExp = {

    consts: {
      bigSep: '==================================',
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

    getCompHierarchy: function (c, indent, parents) {
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

    showCompHierarchy: function (onlyVisible) {
      var mainView = tiaEJ.getMainView();
      var outStr = this.getCompHierarchy(mainView, onlyVisible);
      tiaEJ.showMsgBox(outStr);
    },

    /**
     * Returns array with strings about controller. It is for caller to join them or to add indent to each.
     * @param controller
     * @returns {Array}
     */
    getControllerInfo: function (controller, msg) {
      if (!controller) {
        return ['N/A'];
      }
      var modelStr = '';
      var refsObj = controller.getReferences();
      var refsStr = Ext.Object.getKeys(refsObj).join(', ');

      var routesObj = controller.getRoutes();
      var routesStr = Ext.Object.getKeys(routesObj).join(', ');

      // TODO: getStore ?? или это есть во ViewModel?

      var viewModel = controller.getViewModel();
      if (viewModel) {
        modelStr += 'viewModel.$className: ' + viewModel.$className;
      }

      return [
        'CONTROLLER INFO (' + msg + '):',
        'controller: isViewController: ' + controller.isViewController,
        'clName: ' + controller.$className,
        'id: ' + controller.id,
        'getReferences(): ' + refsStr,
        'routes: ' + routesStr,
        modelStr,
        '++++++++++'
      ]
    },

    getStoreContent: function (store) {
      var storeInfoArr = [
        this.consts.tinySep,
        'Store Info:'
      ];
      if (store) {
        storeInfoArr.push('Store $className: ' + store.$className);
        storeInfoArr.push(tiaEJ.ctMisc.stringifyStore(store, false, true));
      } else {
        storeInfoArr.push('N/A');
      }
      storeInfoArr.push(this.consts.tinySep);
      return storeInfoArr;
    },

    /**
     * Returns array of strings with info about form field.
     * @param field
     */
    getFormFieldInfo: function (field) {

      var formFieldArr = [
        this.consts.avgSep,
        'Form Field Info: '
      ];

      tia.cU.dumpObj(field, [
        'getName()',
        'getValue()',
        'getRawValue()',
        'getSubmitValue()',
        'getModelData()',
        'getSubmitData()',
        'getInputId()',
        'initialConfig.inputType',
        'initialConfig.boxLabel',
        'inputType',
        'getFieldLabel()',
        'getActiveError()',
        'getErrors()'
      ], formFieldArr);

      if (field.isPickerField) {
        var pickerComp = field.getPicker();
        formFieldArr = formFieldArr.concat([
          this.consts.tinySep,
          'Picker field Info:']);

        tia.cU.dumpObj(pickerComp, ['$className',], formFieldArr);

        tia.cU.dumpObj(field, [
          {path: 'getConfig()', args: [['displayField']]},
          'initialConfig.hiddenName'
        ], formFieldArr);

        formFieldArr.push(this.consts.tinySep)

        var store = field.getStore();
        formFieldArr = formFieldArr.concat(this.getStoreContent(store));
      }

      formFieldArr.push(this.consts.avgSep);
      return formFieldArr;
    },

    getComponentInfo: function (comp, extended) {

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

      var getControllerArr = this.getControllerInfo(comp.getController(), 'getController()');
      var lookupControllerArr = this.getControllerInfo(comp.lookupController(false), 'lookupController(false)');
      var lookupControllerSkipThisArr = this.getControllerInfo(comp.lookupController(true), 'lookupController(true)');

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

      // tia.cU.dumpObj({getName: function() {return field['getName']()}}, [
      //   'getName()'
      // ], formFieldArr);

      var outArr = [
        'ariaRole: ' + comp.ariaRole,
        'getXType(): ' + comp.getXType(),
        '$className: ' + comp.$className,
        'initialConfig.id: ' + comp.initialConfig.id,
        'getId: ' + comp.getId() + (comp.autoGenId ? ' (autogenerated)' : ''),
        'getConfig(id): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'id'),
        'initialConfig.reference: ' + comp.initialConfig.reference,
        'getReference(): ' + comp.getReference(),
        'getConfig(reference): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'reference'),
        'initialConfig.itemId: ' + comp.initialConfig.itemId,
        'getItemId(): ' + comp.getItemId(),
        'getConfig(itemId): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'itemId'),
        'getText:' + text + ', Locale Keys: ' + localeKeys,
        'getXTypes(): ' + comp.getXTypes(),

        'initialConfig.itemSelector: ' + comp.initialConfig.itemSelector,
        'isPanel: ' + comp.isPanel,

        '------',
        'Attrs:',
        tiaEJ.ctMisc.getAttributes(comp),
        '------',

        'isVisible(true): ' + comp.isVisible(true),
        'isHidden(): ' + comp.isHidden(),
        'isDisabled(): ' + comp.isDisabled(),
        // 'isMasked(true): ' + comp.isMasked(true),
        'isSuspended(): ' + comp.isSuspended()
      ];

      if (comp.isFormField) {
        outArr = outArr.concat(this.getFormFieldInfo(comp));
      }

      if (extended) {
        outArr = outArr.concat([
          'lookupViewModel().$className: ' + viewModelStr,
          'lookupSession().$className: ' + sessionStr,
          'initialConfig.referenceHolder: ' + comp.initialConfig.referenceHolder,
          'lookupReferenceHolder(): ' + refHolderStr,
          'getReferences(): ' + getReferencesStr,
          'items.getCount(): ' + itemsGetCount,
          'isViewport: ' + comp.isViewport,

          getControllerArr + this.consts.smallSep,
          lookupControllerArr + this.consts.smallSep,
          lookupControllerSkipThisArr
        ]);
      }
      outArr.push(this.consts.bigSep);
      return outArr;
    },

    getComponentAndParentsInfo: function (comp, extended) {
      if (!comp) {
        return '';
      }
      var outArr = this.getComponentInfo(comp, extended);
      outArr = outArr.concat(this.getComponentAndParentsInfo(comp.up(), extended));
      return outArr;
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
        recordStr += this.consts.bigSep;
      } catch (e) {
        recordStr += this.consts.nA;
        console.log('Exp exc:' + e);
      }

      if (tia.debugMode) {
        window.c1 = comp;
      }
      var outStr = recordStr + '\n' + this.getComponentAndParentsInfo(comp).join('\n');

      tiaEJ.showMsgBox(outStr);
      // console.log(outStr);
    }
  };
})();
