// jscs:ignore
(function setExplorationMode() {
  'use strict';

  var standardXTypesList = [
    'textarea',
    'checkbox',
    'colormenu',
    'treelist',
    'multiselector-search',
    'calendar-list',
    'treepanel',
    'celleditor',
    'calendar-form-edit',
    'd3-heatmap',
    'polar',
    'image',
    'menu',
    'radiogroup',
    'multiselect',
    'sparklineline',
    'hidden',
    'calendar-day',
    'desktop',
    'tbspacer',
    'treecolumn',
    'trigger',
    'colorbutton',
    'sliderwidget',
    'slidertip',
    'd3-partition',
    'colorpickerslideralpha',
    'colorpickerslidervalue',
    'tip',
    'templatecolumn',
    'pivotconfigcontainer',
    'sparkline',
    'sparklinepie',
    'segmentedbutton',
    'filefield',
    'pivotconfigfield',
    'calendar-dayview',
    'tabpanel',
    'textfield',
    'calendar-weekview',
    'treelistitem',
    'rating',
    'gmappanel',
    'tbitem',
    'gridview',
    'textareafield',
    'widget',
    'calendar-daysview',
    'imagecomponent',
    'timepicker',
    'actioncolumn',
    'pivotheatmap',
    'datemenu',
    'monthpicker',
    'chart',
    'datepicker',
    'sparklinebullet',
    'wallpaper',
    'sparklinebar',
    'rownumberer',
    'colorpickersliderhue',
    'calendar-daysheader',
    'progress',
    'fileuploadfield',
    'tagfield',
    'pickerfield',
    'gridcolumn',
    'd3-horizontal-tree',
    'video',
    'eventrecordermanager',
    'menuseparator',
    'sparklinetristate',
    'toast',
    'hiddenfield',
    'combobox',
    'timefield',
    'colorpicker',
    'calendar-weeks',
    'container',
    'splitbutton',
    'tab',
    'numberfield',
    'itemselector',
    'roweditor',
    'tabbar',
    'messagebox',
    'numbercolumn',
    'splitter',
    'button',
    'calendar-weeksheader',
    'searchfield',
    'tbfill',
    'sliderfield',
    'tbseparator',
    'booleancolumn',
    'toolbar',
    'propertygrid',
    'pivotgrid',
    'gauge',
    'menubar',
    'calendar-month',
    'd3-sunburst',
    'combo',
    'multiselectfield',
    'trayclock',
    'radio',
    'pivotconfigpanel',
    'progressbar',
    'header',
    'component',
    'roweditorbuttons',
    'triggerfield',
    'form',
    'colorpickercolormap',
    'treeview',
    'editor',
    'draw',
    'pivottreemap',
    'filebutton',
    'colorpickerslider',
    'tablepanel',
    'datecolumn',
    'cycle',
    'colorselector',
    'displayfield',
    'explorer',
    'htmleditor',
    'd3',
    'fieldset',
    'calendar-days',
    'dataview',
    'tbtext',
    'loadmask',
    'd3-canvas',
    'slider',
    'legend',
    'taskbar',
    'spinnerfield',
    'dashboard-panel',
    'sparklinediscrete',
    'tool',
    'breadcrumb',
    'box',
    'title',
    'label',
    'multiselector',
    'colorpickercolorpreview',
    'window',
    'calendar-event',
    'calendar-week',
    'surface',
    'axis',
    'dashboard-column',
    'axis3d',
    'progressbarwidget',
    'treepicker',
    'fieldcontainer',
    'd3-svg',
    'uxiframe',
    'calendar-calendar-picker',
    'multislider',
    'pivotd3container',
    'd3-treemap',
    'menucheckitem',
    'flash',
    'columnsplitter',
    'calendar-weeksview',
    'panel',
    'headercontainer',
    'checkboxgroup',
    'd3-pack',
    'dashboard',
    'gridpanel',
    'colorfield',
    'datefield',
    'itemselectorfield',
    'cartesian',
    'grid',
    'radiofield',
    'tableview',
    'checkcolumn',
    'tooltip',
    'calendar-multiview',
    'viewport',
    'field',
    'sparklinebox',
    'bordersplitter',
    'calendar',
    'widgetcolumn',
    'calendar-form-add',
    'statusbar',
    'mzpivotgrid',
    'pagingtoolbar',
    'd3-tree',
    'boundlist',
    'menuitem',
    'interaction',
    'checkboxfield',
    'spacefilling',
    'quicktip',
    'buttongroup',
    'chartnavigator',
    'calendar-monthview',
    'colorpickerslidersaturation',
  ];

  var autoGenRE = /-\d{4}/;

  console.log('TIA: setEBrExplore');

  window.tiaEJExp = {

    consts: {
      bigSep: '====================================================================',
      hugeSep: '==============================================================================================',
      avgSep: '======================',
      smallSep: '--------------------------',
      tinySep: '------------',
      nA: 'N/A',
    },

    supportedXTypes: [
      'button',
      'checkbox',
      'combobox',
      'component',
      'tab',
      'tabpanel',
      'textfield',
      'tableview',
      'treeview',
      'boundlist',
      'gridcolumn',
      'form',
    ],

    // xtypeToTiaApi: {
    //   tableview: 'table',
    //   treeview: 'tree',
    // },
    //
    // convertXTypeToTiaApi: function (xtype) {
    //   return this.xtypeToTiaApi[xtype] || xtype;
    // },

    getFirstSupportedAscendant: function getFirstSupportedAscendant(xtypes) {
      var arr = xtypes.split('/');
      for (var i = arr.length; i >= 0; i--) {
        var xtype = arr[i];
        if (this.supportedXTypes.includes(xtype)) {
          return xtype;
        }
      }
      throw new Error(xtypes + ' not supported');
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
        'CONTROLLER INFO (' + msg + '):',
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
        viewStr += 'view.$className: ' + view.$className +
          ', getConfig("xtype"): ' + view.getConfig('xtype') + ' ' +
          this.formGetIdStr(view, '18px');

        var itemId = view.getConfig('itemId');
        if (!autoGenRE.test(itemId)) {
          viewStr += ', itemId: ' + itemId;
        }

        var reference = view.getConfig('reference');
        if (reference) {
          viewStr += ', reference: ' + reference;
        }

      }

      this.pushTextProp(controller, 'alias', res);

      return res.concat([
        'controller: isViewController: ' + controller.isViewController,
        'clName: ' + controller.$className,
        'getId(): ' + controller.getId(),
        'getReferences(): ' + refsStr,
        'routes: ' + routesStr,
        modelStr,
        viewStr,
        '++++++++++',
      ]);
    },

    getStoreContent: function getStoreContent(store) {
      var storeInfoArr = [
        this.consts.tinySep,
        'Store Info:',
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
        'Form Field Info: ',
      ];

      var name = field.getName() || '';

      if (!Boolean(autoGenRE.test(name))) {
        formFieldArr.push('getName(): ' + this.boldIf(name, name, 'darkgreen'));
      }

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
        'getErrors()',
      ], formFieldArr);

      var store;

      if (field.isPickerField) {
        var pickerComp = field.getPicker();
        formFieldArr = formFieldArr.concat([
          this.consts.tinySep,
          'Picker field info:']);

        tia.cU.dumpObj(pickerComp, ['$className'], formFieldArr);

        tia.cU.dumpObj(field, [
          'getConfig().displayField',
          'initialConfig.hiddenName',
        ], formFieldArr);

        formFieldArr.push(this.consts.tinySep);

        if (field.getStore) {
          store = field.getStore();
          formFieldArr = formFieldArr.concat(this.getStoreContent(store));
        }
      } else if (field.displayField) {
        formFieldArr = formFieldArr.concat([
          this.consts.tinySep,
          'Form field containing "displayField" info:']);

        tia.cU.dumpObj(field, ['$className'], formFieldArr);

        tia.cU.dumpObj(field, [
          'getConfig().displayField',
          'initialConfig.hiddenName',
        ], formFieldArr);

        formFieldArr.push(this.consts.tinySep);

        if (field.getStore) {
          store = field.getStore();
          formFieldArr = formFieldArr.concat(this.getStoreContent(store));
        }
      }

      formFieldArr.push(this.consts.avgSep);
      return formFieldArr;
    },

    getRefHolderInfo: function getRefHolderInfo(comp) {
      var refHolder = comp.lookupReferenceHolder(true);
      var res = [
        this.consts.avgSep,
        'lookupReferenceHolder() info: '];
      if (refHolder) {
        tia.cU.dumpObj(refHolder, [
          'isComponent',
          '$className',
          { path: 'getConfig()', args: [['xtype']] },
        ], res, tia.cU.dumpObjErrMode.omitStringIfUndefined);

        res.push('getReferences(): ' + Object.keys(refHolder.getReferences()).join(', '));
      }

      if (refHolder.isViewController) {
        res = res.concat(this.getControllerInfo(refHolder, 'reference holder'));
      }

      res.push(this.consts.avgSep);

      return res;
    },

    boldIf: function (str, cond, color, size) {
      str = str.replace(/\&/g, '&amp;');

      color = color || 'black';
      size = size || '16px';
      if (cond) {
        return '<b style="font-size: ' + size + '; font-weight: 900; color:' + color + ';">' + str + '</b>';
      }
      return str;
    },

    boldGreen: function (str) {
      return '<b style="font-size: 20px; font-weight: 900; color:green;">' + str + '</b>';
    },

    boldRed: function (str) {
      return '<b style="font-size: 20px; font-weight: 900; color:red;">' + str + '</b>';
    },

    boldBlack: function (str) {
      return '<b style="font-size: 20px; font-weight: 900; color:black;">' + str + '</b>';
    },

    // formGetIdStr: function (comp, size) {
    //   size = size || '20px';
    //   return 'getId(): ' + this.boldIf(comp.getId(), !comp.autoGenId, 'green', size) +
    //     (comp.autoGenId ? ' (autogenerated)' : '') + (comp.isPanel ? this.boldIf(' (panel)', true, 'darkblue'): '')
    // },

    formGetIdStr: function (comp, size) {
      size = size || '20px';
      return 'getId(): ' + this.boldIf(comp.getId(), !comp.autoGenId, 'green', size) +
      (comp.autoGenId ? ' (autogenerated)' : '') + (comp.isPanel ? this.boldIf(' (panel)', true, 'darkblue'): '');
    },

    capitalizeFirst: function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    },

    pushVal: function (val, prop, outArr) {
      var textStr = prop + ': ' + val;

      var localeKeys = tiaEJ.getLocKeysByText(val);
      var extraLocaleKeys = tiaEJ.getLocKeysByText(val, true);

      outArr.push(textStr + ', Locale Keys: ' + localeKeys + ', Extra locale Keys: ' + extraLocaleKeys);
    },

    pushTextProp: function (comp, prop, outArr) {
      var getterName = 'get' + this.capitalizeFirst(prop);
      var val = comp.getConfig(prop);

      if (val) {
        this.pushVal(val, prop, outArr);
        return;
      }

      val = comp[prop];
      if (val) {
        this.pushVal(val, prop, outArr);
        return;
      }

      if (comp[getterName]) {
        val = comp[getterName]();
        if (val) {
          this.pushVal(val, comp[getterName] + '()', outArr);
          return;
        }
      }
    },

    replaceToLocKeys: function replaceToLocKeys(propVal) {
      var localeKeys = tiaEJ.getLocKeysByText(propVal);
      if (localeKeys) {
        propVal = 'l"' + localeKeys + '"';
      } else {
        localeKeys = tiaEJ.getLocKeysByText(propVal, true);
        if (localeKeys) {
          propVal = 'el"' + localeKeys + '"';
        }
        propVal = '"' + propVal + '"';
      }
      return propVal;
    },

    getComponentSearchString: function getComponentSearchString(comp, xtypePriority) {

      if (!comp) {
        return 'PARENT-NOT-FOUND';
        // throw new Error('getComponentSearchString: !comp');
      }

      var xtypeToTiaInterface = {
        checkbox: 'Checkbox',
      };

      var id = comp.getId();
      var autoGenId = comp.autoGenId || (Boolean(autoGenRE.test(id)));

      var fakeId;
      if (!autoGenId) {
        return '#' + id;
      } else {
        fakeId = tiaEJ.idMap.getFakeId(id);
        id = null;
        if (fakeId) {
          return '##' + fakeId;
        }
      }

      var xtype = comp.getConfig('xtype');

      xtype = xtype.replace(/\./g, '\\.');

      var isXTypeCustom = !standardXTypesList.includes(xtype);
      var customXTypeCmpCount = 0;
      if (isXTypeCustom) {
        var cmps = Ext.ComponentQuery.query(xtype);
        customXTypeCmpCount = cmps.length;
      }

      if (xtypePriority) {
        if (customXTypeCmpCount === 1) {
          return xtype;
        }
      }

      var parentComp = null;

      var reference = comp.getConfig('reference');
      if (reference) {
        var rh = comp.lookupReferenceHolder(true);
        parentComp = rh.isViewController ? rh.getView() : rh;
        return this.getComponentSearchString(parentComp, xtypePriority) + ' &' + reference;
      }

      if (comp.isMenu) {
        return xtype;
      }

      parentComp = comp.up();

      function getChildSep(selector) {
        if (!parentComp) {
          return ' ';
        }
        if (!parentComp.child) {
          return ' ';
        }
        return Boolean(parentComp.child(selector)) ? ' > ' : ' ';
      }

      var curSelector = null;
      var curChildSep = '';

      var itemId = comp.getConfig('itemId');
      itemId = autoGenRE.test(itemId) ? null : itemId;
      if (itemId) {
        curSelector = xtype + '#' + itemId;
        curChildSep = getChildSep(curSelector);
        return this.getComponentSearchString(parentComp, xtypePriority) + curChildSep + curSelector;
      }

      var name = comp.name; // TODO: getName
      if (name && (!Boolean(autoGenRE.test(name)))) {
        curSelector = xtype + '[name=' + name + ']';
        curChildSep = getChildSep(curSelector);
        return this.getComponentSearchString(parentComp, xtypePriority) + curChildSep + curSelector;
      }

      if (customXTypeCmpCount === 1) {
        return xtype;
      }

      var compProps = [
        'text',
        'title',
        'fieldLabel',
        'boxLabel',
        'tooltip',
      ];

      for (var propIndex = 0; propIndex < compProps.length; propIndex++) {
        var propName = compProps[propIndex];
        var propVal = comp[propName];
        if (propVal && !(typeof propVal === 'object')) { // For header title, title is object.

          curChildSep = getChildSep(curSelector);

          propVal = this.replaceToLocKeys(propVal);
          curSelector = xtype + '[' + propName + '=' + propVal + ']';

          if (!parentComp/* && (xtype === 'window' || xtype === 'messagebox')*/) {
            return xtype + '[' + propName + '=' + propVal + ']';
          } else {
            return this.getComponentSearchString(parentComp, xtypePriority) +
              curChildSep + xtype + '[' + propName + '=' + propVal + ']';
          }
        }
      }

      if (!parentComp) {
        return xtype;
      }

      curChildSep = getChildSep(xtype);
      return this.getComponentSearchString(parentComp, xtypePriority) + curChildSep + xtype;
    },

    dumpStoreData: function dumpStoreData(store, dataIndexes, outArr) {
      dataIndexes = dataIndexes.slice();

      var count = store.getCount();
      var totalCount = store.getTotalCount();
      var model = store.getModel();
      var modelName = model.getName();
      var idProperty = model.idProperty;

      if (false) {
        dataIndexes.unshift(idProperty);
      }

      outArr.push('Store info: class: ' + store.$className + ', count: ' + count + ', totalCount: ' +
        totalCount + ', modelName: ' + modelName + ', idProperty: ' + idProperty);

      var data = store.getData();
      var printColName = false;

      var i;
      for (i = 0; i < count; i++) {
        var row = data.getAt(i);
        var arr = [];
        // TODO: padding.
        dataIndexes.forEach(function (dataIndex) {
          arr.push((printColName ? (dataIndex + ': ') : '') + row.get(dataIndex));
        });
        outArr.push(arr.join(', '));
      }
    },

    dumpTreeStoreData: function dumpTreeStoreData(store, dataIndexes, outArr) {

      dataIndexes = dataIndexes.slice();

      var node = store.getRoot();
      var rootVisible = store.getRootVisible();

      var model = store.getModel();
      var modelName = model.getName();
      var idProperty = model.idProperty;

      outArr.push('Store info: class: ' + store.$className + ', modelName: ' + modelName +
        ', idProperty: ' + idProperty);

      if (false) {
        dataIndexes.unshift(idProperty);
      }

      // var data = store.getData();
      // var printColName = false;
      //
      // var i;
      // for (i = 0; i < count; i++) {
      //   var row = data.getAt(i);
      //   var arr = [];
      //   // TODO: padding.
      //   dataIndexes.forEach(function (dataIndex) {
      //     arr.push((printColName ? (dataIndex + ': ') : '') + row.get(dataIndex));
      //   });
      //   resArr.push(arr.join(', '));
      // }
    },


    getTableInfo: function getTableInfo(comp) {
      if (!comp.isTableView) {
        return []; // TODO: пока только для таблиц.
      }

      var panel = comp.ownerGrid;
      window.p = panel; // TODO: remove me.

      var resArr = [];
      resArr.push(this.consts.avgSep);
      resArr.push('Columns info:');
      var visColumns = panel.getVisibleColumns();

      var dataIndexes = [];

      visColumns.forEach(function (col) {
        var innerCount = col.getColumnCount();
        innerCount = innerCount ? ('innerColsCount: ' + innerCount) : '';
        var dataIndex = col.dataIndex;

        // eslint-disable-next-line eqeqeq
        if (dataIndex != null) {
          dataIndexes.push(dataIndex);
        }

        // TODO: хорошо бы выдавать уникальность. Но не все гриды юзают модели.

        resArr.push('text/tooltip: ' + col.text + '/' + col.tooltip + ', dataIndex: ' +
          tiaEJExp.boldIf(dataIndex || '' , true) + innerCount);
      });

      var store = comp.getStore();

      if (!store) {
        return resArr;
      }

      resArr.push(this.consts.smallSep);

      if ((store.isTreeStore)) {
        this.dumpTreeStoreData(store, dataIndexes, resArr);
      } else if (store.$className === 'Ext.data.Store') {
        this.dumpStoreData(store, dataIndexes, resArr);
      } else {
        resArr.push('Unsupported store: ' + store.$className);
      }

      return resArr;
    },

    addRowInfo: function addRowInfo(extDomEl, comp, outArr) {
      outArr.push(this.consts.smallSep);
      outArr.push('Row/cell info: ');
      // var xtype = comp.getConfig('xtype');
      // outArr.push('xtype: ' + xtype);

      var item;
      var m;
      var val;
      if (comp.isXType('boundlist') /* xtype === 'boundlist' */ ) {
        outArr.push('displayField: ' + comp.displayField);
        // row only.
        item = extDomEl.findParent(comp.itemSelector, 10, true);
        if (!item) {
          outArr.push('Mouse is not on some row');
          return;
        }
        var index = item.getAttribute('data-recordindex');
        m = comp.getStore().getAt(index);
        val = m.get(comp.displayField);
        val = this.replaceToLocKeys(val);
        outArr.push('value: ' + this.boldBlack(val));
        // console.dir(item);
      } else if (comp.isXType('tableview')) {
        // outArr.push('displayField: ' + comp.displayField);
        // row only.
        var cellDom = extDomEl.findParent(comp.getCellSelector(), 10, true);
        if (!cellDom) {
          outArr.push('Mouse is not on some row');
          return;
        }
        var rowDom = extDomEl.findParent(comp.getItemSelector(), 10, true);
        window.cellDom = cellDom;
        window.rowDom = rowDom;

        var panel = comp.ownerGrid;
        var visColumns = panel.getVisibleColumns();

        var dataIndex = null;

        visColumns.some(function (col) {
          var cellSelector = comp.getCellSelector(col);
          var tmpDom = extDomEl.findParent(cellSelector, 3, true);
          if (tmpDom) {
            dataIndex = col.dataIndex;
            outArr.push('text/tooltip: ' + tiaEJExp.boldBlack(
              tiaEJExp.replaceToLocKeys(col.text) + ' / ' + tiaEJExp.replaceToLocKeys(col.tooltip))
            );
          }
        });

        outArr.push('dataIndex: ' + this.boldBlack(dataIndex));

        var intId = rowDom.getAttribute('data-recordid');
        var s = comp.getStore();
        m = s.getByInternalId(intId);
        val = m.get(dataIndex);

        outArr.push('value: ' + this.boldBlack(this.replaceToLocKeys(val)));
      }
    },

    getComponentInfo: function getComponentInfo(comp, extended, extDomEl) {

      if (!comp) {
        throw new Error('getComponentInfo: !comp');
      }

      var tEQXT = this.getComponentSearchString(comp, true);
      var tEQRef = this.getComponentSearchString(comp, false);

      var xtypes = comp.getXTypes();
      var firstSupportedXType = this.getFirstSupportedAscendant(xtypes);
      // firstSupportedXType = this.convertXTypeToTiaApi(firstSupportedXType);

      // And other stuff for form fields.
      var initialConfig = comp.getInitialConfig();
      var config = comp.getConfig();
      var id = comp.getId();
      var autoGenId = comp.autoGenId || (Boolean(autoGenRE.test(id)));

      var fakeId;
      if (autoGenId) {
        fakeId = tiaEJ.idMap.getFakeId(id);
        id = null;
      }

      var itemId = comp.getConfig('itemId');
      itemId = autoGenRE.test(itemId) ? null : itemId;

      // getController?

      // Private member.
      // var refHolder = comp.lookupReferenceHolder(false);
      // alert(refHolder.$className);

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

      var outArr = [];

      outArr.push(this.boldIf('await gT.eC.' + firstSupportedXType, true, '#000000'));

      // =============
      var teqId;

      try {
        teqId = tiaEJ.searchAndWrap.byTeq(tEQXT).cmpInfo.constProps.realId;
        if (teqId !== comp.getId()) {
          outArr.push(this.boldIf('TEQ checking error: found Id: ' + teqId, true, '#FF0000'));
        }
      } catch (e) {
        outArr.push(this.boldIf(e.toString(), true, '#FF0000'));
      }

      outArr.push(this.boldIf('(\'' + tEQXT + '\')', true, '#0000FF', '18px'));

      // ==

      if (tEQRef !== tEQXT) {

        try {
          teqId = tiaEJ.searchAndWrap.byTeq(tEQRef).cmpInfo.constProps.realId;
          if (teqId !== comp.getId()) {
            outArr.push(this.boldIf('TEQ checking error: found Id: ' + teqId, true, '#FF0000'));
          }
        } catch (e) {
          outArr.push(this.boldIf(e.toString(), true, '#FF0000'));
        }

        outArr.push(this.boldIf('(\'' + tEQRef + '\')', true, '#0000FF', '18px'));
      }

      // ==

      if (xtypes.includes('dataview')) {
        this.addRowInfo(extDomEl, comp, outArr);
      }

      outArr.push(this.consts.avgSep);

      // =============

      if (id) {
        outArr.push('id: ' + this.boldGreen(id));
      }

      if (fakeId) {
        outArr.push('fakeId: ' + this.boldGreen(fakeId));
      }

      if (itemId) {
        outArr.push('itemId: ' + this.boldGreen(itemId));
      }

      var reference = comp.getConfig('reference');
      var referenceIndex = null;
      if (reference) {
        outArr.push('reference: ' + this.boldGreen(reference));
        referenceIndex = outArr.length - 1;
      }

      var xtype = comp.getConfig('xtype');
      var isXTypeCustom = !standardXTypesList.includes(xtype);
      var customXTypeCmpCount = 0;
      if (isXTypeCustom) {
        var cmps = Ext.ComponentQuery.query(xtype);
        customXTypeCmpCount = cmps.length;
        if (customXTypeCmpCount === 1) {
          xtype = this.boldIf(xtype, customXTypeCmpCount === 1, '#777700');
        }
      }

      if (customXTypeCmpCount !== 1) {
        xtype = this.boldIf(xtype, true, '#000000');
      }

      outArr.push('xtype: ' + xtype + (isXTypeCustom ? (' * ' + customXTypeCmpCount) : ''));

      // tia.cU.dumpObj(comp, [
      //   { path: 'getConfig()', args: [['xtype']] },
      //   // 'initialConfig.id'
      // ], outArr);

      this.pushTextProp(comp,'name', outArr);
      this.pushTextProp(comp,'text', outArr);
      this.pushTextProp(comp,'tooltip', outArr);
      this.pushTextProp(comp,'title', outArr);
      this.pushTextProp(comp, 'fieldLabel', outArr);
      this.pushTextProp(comp, 'boxLabel', outArr);

      // outArr.push('getConfig(id): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'id'));

      // tia.cU.dumpObj(comp, [
      //   // 'initialConfig.reference',
      //   'getReference()'
      // ], outArr);

      // if (comp.getReference()) {
      //   outArr.push('getReference(): ' + this.boldIf(comp.getReference(), comp.getReference(), 'green'));
      //   outArr = outArr.concat(this.getRefHolderInfo(comp));
      // }

      // outArr.push('getConfig(reference): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'reference'));


      if (initialConfig.referenceHolder) {
        outArr.push(
          'initialConfig.referenceHolder: ' + this.boldIf(
          comp.initialConfig.referenceHolder,
          comp.initialConfig.referenceHolder,
          'orange',
          '20px')
        );
      }

      // tia.cU.dumpObj(comp, [
      //   'initialConfig.itemId',
      //   'getItemId()'
      // ], outArr);

      // outArr.push('getConfig(itemId): ' + tiaEJ.ctByObj.safeGetConfig(comp, 'itemId'));

      outArr.push('');

      tia.cU.dumpObj(comp, [
        'ariaRole',
        '$className',
      ], outArr);

      if (!id) {
        outArr.push('id: ' + comp.getId());
      }

      if (!itemId) {
        outArr.push('itemId: ' + comp.getItemId());
      }

      outArr.push('xtypes: ' + this.boldIf(comp.getXTypes(), true, '#000000'));

      // outArr.push('isPanel:' + comp.isPanel + (comp.isPanel ? ' ! ! ! ! !' : ''));

      var keyMap = Object.keys(comp.keyMap || {});
      keyMap = keyMap.join(', ');

      outArr = outArr.concat([
        '------',
        'keyMap: ' + keyMap,
      ]);

      outArr = outArr.concat([
        '------',
        'Attrs:',
        tiaEJ.ctMisc.getAttributes(comp),
        '------']);

      if (reference) {
        outArr = outArr.concat(this.getRefHolderInfo(comp));
      }

      tia.cU.dumpObj(comp, [
        {path: 'isVisible()', args: [[true]]},
        'isHidden()',
        'isDisabled()',
        'isSuspended()',
        // 'isMasked()',
        'isFocusable()',
        'rendered',
      ], outArr);

      if (comp.isFormField) {
        outArr = outArr.concat(this.getFormFieldInfo(comp));
      } else {
        if (comp.isTableView) {
          outArr = outArr.concat(this.getTableInfo(comp));
        }
      }

      if (extended) {
        tia.cU.dumpObj(comp, [
          'lookupViewModel().$className',
          'lookupSession().$className',
          'items.getCount()',
          'isViewport',
        ], outArr);

        outArr.push('getReferences(): ' + getReferencesStr);

        outArr = outArr.concat(getControllerArr);
        outArr = outArr.concat(lookupControllerArr);
        outArr = outArr.concat(lookupControllerSkipThisArr);
      }
      outArr.push(this.consts.bigSep);
      return outArr;
    },

    getComponentAndParentsInfo: function getComponentAndParentsInfo(comp, extended, extDomEl) {
      if (!comp) {
        return '';
      }
      var outArr = this.getComponentInfo(comp, extended, extDomEl);
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

      window.tel = el;

      if (!el) {
        tiaEJ.showMsgBox('!Ext.dom.Element.fromPoint(x, y)', 'Error');
      }

      var extDomEl = Ext.dom.Element.get(el);
      if (!extDomEl) {
        tiaEJ.showMsgBox('!Ext.dom.Element.get(el)', 'Error');
      }

      var comp = Ext.Component.from(extDomEl);
      if (!comp) {
        tiaEJ.showMsgBox('!Ext.Component.from(extDomEl)', 'Error');
      }

      // console.log('COMP FOUND: ' + comp.getId());

      // boundlist
      //


      // if (comp.isContainer) {
      //   var newComp = null;
      //   comp.cascade(function (curComp) {
      //     if (curComp.isDisabled()) {
      //       var box = curComp.getBox();
      //       if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
      //         newComp = curComp;
      //       }
      //     }
      //     return true;
      //   });
      //   if (newComp) {
      //     comp = newComp;
      //   }
      // }

      // console.log('COMP after box handling: ' + comp.getId());

      if (!comp) {
        tiaEJ.showMsgBox('Error at box handling ', 'Error');
      }

      window.tcmp = comp;

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
      } catch (err) {
        recordStr += this.consts.nA;
        if (tia.debugMode) {
          console.log('Exp exc:' + err);
        }
      }

      if (tia.debugMode) {
        window.c1 = comp;
      }
      var outStr = this.getComponentAndParentsInfo(comp, false, extDomEl).join('\n') + '\n' + recordStr;

      tiaEJ.showMsgBox(outStr, 'Info about a component under mouse cursor');
      // console.log(outStr);
    },
  };
})();
