// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.
/* globals tia */
(function () {
  'use strict';

  window.tiaEJ.ctSelectors = {
    rowBody: '.x-grid-rowbody-tr',
    rowVisibleBody: '.x-grid-rowbody-tr:not(.x-grid-row-body-hidden)'
  };

  window.tiaEJ.ctConsts = {
    colSep: ' | ', // column texts separator
    indent: ' | ',
    title: 'Title: ',
    header: 'Header: ',
    visible: '(Visible)',
    notVisible: '(Not visible)',
    rowBody: '  Row body: ',
    getVisibility: function (cond) {
      return cond ? this.visible : this.notVisible;
    }
  };

  window.tiaEJ.ctMisc = {

    /**
     *
     * @param elem
     */
    isHidden: function (elem) {
      return elem.offsetHeight === 0;
    },

    getAttributes: function(compOrEl) {

      var el = compOrEl.isComponent ? compOrEl.getEl() : compOrEl;
      var attrsObj = el.getAttributes();
      var attrsStr = '';
      var excludeArr = ['style', 'tabindex', 'id'];

      Ext.Object.each(attrsObj, function (key, value) {
        if (excludeArr.indexOf(key) === -1) {
          attrsStr += key + ': ' + value + '\n';
        }
      });
      return attrsStr;
    },

    /**
     *
     * @param {HTMLElement} row
     * @param {Boolean} [includeHidden = false]
     * @returns {String}
     */
    getRowBody: function (row, includeHidden) {
      var res = [];
      var selector = includeHidden ? tiaEJ.ctSelectors.rowBody : tiaEJ.ctSelectors.rowVisibleBody;
      var rowBodies = row.parentNode.querySelectorAll(selector);
      for (var i = 0, len = rowBodies.length; i < len; i++) {
        var rowBody = rowBodies[i];
        var visInfo = tiaEJ.ctConsts.getVisibility(!this.isHidden(rowBody));
        res.push(tiaEJ.ctConsts.rowBody + rowBody.textContent + ' ' + visInfo);
      }

      if (res.length > 0) {
        return res.join('\n');
      }

      return null;
    },

    checkVisibilityAndFillOptions: function (isVisible, options, getDefOpts) {

      if (typeof options === 'string') {
        options = JSON.parse(options);
      }

      options = tia.u.mergeOptions(options, getDefOpts);

      if (
        !isVisible && options.throwIfInvisible
      ) {
        throw new Error('Table is invisible');
      }
      return options;
    },

    stringifyAllRecord: function (record, printFieldName) {
      var fieldsToPrint = record.getFields();
      var fieldCount = fieldsToPrint.length;
      var arr = [];
      for (var i = 0; i < fieldCount; i++) {
        var field = fieldsToPrint[i];
        var fieldName = field.getName();
        var fieldValue = record.get(fieldName);
        arr.push((printFieldName ? (fieldName + ': ') : '') + '"' + fieldValue + '"');
      }
      return arr.join(', ');
    },

    stringifyRecord: function (record, fieldsToPrint, printFieldName) {
      var fieldCount = fieldsToPrint.length;
      var arr = [];
      for (var i = 0; i < fieldCount; i++) {
        var fieldName = fieldsToPrint[i];
        var fieldValue = record.get(fieldName);
        if (fieldName === 'checked' && fieldValue === null) {
          continue;
        }
        if (fieldName !== 'text') {
          arr.push((printFieldName ? (fieldName + ': ') : '')  + '"' + fieldValue + '"');
        } else {
          arr.push('"' + fieldValue + '"');
        }
      }
      return arr.join(', ');
    },

    // TODO: table -> component.
    fillDebugInfo: function (table, arr) {
      if (tia.debugMode) {
        var props = [
          '_renderState',
          'isDisabled()',
          'isHidden()',
          'isFocusable()',
          'isSuspended()',
          'isLayoutSuspended()',
          'isMasked()'
        ];
        var panelProps = [
          '_renderState',
          'isConfiguring'
        ];

        arr.push('Ext.isReady: ' + Ext.isReady);

        // arr.push('Ajax req count: ' + tiaEJ.getActiveAjaxCallsCount());

        arr.push('Ajax isLoading: ' + Ext.Ajax.isLoading());

        arr.push('Table:');
        tia.u.dumpObj(table, props, arr);

        arr.push('Panel:');
        var panel = tiaEJ.search.parentPanel(table);
        tia.u.dumpObj(panel, panelProps, arr);
      }
    }
  };

  // This class must contain only methods which receive table objects.
  window.tiaEJ.ctByObj = {

    expandAllGroups: function (table) {
      Ext.each(table.features, function (feature) {
        if (feature.ftype === 'grouping') {
          feature.expandAll();
        }
      });
    },

    collapseAllGroups: function (table) {
      Ext.each(table.features, function (feature) {
        if (feature.ftype === 'grouping') {
          feature.collapseAll();
        }
      });
    },

    /**
     * Gets columns objects for a table.
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - columns.
     */
    getCols: function (table) {
      var panel = tiaEJ.search.parentPanel(table);
      var columns = panel.getVisibleColumns();
      return columns;
    },

    /**
     * Gets column selectors for a table.
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - strings with selectors.
     */
    getColSelectors: function (table) {
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
    getColHeaderTexts: function (table) {
      var cols = this.getCols(table);
      var texts = cols.map(function (col) {
        return col.textEl.dom.textContent;
      });
      return texts;
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
     */
    get: function (table, options) {

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

      var origColSelectors = this.getColSelectors(table);
      var origColHeaderTexts = this.getColHeaderTexts(table);

      var colSelectors = [];
      var colHeaderTexts = [];

      if (options.includeColumns) {
        options.includeColumns.forEach(function (indexOfColumn) {
          colSelectors.push(origColSelectors[indexOfColumn]);
          colHeaderTexts.push(origColHeaderTexts[indexOfColumn]);
        });
      } else {
        colSelectors = origColSelectors;
        colHeaderTexts = origColHeaderTexts;
      }

      var arr = [];
      var title = this.getParentTitle(table);

      tiaEJ.ctMisc.fillDebugInfo(table, arr);

      arr.push(tiaEJ.ctConsts.title + title);
      arr.push(tiaEJ.ctConsts.getVisibility(isVisible));
      arr.push(tiaEJ.ctConsts.header + colHeaderTexts.join(tiaEJ.ctConsts.colSep));

      var rowIndex = options.rowRange.start;
      var row;
      while ((row = table.getRow(rowIndex)) && rowIndex <= options.rowRange.stop) {

        var textsArr = [];

        var record = table.getRecord(row);
        var id = record.get('id');

        colSelectors.forEach(function (sel, index) {
          var col = row.querySelector(sel);
          textsArr.push(col.textContent);
        });

        var idSuffix = '';

        if (id) {
          idSuffix = ' (id: ' + id + ')';
        }

        if (textsArr.length) {
          arr.push(textsArr.join(tiaEJ.ctConsts.colSep) + idSuffix);
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
        return arr.join('\n');
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
    getTree: function (table, options) {

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
          indent += tiaEJ.ctConsts.indent;
          node.eachChild(function (curNode) {
            traverseSubTree(curNode, indent);
          });
        }
      }

      traverseSubTree(root, '');

      return res.join('\n');

    },

    /**
     * Gets title of a parent panel.
     * @param {Ext.view.Table} table - the table.
     */
    getParentTitle: function (table) {
      var panel = tiaEJ.search.parentPanel(table);
      return panel.getTitle();
    }
  };

  // Auto creating ctById object with copy of methods of ctByObj,
  // these methods take id instead of Ext.view.Table object.
  window.tiaEJ.ctById = {};
  var props = Object.getOwnPropertyNames(tiaEJ.ctByObj);
  props.forEach(function (fName) {
    tiaEJ.ctById[fName] = function (id, param2, param3, param4) {
      var cmp = Ext.getCmp(id);
      return tiaEJ.ctByObj[fName](cmp, param2, param3, param4);
    };
  });

})();
