'use strict';

const argConsts = require('./arg-consts.js');

/* global gT */

function dedent(callSite, ...params) {
  function format(str) {
    return str.replace(/\n {4}/g, '\n');
  }

  if (typeof callSite === 'string') {
    return format(callSite);
  }

  if (typeof callSite === 'function') {
    return (...args) => format(callSite(...args));
  }

  const output = callSite
    .slice(0, params.length + 1)
    .map((text, i) => (i === 0 ? '' : params[i - 1]) + text)
    .join('');

  return format(output);
}

exports.usage = function usage() {
  console.log(
    dedent`Usage:
    tia initRoot - to create project root TIA subdirectories and config stubs.

    tia initSuite - to create suite TIA subdirectories and config stubs.

    tia [options] - to run tests.

    , where options:

      --browser <browser> (default: ${gT.browsers[0]}) browser to run tests for.
      Supported browsers are: ${gT.browsers.join(', ')}

      --browser-log-level <level> - 0 - 1000 (default ${gT.engineConsts.defaultBrowserLogLevel}).
      0 means to log all, 1000 - only severe errors.
      800 - info, 900 - warnings. 1000 - severe errors.

      --debug-avg - equals to --log-to-console --err-to-console --keep-browser-at-error --trace-level 2
      Though --trace-level option can be used to override tracing level.
      Note: --debug-max have precedence over --debug-avg.

      --debug-locale - if set, then native language text will be suffixed to localization keys,
      By default, to avoid difs for different locales of your product,
      TIA does not print native language text in form labels, button texts, titles, boxLabels etc.
      I.e. by default TIA prints localization keys only.
      There is the setDebugLocaleMode() function to set this mode for the certain test.

      --debug-max - equals to --log-to-console --err-to-console --keep-browser-at-error
      --force-log-actions --trace-level 3
      Though --trace-level option can be used to override tracing level.

      --def-host <host:port> - sets default host and port.
      E.g. --def-host http://localhost:1338
      This parameter allows to use the '$(host)' string in your tests.
      See more details in selHost option description in config/default-dir-config.js.

      --difs-to-slog - forces difs to be printed to short suite log.

      --dir - Run tests from the current working directory only.
      Not compatible with --suite.
      You can use --difs-to-slog to print case difs to console.

      --driver-log-level <level> - 0 - 1000 (default ${gT.engineConsts.defaultDriverLogLevel}).
      0 means to log everything, 800 - info, 900 - warnings. 1000 - severe errors.

      --ej-explore - Just sets global variable gIn.params.ejExplore to true.
      Your tests may use this flag to conditionally call the gT.e.explore.init().
      This call enables exploration mode for ExtJs applications, where:
      1. "Ctrl + Alt + Left Mouse Click" opens a dialog with info about the ExtJS component under pointer
      and all its parents.
      2. "Ctrl + Alt + T" - opens a dialog with the whole visible component hierarchy.
      3. Debug mode for browser part of TIA code is enabled.
      4. The gT.s.driver.quit() is ignored and browser does not quit at errors
      (i.e. --keep-browser-at-error is implied).
      5. Function is set up to imitate the click to the document body every minute to avoid session expiration.

      --email-cfg-path <path> - path to email config. Either absolute or relative to root dir path.
      See tia/doc/mail-cfg-example.js for example.
      See tia/config/default-suite-config.js for more details.
      Options from your email config will be merged into tia-root-suite-config.js, and so,
      merged into all tia-suite-config.js. But tia-suite-config.js can override options.
      Note: ${gT.engineConsts.emailCfgPathEnvVarName} environment variable can be used for the same purpose.

      --enable-email - enables email.

      --err-to-console - print all errors to console.

      --ext-log <external_log_path> - before each test this file is removed,
      and after each test this file content
      is added to test log. This allows to track some unexpected server side errors.
      ${gT.engineConsts.externalLogEnvVarName} environment variable also can be used for this.

      --force-log-actions forced console logs for all actions ans silent passes (in high level API).
      Does not affect file logs. Works only with --log-to-console option

      -h, --help - Print this help.

      --hang-timeout <timeout> - timeout in milliseconds after which some action considered as hanged one,
      a screenshot is saved and an error is generated. ${gT.engineConsts.hangTimeout} milliseconds by default.

      --headless, - use headless browser (chrome and firefox only).

      --ignore-skip-flag - ignore 'skip' config option in config.js files.

      --keep-browser-at-error - prevents browser quit at errors.
      It saves much time at debugging of heavy applications.

      --log-to-console print test logs to console.

      --new Run only new tests. I.e. tests without etalon logs. Just to debug them and get their logs.
      Note: Tests without etalon logs are ignored without this option.

      --pattern <pattern> - pattern for tests to run.
      , any test which file path (relative to <testSuiteRoot>) contains <pathToDirOrTest> substring will run.
      By default, tests from all directories (recursively) will run.
      Note: Tests whish are skipped due to the pattern is not calculated as skipped in suite logs.
      Also there is no suite dif generation when this option is used.
      So you can analyze suite logs only.
      Email reports are also did not work with this option for now.

      --print-proc-info print process info to console for each suite log.

      --require-modules <paths_separated_by_comma>
      Forces tia to require listed files as Node.js modules.
      ${gT.engineConsts.requireModulesEnvVarName} environment variable also can be used for this.

      --run-self-tests - Run tests for the engine (from tia/__tia-tests__ directory).

      --share-browser - Try to share the browser between tests within one node.js process.
      In this case 'init' call is performed only for the first test and 'quit' call only for the last one.
      Note, that --use-remote-driver option prevents the last test from automatically quit.

      --show-empty-suites - By default, if a suite (${gT.engineConsts.suiteDirName} directory)
      does not contain any run or skipped tests, there will not be test report to console.
      This option enables such reports for empty suites.

      --slog-dif-to-console - Prints colorful dif between etalon slog and current slog to console.

      --slog-subj=${argConsts.allowedSlogSubj.map(subjItem => `[${subjItem}]`).join(',')}
      Add some info to suite log subject. This will lead to additional difs
      in suite logs, but can be useful for paranoid checking.

      --stack-to-log print stack trace to test logs.
      This will lead to difs for tests for which exceptions are expected.

      --stop-remote-driver - (for chromedriver only) shuts down the remote driver.

      --suite - Run only the suite containing current working directory.
      Not compatible with --dir.

      --root-dir <Root Directory to find tests> - root directory to test
      (can be relative to current working dir).
      It there is no --root-dir, tia will check ${gT.engineConsts.rootDirEnvVarName} environment variable.
      If there is no such env variable, current working directory will be used as root.

      --too-long-time <duration>. If tests running exceeded the specified milliseconds amount.
      Email subject will have 'TOO_LONG' prefix.

      --trace-level <level> enables tracing (1 | 2 | 3 )
      (1 - less verbose, 3 - maximum verbosity, 0 - forbids tracing).

      --use-remote-driver - (for chromedriver only).
      Starts the browser driver in a separate process (if it is not already started),
      and forces s.driver.init() to use this external driver.
      This is convenient for test debugging.
      This option allows to use the same page opened in the browser for different node.js processes.
      I.e. in the first run you can load needed page, perform some actions with the page, and exit your process.
      The separate chromedriver process will still work in background.
      Then you can modify your code and run "node tia" one more time to perform other actions, etc.
      The gT.firstRunWithRemoteDriver property is true when the current run is the first run for which
      the remote driver was initialized.

      -v, --version - Just show TIA version and exit.

      --xvfb - allow to use xvfb settings from config (see DISPLAY option in config/default-dir-config.js).

    Examples:
        tia --root-dir <path-to-my-root-dir>
        node bin/tia.js --root-dir <path-to-my-root-dir>
    If there is no difs, 0 is returned, otherwise 1 is returned.

    This utility uses following external utilities: zip.

    See readme.md for more details.`
  );
};
