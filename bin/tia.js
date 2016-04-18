#!/usr/bin/env bash
':'; //# comment; exec /usr/bin/env node --harmony "$0" "$@"

'use strict';

/* globals gIn: true */

var browsers = [
  'chrome', // First browser is default.
  'phantomjs',
  'firefox'
];

function usage() {
  console.log([
    '\nUsage: tia <testSuiteRoot> [options]',
    '\n, where:',
    '\n    <testSuiteRoot> - root directory for test suite (can be relative to current working dir)',
    '    Note: browser profile is created in the current working dir.',
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
    '    --forcelogactions forced console logs for all actions. Does not affect file logs.\n',
    '    Works only with --logtoconsole option\n',
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

if (args._.length === 0 || args['h'] || args['help']) {
  usage();
  process.exit(0);
}

var browser = args['b'];
if (browsers.indexOf(browser) === -1) {
  console.error('Invalid browser: ' + browser);
  console.error('Supported browsers are: ' + browsers.join(', '));
  process.exit(1);
}

var suiteRoot = args._[0];

// TODO: support windows separators also.

// Make sure that there is no trailing separator.
if (suiteRoot[suiteRoot.length - 1] === '/') {
  suiteRoot = suiteRoot.slice(0, -1);
}

if (suiteRoot.length < 1) {
  usage();
  process.exit(1);
}

// if (suiteRoot[0] === '/') {
//   console.error('Absolute paths are not allowed.');
//   usage();
//   process.exit(1);
// }

require('../engine/init-global-objects.js');

gIn.params = {}; // Parameters given in the command line.

gIn.params.suiteRoot = suiteRoot;
gIn.params.browser = browser;
gIn.params.path = args['p']; // TODO: support several paths?
gIn.params.minPathSearchIndex = suiteRoot.length + 1; // Minumum index for path search.
gIn.params.mail = args['m'];
gIn.params.stackToLog = args['stacktolog'];
gIn.params.noxvfb = args['noxvfb'];
gIn.params.logsToMail = args['l'];
gIn.params.logErrToConsole = args['logerrtoconsole'];
gIn.params.logDupToStdout = args['logtoconsole'];
gIn.params.trace = args['trace'];
if (gIn.params.trace > 3) {
  gIn.params.trace = 3;
}

gIn.params.forceLogActions = args['forcelogactions'];

if (args['require-modules']) {
  let arr = args['require-modules'].split(/\s*,\s*/);
  for (let reqPath of arr) {
    require(reqPath);
  }
}

// gT.engineConsts.profileRoot
// TODO: now profile creates in current working directory.
// Replace it with testSuiteRoot directory ?

require('../engine/runner.js')(suiteRoot);
