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
      var index = store.find(fieldName, text);
      if (index === -1) {
        throw new Error('Text: ' + text + ' not found for fieldName: ' + fieldName);
      }
      return index;
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
        var index = store.find(fieldName, text);
        if (index === -1) {
          throw new Error('Text: ' + text + ' not found for fieldName: ' + fieldName);
        }
        records.push(index);
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
      var index = this.findRecord(bl.getStore(), bl.displayField, text);
      var node = bl.getNode(index);
      return node;
    },

    getTreeListItem: function getTreeListItem(tree, text) {
      var panel = tree.ownerCt;
      var displayField = panel.displayField;
      var index = this.findRecord(tree.getStore(), displayField, text);
      var node = tree.getNode(index);
      return node;
    },

    getBoundListItems: function getBoundListItems(bl, texts) {
      var indexes = this.findRecords(bl.getStore(), bl.displayField, texts);
      var nodes = indexes.map(function (index) {
        return bl.getNode(index);
      });
      return nodes;
    },

    getGroupRoot: function getGroupRoot(tableview, innerText) {
      var nl = tableview.getEl().dom.querySelectorAll('.' + tiaEJ.selectors.tableGroupTitleClass);
      if (!nl.length) {
        throw new Error('getGroupRoot: no groups found for table: ' + tableview.getId());
      }

      var roots = [];
      nl.forEach(function (item) {
        if (item.innerText === innerText) {
          roots.push(item);
        }
      });

      if (!roots.length) {
        throw new Error('getGroupRoot: no group roots found for innerText: ' + innerText);
      }

      if (roots.length > 1) {
        throw new Error('getGroupRoot: many group roots are found for innerText: ' + innerText);
      }

      return roots[0];
    },

    /**
     * Gets table cell DOM element.
     */
    getTableCellByColumnTexts: function getTableCellByColumnTexts(table, cellData) {

      if (table.isPanel) {
        table = table.getView();
      }

      if (typeof cellData.one === 'undefined') {
        cellData.one = true;
      }
      if (typeof cellData.index === 'undefined') {
        cellData.index = 0;
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

      if (!cellSelector) {
        throw new Error('Column ' + cellData.column + ' not found in visible columns');
      }

      var row = cellData.row.slice(0);

      row = row.map(function (tup) {
        var tmpTup = tup.slice(0);
        tmpTup[0] = text2DataIndex[tup[0]];
        if (!tmpTup[0]) {
          throw new Error('getTableCellByColumnTexts: No such column text: ' + tup[0]);
        }
        return tmpTup;
      });

      var internalIds = this.findRecordIds(table.getStore(), row);

      console.log(internalIds);

      if (cellData.one && (internalIds.length > 1)) {
        throw new Error('getTableCellByColumnTexts: one is true, but found ' + internalIds.length + ' records.');
      }

      var internalId = (cellData.index < 0) ? internalIds[internalIds.length + cellData.index] :
        internalIds[cellData.index];
      var rowDomId = this.getRowDomId(table, internalId);

      var rowDom = document.getElementById(rowDomId);
      var cellDom = rowDom.querySelector(cellSelector);

      return cellDom;
    },

    getFirstRowCellByColumnText: function getFirstRowCellByColumnText(table, colText) {
      if (table.isPanel) {
        table = table.getView();
      }
      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var cellSelector = null;

      visColumns.forEach(function (col) {
        if (col.text === colText || col.tooltip === colText) {
          cellSelector = table.getCellSelector(col);
        }
      });

      if (!cellSelector) {
        throw new Error('Column ' + colText + ' not found in visible columns');
      }

      var s = table.getStore();
      var count = s.getCount();
      if (count === 0) {
        throw new Error('Store is empty.');
      }
      var internalId = s.getAt(0).internalId;
      var rowDomId = this.getRowDomId(table, internalId);

      var rowDom = document.getElementById(rowDomId);
      return rowDom.querySelector(cellSelector);
    },

    getLastRowCellByColumnText: function getLastRowCellByColumnText(table, colText) {

      if (table.isPanel) {
        table = table.getView();
      }
      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var cellSelector = null;

      visColumns.forEach(function (col) {
        if (col.text === colText || col.tooltip === colText) {
          cellSelector = table.getCellSelector(col);
        }
      });

      if (!cellSelector) {
        throw new Error('Column ' + colText + ' not found in visible columns');
      }

      var s = table.getStore();
      var count = s.getCount();
      if (count === 0) {
        throw new Error('Store is empty.');
      }
      var internalId = s.getAt(count - 1).internalId;
      var rowDomId = this.getRowDomId(table, internalId);
      var rowDom = document.getElementById(rowDomId);
      return rowDom.querySelector(cellSelector);
    },

    getFirstRowCellByModelField: function getFirstRowCellByModelField(table, fieldName) {
      if (table.isPanel) {
        table = table.getView();
      }
      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var cellSelector = null;

      visColumns.forEach(function (col) {
        if (col.dataIndex === fieldName) {
          cellSelector = table.getCellSelector(col);
        }
      });

      var s = table.getStore();
      var count = s.getCount();
      if (count === 0) {
        throw new Error('Store is empty.');
      }
      var internalId = s.getAt(0).internalId;
      var rowDomId = this.getRowDomId(table, internalId);

      var rowDom = document.getElementById(rowDomId);

      if (!cellSelector) {
        if (!cellData.useRowIfCellAbsent) {
          throw new Error('Field ' + cellData.field + ' not found in visible column dataIndexes');
        }
        return rowDom;
      } else {
        var cellDom = rowDom.querySelector(cellSelector);
        return cellDom;
      }
    },

    getLastRowCellByModelField: function getLastRowCellByModelField(table, fieldName) {

      if (table.isPanel) {
        table = table.getView();
      }
      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var cellSelector = null;

      visColumns.forEach(function (col) {
        if (col.dataIndex === fieldName) {
          cellSelector = table.getCellSelector(col);
        }
      });

      var s = table.getStore();
      var count = s.getCount();
      if (count === 0) {
        throw new Error('Store is empty.');
      }
      var internalId = s.getAt(count - 1).internalId;
      var rowDomId = this.getRowDomId(table, internalId);
      var rowDom = document.getElementById(rowDomId);

      if (!cellSelector) {
        if (!cellData.useRowIfCellAbsent) {
          throw new Error('Field ' + cellData.field + ' not found in visible column dataIndexes');
        }
        return rowDom;
      } else {
        var cellDom = rowDom.querySelector(cellSelector);
        return cellDom;
      }
    },

    getTableCellByModelFields: function getTableCellByModelFields(table, cellData) {
      if (table.isPanel) {
        table = table.getView();
      }

      if (typeof cellData.one === 'undefined') {
        cellData.one = true;
      }
      if (typeof cellData.index === 'undefined') {
        cellData.index = 0;
      }

      var panel = table.ownerGrid;
      var visColumns = panel.getVisibleColumns();
      var cellSelector = null;

      visColumns.forEach(function (col) {
        if (col.dataIndex === cellData.field) {
          cellSelector = table.getCellSelector(col);
        }
      });

      var internalIds = this.findRecordIds(table.getStore(), cellData.row);

      // console.log('internalIds: ', internalIds);

      if (cellData.one && (internalIds.length > 1)) {
        throw new Error('getTableCellByColumnTexts: one is true, but found ' + internalIds.length + ' records.');
      }

      var internalId = (cellData.index < 0) ? internalIds[internalIds.length + cellData.index] :
        internalIds[cellData.index];
      var rowDomId = this.getRowDomId(table, internalId);

      var rowDom = document.getElementById(rowDomId);

      if (!cellSelector) {
        if (!cellData.useRowIfCellAbsent) {
          throw new Error('Field ' + cellData.field + ' not found in visible column dataIndexes');
        }
        return rowDom;
      } else {
        var cellDom = rowDom.querySelector(cellSelector);
        return cellDom;
      }
    },
  };

})();
