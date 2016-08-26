// jscs:ignore
/* globals tia */
(function () {
  'use strict';

  // TODO: prompt editor, system cancel menu (chest in right top corner).

  window.tiaEJ.msgBox = {

    getTitle: function () {
      return Ext.Msg.getTitle();
    },

    getMsg: function () {
      return Ext.Msg.msg.getEl().dom.innerText;
    },

    getContent: function () {
      var res = 'title: ' + this.getTitle() + '; msg: ' + this.getMsg();
      var buttons = Ext.Msg.query('button')
        .filter(function (button) {
          return button.isVisible(true);
        })
        .map(function (button) {
          var buttonInfoStr;
          if (button.getText) {
            buttonInfoStr = button.getText();
          } else {
            buttonInfoStr = button.text;
          }
          buttonInfoStr = '( text: ' + buttonInfoStr + ', itemId: ' + button.getItemId() + ' )';
          return buttonInfoStr;
        });

      res += ';\nbuttons info: ' + buttons.join('; ');
      return res;
    },

    getButtonCompByItemId: function (itemId) {
      var button = Ext.Msg.down('button#' + itemId);
      if (!button) {
        throw new Error('Msg box does not contain button with itemId: ' + itemId);
      }
      return button;
    },

    getButtonIdByItemId: function (itemId) {
      var button = this.getButtonCompByItemId(itemId);
      return {id: button.getId(), nameForLog: button.text};
    },

    getButtonWebElByItemId: function (itemId) {
      var button = this.getButtonCompByItemId(itemId);
      return button.getEl().dom;
    }

  };
})();
