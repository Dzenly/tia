/* global window */
(function injectCommonConstants() {
  'use strict';

  let container;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    container = exports;
  } else {
    console.log('TIA: injectCommonConstants');
    container = window.tia.cC;
  }

  container.content = {
    colSep: ' | ', // column texts separator
    rowSep: '= = = = = = =',
    rowSep1: '-------------------',
    contentStart: '    /~~~~~~~~\\\n',
    contentFinish: '    \\________/\n',
    indent: ' | ',
    title: 'Title: ',
    header: 'Header: ',
    visible: '(Visible)',
    notVisible: '(Not visible)',
    rowBody: '  Row body: ',
    defEmptyCellText: '&#160;',
    qTipAttr: 'data-qtip',
    getVisibility(cond) {
      return cond ? this.visible : this.notVisible;
    },
    wrap(str) {
      return this.contentStart + str + this.contentFinish;
    },
    wrapEx(indent, str) {
      return indent + this.contentStart + str + indent + this.contentFinish;
    },
  };
}());
