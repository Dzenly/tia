// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function () {
  'use strict';
  window.tiaEJ.search = {

    /* searches the first parent with isPanel === true */
    parentPanel: function (comp) {
      return comp.findParentBy(function (container) {
        if (container.isPanel) {
          return true;
        }
      });
    },

    byId: function (id) {
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
     * Gets component using id and reference.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     */
    byIdRef: function (id, ref) {
      var cmp = this.byId(id).lookupReferenceHolder().lookupReference(ref);
      if (!cmp) {
        throw new Error('Component not found for container id: ' + id + ', reference: ' + ref);
      }
      return cmp;
    },

    byText: function (cmp, text, searchPathMsg) {
      if (!cmp.items) {
        throw new Error('Component: ' + searchPathMsg + 'has no items');
      }
      var resItem = cmp.items
        .findBy(function (item) {
          return item.text === text;
        });
      if (!resItem) {
        throw new Error('Item not found for ' + searchPathMsg + ', text: ' + text);
      }
      return resItem;
    },

    /**
     * Gets component using id, reference, localization key.
     * @param id - component HTML id.
     * @param ref - reference inside component found by id.
     * @param key - key in locale.
     */
    byIdRefKey: function (id, ref, key) {
      var text = tiaEJ.getTextByLocKey(key);
      var cmp = this.search.byIdRef(id, ref);
      var resItem = this.search.byText(cmp, text, 'container id: ' + id + ', reference: ' + ref);
      return resItem;
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

    byIdCompQuery: function (id, compQuery) {
      var cmp = this.byId(id).down(compQuery);
      if (!cmp) {
        throw new Error('Component not found for container id: ' + id + ', compQuery: ' + compQuery);
      }
      return cmp;
    },

    tabByIdItemId: function (id, tabItemId) {
      var cmp = this.byId(id).getTabBar().down('#' + tabItemId);
      if (!cmp) {
        throw new Error('Tab not found for container id: ' + id + ', itemId: ' + itemId);
      }
      return cmp;
    },

    tabByIdText: function (id, text) {
      var cmp = tiaEJ.search.byId(id);
      if (cmp.isPanel) {
        cmp = cmp.getTabBar();
      }
      var resItem = tiaEJ.search.byText(cmp, text, 'container id: ' + id);
      return resItem;
    },

    tabByIdLocKey: function (id, key) {
      var text = tiaEJ.locale[key];
      return this.tabByIdText(id, text);
    }
  };

  var searchProps = Object.getOwnPropertyNames(tiaEJ.search);

  window.tiaEJ.searchId = {};
  window.tiaEJ.searchFieldId = {};
  window.tiaEJ.searchInputId = {};

  searchProps.forEach(function (fName) {
    tiaEJ.searchId[fName] = function (param1, param2, param3, param4, param5) {
      var cmp = tiaEJ.search[fName](param1, param2, param3, param4, param5);
      return cmp.getId();
    };

    tiaEJ.searchFieldId[fName] = function (param1, param2, param3, param4, param5) {
      var cmp = tiaEJ.search[fName](param1, param2, param3, param4, param5);
      var nameForLog = tiaEJ.ctByObj.getLabelsAndText(cmp);
      return {id: cmp.getId(), nameForLog: nameForLog};
    };

    tiaEJ.searchInputId[fName] = function (param1, param2, param3, param4, param5) {
      var cmp = tiaEJ.search[fName](param1, param2, param3, param4, param5);
      var nameForLog = tiaEJ.ctByObj.getNameAndLabels(cmp, false);
      return {id: cmp.getInputId(), nameForLog: nameForLog};
    };
  });
})();
