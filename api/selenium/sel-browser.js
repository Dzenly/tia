'use strict';
/* globals gT: true */
/* globals gIn: true */

var fs = require('fs');
var mPath = require('path');

function nextScreenShotPath() {
  var jsPath = gIn.tInfo.data.path;
  var index = String(gIn.tInfo.data.screenShotCounter++);
  if (index.length < 2) {
    index = '0' + index;
  }
  return gIn.textUtils.changeExt(jsPath, '_' + index + '.png');
}

/**
 * Adds a cookie using name and value.
 * @param name
 * @param value
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.addCookie = function (name, value, logAction) {
  return gIn.wrap('Add cookie: "' + name + '": "' + value + '" ... ', logAction, function () {
    return gT.sOrig.driver.manage().addCookie(name, value);
  });
};

/**
 * Adds a cookie using name parameters.
 * @param name
 * @param value
 * @param path
 * @param domain
 * @param isSecure
 * @param expirity
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.addCookieEx = function (name, value, path, domain, isSecure, expirity, logAction) {
  return gIn.wrap('Add cookie ex: "' + name + '": "' + 'a value' + '", "' + path + '", "' + domain + '" ... ',
    logAction, function () {
      return gT.sOrig.driver.manage().addCookie(name, value, path, domain, isSecure, expirity);
    });
};

/**
 * Closes the browser (TODO: or just active tab).
 *
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.close = function (logAction) {
  gT.s.browser.logBrowserConsoleContent();
  return gIn.wrap('Closing the browser .... ', logAction, function () {
    return gT.sOrig.driver.close();
  }, true);
};

/**
 * Deletes specified cookie.
 * @param name
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.deleteCookie = function (name, logAction) {
  return gIn.wrap('Delete cookie: "' + name + '" ... ', logAction, function () {
    return gT.sOrig.driver.manage().deleteCookie(name);
  });
};

exports.get = function (url, logAction) {
  return gIn.wrap('Loading a page with URL: "' + url + '" ... ', logAction, function () {
    url = gIn.textUtils.expandHost(url);
    return gT.sOrig.driver.get(url);
  });
};

// Returns JSON object.
exports.getCookie = function (name, logAction) {
  return gIn.wrap('Get cookie: "' + name + '" ... ', logAction, function () {
    return gT.sOrig.driver.manage().getCookie(name);
  });
};

exports.getUrl = function (logAction) {
  return gIn.wrap('Getting URL ... ', logAction, function () {
    return gT.sOrig.driver.getCurrentUrl().then(function (res) {
      return gIn.textUtils.collapseHost(res);
    });
  });
};

/**
 * Set browser window position.
 *
 * @param x
 * @param y
 * @param logAction
 *
 * @return {Promise}
 */
exports.setWindowPosition = function (x, y, logAction) {
  return gIn.wrap('Set Window Position: (' + x + ', ' + y + ') ... ', logAction, function () {
    return gT.sOrig.driver.manage().window().setPosition(x, y);
  });
};

/**
 * Sets browser window size.
 * @param {Number} width
 * @param {Number} height
 * @param logAction
 *
 * @return {Promise}
 */
exports.setWindowSize = function (width, height, logAction) {
  return gIn.wrap('Set Window Size: (' + width + ', ' + height + ') ... ', logAction, function () {
    return gT.sOrig.driver.manage().window().setSize(width, height);
  });
};

//https://code.google.com/p/selenium/source/browse/javascript/node/selenium-webdriver/test/logging_test.js?spec=svn7720e2ac97b63acc8cfe282d4668f682ba3b6efd&r=7720e2ac97b63acc8cfe282d4668f682ba3b6efd
// Logging API has numerous issues with PhantomJS:
//   - does not support adjusting log levels for type "browser".
//   - does not return proper log level for "browser" messages.
//   - does not delete logs after retrieval

/**
 * Logs browser console content.
 *
 * @returns {Promise.<TResult>}
 */
exports.logBrowserConsoleContent = function () {
  //return gIn.wrap('', false, function() {
  return gT.sOrig.driver.manage().logs().get(gT.sOrig.wdModule.logging.Type.BROWSER).then(
    function (entries) {
      gIn.tracer.trace1('Begin of console Log');
      for (var entry of entries) {
        let logStr = 'BR.CONSOLE: ' + entry.level.name + ': ' +
          gIn.textUtils.collapseHost(gIn.textUtils.removeSelSid(entry.message));
        gIn.logger.logln(logStr);
      }
      gIn.tracer.trace1('End of console Log');
    });
  //});
};

/**
 *
 * @param extAjaxFailures
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
// No log action intentionaly.
exports.cleanExceptions = function (extAjaxFailures, logAction) {
  return gIn.wrap('Cleaning client exceptions: ... ', logAction, function () {
    return gT.sOrig.driver.executeScript('return window.rvtReady').then(
      function (res) {
        if (res) {
          return gT.sOrig.driver.executeScript('rvTestHelper.cleanExceptions(' + extAjaxFailures + ')');
        }
      });
  });
};

/**
 * Cleans up the directory with browser profile.
 * @param logAction
 * @returns {Promise.<TResult>}
 */
exports.cleanProfile = function (logAction) {
  return gIn.wrap('Cleaning profile: "' + gIn.config.profilePath + '" ... ', logAction, function () {
    return gT.sOrig.flow.execute(function () {
      if (gIn.config.profilePath) {
        gIn.fileUtils.emptyDir(mPath.join(gT.engineConfig.profileRoot, gIn.config.profilePath));
      }
    });
  });
};

/* Known issue: Xvfb has bad support for maximize, but does support setWindowSize. */
/* Use this function after waitForAppReady or waitForExtAppReady call to make sure that it works correctly */
exports.maximize = function (logAction) {
  return gIn.wrap('Maximize ... ', logAction, function () {
    if (typeof gT.browser.width !== 'undefined') {
      return gT.sOrig.driver.manage().window().setSize(gT.browser.width, gT.height);
    } else {
      return gT.sOrig.driver.manage().window().maximize();
    }
  });
};

exports.logBrowserExceptions = function (extAjaxFailures, logAction) {
  return gT.sOrig.driver.executeScript('return !!window.rvTestHelper').then(
    function (res) {
      gIn.tracer.trace1('logBrowserExceptions, rvTestHelper is: ' + res);
      if (res) {
        return gT.sOrig.driver.executeScript('return rvTestHelper.getExceptions(' + extAjaxFailures + ')')
          .then(function (arr) {
            for (var str of arr) {
              let logStr = 'BR.EXC: ' + gIn.textUtils.removeSelSid(str);
              gIn.tracer.traceErr(logStr);
              gIn.logger.logln(logStr);
            }
          });
      }
    });
};

exports.screenshot = function (logAction) {
  return gIn.wrap('Screenshot: ', logAction, function () {
    return gT.sOrig.driver.takeScreenshot().then(function (str) {
      if (gIn.tInfo.data.screenShotCounter > 99) {
        // TODO: place the constant to config (but code must be changed also)?
        return gT.sOrig.promise.rejected('Too many screenshoots');
      }
      var shotPath = nextScreenShotPath();
      gT.l.print(shotPath + ' ... ');
      fs.writeFileSync(shotPath, str.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    });
  });
};

/**
 * Runs specified JavaScript in browser.
 *
 * @param {string} scriptStr - JavaScript text to execute.
 * @param {boolean} [logAction] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
exports.executeScript = function (scriptStr, logAction) {
  return gIn.wrap('Script execution ... ', logAction, function () {
    return gT.sOrig.driver.executeScript(scriptStr);
  });
};
