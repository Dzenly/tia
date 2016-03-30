gTE.t = {};

global.t = gTE.t;

var shared = {};

var logger = gTE.logger;
var self = gTE.t;
var ok = 'OK\n';
var fail = 'FAIL\n';

var tinfo = gTE.tinfo;

self.saveShared = function(key, value) {
	shared[key] = value;
};

self.getShared = function(key) {
	return shared[key];
};

self.deleteShared = function(key) {
	delete shared[key];
};

self.clearShared = function() {
	shared = {};
};

/**
 * Prints msg.
 */
self.print = function(msg) {
	logger.log(msg);
};

/**
 * Prints msg and EOL.
 */
self.println = function(msg) {
	logger.logln(msg);
};

/**
 * Prints separator.
 */
self.sep = function() {
	logger.logln('==========');
};

/**
 * Prints End of Line.
 */
self.eol = function() {
	logger.log('\n');
};

/**
 * Fail with optional msg.
 * @param [msg] - message to print.
 */
self.fail = function(msg) {
	if (typeof msg !== 'undefined') logger.log(msg);
	tinfo.fail();
};

/**
 * Pass with optional msg.
 */
self.pass = function(msg) {
	if (typeof msg !== 'undefined') logger.log(msg);
	tinfo.pass();
};

self.setPassed = function(passed) {
	tinfo.data.passed = passed;
};

self.setFailed = function(failed) {
	tinfo.data.failed = failed;
};

self.getPassed = function() {
	return tinfo.data.passed;
};

self.getFailed = function() {
	return tinfo.data.failed;
};


/**
 * Sets the test title.
 * @param title
 */
self.setTitle = function(title) {
	tinfo.data.title = title; // From global sandbox.
	logger.logln(title);
	logger.logln('=================');
};


/**
 * Checks for condition.
 * @param condition
 * @param msg
 */
self.check = function(condition, msg) {
	var logStr = msg + '...';
	if (condition) {
		logStr += ok;
		gTE.tinfo.pass();
	}
	else {
		logStr += fail;
		gTE.tinfo.fail();
	}
	logger.logln(logStr);
};

self.checkNumber = function(val, expVal, msg) {
	logger.logln(msg + ':');
	logger.log('Check that "' + val + '" is a number and is equal to "' + expVal + '"...');
	if (typeof val !== 'number') {
		logger.log(fail);
		self.fail('\n"' + val + '" is not a number\n');
		return;
	}
	if (val != expVal) {
		logger.log(fail);
		self.fail('\n"' + val + '" != "' + expVal + '"\n');
		return;
	}
	self.pass(ok);
};

self.countLlPass = function(enable) {
	var old = gTE.tinfo.countLlPass;
	gTE.tinfo.countLlPass = enable;
	return old;
};

self.defaultLlLogAction = function(enable) {
	var old = gTE.logger.defLlLogAction;
	gTE.logger.defLlLogAction = enable;
	return old;
};
