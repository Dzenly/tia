// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';

  window.tiaEJ.ctSelectors = {
    rowBody: '.x-grid-rowbody-tr',
    rowVisibleBody: '.x-grid-rowbody-tr:not(.x-grid-row-body-hidden)'
  };

  window.tiaEJ.ctConsts = {
    sep: ' | ', // column texts separator
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

    checkVisibilityAndFillOptions: function (isVisible, options) {
      if (
        !isVisible && options.throwIfInvisible
      ) {
        throw new Error('Table is invisible');
      }
      options = options || {};
      options.rowRange = options.rowRange || {};

      if (typeof options.rowRange.start === 'undefined') {
        options.rowRange.start = 0;
      }
      if (typeof options.rowRange.end === 'undefined') {
        options.rowRange.end = 1e9;
      }
      return options;
    },

    stringifyRecord: function (record, printFieldName) {
      console.log(record.$className);
      var fields = record.getFields();
      var fieldCount = fields.length;

      var arr = [];

      for (var j = 0; j < fieldCount; j++) {
        var field = fields[j];
        var fieldName = field.getName();
        var fieldValue = record.get(fieldName);
        // var fieldValue = record[fieldName];
        arr.push((printFieldName ?  (fieldName + ': ') : '') + fieldValue);
      }
      return arr.join(', ');
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
     * @param {Number} [options.rowRange.end = 1e9] - row index to end with.
     *
     * @param {Boolean} [options.throwIfInvisible = false] - throw an exception if the table if invisible.
     *
     * @returns {String} - Content of the table (multi-line).
     * @throws {Error} - if the table is invisible and options.throwIfInvisible is true.
     */
    get: function (table, options) {

      var isVisible = table.isVisible(true);

      options = tiaEJ.ctMisc.checkVisibilityAndFillOptions(isVisible, options);

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

      arr.push(tiaEJ.ctConsts.title + title);
      arr.push(tiaEJ.ctConsts.getVisibility(isVisible));
      arr.push(tiaEJ.ctConsts.header + colHeaderTexts.join(tiaEJ.ctConsts.sep));

      var rowIndex = options.rowRange.start;
      var row;
      while ((row = table.getRow(rowIndex)) && rowIndex <= options.rowRange.end) {

        var recordArr = [];

        colSelectors.forEach(function (sel, index) {
          var col = row.querySelector(sel);
          recordArr.push(col.textContent);
        });

        if (recordArr.length) {
          arr.push(recordArr.join(tiaEJ.ctConsts.sep));
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

    getTree: function (table, options) {

      var isVisible = table.isVisible(true);
      options = tiaEJ.ctMisc.checkVisibilityAndFillOptions(isVisible, options);
      var panel = tiaEJ.search.parentPanel(table);
      var root = panel.getRootNode();
      var res = [];

      function traverseSubTree(node, indent) {
        res.push(indent + tiaEJ.ctMisc.stringifyRecord(node, true));
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
    tiaEJ.ctById[fName] = function (id, options) {
      var cmp = Ext.getCmp(id);
      return tiaEJ.ctByObj[fName](cmp, options);
    };
  });

})();
