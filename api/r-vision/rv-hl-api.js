'use strict';

/* globals gT: true */
/* globals gIn: true */

// options for all these high level API functions.
// options.logHl - log this high level action (default: true).
// options.logLl - log lower level actions (default: false).
// options.passHl - is high level action increase pass counter (default: true).
// options.passLl - is low level actions increase pass counter (default: false).

var defaultOptions = {
  logHl: true,
  logLl: false,
  passHl: true,
  passLl: false
};

/*
 Adds missing options.
 **/
exports.completeOptions = function (options) {
  if (!options) {
    return gIn.miscUtils.copyObject(defaultOptions);
  }

  if (typeof options.logHl === 'undefined') {
    options.logHl = true;
  }

  if (typeof options.logLl === 'undefined') {
    options.logLl = false;
  }

  if (typeof options.passHl === 'undefined') {
    options.passHl = true;
  }

  if (typeof options.passLl === 'undefined') {
    options.passLl = false;
  }

  return options;
};

/// public API functions.

// Can be used as public.
exports.genWraper = function* (gen, msg, options) {

  var opts = exports.completeOptions(options);

  if (opts.logHl) {
    gT.l.println('BEGIN: "' + msg + '"');
  }

  // In case of fail, the state will be restored before next test.
  var oldLogLl = gT.ll.setDefaultLlLogAction(opts.logLl);
  var oldPassLl = gT.ll.setLlPassCounting(opts.passLl);

  yield *gen();

  gT.ll.setDefaultLlLogAction(oldLogLl);
  gT.ll.setLlPassCounting(oldPassLl);

  if (opts.logHl) {
    gT.l.println('END: "' + msg + '"');
  }

  if (opts.passHl) {
    gIn.tInfo.passForce();
  }
};

exports.initAndLogin = function * (remember, options) {
  yield *exports.genWraper(
    function* () {
      yield gT.s.driver.init();
      yield gT.s.browser.deleteCookie('sails.sid');
      yield gT.s.browser.loadPage('$(host)');
      yield gT.s.wait.waitForTitle('R-Vision: Sign in', 2000);
      yield gT.s.wait.waitForElementById('username', 2000);
      yield gT.s.ua.sendKeysById('username', 'admin');
      yield gT.s.ua.sendKeysById('password', 'admin');
      if (remember) {
        yield gT.s.ua.clickById('checkbox');
      }
      yield gT.s.ua.clickById('submit');
      yield gT.s.wait.waitForTitle('R-Vision', 10000);
      yield gT.s.wait.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield gT.rv.waitForExtAppReady(1000);
    },
    'Init and Login',
    options);
};

exports.initAndWaitExtApp = function * (options) {
  yield *exports.genWraper(
    function* () {
      yield gT.s.driver.init();
      yield gT.s.browser.loadPage('$(host)');
      yield gT.s.wait.waitForTitle('R-Vision', 10000);
      yield gT.s.wait.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield gT.rv.waitForExtAppReady(1000);
    },
    'Init without Login',
    options);
};

