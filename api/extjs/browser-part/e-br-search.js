// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';
  // Class to get dynamic id's.
  window.tiaEJ.search = {

    // Cache to store temporary objects for fast access.
    cache: {},

    clearCache: function () {
      this.cache = {};
    },

    /* searches the first parent with isPanel === true */
    parentPanel: function (comp) {
      return comp.findParentBy(function(container) {
        if (container.isPanel) {
          return true;
        }
      });
    },

    byId: function(id) {
      var cmp = Ext.getCmp(id); // good getCmp using.
      if (typeof cmp === 'undefined') {
        var err = new Error('Component not found for id: ' + id);
        throw err;
      }
      if (typeof cmp === null) {
        throw new Error('Class was found instead of component for id: ' + id);
      }
      return cmp;
    },

    /**
     * Gets component using id, reference, localization key.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     * @param key - key in locale.
     */
    byIdRefKey: function (id, ref, key) {
      var text = tiaEJ.locale[key];
      return this.byId(id)
        .lookupReference(ref)
        .items
        .findBy(function (item) {
          return item.text === text;
        });
    },

    /**
     * Gets component using id and reference.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     */
    byIdRef: function (id, ref) {
      return this.byId(id).lookupReference(ref);
    },

    byFormIdName: function (formId, name) {
      var form = this.byId(formId);
      return form.getForm().findField(name);
    },

    byFormAndName: function (form, name) {
      if (form.isPanel) {
        form = form.getForm();
      }
      var res = form.findField(name);
      if (!res) {
        throw 'Can not find form field with name: ' + name;
      }
      return res;
    },

    tabByIdItemId: function (id, tabItemId) {
      var cmp = this.byId(id).getTabBar().down('#' + tabItemId);
      return cmp;
    },

    tabByIdText: function (id, text) {
      var items = this.byId(id).getTabBar().items;
      var cmp = items.findBy(function (item) {
        return item.text === text;
      });
      return cmp;
    },

    tabByIdLocKey: function (id, key) {
      var text = tiaEJ.locale[key];
      return this.getTabByIdText(id, text);
    }
  };
})();
