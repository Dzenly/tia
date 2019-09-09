'use strict';

// This config is used by all Test suites. They are not overloaded.
export const rootDirEnvVarName = 'TIA_ROOT_DIR';

// Directory name for tests suite. Only tests from this directory are launched.
// The project can contain many test suites.
export const suiteDirName = '__tia-tests__';

// Name for subdirectory inside <suiteDirName> directory that keeps the suite
// configs and results:
// * Suite etalog log.
// * Current suite logs in various formats.
// The <project root>/__tia-tests__ also contains such a directory with project level results.
export const suiteResDirName = '_tia-suite';

// __tia-tests__/_tia-root keeps root.log, tia-root-dir-config.js, tia-root-suite-config.js.
// This directory is created by the `tia [--root-dir=<yourPrjRootDir>] init` command
export const rootResDirName = '_tia-root';

export const moveDuration = 100;

export const noEtalonTests = 'no-etalon-tests.log';

export const logExtension = '.log';

export const etalonExtension = '.et';

export const suiteLogName = 'suite';

export const rootLogName = 'root';

export const tiaJsSuffix = '.tia.js'; // Files with this suffix are considered as test for TIA.

export const tiaTsSuffix = '.tia.ts'; // Files with this suffix are considered as test for TIA.

export const requireModulesEnvVarName = 'TIA_REQUIRE_MODULES';

// These patterns are ignored.
export const patternsToIgnore = [/^\./, /^node_modules$/];

export const emailCfgPathEnvVarName = 'TIA_EMAIL_CFG_PATH';

export const externalLogEnvVarName = 'TIA_EXTERNAL_LOG';

// File name for directory configs.
export const dirConfigName = 'tia-dir-config.js';

// File name for the root directory config.
// There is the only such file and it must be located in <rootDir>/__tia-tests__ directory.
export const dirRootConfigName = 'tia-root-dir-config.js';

// File name for suite configs.
export const suiteConfigName = 'tia-suite-config.js';

// File name for the root suite config.
// There is the only such file and it must be located in <rootDir>/__tia-tests__ directory.
export const suiteRootConfigName = 'tia-root-suite-config.js';

// Some global configs. You can add any your options which will be used for all tests.
// See config/default-global-config.js for options used by TIA.
export const globalConfigName = 'tia-global-config.js';

// Browser profile directory. You can not override this path.
export const browserProfilesRootDirName = 'tia-browser-profiles';

export const defaultBrowserProfileName = 'default';

// Default display for GUI tests.
export const defDisplay = process.env.DISPLAY;

// TODO: Log name for git pull, this log will be sent to the email.
export const gitPullLog = 'gitpull.log';

// File name for PID for remote chrome driver.
export const remoteChromeDriverPid = 'cd.pid';

// File name for PID for remote chrome driver.
export const remoteChromeDriverSid = 'cd.sid';

export const logEncoding = 'utf8'; // ascii

export const selfTestsExtLog = 'ext-log.log'; // TODO: Should be in dir config or there should be
// function like t.setExternalLogs.

export const hangTimeout = 180000; // Timeout (ms) after which action function considered as hanging.

export const tooLongTime = 1e12; // If tests exceeded this duration (ms) the TOO_LONG prefix will be added to email subject.

export const defaultWaitTimeout = 40000; // Default timeout for e.wait functions.;

export const timeoutForSearchByTEQ = 4000; // Timeout to wait for ExtJs component existence and visibility.

export const timeoutForEnabledByTEQ = 5000; // Timeout to wait for ExtJs component enabling.

// Delay before click on ExtJs element. It seems like ExtJs does not handle
// too fast clicking.
export const extJsClickDelay = 0; // milliseconds.

export const maxRecursiveErrCountForTest = 2; // Maximum recursive errors count for one test.

// Maximum tests count with recursive errors if this limit is exceeded
// all tests will be cancelled.
export const maxTestCountWithRecursiveError = 2;

// Comboboxes have a glitch, at one left click they can open boundList and immediately close it.
// This constant sets how many times tia will retry to click comboboxes if bound List is not opened.
// If retry count is 0 the only one attempt to click combobox will be performed.
export const cbRetryClicksCount = 2;

export const cbBoundListTimeout = 7000; // milliseconds for waiting of bound list to be opened after click on combobox.

// milliseconds for waiting of ajax requests after clicks.
// This is actual for lazy loading some stuff at clicking.
// TODO: increase after good debugging. For now low value is needed to detect unstable parts.
export const ajaxTimeoutAfterClick = 15000;

export const elGetTextFail = 'ElGetTextFail'; // The error message for getText fail for Web Element.

export const defIsPassCountingEnabled = true; // Default value of pass counting for tests.

export const defLLLogAction = true; // Default value for low level actions logging.

export const remoteDriverStartDelay = 2000; // The time for remote driver to start.

export const mailWaitTimeout = 20; // Seconds. If we failed to send mail we will wait this amount of seconds and retry.

export const mailAttemptsCount = 10; // Times. If we failed to send mail we will retry this amount of times.

// Default messages level to get from browser console.
// It can prode diffs. So for release you can se it to 900 (WARNING).
// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Level.html
export const defaultBrowserLogLevel = 1000;

// Default logs level for webdriver.
export const defaultDriverLogLevel = 900;

// https://bugs.chromium.org/p/chromedriver/issues/detail?id=817#c21
// TODO: use this if --dns-prefetch-disable will not work.
export const defaultDelayAfterDriverCreate = 2000; // Delay after webdriver create to avoid error.

// Error message for force test case cancelling.
export const CANCELLING_THE_TEST = 'Force cancelling the test';

// Error message for force test suite cancelling.
export const CANCELLING_THE_SUITE = 'Force cancelling the suite';
