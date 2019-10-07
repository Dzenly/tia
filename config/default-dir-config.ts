// The default config for test directories.
// Options can be overloaded in directory configs.

// Some functions can write some info to the Test log.

// By default, low level functions writes info to the Test log.
// But high level functions disable logs from low level functions they called,
// using enableLog = false.
// Default value for enableLog for low level functions is defined in gT.engineConstants.defLLLogAction.
// See also gT.lL.setDefaultLlLogAction and gT.lL.setLlPassCounting.

// Sometimes lazy programmers do not wait when event loop will be free before test exit.
// It can be due to exception, rejection promise, etc.
// If event handlers uses l.print(), it will write log to another test log.
// As a workaround for such unsafe directories, you can set this option.
export const delayAfterTest = 0;

// Enables timings output for low level functions.
// It creates diffs in Test logs, so don't use this in CI tests.
export const enableTimings = false;

// Should be overridden by tia-dir-config.js to specify section title.
export const sectionTitle = '';

// true - disables pass and fail counters incrementation.
// Can be used to test the TIA and for high level functions.
export const ignorePassAndFailCounters = false;

// Directories and files to ignore
export const ignoreNames = ['tia-ignore-me', 'node_modules', '.idea', '.vscode', '.git'];

// Array of absolute paths or paths relative to root dir.
// They will be required before all dir tests.
export const requireMods = [];

// If some test is failed, info about memory usage will be printed to its log.
// But if RSS is less then this threshold in MegaBytes, then info will not be printed.
export const rssUsageThreshold = 500;

// If overridden in tia-dir-config.js, all tests from according directory will be skipped.
// To skip one test - just rename it to don't have `.tia.js` extension.
// Skipped tests are calculated in suite log.
export const skip = false;

// Print Browser exceptions which occurred during low level function calls.
export const selPrintClExcAfterEachCommand = false;

// TODO: перенести в константы и cmd line?
// TODO: включать при отладке?
// Print Browser console output which occurred during low level function calls.
export const selPrintClConsoleAfterEachCommand = false;

// Display for non-GUI mode.
// E.g. you can run Xvfb as "Xvfb :1 -screen 5 2560x1440x24"), and use `DISPLAY: ':1.5`.
// пустая строка - дефолтный DISPLAY.
export const DISPLAY = ':1.5';

// Browser profile directory, relative to gIn.suite.browserProfilesPath:
// __tia-tests__/_tia-suite/tia-browser-profiles/<browserProfileDir config value>.
// If this path is empty, default root profile <prj-root>/__tia-tests__/_tia-root/tia-browser-profiles/default
// (common for all suites) will be used.
export const browserProfileDir = '';

// TODO
// Уровень сообщений, отлавливаемых в консоли браузера. SEVERE или WARNING.
// Из-за этих сообщений могут быть дифы. Ближе к релизу можно ставить WARNING.
// export const selConsoleReportLevel= 'SEVERE',

// Host for selenium tests (including ExtJs tests).
// In general you use --sel-host=http://myhost:myport.
// But you can specify this value in tia-dir-config.js.
// When URLs are written to Test logs this string will be replaced by `$(host)`.
// And vice versa, in functions which take URL, the '$(host)' will be replaced
// by this value.
export const selHost = 'http://10.4.3.214';

// Print resource usage at error. Makes sense to disable for tests for errors testing.
export const resUsagePrintAtErrors = true;

// TODO ?:
// export const stopTestsIfThrow= false, // Can be overriden in tests for test engine.
// export const stopTestsIfFail= false, // Can be overriden in tests for test engine.
// export const stopTestsIfDiff= false, // Can be overriden in tests for test engine.
// export const logVerboseResults= true, // Show results for non-diffed *.js tests in suiteLog.
// export const logSubItemIndent= ' ', // Indent for subsection or for *.js inside section.
// If false - there will not be section with detailed results.
