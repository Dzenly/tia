/* globals window: true, screen: true, DsgwDwd3: true, tia: true, tiaExtJs: true */
/* Test helper for all pages */
(function () {
  'use strict';
  window.tia = {

    exceptionsArr: [],

    //hasExceptions: function() {
    //	return this.exceptionsArr.length > 0;
    //},

    cleanExceptions: function (cleanExtAjaxFailures) {
      this.exceptionsArr = [];
      if (cleanExtAjaxFailures && tiaExtJs) {
        tiaExtJs.cleanAjaxFailures();
      }
    },

    getExceptions: function (addExtJsAjaxFailures) {
      var tmp = this.exceptionsArr.concat(
        (addExtJsAjaxFailures && (typeof tiaExtJs !== 'undefined')) ? tiaExtJs.getAjaxFailures() : []
      );
      this.cleanExceptions();
      return tmp;
    },

    // For testing purpose.
    issueException: function () {
      setTimeout(function () {
        DsgwDwd3 += 8;
      }, 0);
    },

    getScreenResolution: function () {
      return {
        width: screen.width,
        height: screen.height
      };
    }
  };

  //console.log('TestHelper loaded');

  // MDN: When the function returns true, this prevents the firing of the default event handler.
  var onError = function (msg, url, line) {
    tia.exceptionsArr.push('Exception: Msg: ' + msg + ', Url: ' + url + ', Line: ' + line);
    //console.log(msg + ' ' + url + ' ' + line);
  };
  window.onerror = onError;
})();

