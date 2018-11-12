'use strict';

// The default config for test directories.
// Options can be overloaded in directory configs.
module.exports = {

  // Some functions can write some info to the Test log.

  // By default, low level functions writes info to the Test log.
  // But high level functions disable logs from low level functions they called,
  // using logAction = false.
  // Default value for logAction for low level functions is defined in gT.engineConstants.defLLLogAction.
  // See also gT.lL.setDefaultLlLogAction and gT.lL.setLlPassCounting.

  // Sometimes lazy programmers do not wait when event loop will be free before test exit.
  // It can be due to exception, rejection promise, etc.
  // If event handlers uses l.print(), it will write log to another test log.
  // As a workaround for such unsage directories, you can set this option.
  delayAfterTest: 0,

  // milliseconds between selenium low level calls. Just for visualization at tests writting.
  // Use 0 for CI tests.
  selActionsDelay: 0,

  // Enables timings output for low level functions.
  // It creates diffs in Test logs, so don't use this in CI tests.
  enableTimings: false,

  // Should be overridden by tia-dir-config.js to specify section title.
  sectionTitle: '',

  // true - disables pass and fail counters incrementation.
  // Can be used to test the TIA and for high level functions.
  ignorePassAndFailCounters: false,

  // Array of absolute paths or paths relative to root dir.
  // They will be required before all dir tests.
  require: [],

  // If some test is failed, info about memory usage will be printed to its log.
  // But if RSS is less then this threshold in MegaBytes, then info will not be printed.
  rssUsageThreshold: 500,

  // If overridden in tia-dir-config.js, all tests from according directory will be skipped.
  // To skip one test - just rename it to don't have `.tia.js` extension.
  // Skipped tests are calculated in suite log.
  skip: false,

  // Print Browser exceptions which occurred during low level function calls.
  selPrintClExcAfterEachCommand: false,

  // TODO: перенести в константы и cmd line?
  // TODO: включать при отладке?
  // Print Browser console output which occurred during low level function calls.
  selPrintClConsoleAfterEachCommand: false,

  // Display for non-GUI mode.
  // E.g. you can run Xvfb as "Xvfb :1 -screen 5 2560x1440x24"), and use `DISPLAY: ':1.5`.
  // пустая строка - дефолтный DISPLAY.
  DISPLAY: ':1.5',

  // Browser profile path relative to __tia__ subdirectory of the current Test suite.
  // You can access the full path by gIn.suite.browserProfilePath.
  // For now profiles are supported for chrome only.
  // If this config value is empty - default path will be used and it will be deleted at browser closing,
  // so all cookies, etc. will be destroyed.
  // Please, use carefully, because `rm -rf` will be used for the browser profiles.
  selProfilePath: '',

  // TODO
  // Уровень сообщений, отлавливаемых в консоли браузера. SEVERE или WARNING.
  // Из-за этих сообщений могут быть дифы. Ближе к релизу можно ставить WARNING.
  // selConsoleReportLevel: 'SEVERE',

  // Host for selenium tests (including ExtJs tests).
  // In general you use --sel-host=http://myhost:myport.
  // But you can specify this value in tia-dir-config.js.
  // When URLs are written to Test logs this string will be replaced by `$(host)`.
  // And vice versa, in functions which take URL, the '$(host)' will be replaced
  // by this value.
  selHost: 'http://localhost:1337',

  // Print resource usage at error. Makes sense to disable for tests for errors testing.
  resUsagePrintAtErrors: true,

  // TODO ?:
  // stopTestsIfThrow: false, // Can be overriden in tests for test engine.
  // stopTestsIfFail: false, // Can be overriden in tests for test engine.
  // stopTestsIfDiff: false, // Can be overriden in tests for test engine.
  // logVerboseResults: true, // Show results for non-diffed *.js tests in suiteLog.
  // logSubItemIndent: ' ', // Indent for subsection or for *.js inside section.
  // If false - there will not be section with detailed results.
};

