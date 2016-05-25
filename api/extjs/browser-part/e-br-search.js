// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';
  // Class to get dynamic id's.
  window.tiaExtJs.search = {

    // Cache to store temporary objects for fast access.
    cache: {},

    clearCache: function () {
      this.cache = {};
    },

    /**
     * Gets component using id, reference, localization key.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     * @param key - key in locale.
     */
    byIdRefKey: function (id, ref, key) {
      var text = tiaExtJs.locale[key];
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
      var text = tiaExtJs.locale[key];
      return this.getTabByIdText(id, text);
    }
  };
})();
