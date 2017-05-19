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

    getCompHierarchy: function getCompHierarchy(comp, indent, parentsPath) {

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

    showCompHierarchy: function showCompHierarchy(onlyVisible) {
      var mainView = tiaEJ.getMainView();
      var outArr = this.getCompHierarchy(mainView, onlyVisible);
      tiaEJ.showMsgBox(outArr.join('\n'), 'Components hierarchy');
    },

    /**
     * Returns array with strings about controller. It is for caller to join them or to add indent to each.
     * @param controller
     * @returns {Array}
     */
    getControllerInfo: function getControllerInfo(controller, msg) {

      var res = ['++++++++++',
        'CONTROLLER INFO (' + msg + '):'
      ];
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

      var view = controller.getView();
      var viewStr = '';
      if (view) {
        viewStr += 'view.$className: ' + view.$className + ', xtype: ' + view.getXType() + ', ' +
          this.formGetIdStr(view, '16px');
      }

      return res.concat([
        'controller: isViewController: ' + controller.isViewController,
        'clName: ' + controller.$className,
        'getId(): ' + controller.getId(),
        'getReferences(): ' + refsStr,
        'routes: ' + routesStr,
        modelStr,
        viewStr,
        '++++++++++'
      ]);
    },

    getStoreContent: function getStoreContent(store) {
      var storeInfoArr = [
        this.consts.tinySep,
        'Store Info:'
      ];
      if (store) {
        storeInfoArr.push('Store $className: ' + store.$className);
        storeInfoArr = storeInfoArr.concat(tiaEJ.ctMisc.stringifyStore(store, false, true));
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
    getFormFieldInfo: function getFormFieldInfo(field) {

      var formFieldArr = [
        this.consts.avgSep,
        'Form Field Info: '
      ];

      formFieldArr.push('getName(): ' + this.boldIf(field.getName(), field.getName(), 'darkgreen'));

      tia.cU.dumpObj(field, [
        'getValue()',
        'getRawValue()',
        'getSubmitValue()',
        'getModelData()',
        'getSubmitData()',
        'getInputId()',
        'initialConfig.inputType',
        'initialConfig.boxLabel',
        'boxLabel',
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
          'getConfig().displayField',
          'initialConfig.hiddenName'
        ], formFieldArr);

        formFieldArr.push(this.consts.tinySep);

        if (field.getStore) {
          var store = field.getStore();
          formFieldArr = formFieldArr.concat(this.getStoreContent(store));
        }
      }

      formFieldArr.push(this.consts.avgSep);
      return formFieldArr;
    },

    getRefHolderInfo: function getRefHolderInfo(comp) {
      var refHolder = comp.lookupReferenceHolder();
      var res = [
        this.consts.avgSep,
        'lookupReferenceHolder() info: '];
      if (refHolder) {
        tia.cU.dumpObj(refHolder, [
          'isComponent',
          '$className',
          'getXType()',
          'getXTypes()'
        ], res, tia.cU.dumpObjErrMode.omitStringIfUndefined);
      }

      if (refHolder.isViewController) {
        res = res.concat(this.getControllerInfo(refHolder, 'reference holder'));
      }

      res.push(this.consts.avgSep);

      return res;
    },

    boldIf: function (str, cond, color, size) {
      color = color || 'black';
      size = size || '16px';
      if (cond) {
        return '<b style="font-size: ' + size + '; font-weight: 900; color:' + color + ';">' + str + '</b>';
      }
      return str;
    },

    formGetIdStr: function (comp, size) {
      size = size || '20px';
      return 'getId(): ' + this.boldIf(comp.getId(), !comp.autoGenId, 'green', size) +
      (comp.autoGenId ? ' (autogenerated)' : '') + (comp.isPanel ? this.boldIf(' (panel)', true, 'darkblue'): '')
    },

    getComponentInfo: function getComponentInfo(comp, extended) {

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

      var getControllerArr = this.getControllerInfo(comp.getController(), 'getController()');
      var lookupControllerArr = this.getControllerInfo(comp.lookupController(false), 'lookupController(false)');
      var lookupControllerSkipThisArr = this.getControllerInfo(comp.lookupController(true), 'lookupController(true)');

      var localeKeys = this.consts.nA;
      var textStr = '';
      if (comp.getText) {
        textStr = 'getText(): ' + comp.getText();
        localeKeys = tiaEJ.getLocKeysByText(textStr);
      } else {
        if (comp.text) {
          textStr = 'text:' + comp.text;
          localeKeys = tiaEJ.getLocKeysByText(textStr);
        }
      }

      var outArr = [];

      outArr.push(this.formGetIdStr(comp));

      tia.cU.dumpObj(comp, [
        'ariaRole',
        'getXType()',
        '$className',
        // 'initialConfig.id'
      ], outArr);

      // outArr.push('getConfig(id): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'id'));

      // tia.cU.dumpObj(comp, [
      //   // 'initialConfig.reference',
      //   'getReference()'
      // ], outArr);

      outArr.push('getReference(): ' + this.boldIf(comp.getReference(), comp.getReference(), 'green'));
      if (comp.getReference()) {
        outArr = outArr.concat(this.getRefHolderInfo(comp));
      }

      outArr.push('getConfig(reference): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'reference'));

      outArr.push('initialConfig.referenceHolder: ' + this.boldIf(comp.initialConfig.referenceHolder, comp.initialConfig.referenceHolder, 'orange', '20px'));

      tia.cU.dumpObj(comp, [
        'initialConfig.itemId',
        'getItemId()'
      ], outArr);

      // outArr.push('getConfig(itemId): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'itemId'));
      outArr.push(textStr + ', Locale Keys: ' + localeKeys);

      tia.cU.dumpObj(comp, [
        'getXTypes()',
        // 'initialConfig.itemSelector',
      ], outArr);

      // outArr.push('isPanel:' + comp.isPanel + (comp.isPanel ? ' ! ! ! ! !' : ''));

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
          'items.getCount()',
          'isViewport'
        ], outArr);

        outArr.push('getReferences(): ' + getReferencesStr);

        outArr = outArr.concat(getControllerArr);
        outArr = outArr.concat(lookupControllerArr);
        outArr = outArr.concat(lookupControllerSkipThisArr);
      }
      outArr.push(this.consts.bigSep);
      return outArr;
    },

    getComponentAndParentsInfo: function getComponentAndParentsInfo(comp, extended) {
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
    showCompInfoFromPoint: function showCompInfoFromPoint(e) {
      var x = e.clientX;
      var y = e.clientY;
      var el = Ext.dom.Element.fromPoint(x, y);
      var extDomEl = Ext.dom.Element.get(el);
      var comp = Ext.Component.fromElement(extDomEl);

      if (comp.isContainer) {
        var newComp = null;
        comp.cascade(function (curComp) {
          if (curComp.isDisabled()) {
            var box = curComp.getBox();
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
              newComp = curComp;
            }
          }
          return true;
        });
        if (newComp) {
          comp = newComp;
        }
      }

      window.c1 = comp;

      // var oldBorder = comp.getConfig().border;
      // var oldStyle = comp.getConfig().style;
      //
      // console.dir(oldBorder);
      // console.dir(oldStyle);
      //
      // comp.setConfig('border', 5)
      // comp.setConfig('style', {
      //   borderColor: 'red',
      //   borderStyle: 'solid'
      // });
      //
      // setTimeout(function () {
      //   comp.setConfig('border', oldBorder);
      //   comp.setConfig('style', oldStyle);
      // }, 10000);


      // comp.setBorder(5);
      // comp.setStyle({
      //   borderColor: 'red',
      //   borderStyle: 'solid'
      // });

      var record = null;
      var recordStr = 'Record info: ';

      try {
        record = comp.getRecord(extDomEl);
        recordStr += '\n' + tiaEJ.ctMisc.stringifyAllRecord(record, true);
        recordStr += '\n' + this.consts.bigSep;
      } catch (e) {
        recordStr += this.consts.nA;
        if (tia.debugMode) {
          console.log('Exp exc:' + e);
        }
      }

      if (tia.debugMode) {
        window.c1 = comp;
      }
      var outStr = recordStr + '\n' + this.getComponentAndParentsInfo(comp).join('\n');

      tiaEJ.showMsgBox(outStr, 'Info about a component under mouse cursor');
      // console.log(outStr);
    }
  };
})();
