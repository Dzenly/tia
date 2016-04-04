'use strict';

/* globals gT: true */

var fs = require('fs');
var mpath = require('path');
var util = require('util');

var chromedriver = require('chromedriver');
process.env.PATH = chromedriver.path + mpath.delimiter + process.env.PATH;

gT.s.wdModule = require('selenium-webdriver');
gT.s.chrome = require('selenium-webdriver/chrome');
gT.s.firefox = require('selenium-webdriver/firefox');

var config = gT.config;

var promise = gT.s.wdModule.promise;
var flow = promise.controlFlow();
gT.s.flow = flow;
gT.s.promise = promise;

gT.s.by = gT.s.wdModule.By;
gT.s.until = gT.s.wdModule.until;
gT.s.ActionSequence = s.wdModule.ActionSequence;
gT.s.key = gT.s.wdModule.Key;

var logger = gT.logger;
var until = gT.s.until;
var by = gT.s.by;

var driver;

function _startTimer() {
  if (gT.config.timings) {
    return process.hrtime();
  }
}

// Returns time diff in milliseconds.
function _stopTimer(startTime) {
  if (gT.config.timings) {
    var diff = process.hrtime(startTime);
    return ' (' + (diff[0] * 1000 + diff[1] / 1e6) + ' ms)';
  }
  return '';
}

// Private function.
function *_timeout() {
  if (gT.config.delay != 0) {
    yield flow.timeout(gT.config.delay);
  }
}

// Private function.
function *_timeoutAndLogOk(logAction, startTime, noConsoleAndExceptions) {
  var timeDiff = _stopTimer(startTime);
  yield *_timeout();
  yield logger.logIfNotDisabled('OK' + timeDiff + '\n', logAction);

  if (noConsoleAndExceptions) {
    return;
  }
  if (gT.config.printClExcAfterEachCommand) {
    yield gT.s.logBrowserExceptions();
  }

  if (gT.config.printClConsoleAfterEachCommand) {
    yield gT.s.console();
  }
}

/**
 * Wraps Selenium actions for logging and time measurement purposes.
 * @param msg - a message to log.
 * @param logAction - is logging enabled.
 * @param act - function - generator.
 * @param noConsoleAndExceptions
 * @returns {Promise.<TResult>} - Promise will be converted to value or to exception.
 * @private
 */
function _actWrapper(msg, logAction, act, noConsoleAndExceptions) {
  var startTime;
  flow.execute(function () {
    logger.logIfNotDisabled(msg, logAction);
    startTime = _startTimer();
  });
  return flow.execute(act).then(
    function (val) {
      flow.execute(function * () {
        gT.tInfo.pass(); // will be taken from global sandbox.
        yield *_timeoutAndLogOk(logAction, startTime, noConsoleAndExceptions);
      });
      return val; // This value will be returned from yield.
    },
    function (err) {
      gT.tInfo.fail();
      logger.errorln('Act.Wrapper.FAIL' + _stopTimer(startTime));
      logger.errorln('========== Err Info Begin ==========');
      logger.exception('', err);
      if (typeof gT.s.driver !== 'undefined') {
        gT.tracer.trace1('Act.Wrapper: scheduling screenshot, browser exceptions and browser console logs.');
        gT.s.screenshot();
        gT.s.logBrowserExceptions(true);
        gT.s.console();
        gT.s.quit().then(function () {
          logger.errorln('========== Err Info End ==========');
        });
        delete gT.s.driver;
      } else {
        logger.errorln('Info: No selenium driver');
        logger.errorln('========== Err Info End ==========');
      }

      // return; // If we will return smth here, it will be returned from yield.
      // It can be used for continue testing after fail. It is quite an exotic situation and logs will be undetermined.

      return gT.s.promise.rejected('Error in action'); // yield will generate exception with this object.
      // Unsafe tests will break test engine.
      // Safe tests silently catch this object. See execGen implementation below for safe tests example.
    });

  // In principle we can do so:
  // var result = flow.execute(); result.then(bla bla bla); return result;
  // But variant above is more flexible.
}

