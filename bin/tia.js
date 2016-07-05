#!/usr/bin/env bash
':'; //# comment; exec /usr/bin/env node --harmony "$0" "$@"

'use strict';

/* globals gIn: true, gT */

require('../engine/init-global-objects.js');

var browsers = [
  'chrome', // First browser is default.
  'phantomjs',
  'firefox'
];

function dedent(callSite, ...params) {

  function format(str) {
    return str.replace(/\n    /g, '\n');
  }

  if (typeof callSite === 'string') {
    return format(callSite);
  }

  if (typeof callSite === 'function') {
    return (...args) => format(callSite(...args));
  }

  let output = callSite
    .slice(0, params.length + 1)
    .map((text, i) => (i === 0 ? '' : params[i - 1]) + text)
    .join('');

  return format(output);
}

function usage() {
  console.log(
    dedent`Usage: tia [options]

    , where options:

      --tests-dir <Tests Root Directory> - root directory for test suite (can be relative to current working dir).
      It there is no --tests-dir, tia will check ${gT.engineConsts.testsDirEnvVarName} environment variable.
      If there is no explicit tests directory, current working directory will be used.
      Note: browser profile root is created as sibling to tests directory.

      --browser <browser> (default: ${browsers[0]}) browser to run tests for.
      Supported browsers are: ${browsers.join(', ')}

      --pattern <pattern> - pattern for tests to run.
      , any test which file path (relative to <testSuiteRoot>) contains <pathToDirOrTest> substring will run.
      By default, tests from all directories (recursively) will run.

      --email-cfg-path <path> - path to email config. See tia/doc/mail-cfg-example.json for example.
      See tia/config/default-suite-config.js for more details.
      Note: ${gT.engineConsts.emailCfgPathEnvVarName} environment variable can be used for the same purpose.

      --disable-email - disables email.

      --stack-to-log print stack trace to test logs.

      --xvfb - allow to use xvfb settings from config (see DISPLAY option in config/default-dir-config.js).

      --err-to-console print all errors to console.

      --log-to-console print test logs to console.

      --trace-level <level> enables tracing (1 | 2 | 3 ) (1 - less verbose, 3 - maximum verbosity, 0 - forbids tracing).

      --force-log-actions forced console logs for all actions. Does not affect file logs.
      Works only with --log-to-console option

      --require-modules <paths_separated_by_comma>
      Forces tia to require listed files as Node.js modules.
      ${gT.engineConsts.requireModulesEnvVarName} environment variable also can be used for this.
      
      --diffs-to-mlog - forces diffs to be printed to short meta log. 

      --debug-max - equals to --log-to-console --log-err-to-console --force-log-actions --trace-level 3
      Though --trace-level option can be used to set up needed value in spite of --debug-max.

      --run-self-tests - Run tests for the engine (from tia/tests directory).

      --def-host <host:port> - sets default host and port.
      E.g. --def-host http://localhost:1338
      This parameter allows to use the '$(host)' string in your tests.
      See more details in selHost option description in config/default-dir-config.js.

      --et-mlog - filepath for etalog meta-log (absolute or relative to parent of tests directory).
      If exists, - it is used for meta logs comparison and writing info such as
      ET_MLOG / DIF_MLOG to the head of output.

      --ignore-skip-flag - ignore 'skip' config option in config.js files.

      --use-remote-driver - (for chromedriver only). Starts the browser driver (if it is not already started),
      and forces s.driver.init() to use this external driver.
      The variable gT.firstRunWithRemoteDriver is true when the current run is the first run for which remote driver was initialized. 

      --stop-remote-driver - (for chromedriver only) shuts down the remote driver.

      --ext-log <external_log_path> - before each test this file is removed, and after each test this file content
      is added to test log. This allows to track some unexpected server side errors.
      ${gT.engineConsts.externalLogEnvVarName} environment variable also can be used for this.

      -h, --help - Print this help.

    Examples:
        tia --tests-dir <path_to_my-tests-dir>
        node --harmony bin/tia.js --tests-dir <path_to_my-tests-dir>
    If there is no diffs, 0 is returned, otherwise 1 is returned.
    
    This utility uses external utilities (diff, rm) and webdriver.
    see readme.md for more details.`
  );
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
  string: [
    'tests-dir',
    'browser',
    'pattern',
    'trace-level',
    'require-modules',
    'def-host',
    'et-mlog',
    'email-cfg-path',
    'ext-log'
  ],
  boolean: [
    'h',
    'help',
    'stack-to-log',
    'xvfb',
    // 'logs-to-mail',
    'log-err-to-console',
    'log-to-console',
    'force-log-actions',
    'diffs-to-mlog',
    'debug-max',
    'run-self-tests',
    'ignore-skip-flag',
    'use-remote-driver',
    'stop-remote-driver',
    'disable-email'
  ],
  default: {
    browser: browsers[0],
    l: false,
    'trace-level': -1
    // , 'ignore-skip-flag': false
  },
  unknown: unknownOption
};

