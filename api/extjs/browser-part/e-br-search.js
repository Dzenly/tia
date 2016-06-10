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

    /**
     * Gets component using id, reference, localization key.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     * @param key - key in locale.
     */
    byIdRefKey: function (id, ref, key) {
      var text = tiaEJ.locale[key];
      return Ext.getCmp(id)
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
      return Ext.getCmp(id).lookupReference(ref);
    },

    tabByIdItemId: function (id, tabItemId) {
      var cmp = Ext.getCmp(id).getTabBar().down('#' + tabItemId);
      return cmp;
    },

    tabByIdText: function (id, text) {
      var items = Ext.getCmp(id).getTabBar().items;
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