// Dummy functions for tests for test engine.
// Msg - is just message to identify the place in test.

gT.s.dummyPromiseFulfilled = function (msg) {
  return _actWrapper('Dummy promise fulfilled: "' + msg, logAction, function () {
    return promise.fulfilled('Fulfilled');
  });
};

gT.s.dummyPromiseRejected = function (msg) {
  return _actWrapper('Dummy promise rejected: "' + msg, logAction, function () {
    return promise.rejected('Rejected');
  });
};

gT.s.dummyPromiseThrowed = function (msg) {
  return _actWrapper('Dummy promise rejected: "' + msg, logAction, function () {
    return promise.rejected('Rejected');
  });
};

gT.s.dummyThrowErr = function (msg) {

};

gT.s.dummyThrowStr = function (msg) {

};

gT.s.dummySyntaxError = function (msg) {

};

function isAppReady() {
  return driver.executeScript('return !!window.rvTestHelper');
}

function isExtAppReady() {
  return driver.executeScript('return !!window.Ext')
    .then(function (res) {
      if (res) {
        gT.tracer.trace1('isExtAppReady: Ext found');
        return driver.executeScript('return !!window.R && !!initRvTestHelperExt'); //!! for convertation to bool.
      }
    })
    .then(function (res) {
      if (res) {
        gT.tracer.trace1('isExtAppReady: R, initRvTestHelperExt');
        return driver.executeScript('return initRvTestHelperExt()');
      }
    }).then(function (res) {
      gT.tracer.trace1('initRvTestHelperExt returned: ' + res);
      return res;
    });
}

// Public functions:

// https://github.com/gempesaw/Selenium-Remote-Driver/wiki/PhantomJS-Headless-Browser-Automation
// phantomjs --webdriver=4444, OR:
// java -jar selenium-server-standalone-2.35.0.jar -Dphantomjs.binary.path=/usr/local/bin/phantomjs
// my $driver =  Selenium::Remote::Driver->new("browser_name" => "phantomjs");

// driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

// TODO: find analog of this (Java):
//Wait<WebDriver> wait = new FluentWait<WebDriver>(driver)
//				.withTimeout(30, SECONDS)
//				.pollingEvery(5, SECONDS)
//				.ignoring(NoSuchElementException.class);

//var driver = new webdriver.Builder()
//		.forBrowser('firefox')
//		.usingServer('http://localhost:4444/wd/hub')
//		.build();

// SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" node script.js

/**
 * Adds a cookie using name and value.
 * @param name
 * @param value
 * @param logAction -  enable/disable logging for this action.
 * @returns {Promise.<TResult>}
 */
