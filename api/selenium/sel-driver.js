'use strict';

/* globals gT: true */
/* globals gIn: true */

const mpath = require('path');
const util = require('util');

/**
 * Initiates webdriver.
 * All gui tests should start with this function.
 *
 * @param {Boolean} cleanProfile - Is profile cleaning needed. Works only if custom profile is defined.
 * @param {Boolean} [logAction] -  enable/disable logging for this action.
 * Default value is set by gT.engineConsts.defLLLogAction.
 * But default value if false if there is not custom user profile.
 * There is an issue with custom profile on Windows. Profile is not saved after browser closing.
 */
exports.init = function init(cleanProfile, logAction) {
  if (typeof logAction === 'undefined' && !gIn.config.selProfilePath) {
    logAction = false;
  }

  gIn.tracer.msg3(`selProfilePath: ${gIn.config.selProfilePath}`);
  gIn.tracer.msg3(`shareBrowser: ${gIn.params.shareBrowser}`);
  gIn.tracer.msg3(`sharedBrowserInitiated: ${gIn.sharedBrowserInitiated}`);

  if (!gIn.config.selProfilePath && gIn.params.shareBrowser) {
    if (gIn.sharedBrowserInitiated) {
      gIn.tracer.msg3('Initialization is not needed');
      return Bluebird.resolve('Initialization is not needed');
    }
    gIn.sharedBrowserInitiated = true;
  }

  let profileInfo;
  if (gIn.config.selProfilePath) {
    profileInfo = `(with user defined ${cleanProfile ? 'empty' : 'saved'} profile)`;
  } else {
    profileInfo = '(with default empty profile)';
  }

  return gIn.wrap(`Initialization ${profileInfo} ... `, logAction, () => {
    if (cleanProfile) {
      gT.s.cleanProfile(false);
    }

    let capabilities;

    let profileAbsPath;

    if (gIn.config.selProfilePath) {
      profileAbsPath = mpath.resolve(mpath.join(gIn.params.profileRootPath, gIn.config.selProfilePath));
      gIn.tracer.msg2(`Profile path: ${profileAbsPath}`);
    }

    let options;

    switch (gIn.params.browser) {
      case 'chrome':
        options = new gT.sOrig.chrome.Options();
        options.addArguments('--dns-prefetch-disable');
        options.addArguments('--no-sandbox'); // Without this there is a fail with xvfb on Ubuntu 16.
        options.addArguments('--disable-infobars');

        // options.addArguments('--start-maximized');

        if (gIn.config.selProfilePath) {
          options.addArguments(`--user-data-dir=${profileAbsPath}`);
        }

        // options.excludeSwitches();

        options.setUserPreferences({
          credentials_enable_service: false,
          'profile.password_manager_enabled': false,
        });

        capabilities = options.toCapabilities(gT.sOrig.wdModule.Capabilities.chrome());

        break;
      case 'phantomjs':
        capabilities = gT.sOrig.wdModule.Capabilities.phantomjs();
        capabilities.set('phantomjs.cli.args', '--webdriver-loglevel=ERROR'); // Undocumented ability.
        // capabilities.set('phantomjs.binary.path', '/home/alexey/bin/phantomjs'); // Undocumented ability.
        break;
      case 'firefox':
        options = new gT.sOrig.firefox.Options();
        var binary = new gT.sOrig.firefox.Binary();
        if (gIn.config.selProfilePath) {
          // Profile name should be alphanumeric only.
          // Checked on linux. It does set -profile option.
          // binary.addArguments('-profile "' + profileAbsPath + '"');
          options.setProfile(profileAbsPath); // Checked on linux. Does NOT set -profile option.

          // http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_firefox.html
          // "The FirefoxDriver will never modify a pre-existing profile; instead it will create
          // a copy for it to modify."

          // http://stackoverflow.com/questions/6787095/how-to-stop-selenium-from-creating-temporary-firefox-profiles-using-web-driver
          // webdriver.firefox.profile (name of the profile).

          // Also there is info thatgT.sOrig.driver.quit() deletes tmp profile, butgT.sOrig.driver.close() - does not.

          // profile.setPreference ?

          // browser.sessionstore.resume_from_crash

          // writeToDisk ?
        }
        options.setBinary(binary);

        // gT.sOrig.wdModule.Capabilities.firefox();
        capabilities = options.toCapabilities(gT.sOrig.wdModule.Capabilities.firefox());
        break;
    }

    const prefs = new gT.sOrig.wdModule.logging.Preferences();

    // TODO: this parameter correctly works only for chrome.
    // phantomjs gets all messages, independent on choosen level.
    // Mozilla gets no messages.
    prefs.setLevel(gT.sOrig.browserLogType, gIn.params.browserLogLevel);
    prefs.setLevel(gT.sOrig.driverLogType, gIn.params.driverLogLevel);

    capabilities.setLoggingPrefs(prefs);

    gIn.tracer.msg3(util.inspect(capabilities, { depth: 4 }));

    if (gIn.params.useRemoteDriver) {
      const sid = gIn.remoteDriverUtils.getSid();

      const remoteDriverConnectionStr = `${gT.suiteConfig.remoteDriverUrl}:${gT.suiteConfig.remoteDriverPort}`;

      if (sid) {
        gIn.tracer.msg3('There is current SID');
        gT.firstRunWithRemoteDriver = false;

        const client = new gT.sOrig.Client(remoteDriverConnectionStr);
        const executor = new gT.sOrig.Executor(client);

        gT.sOrig.driver = gT.sOrig.wdModule.WebDriver.attachToSession(
          executor,
          sid);
      } else {
        gIn.tracer.msg3('There is not current SID');
        gT.firstRunWithRemoteDriver = true;
        gT.sOrig.driver = new gT.sOrig.wdModule.Builder()
          .forBrowser(gIn.params.browser)
          .withCapabilities(capabilities)

          // As an alternative to this method, you may also set the SELENIUM_REMOTE_URL environment variable.
          // TODO: magic constant.
          .usingServer(remoteDriverConnectionStr)
          .build();

        gT.sOrig.driver.getSession()
          .then((res) => {
            const sid = gIn.remoteDriverUtils.saveSid(res.getId());
            gIn.tracer.msg3(`Saved session id: ${sid}`);
          })
          .catch((e) => {
            gIn.logger.exception('Error at getSession: ', e);
          });
      }

      // ==============================
      // TODO:
      // Using undocumented property to trace all selenium commands.
      // var executorRef = gT.sOrig.driver.executor_;
      // executorRef.executeOrig = executorRef.execute;
      // executorRef.execute = function (command) {
      //   gIn.tracer.trace3('COMMAND: ' + command.getName());
      //   // TODO: tracing, var params = command.getParameters();
      //   return executorRef.executeOrig(command)
      //     .then(function (res) {
      //       // TODO: tracing, command result.
      //       return res;
      //     })
      //     .catch(function (e) {
      //       // TODO: tracing, command fail.
      //       throw e;
      //     });
      // };
      // ==============================
    } else { // Temporary driver
      gT.sOrig.driver = new gT.sOrig.wdModule.Builder().forBrowser(gIn.params.browser)
        .withCapabilities(capabilities).build();
    }

    gT.sOrig.logs = gT.sOrig.driver.manage().logs();

    // Trying to fix chromedriver issue 817 by delay.
    // https://bugs.chromium.org/p/chromedriver/issues/detail?id=817#c21
    return Bluebird.delay(gT.engineConsts.defaultDelayAfterDriverCreate);
  });
};

