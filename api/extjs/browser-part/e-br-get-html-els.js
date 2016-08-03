// jscs:ignore
/* globals tia tiaEJ */
(function () {
  'use strict';

  window.tiaEJ.hEByObj = {

    // Note that for tree only expanded nodes are taking into account.
    getTableItemByIndex: function (table, index) {
      if (table.isPanel) {
        table = table.getView();
      }
      var el = table.getRow(index);
      return el;
    },

    indexOfField: function (comp, fieldValue, fieldName) {
      if (comp.isPanel) {
        comp = comp.getView();
      }
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

    getInputElByFormName: function (form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      return field.inputEl.dom;
    },

    getElByFormName: function (form, name) {
      var field = tiaEJ.search.byFormAndName(form, name);
      return field.getEl().dom;
    },

    getNameAndLabels: function (field) {
      return {name: field.getName(), label: field.getFieldLabel()};
    },

    getInputId: function (field) {
      return field.getInputId();
    },

    isCBPickerVisible: function (cb) {
      var boundList = cb.getPicker();
      return boundList.isVisible(true) && cb.isExpanded && !cb.isDisabled();
    },

    isCBPickerVisibleByFormName: function (form, name) {
      var cb = tiaEJ.search.byFormAndName(form, name);
      var boundList = cb.getPicker();
      return boundList.isVisible(true) && cb.isExpanded && !cb.isDisabled();
    },

    getCBItemByIndex: function (cb, index) {
      var boundList = cb.getPicker();
      if (boundList.isXType('tablepanel')) {
        boundList = boundList.getView();
      }
      window.c3 = boundList;
      var res = boundList.getNode(index);
      if (!res) {
        throw new Error('getCBItemByIndex: can not find node with index: ' + index);
      }
      return res;
    },

    getCBItemByField: function (cb, fieldValue, fieldName) {
      var index = this.indexOfField(cb, fieldValue, fieldName);
      if (index === -1) {
        return null;
      }
      var boundList = cb.getPicker();
      var res = boundList.getNode(index);
      if (!res) {
        throw new Error('getCBItemByField: can not find node with index: ' + index
        + ', fieldName: ' + fieldName
        + ', fieldValue: ' + fieldValue);
      }
      return res;
    },

    getCBItemByFormNameIndex: function (form, name, index) {
      var cb = tiaEJ.search.byFormAndName(form, name);
      return this.getCBItemByIndex(cb, index);
    },

    getCBItemByFormNameField: function (form, name, fieldValue, fieldName) {
      var cb = tiaEJ.search.byFormAndName(form, name);
      return this.getCBItemByField(cb, fieldValue, fieldName);
    },


  };

  // Auto creating hEById object with copy of methods of hEByObj,
  // these methods take id instead of object.
  window.tiaEJ.hEById = {};
  var props = Object.getOwnPropertyNames(tiaEJ.hEByObj);
  props.forEach(function (fName) {
    tiaEJ.hEById[fName] = function (id, param2, param3, param4, param5) {
      var cmp = tiaEJ.search.byId(id);
      return tiaEJ.hEByObj[fName](cmp, param2, param3, param4, param5);
    };
  });
})();
