/* globals DsgwDwd3: true, tia: true, tiaEJ: true */
/* Test helper for all pages */
(function setTiaBrHelpers() {
  'use strict';

  console.log('TIA: setTiaBrHelpers');

  window.tia = {

    idle: false,

    isIdle: function isIdle() {
      return this.idle;
    },

    resetIdle: function resetIdle() {
      this.idle = false;
      this.idleReset = true;

      if (window.requestIdleCallback) {
        // noinspection JSAnnotator
        function idleHandler() {
          window.tia.idleReset = false;
          window.tia.idle = true;
        }
        window.requestIdleCallback(idleHandler);
      }
    },

    exceptionsArr: [],

    // hasExceptions: function() {
    //  return this.exceptionsArr.length > 0;
    // },

    cleanExceptions: function cleanExceptions(cleanExtAjaxFailures) {
      this.exceptionsArr = [];
      if (cleanExtAjaxFailures && tiaEJ) {
        tiaEJ.cleanAjaxFailures();
      }
    },

    getExceptions: function getExceptions(addExtJsAjaxFailures) {
      var tmp = this.exceptionsArr.concat(
        (addExtJsAjaxFailures && (typeof tiaEJ !== 'undefined')) ? tiaEJ.getAjaxFailures() : []
      );
      this.cleanExceptions();
      return tmp;
    },

    // For testing purpose.
    issueException: function issueException() {
      setTimeout(function () {
        DsgwDwd3 += 8;
      }, 0);
    },

    getScreenResolution: function getScreenResolution() {
      return {
        width: screen.width,
        height: screen.height,
      };
    },

    cU: {}, // common utility functions, will be added later by other browser javascripts.

    cC: {}, // common constants, will be added later by other browser javascripts.

    debugMode: false, // To print more info about elements (including ExtJs ones).
  };

  // console.log('TestHelper loaded');

  // MDN: When the function returns true, this prevents the firing of the default event handler.
  var onError = function (msg, url, line, col, error) {
    tia.exceptionsArr.push('TIA onerror exception: Msg: ' + msg +
      ', Url: ' + url + ', Line: ' + line + '\ncol: ' + col + ', error: ' + error);
    if (tia.debugMode) {
      console.error(tia.getExceptions());
      if (error && error.stack) {
        console.log(error.stack);
      }
    }
  };
  window.onerror = onError;

  if (!window.requestIdleCallback) {
    setInterval(function () {
      if (window.tia.idleReset) {
        return;
      }
      window.tia.idleReset = false;
      window.tia.idle = true;
    }, 800);
  }

}());

