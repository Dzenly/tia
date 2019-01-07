'use strict';

/* globals gT: true */
/* globals gIn: true */

const fs = require('fs');
const mPath = require('path');
const Bluebird = require('bluebird');

function nextScreenShotPath() {
  const jsPath = gIn.tInfo.data.path;
  let index = String(gIn.tInfo.data.screenShotCounter++);
  if (index.length < 2) {
    index = `0${index}`;
  }
  return gIn.textUtils.changeExt(jsPath, `_${index}.png`);
}

// for gT.e.initTiaExtJsBrHelpers
const brHelpers = ['tia-br-helpers.js'];

const commonUtils = ['common-constants.js', 'common-misc-utils.js'];

/**
 * Initializes TIA browser helpers.
 * Loads and runs the tia-br-helpers.js script in context of current browser window.
 * Adds some helpers to window object.
 *
 * @param {boolean} [logAction] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
exports.initTiaBrHelpers = function initTiaBrHelpers(logAction) {
  return gIn.wrap('Initialization of TIA helpers ... ', logAction, async () => {
    for (const fName of brHelpers) {
      const fPath = mPath.join(__dirname, 'browser-part', fName);
      await exports.executeScriptFromFile(fPath);
    }
    for (const fName of commonUtils) {
      const fPath = mPath.join(__dirname, '..', '..', 'common-utils', fName);
      await exports.executeScriptFromFile(fPath);
    }
    gIn.brHelpersInitiated = true;
  });
};

/**
 * Prepares parameters for JS calls in browser.
 * @param val
 * @returns {string}
 */
