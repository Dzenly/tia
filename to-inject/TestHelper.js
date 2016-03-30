/* Test helper for all pages */
(function () {

  var RvTestHelper = {

    exceptionsArr: [],

    //hasExceptions: function() {
    //	return this.exceptionsArr.length > 0;
    //},

    cleanExceptions: function (cleanExtAjaxFailures) {
      this.exceptionsArr = [];
      if (cleanExtAjaxFailures && rvTestHelperExt) {
        rvTestHelperExt.cleanAjaxFailures();
      }
    },

    getExceptions: function (addExtAjaxFailures) {
      var tmp = this.exceptionsArr.concat((addExtAjaxFailures && (typeof rvTestHelperExt !== 'undefined')) ? rvTestHelperExt.getAjaxFailures() : []);
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

  window.rvTestHelper = RvTestHelper;

  // MDN: When the function returns true, this prevents the firing of the default event handler.
  var onError = function (msg, url, line) {
    rvTestHelper.exceptionsArr.push('Exception: Msg: ' + msg + ', Url: ' + url + ', Line: ' + line);
    //console.log(msg + ' ' + url + ' ' + line);
  };
  window.onerror = onError;
})();

