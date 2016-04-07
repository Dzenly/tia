'use strict';
/* globals gT: true */
/* globals gIn: true */

// TODO: Заменить эти проверки ready на ожидание какого-то объекта.
exports.isAppReady = function () {
  return gT.sOrig.driver.executeScript('return !!window.rvTestHelper');
};

exports.isExtAppReady = function () {
  return gT.sOrig.driver.executeScript('return !!window.Ext')
    .then(function (res) {
      if (res) {
        gIn.tracer.trace1('isExtAppReady: Ext found');
        return gT.sOrig.driver.executeScript('return !!window.R && !!initRvTestHelperExt'); //!! for convertation to bool.
      }
    })
    .then(function (res) {
      if (res) {
        gIn.tracer.trace1('isExtAppReady: R, initRvTestHelperExt');
        return gT.sOrig.driver.executeScript('return initRvTestHelperExt()');
      }
    }).then(function (res) {
      gIn.tracer.trace1('initRvTestHelperExt returned: ' + res);
      return res;
    });
};

/**
 *  Waits for R-Vision non ExtJs objects to be ready.
 *  After this, one can start work with R-Vision non-ExtJs application (say, login window).
 *  TODO: move to separate module, probably private one.
 *
 * @param timeout
 * @param logAction
 *
 * @returns {Promise} - waiting result.
 */
exports.waitForAppReady = function (timeout, logAction) {
  return gIn.wrap('Waiting for Ext App Ready ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.rv.isAppReady, timeout).then(
      function () {
        return gT.sOrig.driver.executeScript('return rvTestHelper.getScreenResolution()').then(function (res) {
          // Save resolution to emulate maximize.
          gT.browser.width = res.width;
          gT.height = res.height;
        });
      }
    );
  });
};

/**
 *  Waits for R-Vision ExtJs objects to be ready.
 *  After this, one can start work with ExtJs application.
 *  TODO: move to separate module, probably private one.
 *
 * @param timeout
 * @param logAction
 *
 * @returns {Promise} - waiting result.
 */
exports.waitForExtAppReady = function (timeout, logAction) {
  return gIn.wrap('Waiting for Ext App Ready ... ', logAction, function () {
    return gT.sOrig.driver.wait(gT.rv.isExtAppReady, timeout).then(
      function () {
        return gT.sOrig.driver.executeScript('return rvTestHelper.getScreenResolution()').then(function (res) {
          // Save resolution to emulate maximize.
          gT.browser.width = res.width;
          gT.height = res.height;
          return gT.s.gT.sOrig.driver.sleep(2000, false); // TODO: not very reliable.
        });
      }
    );
  });
};