exports.valueToParameter = function valueToParameter(val) {
  if (typeof val === 'number') {
    return `${val}`;
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
};

// exports.initTiaBrHelpers = function (logAction) {
//   return gIn.wrap('Initialization of TIA helpers ... ', logAction, function () {
//     return exports.executeScriptFromFile(mPath.join(__dirname, 'browser-part/tia-br-helpers.js'), false);
//   });
// };

/**
 * Loads page with specified URL.
 *
 * @param url
 * @param logAction
 * @returns {*}
 */
exports.loadPage = function loadPage(url, logAction) {
  return gIn.wrap(`Loading a page with URL: "${url}" ... `, logAction, () => {
    url = gIn.textUtils.expandHost(url);
    return gT.sOrig.driver.get(url);
  });
};

/**
 * Closes the browser (TODO: or just active tab).
 *
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.close = function close(logAction) {
  // gT.s.browser.logSelLogs();
  return gIn.wrap('Closing the browser ... ', logAction, () => gT.sOrig.driver.close(), true);
};

/**
 * Sets a function which clicks body every minute to keep session active.
 * @param logAction
 * @returns {*}
 */
exports.setBodyClicker = function setBodyClicker(logAction) {
  return gIn.wrap('Set body clicker to keep session active ... ', logAction, () =>
    exports.executeScriptWrapper(`
    setInterval(function() {
      document.body.click();
    }
    , 60000)`)
  );
};

exports.executeScriptWrapper = function executeScriptWrapper(scriptStr) {
  // gIn.tracer.trace3('executeScriptWrapper');
  // TODO: tmpFunc in debug mode only, to increase performance in non-debug mode.
  let newScriptStr = 'window.tiaTmpFunc = function () { ';
  newScriptStr += `try {${scriptStr}} catch (e) {`;
  newScriptStr += "console.error('TIA caught exception: \\n' + e + '\\n');";
  newScriptStr += "console.error('stack: ' + e.stack + '\\n');";
  newScriptStr += 'throw e; };';
  newScriptStr += '}; return tiaTmpFunc();';
  return gT.sOrig.driver.executeScript(newScriptStr);
};

/**
 * Runs specified JavaScript in browser.
 *
 * @param {string} scriptStr - JavaScript text to execute.
 * @param {boolean} [logAction] - is logging needed for this action.
 *
 * @returns a promise which will be resolved with script return value.
 */
exports.executeScript = function executeScript(scriptStr, logAction) {
  return gIn.wrap('Script execution ... ', logAction, () =>
    exports.executeScriptWrapper(scriptStr)
  );
};

/**
 * Executes a script from the specified file.
 * @param fPath
 * @param logAction
 * @returns {*}
 */
exports.executeScriptFromFile = function executeScriptFromFile(fPath, logAction) {
  return gIn.wrap(`Execute script from file ${fPath} ... `, logAction, () => {
    gIn.tracer.msg3(`executeScriptFromFile: ${fPath}`);
    const scriptStr = fs.readFileSync(fPath, 'utf8');

    // gIn.tracer.trace3('initTiaHelpers: script: ' + scriptStr);
    return exports.executeScriptWrapper(scriptStr);
  });
};

/**
 * Sets function body for "Ctrl/Meta + Alt + LClick" handler.
 * You can use 'e' object of MouseEvent class.
 * Removes previous tiaOnClick handler (if exists).
 * @param funcBody
 * @param logAction
 * @param logAction
 * @returns {*}
 */
exports.setDbgOnClick = function setDbgOnClick(funcBody, logAction) {
  return gIn.wrap('Setup debug hotkey handler ... ', logAction, () => {
    const scriptStr = `
    try {
      document.removeEventListener('click', tiaOnClick);
    } catch(e) {
    }
    window.tiaOnClick = function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.which === 1) {
        ${funcBody}
      }
    }
    document.addEventListener('click', tiaOnClick);
    `;

    // gIn.tracer.trace3('setDbgOnClick: script: ' + funcBody);
    return exports.executeScriptWrapper(scriptStr);
  });
};

/**
 * Sets debug mode for browser scripts.
 * More info is showed for elements (including ExtJs ones).
 * @param logAction
 * @returns {*}
 */
exports.setDebugMode = function setDebugMode(logAction) {
  return gIn.wrap('Set debug mode ... ', logAction, () =>
    exports.executeScriptWrapper('tia.debugMode = true;')
  );
};

/**
 * Resets debug mode for browser scripts.
 * More info is showed for elements (including ExtJs ones).
 * @param logAction
 * @returns {*}
 */
exports.resetDebugMode = function(logAction) {
  return gIn.wrap('Reset debug mode ... ', logAction, () =>
    exports.executeScriptWrapper('tia.debugMode = false;')
  );
};

exports.getDebugMode = function getDebugMode(logAction) {
  return gIn.wrap('Get debug mode ... ', logAction, () =>
    exports.executeScriptWrapper('return tia.debugMode;').then(res => {
      gIn.logger.logIfNotDisabled(`${res} ... `, logAction);
      return res;
    })
  );
};

/**
 * Returns the current page URL.
 * @param logAction
 * @returns {*}
 */
exports.getCurUrl = function getCurUrl(logAction) {
  return gIn.wrap('Getting URL ... ', logAction, () =>
    gT.sOrig.driver.getCurrentUrl().then(res => gIn.textUtils.collapseHost(res))
  );
};

/**
 * Returns the current page Title.
 * @param logAction
 * @returns {*}
 */
exports.getTitle = function getTitle(logAction) {
  return gIn.wrap('Getting title ... ', logAction, () =>
    gT.sOrig.driver.getTitle().then(res => {
      gIn.tracer.msg3(`Title is : ${res}`);
      return res;
    })
  );
};

// https://code.google.com/p/selenium/source/browse/javascript/node/selenium-webdriver/test/logging_test.js?spec=svn7720e2ac97b63acc8cfe282d4668f682ba3b6efd&r=7720e2ac97b63acc8cfe282d4668f682ba3b6efd
// Logging API has numerous issues with PhantomJS:
//   - does not support adjusting log levels for type "browser".
//   - does not return proper log level for "browser" messages.
//   - does not delete logs after retrieval

/**
 * Logs browser console content.
 *
 * @returns {Promise.<TResult>}
 */
exports.printSelBrowserLogs = function printSelBrowserLogs() {
  return gT.sOrig.logs.get(gT.sOrig.browserLogType).then(entries => {
    gIn.tracer.msg3('Begin of printSelBrowserLogs');
    for (const entry of entries) {
      const logStr = `SEL.BR.LOG: ${entry.level.name}: ${gIn.textUtils.collapseHost(
        gIn.textUtils.removeSelSid(entry.message)
      )}`;
      gIn.logger.logln(logStr);
    }
    gIn.tracer.msg3('End of printSelBrowserLogs');
  });
};

exports.printCaughtExceptions = function printCaughtExceptions(extAjaxFailures) {
  return exports
    .executeScriptWrapper(
      `if (window.tia) return tia.getExceptions(${extAjaxFailures}); else return [];`
    )
    .then(arr => {
      gIn.tracer.msg3('Begin of printCaughtExceptions');
      for (const str of arr) {
        const logStr = `CAUGHT.BR.EXC: ${gIn.textUtils.removeSelSid(str)}`;
        gIn.tracer.err(logStr);
        gIn.logger.logln(logStr);
      }
      gIn.tracer.msg3('End of printCaughtExceptions');
    });
};

/**
 *
 * @param extAjaxFailures
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
// No log action intentionaly.
exports.cleanExceptions = function cleanExceptions(extAjaxFailures, logAction) {
  return gIn.wrap('Cleaning client exceptions: ... ', logAction, () =>
    exports.executeScriptWrapper(`if (window.tia) tia.cleanExceptions(${extAjaxFailures});`)
  );
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
exports.setWindowPosition = function setWindowPosition(x, y, logAction) {
  return gIn.wrap(`Set Window Position: (${x}, ${y}) ... `, logAction, () =>
    gT.sOrig.driver
      .manage()
      .window()
      .setPosition(x, y)
  );
};

/**
 * Sets browser window size.
 * @param {Number} width
 * @param {Number} height
 * @param logAction
 *
 * @return {Promise}
 */
exports.setWindowSize = function setWindowSize(width, height, logAction) {
  return gIn.wrap(`Set Window Size: (${width}, ${height}) ... `, logAction, () =>
    gT.sOrig.driver
      .manage()
      .window()
      .setSize(width, height)
  );
};

/**
 * Saves screen resolution into inner variables.
 * @param logAction
 * @returns {*}
 */
exports.getScreenResolution = function getScreenResolution(logAction) {
  return gIn.wrap('Get screen resolution ... ', logAction, () =>
    exports.executeScriptWrapper('return tia.getScreenResolution()').then(res => {
      // Save resolution to emulate maximize.
      gT.s.browser.screenWidth = res.width;
      gT.s.browser.screenHeight = res.height;
      return res;
    })
  );
};

/**
 * Maximizes browser window.
 */
/* Known issue: Xvfb has bad support for maximize, but does support setWindowSize. */
/* To correctly work use this function after complete page load */
exports.maximize = function maximize(logAction) {
  return gIn.wrap('Maximize ... ', logAction, () => {
    if (typeof gT.s.browser.screenWidth !== 'undefined') {
      return gT.sOrig.driver
        .manage()
        .window()
        .setSize(gT.s.browser.screenWidth, gT.s.browser.screenHeight);
    }
    return gT.sOrig.driver
      .manage()
      .window()
      .maximize();
  });
};

exports.screenshot = function screenshot(logAction) {
  gIn.tracer.msg2('Inside screenshot function 1.');
  return gIn.wrap('Screenshot: ', logAction, () => {
    gIn.tracer.msg2('Inside screenshot function 2.');
    return gT.sOrig.driver.takeScreenshot().then(str => {
      gIn.tracer.msg2('Inside screenshot function 3.');
      if (gIn.tInfo.data.screenShotCounter > 99) {
        // TODO: place the constant to config (but code must be changed also)?
        return Promise.reject('Too many screenshoots');
      }
      const shotPath = nextScreenShotPath();
      gT.l.print(`${shotPath} ... `);
      fs.writeFileSync(shotPath, str.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    });
  });
};

/**
 * Adds a cookie using name and value.
 * @param name
 * @param value
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.addCookie = function addCookie(name, value, logAction) {
  return gIn.wrap(`Add cookie: "${name}": "${value}" ... `, logAction, () =>
    gT.sOrig.driver.manage().addCookie(name, value)
  );
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
exports.addCookieEx = function addCookieEx(
  name,
  value,
  path,
  domain,
  isSecure,
  expirity,
  logAction
) {
  return gIn.wrap(
    `Add cookie ex: "${name}": "` + 'a value' + `", "${path}", "${domain}" ... `,
    logAction,
    () => gT.sOrig.driver.manage().addCookie(name, value, path, domain, isSecure, expirity)
  );
};

/**
 * Deletes specified cookie.
 * @param name
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
exports.deleteCookie = function deleteCookie(name, logAction) {
  return gIn.wrap(`Delete cookie: "${name}" ... `, logAction, () =>
    gT.sOrig.driver.manage().deleteCookie(name)
  );
};

/**
 * Gets cookie with specified name.
 * @param name
 * @param logAction
 * @returns {Object} - JSON object.
 */
exports.getCookie = function getCookie(name, logAction) {
  return gIn.wrap(`Get cookie: "${name}" ... `, logAction, () =>
    gT.sOrig.driver.manage().getCookie(name)
  );
};

/**
 * Cleans up the directory with browser profile.
 * @param logAction
 * @returns {Promise.<TResult>}
 */
exports.cleanProfile = function cleanProfile(logAction) {
  return gIn.wrap(`Cleaning profile: "${gIn.config.selProfilePath}" ... `, logAction, () =>
    Bluebird.try(() => {
      if (gIn.config.selProfilePath) {
        gIn.fileUtils.emptyDir(mPath.join(gIn.suite.browserProfilePath, gIn.config.selProfilePath));
      }
    })
  );
};
