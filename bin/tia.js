#!/usr/bin/env node

// ':' //# comment; exec /usr/bin/env node "$0" "$@"
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

const { version } = require('../package.json');

console.log(`TIA version: ${version}`);

nodeUtils.checkNodeJsVersion();

require('../engine/init-global-objects.js');

gT_.version = version;

gT_.browsers = [
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
    'update-logs',
  ],
  boolean: [ // 'logs-to-mail',
    'clear-profiles',
    'debug-avg',
    'debug-locale',
    'debug-max',
    'difs-to-slog',
    'dir',
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
    'slog-dif-to-console',
    'stack-to-log',
    'stop-remote-driver',
    'suite',
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

if (args.v || args.version) {
  process.exit(0);
}

// args._ массив без -- или -.

if (args.checkLogs) {
  // TODO: Доделать.
  const allowedArr = [
    'ignoreGood', // No difs, no fails, no empty.
    'expected',

    // 'silent', // Do not ask for confirmation on dif applying.

  ];

  args.checkLogs = args.checkLogs.split(',');
}

if (args.runSelfTests) { // Tests for the engine.
  args.rootDir = path.resolve(path.join(__dirname, '..'));
  args.extLog = gT.engineConsts.selfTestsExtLog;
  args.difsToSlog = true;
  args.slogDifToConsole = true;
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

gT.cLParams = args;

if (args._.includes('initRoot')) {
  tiaArgsUtils.initTiaRoot(args.rootDir); // function ends with process.exit().
}

if (args._.includes('initSuite')) {
  tiaArgsUtils.initTiaSuite(); // function ends with process.exit().
}

const rootDir = tiaArgsUtils.resolveRootDirEx(args.rootDir);
gT.cLParams.rootDir = rootDir;

if (!args.requireModules) {
  args.requireModules = process.env[gT.engineConsts.requireModulesEnvVarName];
}

gT_.rootTestsDirPath = path.join(gT.cLParams.rootDir, gT.engineConsts.suiteDirName);

// =====================
gT_.rootResultsDir = path.join(
  gT.rootTestsDirPath,
  gT.engineConsts.rootResDirName
);

// =====================
const rootSuiteConfig = nodeUtils.requireIfExists(path.join(
  gT.rootResultsDir,
  gT.engineConsts.suiteRootConfigName
));
gT_.rootSuiteConfig = _.merge(_.cloneDeep(gT.suiteConfigDefault), rootSuiteConfig);

// =====================
const globalConfig = nodeUtils.requireIfExists(path.join(
  gT.rootResultsDir,
  gT.engineConsts.globalConfigName
));
gT_.globalConfig = _.merge(_.cloneDeep(gT.globalConfigDefault), globalConfig);

if (!gT.globalConfig.rootDirAlias) {
  gT_.globalConfig.rootDirAlias = path.basename(gT.cLParams.rootDir);
}

// =====================

gT_.defaultRootProfile = path.join(
  gT.rootResultsDir,
  gT.engineConsts.browserProfilesRootDirName,
  gT.engineConsts.defaultBrowserProfileName
);

// =====================

if (gT.cLParams.suite && gT.cLParams.dir) {
  console.error('You can not use --dir and --suite simultaneously');
  process.exit(1);
}

if (gT.cLParams.suite || gT.cLParams.dir) {
  gT.cLParams.suite = tiaArgsUtils.getTiaSuiteFromParents(process.cwd());
}

if (gT.cLParams.dir) {
  gT.cLParams.dir = process.cwd();
  gIn.dirArr = path.relative(gT.cLParams.suite, gT.cLParams.dir).split(path.sep);
}

// =====================
const rootDirConfig = nodeUtils.requireIfExists(path.join(
  gT.rootResultsDir,
  gT.engineConsts.dirRootConfigName
));
gT_.rootDirConfig = _.merge(_.cloneDeep(gT.dirConfigDefault), rootDirConfig);

// =====================
gT_.rootLog = path.join(
  gT.rootResultsDir,
  gT.engineConsts.rootLogName + gT.engineConsts.logExtension
);

// =====================
gT.cLParams.emailCfgPath = tiaArgsUtils.resolvePathOptionRelativeToRootDir({
  cmdLineArgsPath: gT.cLParams.emailCfgPath,
  envVarName: gT.engineConsts.emailCfgPathEnvVarName,
  description: 'EMail cfg path',
  cutLastDirSep: false,
  mandatory: false,
});

if (gT.cLParams.emailCfgPath) {
  gT_.rootSuiteConfig = _.merge(_.cloneDeep(gT.rootSuiteConfig), require(gT.cLParams.emailCfgPath));
}

// =====================
if (!gT.cLParams.extLog) {
  gT.cLParams.extLog = process.env[gT.engineConsts.externalLogEnvVarName];
}

if (gT.cLParams.extLog) {
  gT.cLParams.extLog = path.resolve(gT.cLParams.extLog);
  gIn.tracer.msg3(`External log path: ${gT.cLParams.extLog}`);
} else {
  gIn.tracer.msg3('No external log path');
}

// =====================
if (gT.cLParams.slogSubj) {
  gT.cLParams.slogSubj = gT.cLParams.slogSubj.split(',');
  for (const subjItem of gT.cLParams.slogSubj) {
    if (!argConsts.allowedSlogSubj.includes(subjItem)) {
      gIn.cLogger.errln(`Not supported subject item: ${subjItem}`);
      gIn.cLogger.errln(`Supported items: ${argConsts.allowedSlogSubj.join(',')}`);
      process.exit(1);
    }
  }
} else {
  gT.cLParams.slogSubj = [];
}

// =====================
gT.cLParams.testsParentDir = path.dirname(rootDir);

gIn.tracer.msg3(`Tests Parent Dir: ${gT.cLParams.testsParentDir}`);

// TODO: support several paths for pattern?

if (gT.cLParams.traceLevel > 3) {
  gT.cLParams.traceLevel = 3;
}

gIn.tracer.msg2(`chromedriver path: ${gIn.chromeDriverPath}`);

gT.cLParams.minPathSearchIndex = rootDir.length + 1; // Minimum index for path search.

if (args.requireModules) {
  const arr = args.requireModules.split(/\s*,\s*/);
  nodeUtils.requireArray(arr);
}

if (gT.cLParams.defHost) {
  gT_.rootDirConfig.selHost = gT.cLParams.defHost;
}

// process.on('uncaughtException', (err) => {
//   gIn.logger.errorln('TIA: uncaughtException:');
//   gIn.logger.exception(err);
//   throw err;
// });

if (gT.cLParams.ejExplore) {
  gT.cLParams.keepBrowserAtError = true;
}

gIn.tracer.msg3(`Parameters: ${inspect(gT.cLParams)}`);

runTestSuites()
  .then((res) => {
    const asdf = 5;
  })
  .catch((e) => {
    gIn.tracer.err(e);
    gIn.tracer.err(e.stack);
    throw e;
  });
