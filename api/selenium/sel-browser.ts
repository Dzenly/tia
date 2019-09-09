'use strict';

/* globals gT: true */
/* globals gIn: true */

import * as fs from 'fs';
import * as mPath from 'path';

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

export function executeScriptWrapper(scriptStr) {
  // gIn.tracer.trace3('executeScriptWrapper');
  // TODO: tmpFunc in debug mode only, to increase performance in non-debug mode.
  let newScriptStr = 'window.tiaTmpFunc = function () { ';
  newScriptStr += `try {${scriptStr}} catch (e) {`;
  newScriptStr += "console.error('TIA caught exception: \\n' + e + '\\n');";
  newScriptStr += "console.error('stack: ' + e.stack + '\\n');";
  newScriptStr += 'throw e; };';
  newScriptStr += '}; return tiaTmpFunc();';
  return gT.sOrig.driver.executeScript(newScriptStr);
}

export function executeScript(scriptStr, enableLog) {
  return gIn.wrap('Script execution ... ', enableLog, () => executeScriptWrapper(scriptStr));
}

export function executeScriptFromFile(fPath, enableLog) {
  return gIn.wrap(`Execute script from file ${fPath} ... `, enableLog, () => {
    gIn.tracer.msg3(`executeScriptFromFile: ${fPath}`);
    const scriptStr = fs.readFileSync(fPath, 'utf8');

    // gIn.tracer.trace3('initTiaHelpers: script: ' + scriptStr);
    return executeScriptWrapper(scriptStr);
  });
}

export function initTiaBrHelpers(enableLog) {
  return gIn.wrap('Initialization of TIA helpers ... ', enableLog, async () => {
    for (const fName of brHelpers) {
      const fPath = mPath.join(gT.tiaDir, 'api', 'selenium', 'browser-part', fName);
      await executeScriptFromFile(fPath);
    }
    for (const fName of commonUtils) {
      const fPath = mPath.join(__dirname, '..', '..', 'common-utils', fName);
      await executeScriptFromFile(fPath);
    }
    gIn.brHelpersInitiated = true;

    // await executeScriptWrapper('window.focus(); document.body.click();');
    // await gT.sOrig.driver.actions({ bridge: true }).move({
    //   x: 100,
    //   y: 100,
    //   origin: gT.sOrig.driver.findElement(gT.sOrig.by.tagName('body')),
    //   duration: 0,
    // }).perform();
    //
    // // await gT.sOrig.driver.actions({ bridge: true }).contextClick(
    // //   gT.sOrig.driver.findElement(gT.sOrig.by.tagName('body'))
    // // ).perform();
    //
    // // await gT.sOrig.driver.actions({bridge: true}).pause(100).perform();
    //
    // await gT.sOrig.driver.actions({ bridge: true }).click(
    //   gT.sOrig.driver.findElement(gT.sOrig.by.tagName('body'))
    // ).perform();
  });
}

