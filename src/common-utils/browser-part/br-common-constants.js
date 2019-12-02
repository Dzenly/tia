(function injectCommonConstants() {
  console.log('TIA: injectCommonConstants');
  window.tia.cC.errPrefix = 'TIAERR: ';
  window.tia.cC.content = {
    colSep: ' | ', // column texts separator
    rowSep: '= = = = = = =',
    rowSep1: '-------------------',
    contentStart: '    /~~~~~~~~\\\n',
    contentFinish: '\n    \\________/\n',
    indent: ' | ',
    title: 'Title: ',
    header: 'Header: ',
    visible: '(Visible)',
    notVisible: '(Not visible)',
    rowBody: '  Row body: ',
    defEmptyCellText: '&#160;',
    qTipAttr: 'data-qtip',
    getVisibility: function getVisibility(cond) {
      return cond ? this.visible : this.notVisible;
    },
    wrap: function wrap(str) {
      return this.contentStart + str + this.contentFinish;
    },
    wrapEx: function wrapEx(indent, str) {
      return indent + this.contentStart + str + indent + this.contentFinish;
    },
  };
}());
