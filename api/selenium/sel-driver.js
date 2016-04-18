'use strict';

/* globals gT: true */
/* globals gIn: true */

var mpath = require('path');
var util = require('util');
var promise = gT.sOrig.promise;
// var flow = gT.sOrig.flow;

/**
 * Initiates webdriver.
 * All gui tests should start with this function.
 *
 * @param {Boolean} cleanProfile - Is profile cleaning needed.
 * @param {Boolean} logAction -  enable/disable logging for this action.
 */
exports.init = function (cleanProfile, logAction) {
  var profileInfo;
  if (gIn.config.selProfilePath) {
    profileInfo = '(with user defined ' + (cleanProfile ? 'empty' : 'saved') + ' profile)';
  } else {
    profileInfo = '(with default empty profile)';
  }

  return gIn.wrap('Initialization ' + profileInfo + ' ... ', logAction, function () {

    if (cleanProfile) {
      gT.s.cleanProfile(false);
    }

    var capabilities;

    var profileAbsPath;

    if (gIn.config.selProfilePath) {
      profileAbsPath = mpath.resolve(mpath.join(gT.engineConsts.profileRoot, gIn.config.selProfilePath));
      gIn.tracer.trace2('Profile path: ' + profileAbsPath);
    }

    var options;

    switch (gIn.params.browser) {
      case 'chrome':
        options = new gT.sOrig.chrome.Options();
        if (gIn.config.selProfilePath) {
          options.addArguments('--user-data-dir=' + profileAbsPath);
        }
        capabilities = options.toCapabilities(gT.sOrig.wdModule.Capabilities.chrome());
        break;
      case 'phantomjs':
        capabilities = gT.sOrig.wdModule.Capabilities.phantomjs();
        capabilities.set('phantomjs.cli.args', '--webdriver-loglevel=ERROR'); // Undocumented ability.
        //capabilities.set('phantomjs.binary.path', '/home/alexey/bin/phantomjs'); // Undocumented ability.
        break;
      case 'firefox':
        options = new gT.sOrig.firefox.Options();
        var binary = new gT.sOrig.firefox.Binary();
        if (gIn.config.selProfilePath) {
          // Profile name should be alphanumeric only.
          // Checked on linux. It does set -profile option.
          //binary.addArguments('-profile "' + profileAbsPath + '"');
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

    gIn.tracer.trace3(util.inspect(capabilities));

    var prefs = new gT.sOrig.wdModule.logging.Preferences();
    // TODO: this parameter correctly works only for chrome.
    // phantomjs gets all messages, independent on choosen level.
    // Mozilla gets no messages.
    var reportLevel;
    switch (gIn.config.selConsoleReportLevel) {
      case 'WARNING':
        reportLevel = gT.sOrig.wdModule.logging.Level.WARNING;
        break;
      case 'SEVERE':
        reportLevel = gT.sOrig.wdModule.logging.Level.SEVERE;
        break;
      default:
        return promise.rejected('invalid selConsoleReportLevel value: ' + gIn.config.selConsoleReportLevel);
    }
    prefs.setLevel(gT.sOrig.wdModule.logging.Type.BROWSER, reportLevel);
    capabilities.setLoggingPrefs(prefs);

    gT.sOrig.driver = new gT.sOrig.wdModule.Builder().forBrowser(gIn.params.browser)
      .withCapabilities(capabilities).build();

    //return promise.rejected('debug');
    return promise.fulfilled(true); // in case of fail there will be exception.
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
exports.sleep = function (ms, logAction) {
  return gIn.wrap('Sleep ' + ms + ' ms ... ', logAction, function () {
    return gT.sOrig.flow.timeout(ms);
  });
};

exports.quit = function (logAction) {
  return gIn.wrap('Quitting .... ', logAction, function () {
    return gT.sOrig.driver.quit();
  }, true);
};
