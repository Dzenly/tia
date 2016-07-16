// jscs:ignore
(function () {
  'use strict';

  window.tiaEJExp = {

    consts: {
      bigSep: '====================================================================',
      hugeSep: '==============================================================================================',
      avgSep: '======================',
      smallSep: '--------------------------',
      tinySep: '------------',
      nA: 'N/A'
    },

    getSingleComponentInfo: function (c, indent) {

    },

    getCompHierarchy: function (comp, indent, parentsPath) {

      var resArr = [];
      if (!indent) {
        indent = '';
      }
      if (!parentsPath) {
        parentsPath = '';
      }
      var parent = comp.getId();
      if (!tiaEJ.ctByObj.isCompVisible(comp)) {
        return [];
      }

      resArr.push(indent + this.consts.bigSep);
      resArr.push(indent + 'Parents: ' + parentsPath);
      resArr = resArr.concat(this.getComponentInfo(comp).map(function (str) {
        return indent + str;
      }));

      if (comp.isContainer) {
        resArr.push(indent + this.consts.hugeSep);
        resArr.push('Container children:');
        var cnt = comp.items.getCount();
        for (var i = 0; i < cnt; i++) {
          var child = comp.items.get(i);
          if (!tiaEJ.ctByObj.isCompVisible(child)) {
            continue;
          }
          resArr.push(indent + '*|' + 'child ' + i + '/' + cnt + ' for cmp: ' + parent);
          resArr = resArr.concat(this.getCompHierarchy(child, indent + '*|', parentsPath + '/' + parent));
        }
        resArr.push(indent + this.consts.hugeSep);
      }
      return resArr;
    },

    showCompHierarchy: function (onlyVisible) {
      var mainView = tiaEJ.getMainView();
      var outArr = this.getCompHierarchy(mainView, onlyVisible);
      tiaEJ.showMsgBox(outArr.join('\n'));
    },

    /**
     * Returns array with strings about controller. It is for caller to join them or to add indent to each.
     * @param controller
     * @returns {Array}
     */
    getControllerInfo: function (controller, msg) {

      var res = ['CONTROLLER INFO (' + msg + '):'];
      if (!controller) {
        res.push('N/A');
        return res;
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

      return res.concat([
        'controller: isViewController: ' + controller.isViewController,
        'clName: ' + controller.$className,
        'id: ' + controller.id,
        'getReferences(): ' + refsStr,
        'routes: ' + routesStr,
        modelStr,
        '++++++++++'
      ]);
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

    getRefHolderInfo: function (comp) {
      var refHolder = comp.lookupReferenceHolder();
      var res = [
        this.consts.avgSep,
        'lookupReferenceHolder() info: '];
      if (refHolder) {
        tia.cU.dumpObj(refHolder, [
          'isComponent',
          '$className',
          'getXType()',
          'getXTypes()',
          'isViewController'
        ], res);
      }
      res.push(this.consts.avgSep);
      return res;
    },

    getComponentInfo: function (comp, extended) {

      // TODO: fieldLabel for form fields.
      // And other stuff for form fields.

      // TODO: Ext.Component private autoGenId: boolean.

      // getController?

      // Private member.
      //var refHolder = comp.lookupReferenceHolder();
      //alert(refHolder.$className);

      var getReferencesStr = '';
      if (comp.isContainer) {
        var getReferences = comp.getReferences();
        if (getReferences) {
          getReferencesStr = Ext.Object.getKeys(getReferences).join(' ');
        }
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

      // var viewModel = comp.lookupViewModel();
      // var viewModelStr = this.consts.nA;
      // if (viewModel) {
      //   viewModelStr = viewModel.$className
      // }
      //
      // var session = comp.lookupSession();
      // var sessionStr = this.consts.nA;
      // if (session) {
      //   sessionStr = session.$className;
      // }

      // tia.cU.dumpObj({getName: function() {return field['getName']()}}, [
      //   'getName()'
      // ], formFieldArr);

      var outArr = tia.cU.dumpObj(comp, [
        'ariaRole',
        'getXType()',
        '$className',
        'initialConfig.id'
      ]);

      outArr.push('getId: ' + comp.getId() + (comp.autoGenId ? ' (autogenerated)' : ''));

      outArr.push('getConfig(id): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'id'));

      tia.cU.dumpObj(comp, [
        'initialConfig.reference',
        'getReference()'
      ], outArr);

      outArr.push('getConfig(reference): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'reference'));

      tia.cU.dumpObj(comp, [
        'initialConfig.itemId',
        'getItemId()'
      ], outArr);

      outArr.push('getConfig(itemId): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'itemId'));
      outArr.push('getText:' + text + ', Locale Keys: ' + localeKeys);

      tia.cU.dumpObj(comp, [
        'getXTypes()',
        'initialConfig.itemSelector',
        'isPanel'
      ], outArr);

      outArr = outArr.concat([
        '------',
        'Attrs:',
        tiaEJ.ctMisc.getAttributes(comp),
        '------']);

      tia.cU.dumpObj(comp, [
        {path: 'isVisible()', args: [[true]]},
        'isHidden()',
        'isDisabled()',
        'isSuspended()'
      ], outArr);

      if (comp.isFormField) {
        outArr = outArr.concat(this.getFormFieldInfo(comp));
      }

      if (extended) {
        tia.cU.dumpObj(comp, [
          'lookupViewModel().$className',
          'lookupSession().$className',
          'initialConfig.referenceHolder',
          'items.getCount()',
          'isViewport'
        ], outArr);

        outArr.push('getReferences(): ' + getReferencesStr);

        outArr = outArr.concat(this.getRefHolderInfo(comp));

        outArr = outArr.concat(getControllerArr);
        outArr = outArr.concat(lookupControllerArr);
        outArr = outArr.concat(lookupControllerSkipThisArr);
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