export function valueToParameter(val) {
  if (typeof val === 'number') {
    return `${val}`;
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
}

export function loadPage(url, enableLog) {
  return gIn.wrap(`Loading a page with URL: "${url}" ... `, enableLog, () => {
    // eslint-disable-next-line no-param-reassign
    url = gIn.textUtils.expandHost(url);
    return gT.sOrig.driver.get(url);
  });
}

export function close(enableLog) {
  // gT.s.browser.logSelLogs();
  return gIn.wrap('Closing the browser (tab) ... ', enableLog, () => gT.sOrig.driver.close(), true);
}

/**
 * Sets a function which clicks body every minute to keep session active.
 * @param enableLog
 * @returns {*}
 */
export function setBodyClicker(enableLog) {
  return gIn.wrap('Set body clicker to keep session active ... ', enableLog, () =>
    executeScriptWrapper(`
    setInterval(function() {
      document.body.click();
    }
    , 60000)`)
  );
}

/**
 * Sets function body for "Ctrl/Meta + Alt + LClick" handler.
 * You can use 'e' object of MouseEvent class.
 * Removes previous tiaOnClick handler (if exists).
 * @param funcBody
 */
export function setCtrlAltLClickHandler(funcBody, enableLog) {
  return gIn.wrap('Setup debug hotkey handler ... ', enableLog, () => {
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

    // gIn.tracer.trace3('setCtrlAltLClickHandler: script: ' + funcBody);
    return executeScriptWrapper(scriptStr);
  });
}

/**
 * Sets debug mode for browser scripts.
 * More info is showed for elements (including ExtJs ones).
 */
export function setDebugMode(enableLog) {
  return gIn.wrap('Set debug mode ... ', enableLog, () =>
    executeScriptWrapper('tia.debugMode = true;')
  );
}

/**
 * Resets debug mode for browser scripts.
 * Less info is showed for elements (including ExtJs ones).
 */
export function resetDebugMode(enableLog) {
  return gIn.wrap('Reset debug mode ... ', enableLog, () =>
    executeScriptWrapper('tia.debugMode = false;')
  );
}

export function getDebugMode(enableLog) {
  return gIn.wrap('Get debug mode ... ', enableLog, () =>
    executeScriptWrapper('return tia.debugMode;').then(res => {
      gIn.logger.logIfNotDisabled(`${res} ... `, enableLog);
      return res;
    })
  );
}

export function getCurUrl(enableLog) {
  return gIn.wrap('Getting URL ... ', enableLog, () =>
    gT.sOrig.driver.getCurrentUrl().then(res => gIn.textUtils.collapseHost(res))
  );
}

/**
 * Returns the current page Title.
 * @param enableLog
 * @returns {*}
 */
export function getTitle(enableLog) {
  return gIn.wrap('Getting title ... ', enableLog, () =>
    gT.sOrig.driver.getTitle().then(res => {
      gIn.tracer.msg3(`Title is : ${res}`);
      return res;
    })
  );
}

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
export function printSelBrowserLogs() {
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
}

export function printCaughtExceptions(includeExtAjaxFailures) {
  return exports
    .executeScriptWrapper(
      `if (window.tia) return tia.getExceptions(${includeExtAjaxFailures}); else return [];`
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
}

/**
 *
 * @param includingExtJsAjaxFailures
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
// No log action intentionaly.
export function cleanExceptions(includingExtJsAjaxFailures, enableLog) {
  return gIn.wrap('Cleaning client exceptions: ... ', enableLog, () =>
    executeScriptWrapper(`if (window.tia) tia.cleanExceptions(${includingExtJsAjaxFailures});`)
  );
}

/**
 * Set browser window position.
 *
 * @param x
 * @param y
 * @param enableLog
 *
 * @return {Promise}
 */
export function setWindowPosition(x, y, enableLog) {
  return gIn.wrap(`Set Window Position: (${x}, ${y}) ... `, enableLog, () =>
    gT.sOrig.driver
      .manage()
      .window()
      .setPosition(x, y)
  );
}

/**
 * Sets browser window size.
 * @param {Number} width
 * @param {Number} height
 * @param enableLog
 *
 * @return {Promise}
 */
export function setWindowSize(width, height, enableLog) {
  return gIn.wrap(`Set Window Size: (${width}, ${height}) ... `, enableLog, () =>
    gT.sOrig.driver
      .manage()
      .window()
      .setSize(width, height)
  );
}

/**
 * Saves screen resolution into inner variables.
 * @param enableLog
 * @returns {*}
 */
export function getScreenResolution(enableLog) {
  return gIn.wrap('Get screen resolution ... ', enableLog, () =>
    executeScriptWrapper('return tia.getScreenResolution()').then(res => {
      // Save resolution to emulate maximize.
      gT_.s.browser.screenWidth = res.width;
      gT_.s.browser.screenHeight = res.height;
      return res;
    })
  );
}

/**
 * Maximizes browser window.
 */
/* Known issue: Xvfb has bad support for maximize, but does support setWindowSize. */
/* To correctly work use this function after complete page load */
export function maximize(enableLog) {
  return gIn.wrap('Maximize ... ', enableLog, () => {
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
}

export function screenshot(enableLog) {
  gIn.tracer.msg2('Inside screenshot function 1.');
  return gIn.wrap('Screenshot: ', enableLog, () => {
    gIn.tracer.msg2('Inside screenshot function 2.');
    return gT.sOrig.driver.takeScreenshot().then(str => {
      gIn.tracer.msg2('Inside screenshot function 3.');
      if (gIn.tInfo.data.screenShotCounter > 99) {
        // TODO: place the constant to config (but code must be changed also)?
        throw new Error('Too many screenshoots');
      }
      const shotPath = nextScreenShotPath();
      gT.l.print(`${shotPath} ... `);
      fs.writeFileSync(shotPath, str.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    });
  });
}

/**
 * Adds a cookie using name and value.
 * @param name
 * @param value
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function addCookie(name, value, enableLog) {
  return gIn.wrap(`Add cookie: "${name}": "${value}" ... `, enableLog, () =>
    gT.sOrig.driver.manage().addCookie({ name, value })
  );
}

export function addCookieEx(args, enableLog) {
  return gIn.wrap(
    `Add cookie ex: name: "${args.name}", value: "${args.value}, path: "${args.path}", domain: "${args.domain}" ... `,
    enableLog,
    () => gT.sOrig.driver.manage().addCookie(args)
  );
}

/**
 * Deletes specified cookie.
 * @param name
 * @param enableLog -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
export function deleteCookie(name, enableLog) {
  return gIn.wrap(`Delete cookie: "${name}" ... `, enableLog, () =>
    gT.sOrig.driver.manage().deleteCookie(name)
  );
}

/**
 * Gets cookie with specified name.
 * @param name
 * @param enableLog
 * @returns {Object} - JSON object.
 */
export function getCookie(name, enableLog) {
  return gIn.wrap(`Get cookie: "${name}" ... `, enableLog, () =>
    gT.sOrig.driver.manage().getCookie(name)
  );
}

/**
 * Cleans up the directory with browser profile.
 * @param enableLog
 * @returns {Promise.<TResult>}
 */
export function cleanProfile(enableLog) {
  const relPath = mPath.relative(gT.cLParams.rootDir, gT.config.browserProfilePath);
  return gIn.wrap(`Cleaning profile: "${relPath}" ... `, enableLog, async () => {
    if (gT.config.browserProfilePath) {
      await gIn.fileUtils.emptyDir(gT.config.browserProfilePath);
    }
  });
}
