/* globals window: true, screen: true, DsgwDwd3: true, tia: true, tiaEJ: true */
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
      if (cleanExtAjaxFailures && tiaEJ) {
        tiaEJ.cleanAjaxFailures();
      }
    },

    getExceptions: function (addExtJsAjaxFailures) {
      var tmp = this.exceptionsArr.concat(
        (addExtJsAjaxFailures && (typeof tiaEJ !== 'undefined')) ? tiaEJ.getAjaxFailures() : []
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
    },

    u : {}, // utility functions, will be added later by other browser javascripts.

    debugMode: false // To print more info about elements (including ExtJs ones).
  };

  //console.log('TestHelper loaded');

  // MDN: When the function returns true, this prevents the firing of the default event handler.
  var onError = function (msg, url, line) {
    tia.exceptionsArr.push('Exception: Msg: ' + msg + ', Url: ' + url + ', Line: ' + line);
    //console.log(msg + ' ' + url + ' ' + line);
  };
  window.onerror = onError;
})();

