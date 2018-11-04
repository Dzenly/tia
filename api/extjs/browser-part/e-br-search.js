// jscs:ignore
// TODO: by label, by object data (like linkedItem), form navigations.

(function setEBrSearch() {
  'use strict';

  console.log('TIA: setEBrSearch');

  window.tiaEJ.search = {

    /**
     * Settings for search.
     */
    settings: {
      /**
       * Container relative to which queryFromParent will work.
       * like Container.query in ExtJs.
       */
      parentContainer: null,

      setParentContainer: function setParentContainer(id) {
        this.parentContainer = Ext.getCmp(id);
      },
    },

    /* searches the first parent with isPanel === true */
    parentPanel: function parentPanel(comp) {
      return comp.findParentBy(function (container) {
        if (container.isPanel) {
          return true;
        }
      });
    },

    byId: function byId(id) {
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
    byIdRef: function byIdRef(id, ref) {
      var cmp = this.byId(id).lookupReferenceHolder().lookupReference(ref);
      if (!cmp) {
        throw new Error('Component not found for container id: ' + id + ', reference: ' + ref);
      }
      return cmp;
    },

    byText: function byText(cmp, text, searchPathMsg) {
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
    byIdRefKey: function byIdRefKey(id, ref, key) {
      var text = tiaEJ.getTextByLocKey(key);
      var cmp = this.search.byIdRef(id, ref);
      var resItem = this.search.byText(cmp, text, 'container id: ' + id + ', reference: ' + ref);
      return resItem;
    },

    byFormIdName: function byFormIdName(formId, name) {
      var form = this.byId(formId);
      return form.getForm().findField(name);
    },

    byFormAndName: function byFormAndName(form, name) {
      if (form.isPanel) {
        form = form.getForm();
      }
      var res = form.findField(name);
      if (!res) {
        throw 'Can not find form field with name: ' + name;
      }
      return res;
    },

    /**
     * Search the Component by https://docs.sencha.com/extjs/6.5.3/modern/Ext.ComponentQuery.html#method-query
     * @param {String} selector - substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
     * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
     * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
     * @return {Ext.Component} - component.
     */
    byCompQuery: function byCompQuery(selector) {
      var actualSelector = tiaEJ.replaceAll(selector);
      var cmp = Ext.ComponentQuery.query(actualSelector);

      if (!cmp) {
        throw new Error(
          'Component not found for selector: ' + selector + ' , actualSelector: ' + actualSelector
        );
      }
      return cmp;
    },

    /**
     * Search the Component by https://docs.sencha.com/extjs/6.5.3/modern/Ext.Container.html#method-down
     * @param {String} selector - substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
     * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
     * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
     * @return {Ext.Component} - component.
     */
    byParentAndCompQuery: function byParentAndCompQuery(selector) {
      var actualSelector = tiaEJ.replaceAll(selector);
      var cmp = tiaEJ.settings.parentContainer;
      if (!cmp) {
        throw new Error('You are not set parent container');
      }

      cmp = cmp.down(actualSelector);
      if (!cmp) {
        throw new Error(
          'Component not found for parent container, selector: ' + selector + ' , actualSelector: ' + actualSelector
        );
      }
      return cmp;
    },

    /**
     * Search by container id and selector.
     * https://docs.sencha.com/extjs/6.5.3/modern/Ext.Container.html#method-down
     * @param id - container id.
     * @param {String} selector - substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
     * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
     * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
     */
    byIdCompQuery: function byIdCompQuery(id, selector) {
      var actualSelector = tiaEJ.replaceAll(selector);
      var cmp = this.byId(id).down(actualSelector);
      if (!cmp) {
        throw new Error(
          'Component not found for container id: ' + id + ', selector: ' + selector + ' , actualSelector: ' + actualSelector
        );
      }
      return cmp;
    },

    tabByIdItemId: function tabByIdItemId(id, tabItemId) {
      var cmp = this.byId(id).getTabBar().down('#' + tabItemId);
      if (!cmp) {
        throw new Error('Tab not found for container id: ' + id + ', itemId: ' + itemId);
      }
      return cmp;
    },

    tabByIdText: function tabByIdText(id, text) {
      var cmp = tiaEJ.search.byId(id);
      if (cmp.isPanel) {
        cmp = cmp.getTabBar();
      }
      var resItem = tiaEJ.search.byText(cmp, text, 'container id: ' + id);
      return resItem;
    },

    tabByIdLocKey: function tabByIdLocKey(id, key) {
      var text = tiaEJ.getLocaleValue(key);
      return this.tabByIdText(id, text);
    },
  };

  var searchFuncs = Object
    .getOwnPropertyNames(tiaEJ.search)
    .filter(function (propName) {
      return typeof tiaEJ.search[propName] === 'function';
    });

  window.tiaEJ.searchId = {};

  window.tiaEJ.searchFieldId = {};

  window.tiaEJ.searchInputId = {};

  window.tiaEJ.searchAndWrap = {};

  searchFuncs.forEach(function (funcName) {

    tiaEJ.searchAndWrap[funcName] = function() {
      var cmp = tiaEJ.search[funcName].apply(tiaEJ.search, arguments);
      return tiaEJ.wrapCmp(cmp, arguments, funcName);
    };

    tiaEJ.searchId[funcName] = function () {
      var cmp = tiaEJ.search[funcName].apply(tiaEJ.search, arguments);
      return cmp.getId();
    };

    tiaEJ.searchFieldId[funcName] = function () {
      var cmp = tiaEJ.search[funcName].apply(tiaEJ.search, arguments);
      var nameForLog = tiaEJ.ctByObj.getLabelsAndText(cmp);
      return {id: cmp.getId(), nameForLog: nameForLog};
    };

    tiaEJ.searchInputId[funcName] = function () {
      var cmp = tiaEJ.search[funcName].apply(tiaEJ.search, arguments);
      var nameForLog = tiaEJ.ctByObj.getNameAndLabels(cmp, false);
      return {id: cmp.getInputId(), nameForLog: nameForLog};
    };
  });
})();
