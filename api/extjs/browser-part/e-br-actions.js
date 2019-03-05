// jscs:ignore
(function setEBrActions() {
  'use strict';

  console.log('TIA: setEBrActions');

  window.tiaEJActs = {

    /**
     * Finds record.
     * @param {Ext.data.Store} store
     * @param {Object} rowData
     * @return {Ext.data.Model}
     */
    findRecord: function findRecord(store, rowData) {

      var res = null;

      store.findBy(function (record, id) {

        var entries = Object.entries(rowData);
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var fieldName = entry[0];
          var value = entry[1];
          if (record.get(fieldName) !== value) {
            return false;
          }
        }

        res = record;
        return true;
      });

      if (!res) {
        throw new Error('Record not found for ' + JSON.stringify(rowData));
      }

      return res;
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
     * @param rowData
     */
    getItemDomId: function getRowDom(table, rowData) {
      if (table.isPanel) {
        table = table.getView();
      }
      var tableId = table.getId();
      var model = this.findRecord(table.getStore(), rowData);
      var internalId = model.internalId;
      var gridItemId = tableId + '-record-' + internalId;
      return gridItemId;
    },

    /**
     * Gets cell DOM element.
     * @param table
     * @param rowData
     * @param col
     */
    getCellDom: function getColumnDom(table, rowData, colDataIndex) {

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
