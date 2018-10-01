// jscs:ignore
(function setEBrActs() {
  'use strict';

  console.log('setEBr');
  window.tiaEJ.wrapCmp = function wrapCmp(cmpData, cmp) {

    var funcsWithSelectorAsFirstArg = [
      'byCompQuery',
      'byParentAndCompQuery',
    ];

    cmpData.isComponent = cmp.isComponent;
    cmpData.isContainer = cmp.isContainer;
    cmpData.xtypes = cmp.getXTypes();
    cmpData.xtype = cmp.getXType();
    cmpData.className = cmp.$className;
    cmpData.className1 = cmp.self.getName();
    cmpData.realId = cmp.getId();
    cmpData.fakeId = tiaEJ.idMap.getFakeId(cmpData.cmp.getId());
    cmpData.itemId = cmp.getItemId();
    cmpData.ariaRole = cmp.ariaRole;

    cmpData.el = cmp.getEl().id;

    // el
    // * component,
    // * id
    // * focus()
    // * getId() - автогенерация, если элемента нет.
    // * getValue() - value attribute.
    // * isInputField
    // * isMasked
    // * isSuspended
    // * isFocusable
    // * isVisible
    // * repaint
    // * scroll
    // * scrollIntoView
    // * selectText
    // * selectable
    // * setVisible
    // * show


    // * self.fromPagePoint
    // * fromPoint
    // * get
    // * getAciveElement
    // * getName
    // *

    //

    // el.dom - это можно вернуть и юзать в selenium.


    cmpData.autoGenId = cmp.autoGenId; // TODO: getAutoId()
    //

    if (funcsWithSelectorAsFirstArg.indexOf(cmpData.fName) !== -1) {
      cmpData.selector = arguments[0];
    }

    // Button:
    // menu, getText, tooltip, tooltipType, value, isButton, !!click!!,
    // getEl, getId, getMenu, getText, getValue,   
    //

    return cmpData;

    // TODO: только это надо сделать в серверной части.
    // return {
    //   getLogInfo: function getLogInfo() {
    //     return 'TODO';
    //   },
    //   getFakeId: function getFakeId() {
    //     return 'TODO';
    //   },
    // };
  };
})();
