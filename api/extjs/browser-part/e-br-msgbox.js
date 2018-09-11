// jscs:ignore
/* globals tia */
(function setEBrMsgbox() {
  'use strict';

  console.log('setEBrMsgbox');

  // TODO: prompt editor, system cancel menu (chest in right top corner).

  window.tiaEJ.msgBox = {

    getTitle: function getTitle() {
      return Ext.Msg.getTitle();
    },

    getMsg: function getMsg() {
      return Ext.Msg.msg.getEl().dom.innerText;
    },

    getContent: function getContent() {
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

    getButtonCompByItemId: function getButtonCompByItemId(itemId) {
      var button = Ext.Msg.down('button#' + itemId);
      if (!button) {
        throw new Error('Msg box does not contain button with itemId: ' + itemId);
      }
      return button;
    },

    getButtonIdByItemId: function getButtonIdByItemId(itemId) {
      var button = this.getButtonCompByItemId(itemId);
      return {id: button.getId(), nameForLog: button.text};
    },

    getButtonWebElByItemId: function getButtonWebElByItemId(itemId) {
      var button = this.getButtonCompByItemId(itemId);
      return button.getEl().dom;
    }

  };
})();
