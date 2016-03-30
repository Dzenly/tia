'use strict';

var fs = require('fs');
var mpath = require('path');

var chromedriver = require('chromedriver');
process.env.PATH = chromedriver.path + mpath.delimiter + process.env.PATH;

gTE.sel = { // Selenium stuff
	wdModule: require('selenium-webdriver'),
	chrome: require('selenium-webdriver/chrome'),
	firefox: require('selenium-webdriver/firefox')
};

global.sel = gTE.sel;

var self = gTE.sel;
var config = gTE.config;

var promise = self.wdModule.promise;
gTE.sel.promise = promise;
var flow = promise.controlFlow();
gTE.sel.flow = flow;

self.by = self.wdModule.By;
self.until = self.wdModule.until;

var logger = gTE.logger;
var until = gTE.sel.until;
var by = gTE.sel.by;

var driver;


function _startTimer() {
	if (gTE.config.timings)
		return process.hrtime();
}

// Returns time diff in milliseconds.
function _stopTimer(startTime) {
	if (gTE.config.timings) {
		var diff = process.hrtime(startTime);
		return ' (' + (diff[0] * 1000 + diff[1] / 1e6) + ' ms)';
	}
	return '';
}

// Private function.
function *_timeout() {
	if (gTE.config.delay != 0) {
		yield flow.timeout(gTE.config.delay);
	}
}

// Private function.
function *_timeoutAndLogOk(logAction, startTime, noConsoleAndExceptions) {
	var timeDiff = _stopTimer(startTime);
	yield *_timeout();
	yield logger.logIfNotDisabled('OK' + timeDiff + '\n', logAction);

	if (noConsoleAndExceptions)
		return;
	if (gTE.config.printClExcAfterEachCommand)
		yield self.logBrowserExceptions();

	if (gTE.config.printClConsoleAfterEachCommand)
		yield self.console();
}

// Function - generator as a parameter.
function _actWrapper(msg, logAction, act, noConsoleAndExceptions) {
	var startTime;
	flow.execute(function() {
		logger.logIfNotDisabled(msg, logAction);
		startTime = _startTimer();
	});
	return flow.execute(act).then(
			function(val) {
				flow.execute(function *() {
					gTE.tinfo.pass(); // will be taken from global sandbox.
					yield *_timeoutAndLogOk(logAction, startTime, noConsoleAndExceptions);
				});
				return val; // This value will be returned from yield.
			},
			function(err) {
				gTE.tinfo.fail();
				logger.errorln('Act.Wrapper.FAIL' + _stopTimer(startTime));
				logger.errorln('========== Err Info Begin ==========');
				logger.exception('', err);
				if (typeof gTE.sel.driver !== 'undefined') {
					gTE.tracer.trace1('Act.Wrapper: scheduling screenshot, browser exceptions and browser console logs.');
					self.screenshot();
					self.logBrowserExceptions(true);
					self.console();
					gTE.sel.quit().then(function() {
						logger.errorln('========== Err Info End ==========');
					});
					delete gTE.sel.driver;
				} else {
					logger.errorln('Info: No selenium driver');
					logger.errorln('========== Err Info End ==========');
				}

				// return; // If we will return smth here, it will be returned from yield.
				// It can be used for continue testing after fail. It is quite an exotic situation and logs will be undetermined.

				return self.promise.rejected('Error in action'); // yield will generate exception with this object.
				// Unsafe tests will break test engine.
				// Safe tests silently catch this object. See execGen implementation below for safe tests example.
			});

	// In principle we can do so:
	// var result = flow.execute(); result.then(bla bla bla); return result;
	// But variant above is more flexible.
}

// Dummy functions for tests for test engine.
// Msg - is just message to identify the place in test.

self.dummyPromiseFulfilled = function(msg) {
	return _actWrapper('Dummy promise fulfilled: "' + msg, logAction, function() {
		return promise.fulfilled('Fulfilled');
	});
};

self.dummyPromiseRejected = function(msg) {
	return _actWrapper('Dummy promise rejected: "' + msg, logAction, function() {
		return promise.rejected('Rejected');
	});
};

self.dummyPromiseThrowed = function(msg) {
	return _actWrapper('Dummy promise rejected: "' + msg, logAction, function() {
		return promise.rejected('Rejected');
	});
};

self.dummyThrowErr = function(msg) {

};

self.dummyThrowStr = function(msg) {

};

self.dummySyntaxError = function(msg) {

};


function *safeGen(gen) {
	try {
		yield* gen();
	} catch (e) {
		gTE.tracer.traceErr('Safe Generator catched error: ' + gTE.textUtils.excToStr(e));
	}
}

function isAppReady() {
	return driver.executeScript('return !!window.rvTestHelper');
}

