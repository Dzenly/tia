'use strict';

/* globals gT: true */
/* globals gIn: true */

// const mpath = require('path');
const util = require('util');
const fileUtils = require('../../utils/file-utils.js');

// TODO: does not driver creates profile dir itself ?
function createBrowserProfile() {
  fileUtils.mkdir(gT.config.browserProfilePath);
}

const cleanedProfilePaths = [];

exports.init = async function init(cleanProfile, enableLog) {
  // if (typeof enableLog === 'undefined' && !gT.config.browserProfileDir) {
  //   enableLog = false;
  // }

  gIn.tracer.msg3(`browserProfilePath: ${gT.config.browserProfilePath}`);
  gIn.tracer.msg3(`shareBrowser: ${gT.cLParams.shareBrowser}`);
  gIn.tracer.msg3(`sharedBrowserInitiated: ${gIn.sharedBrowserInitiated}`);

  // If directory has private profile, --share-browser is ignored.
  if (!gT.config.browserProfileDir && gT.cLParams.shareBrowser) {
    if (gIn.sharedBrowserInitiated) {
      gIn.tracer.msg3('Initialization is not needed');
      return Promise.resolve('Initialization is not needed');
    }
    gIn.sharedBrowserInitiated = true;
  }

  let profileInfo;
  if (gT.config.browserProfileDir) {
    profileInfo = `(with dir-config defined ${cleanProfile ? 'empty' : 'saved'} profile)`;
  } else {
    profileInfo = '(with default profile)';
  }

  return gIn.wrap(`Initialization ${profileInfo} ... `, enableLog, async () => {
    if (cleanProfile) {
      gT.s.browser.cleanProfile(false);
    } else if (gT.cLParams.clearProfiles && !cleanedProfilePaths.includes(gT.config.browserProfilePath)) {
      gT.s.browser.cleanProfile(true);
      cleanedProfilePaths.push(gT.config.browserProfilePath);
    }

    // createBrowserProfile();

    let options;

    switch (gT.cLParams.browser) {
      case 'chrome':
        options = new gT.sOrig.chrome.Options();
        options.addArguments('--dns-prefetch-disable');
        options.addArguments('--no-sandbox'); // Without this there is a fail with xvfb on Ubuntu 16.
        options.addArguments('--disable-infobars');

        if (gT.cLParams.headless) {
          options.addArguments('--headless');
          if (gT.u.isWindows()) {
            options.addArguments('--disable-gpu'); // Temporary fix for Windows.
          }
        }

        // options.addArguments('--start-maximized');

        // if (gT.config.browserProfileDir) {
        options.addArguments(`--user-data-dir=${gT.config.browserProfilePath}`);

        // }

        // options.excludeSwitches();

        options.setUserPreferences({
          credentials_enable_service: false,
          'profile.password_manager_enabled': false,
        });

        break;
      case 'firefox': {
        options = new gT.sOrig.firefox.Options();
        const binary = new gT.sOrig.firefox.Binary();

        // if (gT.config.browserProfileDir) {
        // Profile name should be alphanumeric only.
        // Checked on linux. It does set -profile option.
        // binary.addArguments('-profile "' + gT.config.browserProfilePath + '"');
        options.setProfile(gT.config.browserProfilePath); // Checked on linux. Does NOT set -profile option.

        // http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_firefox.html
        // "The FirefoxDriver will never modify a pre-existing profile; instead it will create
        // a copy for it to modify."

        // http://stackoverflow.com/questions/6787095/how-to-stop-selenium-from-creating-temporary-firefox-profiles-using-web-driver
        // webdriver.firefox.profile (name of the profile).

        // Also there is info that gT.sOrig.driver.quit() deletes tmp profile, butgT.sOrig.driver.close()
        // - does not.

        // profile.setPreference ?

        // browser.sessionstore.resume_from_crash

        // writeToDisk ?
        // }

        if (gT.cLParams.headless) {
          options.addArguments('-headless');
        }
        options.setBinary(binary);

        // gT.sOrig.wdModule.Capabilities.firefox();
        // capabilities = new gT.sOrig.wdModule.Capabilities();
      }
        break;
    }

    const prefs = new gT.sOrig.wdModule.logging.Preferences();

    // TODO: this parameter correctly works only for chrome.
    // phantomjs gets all messages, independent on choosen level.
    // Mozilla gets no messages.
    prefs.setLevel(gT.sOrig.browserLogType, gT.cLParams.browserLogLevel);
    prefs.setLevel(gT.sOrig.driverLogType, gT.cLParams.driverLogLevel);

    const capabilities = new gT.sOrig.wdModule.Capabilities();
    capabilities.setBrowserName(gT.cLParams.browser);
    capabilities.setLoggingPrefs(prefs);

    gIn.tracer.msg3(util.inspect(capabilities, { depth: 4 }));

    if (gT.cLParams.useRemoteDriver) {
      const sid = gIn.remoteDriverUtils.getSid();

      const remoteDriverConnectionStr = `${gT.globalConfig.remoteDriverUrl}:${
        gT.globalConfig.remoteDriverPort
      }`;

      if (sid) {
        gIn.tracer.msg3('There is current SID');
        gT_.firstRunWithRemoteDriver = false;

        const client = new gT.sOrig.Client(remoteDriverConnectionStr);
        const executor = new gT.sOrig.Executor(client);
        executor.w3c = true;

        gT_.sOrig.driver = new gT.sOrig.wdModule.WebDriver(sid, executor);
      } else {
        gIn.tracer.msg3('There is not current SID');
        gT_.firstRunWithRemoteDriver = true;
        gT_.sOrig.driver = new gT.sOrig.wdModule.Builder()
          .forBrowser(gT.cLParams.browser)
          .setChromeOptions(options)
          .setFirefoxOptions(options)
          .withCapabilities(capabilities)

          // As an alternative to this method, you may also set the SELENIUM_REMOTE_URL environment variable.
          // TODO: magic constant.
          .usingServer(remoteDriverConnectionStr)
          .build();

        gT_.sOrig.driver
          .getSession()
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
      // let executorRef = gT.sOrig.driver.executor_;
      // executorRef.executeOrig = executorRef.execute;
      // executorRef.execute = function (command) {
      //   gIn.tracer.trace3('COMMAND: ' + command.getName());
      //   // TODO: tracing, let params = command.getParameters();
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
    } else {
      // Temporary driver
      gT_.sOrig.driver = new gT.sOrig.wdModule.Builder()
        .forBrowser(gT.cLParams.browser)
        .setChromeOptions(options)
        .setFirefoxOptions(options)
        .withCapabilities(capabilities)
        .build();
    }

    gT_.sOrig.logs = gT.sOrig.driver.manage().logs();

    if (gT.cLParams.useRemoteDriver) {
      return;
    }

    // Trying to fix chromedriver issue 817 by delay.
    // https://bugs.chromium.org/p/chromedriver/issues/detail?id=817#c21
    return gT.u.promise.delayed(gT.engineConsts.defaultDelayAfterDriverCreate);
  });
};

exports.sleep = function sleep(ms, enableLog) {
  return gIn.wrap(`Sleep ${ms} ms ... `, enableLog, () => gT.u.promise.delayed(ms, true));
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

exports.quit = function quit(enableLog) {
  if (gT.cLParams.ejExplore) {
    gIn.tracer.msg3('quit: ejExplore, no quit');
    return Promise.resolve('ejExplore, no quit');
  }

  // if (typeof enableLog === 'undefined' && !gT.config.browserProfileDir) {
  //   enableLog = false;
  // }
  if (gIn.sharedBrowserInitiated) {
    gIn.tracer.msg3('quit: Shared browser, no quit');
    return Promise.resolve('Shared browser, no quit');
  }
  return gIn.wrap(
    'Quiting ... ',
    enableLog,
    () => gT.sOrig.driver.quit().then(() => {
      gIn.tracer.msg3('Quit: Driver is deleted');
      delete gT.sOrig.driver;
    }),
    true
  );
};

exports.quitIfInited = function quitIfInited() {
  if (gT.cLParams.ejExplore) {
    gIn.tracer.msg3('quitIfInited: ejExplore, no quit');
    return Promise.resolve('ejExplore, no quit');
  }
  if (gT.sOrig.driver) {
    gIn.tracer.msg3('quitIfInited: before quit call');
    return gT.sOrig.driver.quit().then(() => {
      delete gT.sOrig.driver;
      gIn.tracer.msg3('quitIfInited: Driver is deleted');
    });
  }
  gIn.tracer.msg3('quitIfInited: no driver, no quit');
  return Promise.resolve('No driver, no quit');
};

exports.printSelDriverLogs = function printSelDriverLogs(minLevel) {
  return gT.sOrig.logs.get(gT.sOrig.driverLogType).then((entries) => {
    gIn.tracer.msg3('Start of printSelDriverLogs');
    for (const entry of entries) {
      if (entry.level.value >= minLevel) {
        const logStr = `SEL.DR.LOG: ${entry.level.name} (${entry.level.value}), Message:\n ${
          entry.message
        }`;
        gIn.logger.logln(logStr);
      }
    }
    gIn.tracer.msg3('End of printSelDriverLogs');
  });
};