/**
 * Sleeps for the specified milliseconds amount.
 *
 * @param ms
 * @param logAction
 *
 * @returns {Promise}
 */
exports.sleep = function sleep(ms, logAction) {
  return gIn.wrap(`Sleep ${ms} ms ... `, logAction, () => Bluebird.delay(ms, true));
};


const stupidSleep = 400;

/**
 * This function creates function for stupid sleep.
 * It is stupid sleep instead of smart waiting for something.
 */
exports.getStupidSleepFunc = function getStupidSleepFunc() {
  return function () {
    return exports.sleep(stupidSleep, false);
  };
};

/**
 * Quit from the browser.
 * @param [logAction]
 * If there was a custom profile - default logAction is true,
 * otherwise - false.
 * @returns {*}
 */
exports.quit = function quit(logAction) {
  if (gIn.params.ejExplore) {
    gIn.tracer.msg3('quit: ejExplore, no quit');
    return Bluebird.resolve('ejExplore, no quit');
  }
  if (typeof logAction === 'undefined' && !gIn.config.selProfilePath) {
    logAction = false;
  }
  if (gIn.sharedBrowserInitiated) {
    gIn.tracer.msg3('quit: Shared browser, no quit');
    return Bluebird.resolve('Shared browser, no quit');
  }
  return gIn.wrap('Quiting ... ', logAction, () => gT.sOrig.driver.quit().then(() => {
    gIn.tracer.msg3('Quit: Driver is deleted');
    delete gT.sOrig.driver;
  }), true);
};

/**
 * Quit if driver is initiated and if there is not ejExplore mode.
 */
exports.quitIfInited = function quitIfInited() {
  if (gIn.params.ejExplore) {
    gIn.tracer.msg3('quitIfInited: ejExplore, no quit');
    return Bluebird.resolve('ejExplore, no quit');
  }
  if (gT.sOrig.driver) {
    gIn.tracer.msg3('quitIfInited: before quit call');
    return gT.sOrig.driver.quit().then(() => {
      delete gT.sOrig.driver;
      gIn.tracer.msg3('quitIfInited: Driver is deleted');
    });
  }
  gIn.tracer.msg3('quitIfInited: no driver, no quit');
  return Bluebird.resolve('No driver, no quit');
};

exports.printSelDriverLogs = function printSelDriverLogs(minValue) {
  return gT.sOrig.logs.get(gT.sOrig.driverLogType).then(
    (entries) => {
      gIn.tracer.msg3('Start of printSelDriverLogs');
      for (const entry of entries) {
        if (entry.level.value >= minValue) {
          const logStr = `SEL.DR.LOG: ${entry.level.name} (${entry.level.value}), Message:\n ${entry.message}`;
          gIn.logger.logln(logStr);
        }
      }
      gIn.tracer.msg3('End of printSelDriverLogs');
    });
};
