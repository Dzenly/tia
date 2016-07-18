(function () {
  'use strict';

  var container;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    container = exports;
  } else {
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
    getVisibility: function (cond) {
      return cond ? this.visible : this.notVisible;
    },
    wrap: function (str) {
      return this.contentStart + str + this.contentFinish;
    },
    wrapEx: function (indent, str) {
      return indent + this.contentStart + str + indent + this.contentFinish;
    }
  };

})();
