// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.
/* globals tia */
(function setEBrContent() {
  'use strict';

  console.log('TIA: setEBrContent');

  window.tiaEJ.ctSelectors = {
    rowBody: '.x-grid-rowbody-tr',
    rowVisibleBody: '.x-grid-rowbody-tr:not(.x-grid-row-body-hidden)',
    cellInnerAction: '.x-grid-cell-inner-action-col',
    actionColIcon: '.x-action-col-icon'
  };

  // window.tiaEJ.content = {
  //   colSep: ' | ', // column texts separator
  //   rowSep: '= = = = = = =',
  //   contentStart: '    /~~~~~~~~\\\n',
  //   contentFinish: '    \\________/\n',
  //   indent: ' | ',
  //   title: 'Title: ',
  //   header: 'Header: ',
  //   visible: '(Visible)',
  //   notVisible: '(Not visible)',
  //   rowBody: '  Row body: ',
  //   getVisibility: function (cond) {
  //     return cond ? this.visible : this.notVisible;
  //   },
  //   wrap: function (str) {
  //     return this.contentStart + str + this.contentFinish;
  //   }
  // };

  window.tiaEJ.ctMisc = {

    /**
     *
     * @param elem
     */
    isHidden: function isHidden(elem) {
      return elem.offsetHeight === 0;
    },

    getAttributes: function getAttributes(compOrEl) {

      var el = compOrEl.isComponent ? compOrEl.getEl() : compOrEl;
      var attrsObj = el.getAttributes();
      var attrsStr = '';
      var excludeArr = ['style', 'tabindex', 'id'];

      Ext.Object.each(attrsObj, function (key, value) {
        if (excludeArr.indexOf(key) === -1) {
          attrsStr += key + ': ' + value + ';';
        }
      });
      return attrsStr;
    },

    getSelectedAttributes: function getSelectedAttributes(domElem, attrArr) {
      var resArr = [];
      attrArr.forEach(function (attrName) {
        var attrVal = domElem.getAttribute(attrName);
        if (attrVal) {
          resArr.push(attrName + ': ' + attrVal);
        }
      });
      return resArr.join(', ');
    },

    // Store must contain at least one record.
    doesStoreContainField: function doesStoreContainField(store, fieldName) {
      var model = store.first();
      if (typeof model.get(fieldName) !== 'undefined') {
        return true;
      }
      return model.getField(fieldName) != null;
    },

    /**
     *
     * @param {HTMLElement} row
     * @param {Boolean} [includeHidden = false]
     * @returns {String}
     */
    getRowBody: function getRowBody(row, includeHidden) {
      var res = [];
      var selector = includeHidden ? tiaEJ.ctSelectors.rowBody : tiaEJ.ctSelectors.rowVisibleBody;
      var rowBodies = row.parentNode.querySelectorAll(selector);
      for (var i = 0, len = rowBodies.length; i < len; i++) {
        var rowBody = rowBodies[i];
        var visInfo = tia.cC.content.getVisibility(!this.isHidden(rowBody));
        res.push(tia.cC.content.rowBody + rowBody.textContent + ' ' + visInfo);
      }

      if (res.length > 0) {
        return res.join('\n');
      }

      return null;
    },

    checkVisibilityAndFillOptions: function checkVisibilityAndFillOptions(isVisible, options, getDefOpts) {

      if (typeof options === 'string') {
        options = JSON.parse(options);
      }

      options = tia.cU.mergeOptions(options, getDefOpts);

      if (
        !isVisible && options.throwIfInvisible
      ) {
        throw new Error('Table is invisible');
      }
      return options;
    },

    /**
     * actually getFields returns not all fields. So these are names for additional fields.
     * @param record
     * @param extraNames
     *
     * @return {Array}
     */
    getAllRecordFieldNames: function(record, extraNames) {
      var fieldNames = record.getFields().map(function (field) {
        return field.getName();
      });

      if (extraNames) {
        fieldNames = fieldNames.concat(extraNames);
      }
      return fieldNames;
    },

    /**
     * @param record
     * @param printFieldName
     * @param extraFieldToPrint - actually getFields returns not all fields. So these are names for additional fields.
     * @return {string}
     */
    stringifyAllRecord: function stringifyAllRecord(record, printFieldName, extraFieldsToPrint) {
      var fieldsToPrint = this.getAllRecordFieldNames(record, extraFieldsToPrint);
      var arr = [];

      fieldsToPrint.forEach(function (fieldName) {
        var fieldValue = record.get(fieldName);
        arr.push((printFieldName ? (fieldName + ': ') : '') + '"' + fieldValue + '"');
      });

      arr.push('\n' + tia.cC.content.rowSep + '\n');
      var propsArr = [
        'entityName',
        'getId()',
        'getIdProperty()',
        'session.$className',
        'store.$className'
      ];
      tia.cU.dumpObj(record, propsArr, arr);

      var index;
      try {
        index = record.store.indexOfId(record.getId());
      } catch (e) {
      }
      arr.push('Index in store: ' + index);
      return arr.join(', ');
    },


    /**
     *
     * @param record
     * @param fieldsToPrint
     * @param printFieldName
     * @return {string}
     */
    stringifyRecord: function stringifyRecord(record, fieldsToPrint, printFieldName) {
      fieldsToPrint = fieldsToPrint ? fieldsToPrint : this.getAllRecordFieldNames(record);
      var fieldCount = fieldsToPrint.length;
      var arr = [];
      for (var i = 0; i < fieldCount; i++) {
        var fieldName = fieldsToPrint[i];
        var fieldValue = tiaEJ.convertTextToFirstLocKey(record.get(fieldName));
        if (fieldName === 'checked' && fieldValue === null) {
          continue;
        }
        if (fieldName !== 'text') {
          arr.push((printFieldName ? (fieldName + ': ') : '') + fieldValue);
        } else {
          arr.push(fieldValue);
        }
      }
      return arr.join(', ');
    },

    /**
     * @param store
     * @param fieldsToPrint
     * @param printFieldName
     * @return {string[]}
     */
    stringifyStore: function stringifyStore(store, fieldsToPrint, printFieldName) {
      var res = ['Store dump (rec.cnt: ' + store.getCount() + '):'];
      for (var i = 0, len = store.getCount(); i < len; i++) {
        var record = store.getAt(i);
        var strRecord = this.stringifyRecord(record, fieldsToPrint, printFieldName);
        res.push(strRecord);
      }
      return res;
    },

    stringifyStoreField: function stringifyStoreField(store, field) {
      return this.stringifyStore(store, [field]);
    },

    // TODO: table -> component.
    fillDebugInfo: function fillDebugInfo(table, arr) {
      if (tia.debugMode) {
        var props = [
          '_renderState',
          'isDisabled()',
          'isHidden()',
          'isFocusable()',
          'isSuspended()',
          'isLayoutSuspended()',
          'isMasked()',
        ];
        var panelProps = [
          '_renderState',
          'isConfiguring',
        ];

        arr.push('Ext.isReady: ' + Ext.isReady);

        // arr.push('Ajax req count: ' + tiaEJ.getActiveAjaxCallsCount());

        arr.push('Ajax isLoading: ' + Ext.Ajax.isLoading());

        arr.push('Table:');
        tia.cU.dumpObj(table, props, arr);

        arr.push('Panel:');
        var panel = tiaEJ.search.parentPanel(table);
        tia.cU.dumpObj(panel, panelProps, arr);
      }
    }
  };

  // This class must contain only methods which receive table objects.
  window.tiaEJ.ctByObj = {

    expandAllGroups: function expandAllGroups(table) {
      Ext.each(table.features, function (feature) {
        if (feature.ftype === 'grouping') {
          feature.expandAll();
        }
      });
    },

    collapseAllGroups: function collapseAllGroups(table) {
      Ext.each(table.features, function (feature) {
        if (feature.ftype === 'grouping') {
          feature.collapseAll();
        }
      });
    },

    expandAllTree: function expandAllTree(tree) {
      var panel = tiaEJ.search.parentPanel(tree);
      panel.expandAll();
    },

    collapseAllTree: function collapseAllTree(tree) {
      var panel = tiaEJ.search.parentPanel(tree);
      panel.collapseAll();
    },

    /**
     * Gets columns objects for a table.
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - columns.
     */
    getCols: function getCols(table) {
      var panel = tiaEJ.search.parentPanel(table);
      var columns = panel.getVisibleColumns();
      return columns;
    },

    /**
     * Gets column selectors for a table.
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - strings with selectors.
     */
    getColSelectors: function getColSelectors(table) {
      var cols = this.getCols(table);
      var selectors = cols.map(function (col) {
        return table.getCellSelector(col);
      });
      return selectors;
    },

    /**
     * Gets texts from a table header
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - texts.
     */
    getColHeaderInfos: function getColHeaderInfos(table) {
      var cols = this.getCols(table);
      var arr = cols.map(function (col) {
        // col.textEl.dom.textContent // slower but more honest.
        // TODO: getConfig().tooltip - проверить.
        var text = col.text;
        if (text === col.emptyCellText) {
          text = '<emptyCellText>';
        }
        var info = col.getConfig('xtype') + ': "' + text + '"';
        var toolTip = col.getConfig().toolTip;
        if (toolTip) {
          info += ', toolTip: ' + toolTip;
        }
        // if (col.items) {
        //   info += ', items: ' + JSON.stringify(col.items);
        // }
        // if (col.getConfig('xtype') === 'actioncolumn') { //
        //   console.dir(col);
        //   window.c2 = col;
        // }
        return info;
      });
      return arr;
    },

    safeGetConfig: function safeGetConfig(comp, cfgName) {
      var res;
      try {
        res = comp.getConfig(cfgName);
      } catch (e) {
        if (tia.debugMode) {
          console.log('safeGetConfig: Expected exception for cfgName: "' + cfgName + '": ' + e);
        }
      }
      return res;
    },

    getIdItemIdReference: function getIdItemIdReference(comp) {
      var id = comp.initialConfig.id;
      var itemId = comp.initialConfig.itemId; //this.safeGetConfig(comp, 'itemId');
      var reference = comp.getReference();
      var str = 'id: ' + id + ', itemId: ' + itemId + ', reference: ' + reference;
      return str;
    },

    getCompDispIdProps: function getCompDispIdProps(comp) {

      var resArr = [];

      var compProps = [
        'text',
        'title',
        'fieldLabel',
        'boxLabel',
        'tooltip',
      ];

      compProps.forEach(function (propName) {
        var val = comp[propName];
        if (val) {
          resArr.push(propName + ': ' + tiaEJ.convertTextToFirstLocKey(val));
        }
      });

      return resArr.join(', ');
    },

    getNameAndLabels: function getNameAndLabels(field, noName) {
      var resArr = [];
      if (!noName && field.getName && field.getName()) {
        resArr.push('name: ' + field.getName());
      }
      if (field.getFieldLabel && field.getFieldLabel()) {
        resArr.push('label: ' + tiaEJ.convertTextToFirstLocKey(field.getFieldLabel()));
      }
      if (field.boxLabel) {
        resArr.push('boxLabel: ' + tiaEJ.convertTextToFirstLocKey(field.boxLabel));
      }
      return resArr.join(', ');
    },

    getLabelsAndText: function getLabelsAndText(field) {
      var resArr = [];
      if (field.getFieldLabel && field.getFieldLabel()) {
        resArr.push('label: ' + field.getFieldLabel());
      }
      if (field.boxLabel) {
        resArr.push('boxLabel: ' + field.boxLabel);
      }
      if (field.getText) {
        resArr.push('text: ' + field.getText());
      } else if (field.text) {
        resArr.push('text: ' + field.text);
      }
      return resArr.join(', ');
    },

    getFormFieldEnabledDisabledInfo: function getFormFieldEnabledDisabledInfo(form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      var res = this.getNameAndLabels(field, true);
      res += ', ' + (field.isDisabled() ? 'disabled' : 'enabled');
      return res;
    },

    getFormFieldRawValue: function getFormFieldRawValue(form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      return field.getRawValue();
    },

    isFormFieldDisabled: function isFormFieldDisabled(form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      return field.isDisabled();
    },

    getFormFieldShortInfo: function getFormFieldShortInfo(form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      var res = this.getNameAndLabels(field, true);
      res += ', ' + (field.isDisabled() ? 'disabled' : 'enabled');
      res += ', ' + 'rawValue: ' + field.getRawValue();
      return res;
    },

    getCBSelectedVals: function getCBSelectedVals(cb) {
      var rawVal = cb.getRawValue();
      var multiSelect = cb.getConfig('multiSelect');
      var delimiter = cb.getDelimiter();

      var selected;
      if (multiSelect) {
        var arr = rawVal.split(delimiter);
        selected = arr.map(function(val) {
          return tiaEJ.convertTextToFirstLocKey(val);
        }).join(', ');
      } else {
        selected = tiaEJ.convertTextToFirstLocKey(rawVal);
      }
      return selected;
    },

    /**
     * Gets text from a ComboBox
     * @param cb
     * @returns {*}
     */
    getCB: function getCB(cb) {
      var str = '';
      // str += this.getIdItemIdReference(cb) + '\n';
      str += this.getCompDispIdProps(cb) + '\n';

      str += 'Selected vals: \'' + this.getCBSelectedVals(cb) + '\'\n';

      var displayField = this.safeGetConfig(cb, 'displayField');
      // str += 'displayField: ' + displayField + '\n';
      str += tiaEJ.ctMisc.stringifyStoreField(cb.getStore(), displayField).join('\n') + '\n';
      return tia.cC.content.wrap(str);
    },

    getSelectedItemTexts: function getSelectedItemTexts(view) {
      var nodes = view.getSelectedNodes();
      var texts = nodes.map(function (node) {
        return node.innerText;
      });
      return tia.cC.content.wrap(texts.join('\n'));
    },

    getSelectedItemFields: function getSelectedItemFields(view, fieldsToPrint, printFieldName) {
      var nodes = view.getSelectedNodes();
      var texts = nodes.map(function (node) {
        var record = view.getRecord(node);
        return tiaEJ.ctMisc.stringifyRecord(record, fieldsToPrint, printFieldName);
      });
      return tia.cC.content.wrap(texts.join('\n') + '\n');
    },

    isCompVisible: function isCompVisible(comp) {
      var visible = comp.isVisible(true);
      var notHidden = !comp.isHidden();
      return visible && notHidden;
    },

    isCompAccessible: function isCompAccessible(comp) {
      var notDisabled = !comp.isDisabled();
      var notMasked = !comp.isMasked(true);
      var notSuspended = !comp.isSuspended(true);
      return this.isCompVisible() && notDisabled && notMasked && notSuspended;
    },

    /**
     * Not very useful. Because it is hard for user, to check values in log.
     * @param form - Ext.form.Panel
     * @returns {Object} - Object with key/value pairs.
     */
    getFormSubmitValues: function getFormSubmitValues(form) {
      var fields = form.getValues(false, false, false, false);
      return fields; // O
    },

    /**
     *
     * @param comp
     * @param includingStores - use true to just include store and print displayField,
     * 1 - to print only displayField, name and text fields (if exist)
     * and 2 to force store printing all fields.
     * @param indent
     * @returns {*}
     */
    getFormChild: function getFormChild(comp, includingStores, indent) {
      if (typeof indent === 'undefined') {
        indent = '';
      }
      if (!tiaEJ.ctByObj.isCompVisible(comp)) {
        return '';
      }
      var str = indent;
      var strArr = [];

      tia.cU.dumpObj(comp, [
        { path: 'getConfig()', args: [['xtype']], alias: 'xtype' },
      ], strArr, tia.cU.dumpObjErrMode.omitStringIfUndefined);

      tiaEJ.funcResultToLocale(strArr, comp, 'getFieldLabel', 'label');
      tiaEJ.propToLocale(strArr, comp, 'boxLabel');
      tiaEJ.propToLocale(strArr, comp, 'title');
      tiaEJ.funcResultToLocale(strArr, comp, 'getText', 'text');

      tia.cU.dumpObj(comp, [
        { path: 'getRawValue()', alias: 'value' , quotes: true },
        { path: 'getName()', alias: 'name' },
      ], strArr, tia.cU.dumpObjErrMode.omitStringIfUndefined);

      str += strArr.join(', ');

      if (comp.isDisabled && comp.isDisabled()) {
        str += ', disabled';
      }
      str += '\n';

      if (includingStores) {
        var store = comp.getStore ? comp.getStore() : null;
        if (store) {
          var displayField = this.safeGetConfig(comp, 'displayField');

          if (includingStores === 2) {
            str += tiaEJ.ctMisc.stringifyStore(store, null, true).map(function (arrStr) {
                return indent + arrStr;
              }).join('\n') + '\n';
          } else if (includingStores === 1) {
            var fieldsToPrintArr = [];
            if (displayField && tiaEJ.ctMisc.doesStoreContainField(store, displayField)) {
              fieldsToPrintArr.push(displayField);
            }
            if (tiaEJ.ctMisc.doesStoreContainField(store, 'name')) {
              fieldsToPrintArr.push('name');
            }
            if (tiaEJ.ctMisc.doesStoreContainField(store, 'text')) {
              fieldsToPrintArr.push('text');
            }
            str += tiaEJ.ctMisc.stringifyStore(store, fieldsToPrintArr, true).map(function (arrStr) {
                return indent + arrStr;
              }).join('\n') + '\n';
          } else {
            str += indent + 'Field content: (displayField: ' + displayField + ')\n';
            if (tiaEJ.ctMisc.doesStoreContainField(store, displayField)) {
              str += tiaEJ.ctMisc.stringifyStore(store, [displayField], true).map(function (arrStr) {
                  return indent + arrStr;
                }).join('\n') + '\n';
            } else {
              str += indent + 'N/A: No displayField in store\n';
            }
          }
        }
      }
      if (comp.items) {
        var self = this;
        comp.items.each(function (item) {
          str += self.getFormChild(item, includingStores, indent + '  ');
        })
      }
      return str + indent + tia.cC.content.rowSep1 + '\n';// tia.cC.content.wrapEx(indent, str);
    },

    getForm: function getForm(form, includingStores) {
      var str = '';
      if (form.items) {
        var self = this;
        form.items.each(function (item) {
          str += self.getFormChild(item, includingStores);
        })
      }
      return str;
    },

    getFormChildByFormName: function getFormChildByFormName(form, name, includingStores) {
      var comp = tiaEJ.search.byFormAndName(form, name);
      return this.getFormChild(comp, includingStores);
    },

    getFormChildrenByFormNames: function getFormChildrenByFormNames(form, names, includingStores) {
      if (typeof names === 'string') {
        names = JSON.parse(names);
      }
      var self = this;
      return names.map(function (name) {
        var comp = tiaEJ.search.byFormAndName(form, name);
        return self.getFormChild(comp, includingStores);
      });
    },

    getFormFieldError: function getFormFieldError(comp) {
      return comp.getActiveError();
    },

    getFormFieldErrorByFormName: function getFormFieldErrorByFormName(form, name) {
      var comp = tiaEJ.search.byFormAndName(form, name);
      console.log(comp.getActiveError());
      return comp.getActiveError();
    },

    /**
     * Gets the entire table content. Only visible columns are returned.
     * Collapsed groups are excluded from result.
     * Rows and columns which are hidden but can be achieved by scrolling are included.
     * @param {Ext.view.Table} table - the table.
     *
     * @param {Object} [options]
     *
     * @param {Array} [options.includeColumns] - visible columns indexes to include.
     * Note: Also determines the order of result columns.
     * Note: By default all visible columns are included.
     *
     * @param {Object} [options.rowRange] - rows to include to result (inclusively).
     * @param {Number} [options.rowRange.start = 0] - row index to start from.
     * @param {Number} [options.rowRange.stop = 1e9] - row index to end with.
     *
     * @param {Boolean} [options.throwIfInvisible = false] - throw an exception if the table if invisible.
     *
     * @returns {String} - Content of the table (multi-line).
     * @throws {Error} - if the table is invisible and options.throwIfInvisible is true.
     * TODO: make id printing optional.
     */
    getTable: function getTable(table, options) {

      if (table.isPanel) {
        table = table.getView();
      }

      var isVisible = table.isVisible(true);

      function getDefOpts() {
        return {
          throwIfInvisible: false,
          rowRange: {
            start: 0,
            stop: 1e9
          }
        };
      }

      options = tiaEJ.ctMisc.checkVisibilityAndFillOptions(isVisible, options, getDefOpts);

      var origCols = this.getCols(table);
      var origColHeaderInfo = this.getColHeaderInfos(table);

      var cols = [];
      var colHeaderInfos = [];

      if (options.includeColumns) {
        options.includeColumns.forEach(function (indexOfColumn) {
          cols.push(origCols[indexOfColumn]);
          colHeaderInfos.push(origColHeaderInfo[indexOfColumn]);
        });
      } else {
        cols = origCols;
        colHeaderInfos = origColHeaderInfo;
      }

      var arr = [];
      var title = this.getParentTitle(table);

      // tiaEJ.ctMisc.fillDebugInfo(table, arr);

      arr.push(tia.cC.content.title + title);
      arr.push(tia.cC.content.getVisibility(isVisible));
      arr.push(tia.cC.content.header + colHeaderInfos.join(tia.cC.content.colSep));

      var rowIndex = options.rowRange.start;
      var row;
      while ((row = table.getRow(rowIndex)) && rowIndex <= options.rowRange.stop) {

        var textsArr = [];

        var record = table.getRecord(row);
        var id = record.get('id');

        cols.forEach(function (extCol, index) {
          var sel = table.getCellSelector(extCol);
          var domCol = row.querySelector(sel);

          var images = domCol.querySelectorAll('img');
          var imgSrcs = '';
          if (images.length) {
            images = Array.from(images);
            imgSrcs = images.map(function(img) {
              // TODO: Replace to user readable image description.
              // Especially for base64 strings.
              return img.src;
            });
            imgSrcs = ' Image sources: ' + imgSrcs.join(',');
          }

          var textContent = domCol.textContent;
          if (textContent === extCol.emptyCellText) {
            textContent = '<emptyCellText>';
          }

          if (extCol.getConfig('xtype') === 'actioncolumn') {

            var actArr = [
              '\n------',
              'Actions info: '
            ];

            var actInner = domCol.querySelector(tiaEJ.ctSelectors.cellInnerAction);
            if (actInner) {
              var icons = actInner.querySelectorAll(tiaEJ.ctSelectors.actionColIcon);
              for (var i = 0, len = icons.length; i < len; i++) {
                var icon = icons[i];
                var style = icon.getAttribute('style');
                var displayNone = Boolean(style.match(/display\s*:\s*none/));
                if (!displayNone) {

                  var classValue = icon.getAttribute('class');
                  var classValueArr = classValue.split(/\s+/);
                  classValueArr = classValueArr.filter(function (el) {
                    if (el.indexOf('x-action-col') === -1) {
                      return true;
                    }
                    return false;
                  });
                  var iconInfoStr = 'Tag: ' + icon.nodeName + ', ' + tiaEJ.ctMisc.getSelectedAttributes(icon, [
                      'role',
                      // 'src',
                      'title',
                      'alt',
                      tia.cC.content.qTipAttr
                    ]);

                  iconInfoStr += ', classes: ' + classValueArr.join(' ');
                  actArr.push(iconInfoStr);
                }
              }
            }
            actArr.push('------');
            textContent += actArr.join('\n');
          }
          textsArr.push(textContent + imgSrcs);
        });

        var idSuffix = '';

        if (id) {
          idSuffix = ' (id: ' + id + ')';
        }

        if (textsArr.length) {
          arr.push(textsArr.join(tia.cC.content.colSep) + idSuffix);
        }

        var rowBody = tiaEJ.ctMisc.getRowBody(row, true);
        if (rowBody) {
          arr.push(rowBody);
        }
        rowIndex++;
      }

      if (arr.length === 0) {
        return null;
      } else {
        return tia.cC.content.wrap('Table content: \n' + arr.join('\n') + '\n');
      }
    },

    /**
     * Gets entire tree content.
     * Collapsed nodes are also included in results.
     *
     * @param table
     * @param options
     * @returns {string}
     */
    getTree: function getTree(table, options) {

      if (table.isPanel) {
        table = table.getView();
      }

      function getDefOpts() {
        return {
          throwIfInvisible: false,
          allFields: false
        };
      }

      var isVisible = table.isVisible(true);
      options = tiaEJ.ctMisc.checkVisibilityAndFillOptions(isVisible, options, getDefOpts);
      var panel = tiaEJ.search.parentPanel(table);
      var root = panel.getRootNode();
      var res = [];

      function traverseSubTree(node, indent) {

        var fieldsToPrint = ['text', 'checked', 'id'];

        if (tia.debugMode) {
          fieldsToPrint = [
            'text',
            'checked',
            'id',
            'visible',
            'expanded',
            'leaf',
            'expandable',
            'index',
            'depth',
            'qtip',
            'qtitle',
            'cls'
          ];
        }

        if (options.allFields) {
          res.push(indent + tiaEJ.ctMisc.stringifyAllRecord(node, fieldsToPrint, true));
        } else {
          res.push(indent + tiaEJ.ctMisc.stringifyRecord(node, fieldsToPrint, true));
        }

        if (node.hasChildNodes()) {
          indent += tia.cC.content.indent;
          node.eachChild(function (curNode) {
            traverseSubTree(curNode, indent);
          });
        }
      }

      traverseSubTree(root, '');

      return tia.cC.content.wrap('Tree content: \n' + res.join('\n') + '\n');

    },

    /**
     * Gets title of a parent panel.
     * @param {Ext.view.Table} table - the table.
     */
    getParentTitle: function getParentTitle(table) {
      var panel = tiaEJ.search.parentPanel(table);
      return panel.getTitle();
    }
  };

  // Auto creating ctById object with copy of methods of ctByObj,
  // these methods take id instead of Ext.view.Table object.

  var ctByObjProps = Object.getOwnPropertyNames(tiaEJ.ctByObj);

  window.tiaEJ.ctById = {};
  window.tiaEJ.ctByContIdAndDownQuery = {};

  ctByObjProps.forEach(function (fName) {
    tiaEJ.ctById[fName] = function (id, param2, param3, param4) {
      var cmp = tiaEJ.search.byId(id);
      return tiaEJ.ctByObj[fName](cmp, param2, param3, param4);
    };

    // TODO: Check if this is needed indeed?
    tiaEJ.ctByContIdAndDownQuery[fName] = function (contId, queryStr, param2, param3, param4) {
      var cont = tiaEJ.search.byId(contId);
      var cmp = cont.down(queryStr);
      if (cmp === null) {
        throw new Error('ctByContIdAndDownQuery: Component not found container id: ' + contId
        + ', down("' + queryStr + '"');
      }
      return tiaEJ.ctByObj[fName](cmp, param2, param3, param4);
    };

  });
})();
