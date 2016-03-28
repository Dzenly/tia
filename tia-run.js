#!/bin/sh
":" //# comment; exec /usr/bin/env node --harmony "$0" "$@"

//#! /usr/bin/env node --harmony

var browsers = [
	'chrome', // First browser is default.
	'phantomjs',
	'firefox'
];

function usage() {
	console.log([
		'\nUsage: node --harmony tia-run.js <suiteRoot> [-b <browser>] [-p <pathToDirOrTest>] [-m] [--stacktolog] [--noxvfb] [-l] [--logerrtoconsole] [--logtoconsole] [--trace <level>] [--forcelogactions]',
		'\n, where:\n',
		'    <suiteRoot> - root directory for test suite relative to run.js directory (only relative path allowed for now)\n',
		'    <browser> - (default: ' + browsers[0] + ') browser to run tests for:',
		'    supported browsers are: chrome, phantomjs, firefox (TODO: ie, safari).\n',
		'    <pathToDirOrTest> - optional path fragment for tests to run',
		'    , any test which file path (relative to <suiteRoot>) contains <pathToDirOrTest> will run.',
		'    By default tests from all directories (recursively) will run.\n',
		'    -m enables mail sending.\n',
		'    --stacktolog print stack trace to test logs.\n',
		'    --noxvfb force visual mode (for debug).\n',
		'    -l (TODO) attach diffed logs to mail.\n',
		'    --logerrtoconsole print all errors to console.\n',
		'    --logtoconsole print test logs to console.\n',
		'    --trace <level> enables tracing (1 | 2 | 3 ) (1 - less verbose, 3 - maximum verbosity).\n',
		'    --forcelogactions forced logs for all actions.\n',
		'Example:\n',
		'    node --harmony run.js testSuites/app -b chrome\n',
		'If there is no diffs, 0 is returned and stdout will contain test log,',
		'otherwise - 1 is returned and stderr will contain test log.\n',
		'This utility uses external utilities (diff, rm) and webdriver.',
		'see readme.md for more details.\n'
	].join('\n'));
}

function unknownOption(option) {
	if (option && option.substr(0, 1) === '-') {
		console.error('Unknown option: "' + option + '"');
		usage();
		process.exit(1);
	}
	return true;
}

var opts = {
	// trace is number, numbers implied by default in minimist.
	string: ['b', 'p', 'trace'],
	boolean: ['h', 'help', 'm', 'stacktolog', 'noxvfb', 'l', 'logerrtoconsole', 'logtoconsole', 'forcelogactions'],
	default: {
		b: browsers[0],
		p: '',
		m: false,
		stacktolog: false,
		noxvfb: false,
		l: false,
		logerrtoconsole: false,
		logtoconsole: false,
		trace: 0,
		forcelogactions: false
	},
	unknown: unknownOption
};

var args = require('minimist')(process.argv.slice(2), opts);

if (args._.length == 0 || args['h'] || args['help']) {
	usage();
	process.exit(0);
}

var browser = args['b'];
if (browsers.indexOf(browser) == -1) {
	console.error('Invalid browser: ' + browser);
	console.error('Supported browsers are: ' + browsers.join(', '));
	process.exit(1);
}

var suiteRoot = args._[0];

// TODO: support windows separators also.

// Make sure that there is no trailing separator.
if (suiteRoot[suiteRoot.length - 1] == '/') {
	suiteRoot = suiteRoot.slice(0, -1);
}

if (suiteRoot.length < 1) {
	usage();
	process.exit(1);
}

if (suiteRoot[0] === '/') {
	console.error('Absolute paths are not allowed.');
	usage();
	process.exit(1);
}

require('./engine/teInit.js');

gTE.params = {}; // Parameters given in the command line.

gTE.params.suiteRoot = suiteRoot;
gTE.params.browser = browser;
gTE.params.path = args['p'];
gTE.params.minPathIndex = suiteRoot.length + 1; // Minumum index for path search.
gTE.params.mail = args['m'];
gTE.params.stackToLog = args['stacktolog'];
gTE.params.noxvfb = args['noxvfb'];
gTE.params.logsToMail = args['l'];
gTE.params.logErrToConsole = args['logerrtoconsole'];
gTE.params.logToConsole = args['logtoconsole'];
gTE.params.trace = args['trace'];
if (gTE.params.trace > 3)
	gTE.params.trace = 3;

gTE.params.forceLogActions = args['forcelogactions'];

gTE.runTestsAsync(suiteRoot);
