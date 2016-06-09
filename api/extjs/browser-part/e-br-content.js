// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';

  window.tiaExtJs.ctByObj = {

    /**
     * Gets columns objects for a table.
     * @param {Ext.view.Table} table - the table.
     * @returns {Array} - columns.
     */
    getCols: function (table) {
      var panel = tiaExtJs.search.parentPanel(table);
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

      if (!isVisible && options.throwIfInvisible) {
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

      var sep = ' | '; // TODO: move to some ctConsts ?

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

      arr.push(isVisible ? 'Visible' : 'Not Visible');

      arr.push('Header: ' + colHeaderTexts.join(sep));

      var rowIndex = options.rowRange.start;
      var row;
      while ((row = table.getRow(rowIndex)) && rowIndex <= options.rowRange.end) {

        var recordArr = [];

        colSelectors.forEach(function (sel, index) {
          var col = row.querySelector(sel);
          recordArr.push(col.textContent);
        });

        if (recordArr.length) {
          arr.push(recordArr.join(sep));
        }

        rowIndex++;
      }

      if (arr.length === 0) {
        return null;
      } else {
        return arr.join('\n');
      }
    }
  };

  // Auto creating ctById object with copy of methods of ctByObj,
  // these methods take id instead of Ext.view.Table object.
  window.tiaExtJs.ctById = {};
  var props = Object.getOwnPropertyNames(tiaExtJs.ctByObj);
  props.forEach(function (fName) {
    tiaExtJs.ctById[fName] = function (id, options) {
      var cmp = Ext.getCmp(id);
      return tiaExtJs.ctByObj[fName](cmp, options);
    };
  });

})();
