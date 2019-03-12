// jscs:ignore
(function setEBrActions() {
  'use strict';

  console.log('TIA: setEBrActions');

  window.tiaEJActs = {

    /**
     * Finds record internalId's.
     * @param {Ext.data.Store} store
     * @param {Object} rowData [[dataIndex, value], [dataIndex, value]]
     * @return {number[]}
     */
    findRecordIds: function findRecordIds(store, rowData) {

      var internalIds = [];

      store.each(function (m) {
        for (var i = 0; i < rowData.length; i++) {
          var item = rowData[i];
          var dataIndex = item[0];
          var value = item[1];
          var fieldValue = m.get(dataIndex);
          if (fieldValue !== value) {
            return true; // To next record.
          }
        }
        internalIds.push(m.internalId);
        return true;
      });

      if (!internalIds.length) {
        throw new Error('Record not found for ' + JSON.stringify(rowData));
      }

      return internalIds;
    },

    /**
     * Record for text for specific field.
     * Only the first found result is used.
     * @param store
     * @param fieldName
     * @param text
     * @return {*}
     */
    findRecord: function findRecord(store, fieldName, text) {
      var m = store.find(fieldName, text);
      if (!m) {
        throw new Error('Text: ' + text + 'no found for fieldName: ' + fieldName);
      }
      return m;
    },

    /**
     * Records for texts for specific field.
     * Only the first found result is used.
     * @param store
     * @param fieldName
     * @param texts
     * @return {Array}
     */
    findRecords: function findRecords(store, fieldName, texts) {
      var records = [];
      texts.forEach(function (text) {
        var m = store.find(fieldName, text);
        if (!m) {
          throw new Error('Text: ' + text + 'no found for fieldName: ' + fieldName);
        }
        records.push(m);
      });
      return records;
    },

    /**
     * Sets table selection by ExtJs API.
     * @param table - table View or table Panel.
     * @param {Object} rowData - fieldName/fieldValue pairs.
     */
    setTableSelection: function setTableSelection(table, rowData) {
      if (table.isPanel) {
        table = table.getView();
      }
      var model = this.findRecord(table.getStore(), rowData);

      table.setSelection(model);
    },

    /**
     * Gets row DOM element, to click by webdriver.
     * @param table
     * @param internalId
     */
    getRowDomId: function getRowDomId(table, internalId) {
      if (table.isPanel) {
        table = table.getView();
      }
      var tableId = table.getId();
      var gridRowid = tableId + '-record-' + internalId;
      return gridRowid;
    },

    getBoundListItem: function getBoundListItem(bl, text) {
      var model = this.findRecord(bl.getStore(), bl.displayField, text);
      var node = bl.getNode(model);
      return node;
    },

    getBoundListItems: function getBoundListItems(bl, texts) {
      var models = this.findRecords(bl.getStore(), bl.displayField, texts);
      var nodes = models.map(function (model) {
        return bl.getNode(model);
      });
      return nodes;
    },

    /**
     * Gets table cell DOM element.
     * @param table
     * @param rowData
     * @param col
     */
    getTableCellByColumnTexts: function getTableCellByColumnTexts(table, cellData) {

      if (table.isPanel) {
        table = table.getView();
      }

      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var text2DataIndex = {};
      var cellSelector = null;

      visColumns.forEach(function (col) {
        var key = col.text || col.tooltip;
        text2DataIndex[key] = col.dataIndex;
        if (key === cellData.column) {
          cellSelector = table.getCellSelector(col);
        }
      });

      var row = cellData.row.slice(0);

      row = row.map(function (tup) {
        tup[0] = text2DataIndex[tup[0]];
        return tup.slice(0);
      });

      var internalIds = this.findRecordIds(table.getStore(), row);

      if (cellData.one && (internalIds.length > 1)) {
        throw new Error('getTableCellByColumnTexts: one is true, but found ' + internalIds.length + ' records.')
      }

      var index = cellData.index || 0;
      var internalId = internalIds[index];
      var rowDomId = this.getRowDomId(table, internalId);

      var rowDom = document.getElementById(rowDomId);
      var cellDom = rowDom.querySelector(cellSelector);

      return cellDom;
    },

    getTableCellByCollTexts1: function getTableCellByCollTexts1(table, cellData) {

      if (table.isPanel) {
        table = table.getView();
      }

      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var foundColumn = visColumns.find(function (column) {
        if (column.dataIndex === colDataIndex) {
          return true;
        }
      });

      if (!foundColumn) {
        throw new Error('No such dataIndex in columns: ' + colDataIndex);
      }

      var cellSelector = table.getCellSelector(foundColumn);

      var tableItemId = this.getItemDomId(table, rowData);

      var itemDom = document.getElementById(tableItemId);

      var cellDom = itemDom.querySelector(cellSelector);

      return cellDom;
    },

  };

})();
