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

    indexOfField: function (comp, fieldValue, fieldName) {
      fieldName = fieldName ? fieldName : 'name';
      var store = comp.getStore();
      var index = store.findExact(fieldName, fieldValue);
      if (index === -1) {
        return null;
      }
      return index;
    },

    getTableItemByField: function (table, fieldValue, fieldName) {
      var index = this.indexOfField(table, fieldValue, fieldName);
      if (!index) {
        return null;
      }
      return this.getTableItemByIndex(table, index);
    },

    getTableItemByFieldLocKey: function (table, fieldValueKey, fieldName) {
      var index = this.indexOfField(table, tiaEJ.locale[fieldValueKey], fieldName);
      if (!index) {
        return null;
      }
      return this.getTableItemByIndex(table, index);
    },

    getInputEl: function (field) {
      return field.inputEl.dom;
    },

    getNameAndLabel: function (field) {
      return {name: field.getName(), label: field.getFieldLabel()};
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
    },

    getCBItemByField: function (cb, fieldValue, fieldName) {
      var index = this.indexOfField(cb, fieldValue, fieldName);
      if (!index) {
        return null;
      }
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
