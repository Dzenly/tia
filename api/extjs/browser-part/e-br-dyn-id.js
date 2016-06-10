// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';
  // Class to get dynamic id's.
  window.tiaEJ.dynId = {
    /**
     * Gets dynamic id using id, reference, localization key.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     * @param key - key in locale.
     */
    getByIdRefKey: function (id, ref, key) {
      var text = tiaEJ.locale[key];
      return Ext.getCmp(id)
        .lookupReference(ref)
        .items
        .findBy(function (item) {
          return item.text === text;
        }).id;
    },

    /**
     * Gets dynamic id using id and reference.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     */
    getByIdRef: function (id, ref) {
      return Ext.getCmp(id).lookupReference(ref).id;
    },

    getTabIdByIdItemId: function (id, tabItemId) {
      var cmp = Ext.getCmp(id).getTabBar().down('#' + tabItemId);
      var res = cmp ? cmp.getId() : null;
      return res;
    },

    getTabIdByIdLocKey: function (id, key) {
      var text = tiaEJ.locale[key];
      return this.getTabIdByIdText(id, text);
    },

    getTabIdByIdText: function (id, text) {
      var items = Ext.getCmp(id).getTabBar().items;
      var cmp = items.findBy(function (item) {
        return item.text === text;
      });
      var res = cmp ? cmp.getId() : null;
      return res;
    }
  };
})();
