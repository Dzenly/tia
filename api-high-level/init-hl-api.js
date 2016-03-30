gT.sel.hl = {};

var self = gT.sel.hl;

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
self.completeOptions = function (options) {
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
self.genWraper = function*(gen, msg, options) {

  var opts = self.completeOptions(options);

	if (opts.logHl) {
		gT.t.println('BEGIN: "' + msg + '"');
	}

  // In case of fail, the state will be restored before next test.
  var oldLogLl = gT.t.setDefaultLlLogAction(opts.logLl);
  var oldPassLl = gT.t.setLlPassCounting(opts.passLl);

  yield *gen();

  gT.t.setDefaultLlLogAction(oldLogLl);
  gT.t.setLlPassCounting(oldPassLl);

	if (opts.logHl) {
		gT.t.println('END: "' + msg + '"');
	}

	if (opts.passHl) {
		gT.tinfo.passForce();
	}
};

self.initAndLogin = function *(remember, options) {
  yield *self.genWraper(
    function*() {
      yield sel.initDriver();
      yield sel.deleteCookie('sails.sid');
      yield sel.get('$(host)');
      yield sel.waitForTitle('R-Vision: Sign in', 2000);
      yield sel.waitForElementById('username', 2000);
      yield sel.sendKeysById('username', 'admin');
      yield sel.sendKeysById('password', 'admin');
			if (remember) {
				yield sel.clickById('checkbox');
			}
      yield sel.clickById('submit');
      yield sel.waitForTitle('R-Vision', 10000);
      yield sel.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield sel.waitForExtAppReady(1000);
    },
    'Init and Login',
    options);
};

self.initAndWaitExtApp = function *(options) {
  yield *self.genWraper(
    function*() {
      yield sel.initDriver();
      yield sel.get('$(host)');
      yield sel.waitForTitle('R-Vision', 10000);
      yield sel.waitForUrlPrefix('$(host)/#dashboard', 250000);
      yield sel.waitForExtAppReady(1000);
    },
    'Init without Login',
    options);
};