gT.s.addCookie = function (name, value, logAction) {
  return _actWrapper('Add cookie: "' + name + '": "' + value + '" ... ', logAction, function () {
    return driver.manage().addCookie(name, value);
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
gT.s.addCookieEx = function (name, value, path, domain, isSecure, expirity, logAction) {
  return _actWrapper('Add cookie ex: "' + name + '": "' + 'a value' + '", "' + path + '", "' + domain + '" ... ',
    logAction, function () {
      return driver.manage().addCookie(name, value, path, domain, isSecure, expirity);
    });
};

/**
 *
 * @param extAjaxFailures
 * @param logAction
 * @returns {Promise.<TResult>}
 */
// No log action intentionaly.
gT.s.cleanExceptions = function (extAjaxFailures, logAction) {
  return _actWrapper('Cleaning client exceptions: ... ', logAction, function () {
    return driver.executeScript('return window.rvtReady').then(
      function (res) {
        if (res) {
          return driver.executeScript('rvTestHelper.cleanExceptions(' + extAjaxFailures + ')');
        }
      });
  });
};

gT.s.cleanProfile = function (logAction) {
  return _actWrapper('Cleaning profile: "' + gT.config.profilePath + '" ... ', logAction, function () {
    return flow.execute(function () {
      if (gT.config.profilePath) {
        gT.fileUtils.emptyDir(mpath.join(gT.engineConfig.profileRoot, gT.config.profilePath));
      }
    });
  });
};

gT.s.clickById = function (id, logAction) {
  return _actWrapper('Click on element with id: "' + id + '" ... ', logAction, function () {
    return driver.findElement(by.id(id)).click();
  });
};

/**
 * Click to element specified by id. msg is logged instead of id.
 *
 * @param id
 * @param msg
 * @param logAction
 * @returns {Promise.<TResult>}
 */
gT.s.clickByDynamicId = function (id, msg, logAction) {
  return _actWrapper('Click on element : "' + msg + '" ... ', logAction, function () {
    return driver.findElement(by.id(id)).click();
  });
};

gT.s.clickTabId = function (itemId, logAction) {
  return _actWrapper('Click on element with itemId: "' + itemId + '" ... ', logAction, function () {
    return driver.executeScript('return rvTestHelperExt.getTabId("' + itemId + '")').then(function (id) {
      gT.tracer.trace3('clickTabId: id of found element: ' + id);
      return driver.findElement(by.id(id)).click();
    });
  });
};

gT.s.close = function (logAction) {
  gT.s.console();
  return _actWrapper('Closing the browser .... ', logAction, function () {
    return driver.close();
  }, true);
};

//https://code.google.com/p/selenium/source/browse/javascript/node/selenium-webdriver/test/logging_test.js?spec=svn7720e2ac97b63acc8cfe282d4668f682ba3b6efd&r=7720e2ac97b63acc8cfe282d4668f682ba3b6efd
// Logging API has numerous issues with PhantomJS:
//   - does not support adjusting log levels for type "browser".
//   - does not return proper log level for "browser" messages.
//   - does not delete logs after retrieval
gT.s.console = function () {
  //return _actWrapper('', false, function() {
  return driver.manage().logs().get(gT.s.wdModule.logging.Type.BROWSER).then(
    function (entries) {
      gT.tracer.trace1('Begin of console Log');
      for (var entry of entries) {
        let logStr = 'BR.CONSOLE: ' + entry.level.name + ': ' + gT.textUtils.collapseHost(gT.textUtils.removeSelSid(entry.message));
        logger.logln(logStr);
      }
      gT.tracer.trace1('End of console Log');
    });
  //});
};

gT.s.deleteCookie = function (name, logAction) {
  return _actWrapper('Delete cookie: "' + name + '" ... ', logAction, function () {
    return driver.manage().deleteCookie(name);
  });
};

// Custom runner for function - generator.
//gT.s.runGen = function (gen) {
//	var it = safeGen(gen);
//
//	function next(ret) {
//		var p = it.next(ret);
//		if (p.done)
//			return;
//		p.value.then(
//				function(val) {
//					next(val);
//				},
//				function(err) {
//					it.throw(err);
//				});
//	}
//
//	next();
//};

gT.s.fail = function (url, logAction) {
  return _actWrapper('Intentional fail for debug: ... ', logAction, function () {
    return promise.rejected('Intentional fail');
  });
};

gT.s.get = function (url, logAction) {
  return _actWrapper('Loading a page with URL: "' + url + '" ... ', logAction, function () {
    url = gT.textUtils.expandHost(url);
    return driver.get(url);
  });
};

// Returns JSON object.
gT.s.getCookie = function (name, logAction) {
  return _actWrapper('Get cookie: "' + name + '" ... ', logAction, function () {
    return driver.manage().getCookie(name);
  });
};

gT.s.getUrl = function (logAction) {
  return _actWrapper('Getting URL ... ', logAction, function () {
    return driver.getCurrentUrl().then(function (res) {
      return gT.textUtils.collapseHost(res);
    });
  });
};

// Url up to colon.
// gT.s.getUrlPrefix = function(print, logAction) {
// 	return _actWrapper('Getting URL prefix ... ', logAction, function() {
// 		return driver.getCurrentUrl().then(function(url) {
// 			var index = url.lastIndexOf(':');
// 			var res;
// 			if (index === -1)
// 				res = url;
// 			else
// 				res = url.substr(0, index);
// 			if (print)
// 				gT.l.print('(' + gT.textUtils.collapseHost(res) + ') ... ');
// 			return res;
// 		});
// 	});
// };

// var gProfile = null;

/**
 * Initiates webdriver.
 * All gui tests should start with this function.
 *
 * @param {Boolean} cleanProfile - Is profile cleaning needed.
 * @param {Boolean} logAction -  enable/disable logging for this action.
 */
gT.s.initDriver = function (cleanProfile, logAction) {
  var profileInfo;
  if (gT.config.profilePath) {
    profileInfo = '(with user defined ' + (cleanProfile ? 'empty' : 'saved') + ' profile)';
  } else {
    profileInfo = '(with default empty profile)';
  }

  return _actWrapper('Initialization ' + profileInfo + ' ... ', logAction, function () {

    if (cleanProfile) {
      gT.s.cleanProfile(false);
    }

    var capabilities;

    var profileAbsPath;

    if (gT.config.profilePath) {
      profileAbsPath = mpath.resolve(mpath.join(gT.engineConfig.profileRoot, gT.config.profilePath));
      gT.tracer.trace2('Profile path: ' + profileAbsPath);
    }

    switch (gT.params.browser) {
      case 'chrome':
        var options = new gT.s.chrome.Options();
        if (gT.config.profilePath) {
          options.addArguments('--user-data-dir=' + profileAbsPath);
        }
        capabilities = options.toCapabilities(gT.s.wdModule.Capabilities.chrome());
        break;
      case 'phantomjs':
        capabilities = gT.s.wdModule.Capabilities.phantomjs();
        capabilities.set('phantomjs.cli.args', '--webdriver-loglevel=ERROR'); // Undocumented ability.
        //capabilities.set('phantomjs.binary.path', '/home/alexey/bin/phantomjs'); // Undocumented ability.
        break;
      case 'firefox':
        var options = new gT.s.firefox.Options();
        var binary = new gT.s.firefox.Binary();
        if (gT.config.profilePath) {
          // Profile name should be alphanumeric only.
          // Checked on linux. It does set -profile option.
          //binary.addArguments('-profile "' + profileAbsPath + '"');
          options.setProfile(profileAbsPath); // Checked on linux. Does NOT set -profile option.

          // http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_firefox.html
          // "The FirefoxDriver will never modify a pre-existing profile; instead it will create a copy for it to modify."

          // http://stackoverflow.com/questions/6787095/how-to-stop-selenium-from-creating-temporary-firefox-profiles-using-web-driver
          // webdriver.firefox.profile (name of the profile).

          // Also there is info that driver.quit() deletes tmp profile, but driver.close() - does not.

          // profile.setPreference ?

          // browser.sessionstore.resume_from_crash

          // writeToDisk ?

        }
        options.setBinary(binary);

        // gT.s.wdModule.Capabilities.firefox();
        capabilities = options.toCapabilities(gT.s.wdModule.Capabilities.firefox());
        break;
    }

    gT.tracer.trace3(util.inspect(capabilities));

    var prefs = new gT.s.wdModule.logging.Preferences();
    // TODO: this parameter correctly works only for chrome.
    // phantomjs gets all messages, independent on choosen level.
    // Mozilla gets no messages.
    var reportLevel;
    switch (gT.config.consoleReportLevel) {
      case 'WARNING':
        reportLevel = gT.s.wdModule.logging.Level.WARNING;
        break;
      case 'SEVERE':
        reportLevel = gT.s.wdModule.logging.Level.SEVERE;
        break;
      default:
        return promise.rejected('invalid consoleReportLevel value: ' + gT.config.consoleReportLevel);
    }
    prefs.setLevel(gT.s.wdModule.logging.Type.BROWSER, reportLevel);
    capabilities.setLoggingPrefs(prefs);

    driver = gT.s.driver = new gT.s.wdModule.Builder().forBrowser(gT.params.browser)
      .withCapabilities(capabilities).build();

    //return promise.rejected('debug');
    return promise.fulfilled(true); // in case of fail there will be exception.
  });
};

gT.s.issueClientException = function (logAction) {
  return _actWrapper('Issue client exception ... ', logAction, function () {
    return driver.executeScript('setTimeout(function() { DsgwDwd3 += 8;}, 0)');
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
gT.s.executeScript = function (scriptStr, logAction) {
  return _actWrapper('Script execution ... ', logAction, function () {
    return driver.executeScript(scriptStr);
  });
};

/* Known issue: Xvfb has bad support for maximize, but does support setWindowSize. */
/* Use this function after waitForAppReady or waitForExtAppReady call to make sure that it works correctly */
gT.s.maximize = function (logAction) {
  return _actWrapper('Maximize ... ', logAction, function () {
    if (typeof gT.width !== 'undefined') {
      return driver.manage().window().setSize(gT.width, gT.height);
    } else {
      return driver.manage().window().maximize();
    }
  });
};

gT.s.logBrowserExceptions = function (extAjaxFailures, logAction) {
  return driver.executeScript('return !!window.rvTestHelper').then(
    function (res) {
      gT.tracer.trace1('logBrowserExceptions, rvTestHelper is: ' + res);
      if (res) {
        return driver.executeScript('return rvTestHelper.getExceptions(' + extAjaxFailures + ')').then(function (arr) {
          for (var str of arr) {
            let logStr = 'BR.EXC: ' + gT.textUtils.removeSelSid(str);
            gT.tracer.traceErr(logStr);
            logger.logln(logStr);
          }
        });
      }
    });
};

gT.s.quit = function (logAction) {
  return _actWrapper('Quitting .... ', logAction, function () {
    return driver.quit();
  }, true);
};

gT.s.screenshot = function (logAction) {
  return _actWrapper('Screenshot: ', logAction, function () {
    return driver.takeScreenshot().then(function (str) {
      if (gT.tInfo.data.screenShotCounter > 99) { // TODO: place the constant to config (but code must be changed also) ?
        return promise.rejected('Too many screenshoots');
      }
      var shotPath = gT.nextScreenShotPath();
      l.print(shotPath + ' ... ');
      fs.writeFileSync(shotPath, str.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    });
  });
};

gT.s.sendKeysById = function (id, keys, logAction) {
  return _actWrapper('Sending keys: "' + keys + '", to element with id: "' + id + '" ... ', logAction, function () {
    return driver.findElement(by.id(id)).sendKeys(keys);
  });
};

/**
 * Sends keys to element by dynamically generated id.
 * Logs msg instead of id.
 *
 * @param id
 * @param keys
 * @param msg
 * @param logAction
 * @returns {Promise.<TResult>}
 */
gT.s.sendKeysByDynamicId = function (id, keys, msg, logAction) {
  return _actWrapper('Sending keys: "' + keys + '", to element: "' + msg + '" ... ', logAction, function () {
    return driver.findElement(by.id(id)).sendKeys(keys);
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
gT.s.setWindowPosition = function (x, y, logAction) {
  return _actWrapper('Set Window Position: (' + x + ', ' + y + ') ... ', logAction, function () {
    return driver.manage().window().setPosition(x, y);
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
gT.s.setWindowSize = function (width, height, logAction) {
  return _actWrapper('Set Window Size: (' + width + ', ' + height + ') ... ', logAction, function () {
    return driver.manage().window().setSize(width, height);
  });
};

/**
 * Sleeps for specified milliseconds amount.
 *
 * @param ms
 * @param logAction
 *
 * @returns {Promise}
 */
gT.s.sleep = function (ms, logAction) {
  return _actWrapper('Sleep ' + ms + ' ms ... ', logAction, function () {
    return flow.timeout(ms);
  });
};

// gT.s.waitAppReady = function(timeout, logAction) {
// 	return _actWrapper('Waiting for App Ready ... ', logAction, function() {
// 		return driver.wait(isExtAppReady, timeout).then(
// 				function() {
// 					return driver.executeScript("return rvTestHelper.getScreenResolution()").then(function(res) {
// 						// Save resolution to emulate maximize.
// 						gT.width = res.width;
// 						gT.height = res.height;
// 					});
// 				}
// 		);
// 	});
// };

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
gT.s.waitForAppReady = function (timeout, logAction) {
  return _actWrapper('Waiting for Ext App Ready ... ', logAction, function () {
    return driver.wait(isAppReady, timeout).then(
      function () {
        return driver.executeScript('return rvTestHelper.getScreenResolution()').then(function (res) {
          // Save resolution to emulate maximize.
          gT.width = res.width;
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
gT.s.waitForExtAppReady = function (timeout, logAction) {
  return _actWrapper('Waiting for Ext App Ready ... ', logAction, function () {
    return driver.wait(isExtAppReady, timeout).then(
      function () {
        return driver.executeScript('return rvTestHelper.getScreenResolution()').then(function (res) {
          // Save resolution to emulate maximize.
          gT.width = res.width;
          gT.height = res.height;
          return gT.s.sleep(2000, false); // TODO: not very reliable.
        });
      }
    );
  });
};

/**
 * Waits for element with specified id.
 *
 * @param id
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
gT.s.waitForElementById = function (id, timeout, logAction) {
  return _actWrapper('Waiting for element by id : "' + id + '" ... ', logAction, function () {
    return driver.wait(until.elementLocated(by.id(id)), timeout);
  });
};

/**
 * Waits for element with specified CSS class.
 *
 * @param className
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
gT.s.waitForElementByClassName = function (className, timeout, logAction) {
  return _actWrapper('Waiting for element by class name : "' + className + '" ... ', logAction, function () {
    return driver.wait(until.elementLocated(by.className(className)), timeout);
  });
};

/**
 * Waits for element with specified CSS selector.
 *
 * @param selector
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise with WebElement (or rejected Promise).
 */
gT.s.waitForElementByCssSelector = function (selector, timeout, logAction) {
  return _actWrapper('Waiting for element by css selector : "' + selector + '" ... ', logAction, function () {
    return driver.wait(until.elementLocated(by.css(selector)), timeout);
  });
};

/**
 * Waits for specified page title.
 *
 * @param title
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
gT.s.waitForTitle = function (title, timeout, logAction) {
  return _actWrapper('Waiting for windows title: "' + title + '" ... ', logAction, function () {
    return driver.wait(until.titleIs(title), timeout);
  });
};

/**
 * Waits for specified URL.
 * @param expUrl
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
gT.s.waitForUrl = function (expUrl, timeout, logAction) {
  return _actWrapper('Waiting for URL: "' + expUrl + '" ... ', logAction, function () {
    return driver.wait(function () {
      return driver.getCurrentUrl().then(function (actUrl) {
        return expUrl === gT.textUtils.collapseHost(actUrl);
      });
    }, timeout);
  });
};

/**
 * Waits for some URL which starts with specified urlPrefix.
 *
 * @param urlPrefix
 * @param timeout
 * @param logAction - enable/disable logging for this action.
 *
 * @returns {Promise} - Promise resolved to waiting result.
 */
gT.s.waitForUrlPrefix = function (urlPrefix, timeout, logAction) {
  return _actWrapper('Waiting for URL prefix: "' + urlPrefix + '" ... ', logAction, function () {
    return driver.wait(function () {
      return driver.getCurrentUrl().then(function (actUrl) {
        return 0 === gT.textUtils.collapseHost(actUrl).indexOf(urlPrefix);
      });
    }, timeout);
  });
};
