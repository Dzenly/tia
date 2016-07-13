// jscs:ignore
/* globals tia tiaEJ */
(function () {
  'use strict';

  window.tiaEJ.hEByObj = {

    // Note that for tree only expanded nodes are taking into account.
    getTableItemByIndex: function (table, index) {
      var el = table.getRow(index);
      return el;
    },

    getTableItemByField: function (table, fieldValue, fieldName) {
      fieldName = fieldName ? fieldName : 'name';
      var store = table.getStore();
      var index = store.findExact(fieldName, fieldValue);
      if (index === -1) {
        return null;
      }
      return this.getTableItemByIndex(table, index);
    },

    getTableItemByFieldLocKey: function (table, fieldValueKey, fieldName) {
      fieldName = fieldName ? fieldName : 'name';
      var store = table.getStore();
      var index = store.findExact(fieldName, tiaEJ.locale[fieldValueKey]);
      if (index === -1) {
        return null;
      }
      return this.getTableItemByIndex(table, index);
    },

    getInputEl: function (field) {
      return field.inputEl.dom;
    },

    getInputId: function (field) {
      return field.getInputId();
    },

    isCBPickerVisible: function (cb) {
      var boundList = cb.getPicker();
      return boundList.isVisible(true) && cb.isExpanded;
    },

    getCBItemByIndex: function (cb, index) {
      var boundList = cb.getPicker();
      return boundList.getNode(index);
    }

  };

  // Auto creating hEById object with copy of methods of hEByObj,
  // these methods take id instead of object.
  window.tiaEJ.hEById = {};
  var props = Object.getOwnPropertyNames(tiaEJ.hEByObj);
  props.forEach(function (fName) {
    tiaEJ.hEById[fName] = function (id, param2, param3, param4) {
      var cmp = Ext.getCmp(id);
      return tiaEJ.hEByObj[fName](cmp, param2, param3, param4);
    };
  });
})();