function isExtAppReady() {
	return driver.executeScript('return !!window.Ext')
			.then(function(res) {
				if (res) {
					gTE.tracer.trace1('isExtAppReady: Ext found');
					return driver.executeScript('return !!window.R && !!initRvTestHelperExt'); //!! for convertation to bool.
				}
			})
			.then(function(res) {
				if (res) {
					gTE.tracer.trace1('isExtAppReady: R, initRvTestHelperExt');
					return driver.executeScript('return initRvTestHelperExt()');
				}
			}).then(function(res){
				gTE.tracer.trace1('initRvTestHelperExt returned: ' + res);
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

// addCookie(name, value, opt_path, opt_domain, opt_isSecure, opt_expiry)
// TODO: if will be needed - create addCookieEx for all these optional parameters.
self.addCookie = function(name, value, logAction) {
	return _actWrapper('Add cookie: "' + name + '": "' + value + '" ... ', logAction, function() {
		return driver.manage().addCookie(name, value);
	});
};

self.addCookieEx = function(name, value, path, domain, isSecure, expirity, logAction) {
	return _actWrapper('Add cookie ex: "' + name + '": "' + 'a value' + '", "' + path + '", "' + domain + '" ... ',
			logAction, function() {
				return driver.manage().addCookie(name, value, path, domain, isSecure, expirity);
			});
};

// No log action intentionaly.
self.cleanExceptions = function(extAjaxFailures, logAction) {
	return _actWrapper('Cleaning client exceptions: ... ', logAction, function() {
		return driver.executeScript('return window.rvtReady').then(
				function(res) {
					if (res) {
						return driver.executeScript('rvTestHelper.cleanExceptions(' + extAjaxFailures + ')');
					}
				});
	});
};

self.cleanProfile = function(logAction) {
	return _actWrapper('Cleaning profile: "' + gTE.config.profilePath + '" ... ', logAction, function() {
		return flow.execute(function() {
			if (gTE.config.profilePath)
				gTE.fileUtils.emptyDir(mpath.join(gTE.engineConfig.profileRoot, gTE.config.profilePath));
		})
	});
};

self.clickById = function(id, logAction) {
	return _actWrapper('Click on element with id: "' + id + '" ... ', logAction, function() {
		return driver.findElement(by.id(id)).click();
	});
};

self.clickTabId = function(itemId, logAction) {
	return _actWrapper('Click on element with itemId: "' + itemId + '" ... ', logAction, function() {
		return driver.executeScript('return rvTestHelperExt.getTabId("' + itemId + '")').then(function(id) {
			gTE.tracer.trace3('clickTabId: id of found element: ' + id);
			return driver.findElement(by.id(id)).click();
		});
	});
};

self.close = function(logAction) {
	self.console();
	return _actWrapper('Closing the browser .... ', logAction, function() {
		return driver.close();
	}, true);
};

//https://code.google.com/p/selenium/source/browse/javascript/node/selenium-webdriver/test/logging_test.js?spec=svn7720e2ac97b63acc8cfe282d4668f682ba3b6efd&r=7720e2ac97b63acc8cfe282d4668f682ba3b6efd
// Logging API has numerous issues with PhantomJS:
//   - does not support adjusting log levels for type "browser".
//   - does not return proper log level for "browser" messages.
//   - does not delete logs after retrieval
self.console = function() {
	//return _actWrapper('', false, function() {
	return driver.manage().logs().get(self.wdModule.logging.Type.BROWSER).then(
			function(entries) {
				gTE.tracer.trace1('Begin of console Log');
				for (var entry of entries) {
					let logStr = 'BR.CONSOLE: ' + entry.level.name + ': ' + gTE.textUtils.collapseHost(gTE.textUtils.removeSelSid(entry.message));
					logger.logln(logStr);
				}
				gTE.tracer.trace1('End of console Log');
			});
	//});
};

self.deleteCookie = function(name, logAction) {
	return _actWrapper('Delete cookie: "' + name + '" ... ', logAction, function() {
		return driver.manage().deleteCookie(name);
	});
};

self.execGen = function(gen) {
	//return flow.execute(gen); // Unsafe variant.
	return flow.execute(function() { // Safe variant.
		return promise.consume(safeGen, null, gen);
	});
};

// Custom runner for function - generator.
//self.runGen = function (gen) {
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

self.fail = function(url, logAction) {
	return _actWrapper('Intentional fail for debug: ... ', logAction, function() {
		return promise.rejected('Intentional fail');
	});
};

self.get = function(url, logAction) {
	return _actWrapper('Loading a page with URL: "' + url + '" ... ', logAction, function() {
		url = gTE.textUtils.expandHost(url);
		return driver.get(url);
	});
};

// Returns JSON object.
self.getCookie = function(name, logAction) {
	return _actWrapper('Get cookie: "' + name + '" ... ', logAction, function() {
		return driver.manage().getCookie(name);
	});
};

self.getUrl = function(logAction) {
	return _actWrapper('Getting URL ... ', logAction, function() {
		return driver.getCurrentUrl().then(function(res){
			return gTE.textUtils.collapseHost(res);
		});
	});
};

// Url up to colon.
// self.getUrlPrefix = function(print, logAction) {
// 	return _actWrapper('Getting URL prefix ... ', logAction, function() {
// 		return driver.getCurrentUrl().then(function(url) {
// 			var index = url.lastIndexOf(':');
// 			var res;
// 			if (index == -1)
// 				res = url;
// 			else
// 				res = url.substr(0, index);
// 			if (print)
// 				gTE.t.print('(' + gTE.textUtils.collapseHost(res) + ') ... ');
// 			return res;
// 		});
// 	});
// };

self.initDriver = function(cleanProfile, logAction) {
	var profileInfo;
	if (gTE.config.profilePath)
		profileInfo = '(with user defined ' + (cleanProfile ? 'empty' : 'saved') + ' profile)';
	else
		profileInfo = '(with default empty profile)';

	return _actWrapper('Initialization ' + profileInfo + ' ... ', logAction, function() {

		if (cleanProfile)
			self.cleanProfile(false);

		var capabilities;

		var profileAbsPath;

    if (gTE.config.profilePath) {
      profileAbsPath = mpath.resolve(mpath.join(gTE.engineConfig.profileRoot, gTE.config.profilePath));
    }

		switch (gTE.params.browser) {
			case 'chrome':
				var options = new self.chrome.Options();
				if (gTE.config.profilePath) {
          options.addArguments('--user-data-dir=' + profileAbsPath);
        }
				capabilities = options.toCapabilities(self.wdModule.Capabilities.chrome());
				break;
			case 'phantomjs':
				capabilities = self.wdModule.Capabilities.phantomjs();
				capabilities.set('phantomjs.cli.args', '--webdriver-loglevel=ERROR'); // Undocumented ability.
				//capabilities.set('phantomjs.binary.path', '/home/alexey/bin/phantomjs'); // Undocumented ability.
				break;
			case 'firefox':
        var options = new self.firefox.Options();
        var binary = new self.firefox.Binary();
        if (gTE.config.profilePath) {
          //binary.addArguments('-profile "' + profileAbsPath + '"');
          options.setProfile(profileAbsPath);
        }
        //options.setBinary(binary);


        // options.setProfile()
        // http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_firefox.html
        // "The FirefoxDriver will never modify a pre-existing profile; instead it will create a copy for it to modify."

        // self.wdModule.Capabilities.firefox();
				capabilities = options.toCapabilities();
				break;
		}

		var prefs = new self.wdModule.logging.Preferences();
		// TODO: this parameter correctly works only for chrome.
		// phantomjs gets all messages, independent on choosen level.
		// Mozilla gets no messages.
		var reportLevel;
		switch (gTE.config.consoleReportLevel) {
			case 'WARNING':
				reportLevel = self.wdModule.logging.Level.WARNING;
				break;
			case 'SEVERE':
				reportLevel = self.wdModule.logging.Level.SEVERE;
				break;
			default:
				return promise.rejected('invalid consoleReportLevel value: ' + gTE.config.consoleReportLevel);
		}
		prefs.setLevel(self.wdModule.logging.Type.BROWSER, reportLevel);
		capabilities.setLoggingPrefs(prefs);

		driver = self.driver = new self.wdModule.Builder().forBrowser(gTE.params.browser)
      .withCapabilities(capabilities).build();

		//return promise.rejected('debug');
		return promise.fulfilled(true); // in case of fail there will be exception.
	});
};

self.issueClientException = function(logAction) {
	return _actWrapper('Issue client exception ... ', logAction, function() {
		return driver.executeScript('rvTestHelper.issueException()');
	});
};

/* Known issue: Xvfb has bad support for maximize, but does support setWindowSize. */
/* Use this function after waitForAppReady or waitForExtAppReady call to make sure that it works correctly */
self.maximize = function(logAction) {
	return _actWrapper('Maximize ... ', logAction, function() {
		if (typeof gTE.width !== 'undefined') {
			return driver.manage().window().setSize(gTE.width, gTE.height);
		}
		else
			return driver.manage().window().maximize();
	});
};

self.logBrowserExceptions = function(extAjaxFailures, logAction) {
	return driver.executeScript('return !!window.rvTestHelper').then(
			function(res) {
				gTE.tracer.trace1('logBrowserExceptions, rvTestHelper is: ' + res);
				if (res) {
					return driver.executeScript('return rvTestHelper.getExceptions(' + extAjaxFailures + ')').then(function(arr) {
						for (var str of arr) {
							let logStr = 'BR.EXC: ' + gTE.textUtils.removeSelSid(str);
							gTE.tracer.traceErr(logStr);
							logger.logln(logStr);
						}
					});
				}
			});
};

self.quit = function(logAction) {
	return _actWrapper('Quitting .... ', logAction, function() {
		return driver.quit();
	}, true);
};

self.screenshot = function(logAction) {
	return _actWrapper('Screenshot: ', logAction, function() {
		return driver.takeScreenshot().then(function(str) {
			if (gTE.tinfo.data.screenShotCounter > 99) { // TODO: place the constant to config (but code must be changed also) ?
				return promise.rejected('Too many screenshoots');
			}
			var shotPath = gTE.nextScreenShotPath();
			t.print(shotPath + ' ... ');
			fs.writeFileSync(shotPath, str.replace(/^data:image\/\w+;base64,/, ""), 'base64');
		});
	});
};

self.sendKeysById = function(id, keys, logAction) {
	return _actWrapper('Sending keys: "' + keys + '", to element with id: "' + id + '" ... ', logAction, function() {
		return driver.findElement(by.id(id)).sendKeys(keys);
	});
};

self.setWindowPosition = function(x, y, logAction) {
	return _actWrapper('Set Window Position: (' + x + ', ' + y + ') ... ', logAction, function() {
		return driver.manage().window().setPosition(x, y);
	});
};

self.setWindowSize = function(w, h, logAction) {
	return _actWrapper('Set Window Size: (' + w + ', ' + h + ') ... ', logAction, function() {
		return driver.manage().window().setSize(w, h);
	});
};

self.sleep = function(ms, logAction) {
	return _actWrapper('Sleep ' + ms + ' ms ... ', logAction, function() {
		return flow.timeout(ms);
	});
};

self.waitAppReady = function(timeout, logAction) {
	return _actWrapper('Waiting for App Ready ... ', logAction, function() {
		return driver.wait(isExtAppReady, timeout).then(
				function() {
					return driver.executeScript("return rvTestHelper.getScreenResolution()").then(function(res) {
						// Save resolution to emulate maximize.
						gTE.width = res.width;
						gTE.height = res.height;
					});
				}
		);
	});
};

self.waitForAppReady = function(timeout, logAction) {
	return _actWrapper('Waiting for Ext App Ready ... ', logAction, function() {
		return driver.wait(isAppReady, timeout).then(
				function() {
					return driver.executeScript("return rvTestHelper.getScreenResolution()").then(function(res) {
						// Save resolution to emulate maximize.
						gTE.width = res.width;
						gTE.height = res.height;
					});
				}
		);
	});
};

self.waitForExtAppReady = function(timeout, logAction) {
	return _actWrapper('Waiting for Ext App Ready ... ', logAction, function() {
		return driver.wait(isExtAppReady, timeout).then(
				function() {
					return driver.executeScript("return rvTestHelper.getScreenResolution()").then(function(res) {
						// Save resolution to emulate maximize.
						gTE.width = res.width;
						gTE.height = res.height;
						return self.sleep(2000, false); // TODO: not very reliable.
					});
				}
		);
	});
};

self.waitForElementById = function(id, timeout, logAction) {
	return _actWrapper('Waiting for element by id : "' + id + '" ... ', logAction, function() {
		return driver.wait(until.elementLocated(by.id(id)), timeout);
	});
};

self.waitForElementByClassName = function(className, timeout, logAction) {
	return _actWrapper('Waiting for element by class name : "' + className + '" ... ', logAction, function() {
		return driver.wait(until.elementLocated(by.className(className)), timeout);
	});
};

self.waitForTitle = function(title, timeout, logAction) {
	return _actWrapper('Waiting for windows title: "' + title + '" ... ', logAction, function() {
		return driver.wait(until.titleIs(title), timeout);
	});
};

self.waitForUrl = function(expUrl, timeout, logAction) {
	return _actWrapper('Waiting for URL: "' + expUrl + '" ... ', logAction, function() {
		return driver.wait(function() {
			return driver.getCurrentUrl().then(function(actUrl) {
				return expUrl === gTE.textUtils.collapseHost(actUrl);
			});
		}, timeout);
	});
};

self.waitForUrlPrefix = function(urlPrefix, timeout, logAction) {
	return _actWrapper('Waiting for URL prefix: "' + urlPrefix + '" ... ', logAction, function() {
		return driver.wait(function() {
			return driver.getCurrentUrl().then(function(actUrl) {
				return 0 === gTE.textUtils.collapseHost(actUrl).indexOf(urlPrefix);
			});
		}, timeout);
	});
};




