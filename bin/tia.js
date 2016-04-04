#!/usr/bin/env bash
':'; //# comment; exec /usr/bin/env node --harmony "$0" "$@"

'use strict';

/* globals gT: true */

var browsers = [
  'chrome', // First browser is default.
  'phantomjs',
  'firefox'
];

function usage() {
  console.log([
    '\nUsage: tia <testSuiteRoot> [options]',
    '\n, where:',
    '\n    <testSuiteRoot> - root directory for test suite relative to current working dir (only relative path allowed for now)',
    '\n, and [options]:',
    '\n    -b <browser> (default: ' + browsers[0] + ') browser to run tests for.',
    '    Supported browsers are: ' + browsers.join(', ') + '\n',
    '    -p <pathToDirOrTest> - pattern for tests to run',
    '    , any test which file path (relative to <testSuiteRoot>) contains <pathToDirOrTest> substring will run.',
    '    By default, tests from all directories (recursively) will run.\n',
    '    -m enables email sending.\n',
    '    --stacktolog print stack trace to test logs.\n',
    '    --noxvfb force visual mode (for debug).\n',
    '    -l (TODO) attach diffed logs to mail.\n',
    '    --logerrtoconsole print all errors to console.\n',
    '    --logtoconsole print test logs to console.\n',
    '    --trace <level> enables tracing (1 | 2 | 3 ) (1 - less verbose, 3 - maximum verbosity).\n',
    '    --forcelogactions forced logs for all actions.\n',
    '    --require-modules <absolute_paths_separated_by_comma>\n',
    'Examples:\n',
    '    tia my-tests/testSuiteDir --noxvfb\n',
    '    node --harmony bin/tia.js my-tests/testSuiteDir\n',
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
  string: ['b', 'p', 'trace', 'require-modules'],
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
    forcelogactions: false,
    'require-modules': ''
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

require('../engine/init-global-objects.js');

gT.params = {}; // Parameters given in the command line.

gT.params.suiteRoot = suiteRoot;
gT.params.browser = browser;
gT.params.path = args['p'];
gT.params.minPathSearchIndex = suiteRoot.length + 1; // Minumum index for path search.
gT.params.mail = args['m'];
gT.params.stackToLog = args['stacktolog'];
gT.params.noxvfb = args['noxvfb'];
gT.params.logsToMail = args['l'];
gT.params.logErrToConsole = args['logerrtoconsole'];
gT.params.logToConsole = args['logtoconsole'];
gT.params.trace = args['trace'];
if (gT.params.trace > 3) {
  gT.params.trace = 3;
}

gT.params.forceLogActions = args['forcelogactions'];

if (args['require-modules']) {
  let arr = args['require-modules'].split(/\s*,\s*/);
  for (let reqPath of arr) {
    require(reqPath);
  }
}

require('../engine/runner.js')(suiteRoot);
