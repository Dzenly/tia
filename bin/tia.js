#!/usr/bin/env bash

':'; //# comment; exec /usr/bin/env node "$0" "$@"
'use strict';

// http://sambal.org/2014/02/passing-options-node-shebang-line/

/* globals gIn: true, gT */
const nodeUtils = require('../utils/nodejs-utils.js');

nodeUtils.checkNodeJsVersion();

const { inspect } = require('util');
const tiaArgsUtils = require('../utils/tia-arguments-utils.js');
const _ = require('lodash');
const { runTestSuites } = require('../engine/runner.js');

require('../engine/init-global-objects.js');
const helpUtils = require('../utils/help-utils.js');

gT.browsers = [
  'chrome', // First browser is default.
  'phantomjs',
  'firefox',
];

function unknownOption(option) {
  if (option && option.substr(0, 1) === '-') {
    gIn.cLogger.errln(`Unknown option: "${option}"\n`);
    helpUtils.usage();
    process.exit(1);
  }
  return true;
}

const opts = {
  // trace is number, numbers implied by default in minimist.
  string: [
    'browser',
    'browser-log-level',
    'def-host',
    'driver-log-level',

    'email-cfg-path',
    'ext-log',
    'hang-timeout',
    'pattern',
    'require-modules',
    'root-dir',
    'too-long-time',
    'trace-level',
  ],
  boolean: [ // 'logs-to-mail',
    'debug-avg',
    'debug-max',
    'diffs-to-mlog',
    'disable-email',
    'ej-explore',
    'err-to-console',
    'force-log-actions',
    'ignore-skip-flag',
    'h',
    'help',
    'keep-browser-at-error',
    'log-err-to-console',
    'log-to-console',
    'run-self-tests',
    'share-browser',
    'stack-to-log',
    'stop-remote-driver',
    'use-remote-driver',
    'v',
    'version',
    'xvfb',
  ],
  default: {
    browser: gT.browsers[0],

    // l: false,
    'browser-log-level': gT.engineConsts.defaultBrowserLogLevel,
    'driver-log-level': gT.engineConsts.defaultDriverLogLevel,
    'hang-timeout': gT.engineConsts.hangTimeout,
    'too-long-time': gT.engineConsts.tooLongTime,
    'trace-level': -1,

    // , 'ignore-skip-flag': false
  },
  unknown: unknownOption,
};

let args = require('minimist')(process.argv.slice(2), opts);

const camelcaseKeys = require('camelcase-keys');

args = camelcaseKeys(args);

if (args.h || args.help) {
  helpUtils.usage();
  process.exit(0);
}

if (args.v || args.version) {
  console.log(require('../package.json').version);
  process.exit(0);
}

const path = require('path');

if (args.runSelfTests) { // Tests for the engine.
  args.rootDir = path.resolve(path.join(__dirname, '..'));
  args.etMlog = gT.engineConsts.selfTestsEtMLog;
  args.extLog = gT.engineConsts.selfTestsExtLog;
}

if (args.debugAvg) {
  args.logToConsole = true;
  args.errToConsole = true;
  args.keepBrowserAtError = true;
  if (args.traceLevel === -1) {
    args.traceLevel = 2;
  }
}

if (args.debugMax) {
  args.logToConsole = true;
  args.errToConsole = true;
  args.keepBrowserAtError = true;
  args.forceLogActions = true;
  if (args.traceLevel === -1) {
    args.traceLevel = 3;
  }
}

const { browser } = args;
if (gT.browsers.indexOf(browser) === -1) {
  gIn.cLogger.errln(`Invalid browser: ${browser}`);
  gIn.cLogger.errln(`Supported browsers are: ${gT.browsers.join(', ')}`);
  process.exit(1);
}

gIn.params = args;

const rootDir = tiaArgsUtils.resolveMandatoryPathOption({
  cmdLineArgsPath: args.rootDir,
  envVarName: gT.engineConsts.rootDirEnvVarName,
  description: 'Root directory',
  cutLastDirSep: true,
});

gIn.params.rootDir = rootDir;

if (!args.requireModules) {
  args.requireModules = process.env[gT.engineConsts.requireModulesEnvVarName];
}

if (!gIn.params.emailCfgPath) {
  gIn.params.emailCfgPath = process.env[gT.engineConsts.emailCfgPathEnvVarName];
}

if (gIn.params.emailCfgPath) {
  gIn.params.emailCfgPath = path.resolve(gIn.params.emailCfgPath);
  gIn.tracer.msg3(`Email cfg path: ${gIn.params.emailCfgPath}`);
  gT.suiteConfigDefault = _.merge(_.cloneDeep(gT.suiteConfigDefault), require(gIn.params.emailCfgPath));
} else {
  gIn.tracer.msg3('No email cfg path');
}

if (!gIn.params.extLog) {
  gIn.params.extLog = process.env[gT.engineConsts.externalLogEnvVarName];
}

if (gIn.params.extLog) {
  gIn.params.extLog = path.resolve(gIn.params.extLog);
  gIn.tracer.msg3(`External log path: ${gIn.params.extLog}`);
} else {
  gIn.tracer.msg3('No external log path');
}

gIn.params.testsParentDir = path.dirname(rootDir);

gIn.tracer.msg3(`Tests Parent Dir: ${gIn.params.testsParentDir}`);

// gIn.params.profileRootPath = path.join(
//   gIn.params.testsParentDir,
//   gT.engineConsts.suiteMetaDirName,
//   gT.engineConsts.profileRootDir
// );

if (gIn.params.etMlog && !path.isAbsolute(gIn.params.etMlog)) {
  gIn.params.etMlog = path.join(gIn.params.testsParentDir, gIn.params.etMlog);
}

gIn.tracer.msg3(`Etalon Metalog path: ${gIn.params.etMlog}`);

// TODO: support several paths for pattern?

if (gIn.params.traceLevel > 3) {
  gIn.params.traceLevel = 3;
}

// gIn.tracer.msg2(`Browsers profile root: ${gIn.params.profileRootPath}`);

gIn.tracer.msg2(`chromedriver path: ${gIn.chromeDriverPath}`);

gIn.params.minPathSearchIndex = rootDir.length + 1; // Minimum index for path search.

if (args.requireModules) {
  const arr = args.requireModules.split(/\s*,\s*/);
  arr.forEach((reqPath) => {
    require(path.resolve(reqPath));
  });
}

if (gIn.params.defHost) {
  gT.dirConfigDefault.selHost = gIn.params.defHost;
}

// gIn.params.profileRootPath
// TODO: now profile creates in current working directory.
// Replace it with testSuiteRoot directory ?

// process.on('uncaughtException', (err) => {
//   gIn.logger.errorln('TIA: uncaughtException:');
//   gIn.logger.exception(err);
//   throw err;
// });

if (gIn.params.ejExplore) {
  gIn.params.keepBrowserAtError = true;
}

gIn.tracer.msg3(`Parameters: ${inspect(gIn.params)}`);

runTestSuites()
  .then((res) => {

  });
