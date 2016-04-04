'use strict';

/* globals gT: true */

gT.s.hl = {};

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
gT.s.hl.completeOptions = function (options) {
  if (!options) {
    return gT.copyObject(defaultOptions);
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
gT.s.hl.genWraper = function* (gen, msg, options) {

  var opts = gT.s.hl.completeOptions(options);

  if (opts.logHl) {
    gT.l.println('BEGIN: "' + msg + '"');
  }

  // In case of fail, the state will be restored before next test.
  var oldLogLl = gT.t.setDefaultLlLogAction(opts.logLl);
  var oldPassLl = gT.t.setLlPassCounting(opts.passLl);

  yield *gen();

  gT.t.setDefaultLlLogAction(oldLogLl);
  gT.t.setLlPassCounting(oldPassLl);

  if (opts.logHl) {
    gT.l.println('END: "' + msg + '"');
  }

  if (opts.passHl) {
    gT.tInfo.passForce();
  }
};

gT.s.hl.initAndLogin = function * (remember, options) {
  yield *gT.s.hl.genWraper(
    function* () {
      yield s.initDriver();
      yield s.deleteCookie('sails.sid');
      yield s.get('$(host)');
      yield s.waitForTitle('R-Vision: Sign in', 2000);
      yield s.waitForElementById('username', 2000);
      yield s.sendKeysById('username', 'admin');
      yield s.sendKeysById('password', 'admin');
      if (remember) {
        yield s.clickById('checkbox');
      }
      yield s.clickById('submit');
      yield s.waitForTitle('R-Vision', 10000);
      yield s.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield s.waitForExtAppReady(1000);
    },
    'Init and Login',
    options);
};

gT.s.hl.initAndWaitExtApp = function * (options) {
  yield *gT.s.hl.genWraper(
    function* () {
      yield s.initDriver();
      yield s.get('$(host)');
      yield s.waitForTitle('R-Vision', 10000);
      yield s.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield s.waitForExtAppReady(1000);
    },
    'Init without Login',
    options);
};