var args = require('minimist')(process.argv.slice(2), opts);

const camelcaseKeys = require('camelcase-keys');
args = camelcaseKeys(args);

if (args['h'] || args['help']) {
  usage();
  process.exit(0);
}

var path = require('path');

if (args.runSelfTests) {
  args.testsDir = path.resolve(path.join(__dirname, '..', 'tests'));
  args.etMlog = gT.engineConsts.selfTestsEtMLog;
  args.extLog = gT.engineConsts.selfTestsExtLog;
}

if (args.debugMax) {
  args.logToConsole = true;
  args.errToConsole = true;
  args.forceLogActions = true;
  if (args.traceLevel === -1) {
    args.traceLevel = 3;
  }
}

var browser = args.browser;
if (browsers.indexOf(browser) === -1) {
  console.error('Invalid browser: ' + browser);
  console.error('Supported browsers are: ' + browsers.join(', '));
  process.exit(1);
}

// TODO: support windows separators also.

var testsDir = args.testsDir;

if (!testsDir) {
  testsDir = process.env[gT.engineConsts.testsDirEnvVarName];
  if (!testsDir) {
    testsDir = process.cwd();
  }
} else {
  testsDir = path.resolve(testsDir);
}

// Make sure that there is no trailing separator.
if (testsDir[testsDir.length - 1] === '/') {
  testsDir = testsDir.slice(0, -1);
}

if (!args.requireModules) {
  args.requireModules = process.env[gT.engineConsts.requireModulesEnvVarName];
}

gIn.params = args;
gIn.params.testsDir = testsDir;

if (!gIn.params.emailCfgPath) {
  gIn.params.emailCfgPath = process.env[gT.engineConsts.emailCfgPathEnvVarName];
}

if (gIn.params.emailCfgPath) {
  gIn.params.emailCfgPath = path.resolve(gIn.params.emailCfgPath);
  gIn.tracer.trace3('Email cfg path: ' + gIn.params.emailCfgPath);
  gT.suiteConfigDefault = gIn.configUtils.mergeConfigs(gT.suiteConfigDefault, require(gIn.params.emailCfgPath));
} else {
  gIn.tracer.trace3('No email cfg path');
}

if (!gIn.params.extLog) {
  gIn.params.extLog = process.env[gT.engineConsts.externalLogEnvVarName];
}

if (gIn.params.extLog) {
  gIn.params.extLog = path.resolve(gIn.params.extLog);
  gIn.tracer.trace3('External log path: ' + gIn.params.extLog);
} else {
  gIn.tracer.trace3('No external log path');
}

gIn.params.testsParentDir = path.dirname(testsDir);

gIn.tracer.trace3('Tests Dir: ' + testsDir);
gIn.tracer.trace3('Tests Parent Dir: ' + gIn.params.testsParentDir);

gIn.params.profileRootPath = path.join(gIn.params.testsParentDir, gT.engineConsts.profileRootDir);

if (gIn.params.etMlog && !path.isAbsolute(gIn.params.etMlog)) {
  gIn.params.etMlog = path.join(gIn.params.testsParentDir, gIn.params.etMlog);
}

gIn.tracer.trace3('Etalon Metalog path: ' + gIn.params.etMlog);

// TODO: support several paths for pattern?

if (gIn.params.traceLevel > 3) {
  gIn.params.traceLevel = 3;
}

gIn.tracer.trace2('Browsers profile root: ' + gIn.params.profileRootPath);

gIn.params.minPathSearchIndex = testsDir.length + 1; // Minumum index for path search.

if (args.requireModules) {
  let arr = args.requireModules.split(/\s*,\s*/);
  for (let reqPath of arr) {
    require(path.resolve(reqPath));
  }
}

if (gIn.params.defHost) {
  gT.dirConfigDefault.selHost = gIn.params.defHost;
}

// gIn.params.profileRootPath
// TODO: now profile creates in current working directory.
// Replace it with testSuiteRoot directory ?

require('../engine/runner.js')(testsDir);
