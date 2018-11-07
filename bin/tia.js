#!/usr/bin/env node

// TODO: check how the starting shebang will work on windows.
// ':' //# comment; exec /usr/bin/env node "$0" "$@"
// Don't allow eslint to set semicolon after ':' above.
// http://sambal.org/2014/02/passing-options-node-shebang-line/

'use strict';

process.env.SELENIUM_PROMISE_MANAGER = 0;

const path = require('path');

/* globals gIn: true, gT */

const camelcaseKeys = require('camelcase-keys');
const createArgs = require('minimist');
const { inspect } = require('util');
const _ = require('lodash');

const nodeUtils = require('../utils/nodejs-utils');
const argConsts = require('../utils/arg-consts.js');
const helpUtils = require('../utils/help-utils.js');
const { runTestSuites } = require('../engine/runner.js');
const tiaArgsUtils = require('../utils/tia-arguments-utils.js');

nodeUtils.checkNodeJsVersion();

require('../engine/init-global-objects.js');

gT.version = require('../package.json').version;

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
    'check-logs',
    'def-host',
    'driver-log-level',

    'email-cfg-path',
    'ext-log',
    'hang-timeout',
    'pattern',
    'require-modules',
    'root-dir',
    'slog-subj',
    'too-long-time',
    'trace-level',

  ],
  boolean: [ // 'logs-to-mail',
    'debug-avg',
    'debug-locale',
    'debug-max',
    'diffs-to-slog',
    'ej-explore',
    'enable-email',
    'err-to-console',
    'force-log-actions',
    'ignore-skip-flag',
    'h',
    'headless',
    'help',
    'keep-browser-at-error',
    'log-to-console',
    'new',
    'print-proc-info',
    'run-self-tests',
    'share-browser',
    'show-empty-suites',
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

let args = createArgs(process.argv.slice(2), opts);

args = camelcaseKeys(args);

if (args.h || args.help) {
  helpUtils.usage();
  process.exit(0);
}

console.log(gT.version);

if (args.v || args.version) {
  process.exit(0);
}

if (args._.includes('initRoot')) {
  tiaArgsUtils.initTiaRoot(args.rootDir);
}

if (args._.includes('initSuite')) {
  tiaArgsUtils.initTiaSuite();
}

// args._ массив без -- или -.

if (args.checkLogs) {
  const allowedArr = [
    'ignoreGood', // No diffs, no fails, no empty.
    'expected',

    // 'silent', // Do not ask for confirmation on diff applying.

  ];

  args.checkLogs = args.checkLogs.split(',');
}

if (args.runSelfTests) { // Tests for the engine.
  args.rootDir = path.resolve(path.join(__dirname, '..'));
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

const rootDir = tiaArgsUtils.resolveRootDirEx(args.rootDir);
gIn.params.rootDir = rootDir;

if (!args.requireModules) {
  args.requireModules = process.env[gT.engineConsts.requireModulesEnvVarName];
}

gT.rootTestsDirPath = path.join(gIn.params.rootDir, gT.engineConsts.suiteDirName);

// =====================
const rootSuiteConfig = nodeUtils.requireIfExists(path.join(
  gT.rootTestsDirPath,
  gT.engineConsts.rootResDirName,
  gT.engineConsts.suiteRootConfigName
));
gT.rootSuiteConfig = _.merge(_.cloneDeep(gT.suiteConfigDefault), rootSuiteConfig);

// =====================
const globalConfig = nodeUtils.requireIfExists(path.join(
  gT.rootTestsDirPath,
  gT.engineConsts.rootResDirName,
  gT.engineConsts.globalConfigName
));
gT.globalConfig = _.merge(_.cloneDeep(gT.globalConfigDefault), globalConfig);

if (!gT.globalConfig.rootDirAlias) {
  gT.globalConfig.rootDirAlias = path.basename(gIn.params.rootDir);
}

// =====================
const rootDirConfig = nodeUtils.requireIfExists(path.join(
  gT.rootTestsDirPath,
  gT.engineConsts.rootResDirName,
  gT.engineConsts.dirRootConfigName
));
gT.rootDirConfig = _.merge(_.cloneDeep(gT.dirConfigDefault), rootDirConfig);

// =====================
gT.rootLog = path.join(
  gT.rootTestsDirPath,
  gT.engineConsts.rootResDirName,
  gT.engineConsts.rootLogName + gT.engineConsts.logExtension
);

// =====================
gIn.params.emailCfgPath = tiaArgsUtils.resolvePathOptionRelativeToRootDir({
  cmdLineArgsPath: gIn.params.emailCfgPath,
  envVarName: gT.engineConsts.emailCfgPathEnvVarName,
  description: 'EMail cfg path',
  cutLastDirSep: false,
  mandatory: false,
});

if (gIn.params.emailCfgPath) {
  gT.rootSuiteConfig = _.merge(_.cloneDeep(gT.rootSuiteConfig), require(gIn.params.emailCfgPath));
}

// =====================
if (!gIn.params.extLog) {
  gIn.params.extLog = process.env[gT.engineConsts.externalLogEnvVarName];
}

if (gIn.params.extLog) {
  gIn.params.extLog = path.resolve(gIn.params.extLog);
  gIn.tracer.msg3(`External log path: ${gIn.params.extLog}`);
} else {
  gIn.tracer.msg3('No external log path');
}

// =====================
if (gIn.params.slogSubj) {
  gIn.params.slogSubj = gIn.params.slogSubj.split(',');
  for (const subjItem of gIn.params.slogSubj) {
    if (!argConsts.allowedSlogSubj.includes(subjItem)) {
      gIn.cLogger.errln(`Not supported subject item: ${subjItem}`);
      gIn.cLogger.errln(`Supported items: ${argConsts.allowedSlogSubj.join(',')}`);
      process.exit(1);
    }
  }
} else {
  gIn.params.slogSubj = [];
}

// =====================
gIn.params.testsParentDir = path.dirname(rootDir);

gIn.tracer.msg3(`Tests Parent Dir: ${gIn.params.testsParentDir}`);

// TODO: support several paths for pattern?

if (gIn.params.traceLevel > 3) {
  gIn.params.traceLevel = 3;
}

gIn.tracer.msg2(`chromedriver path: ${gIn.chromeDriverPath}`);

gIn.params.minPathSearchIndex = rootDir.length + 1; // Minimum index for path search.

if (args.requireModules) {
  const arr = args.requireModules.split(/\s*,\s*/);
  nodeUtils.requireArray(arr);
}

if (gIn.params.defHost) {
  gT.rootDirConfig.selHost = gIn.params.defHost;
}

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
    const asdf = 5;
  })
  .catch((e) => {
    gIn.tracer.err(e);
    gIn.tracer.err(e.stack);
    throw e;
  });
