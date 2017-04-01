'use strict';

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

exports.usage = function () {
  console.log(
    dedent`Usage: tia [options]
    , where options:

      --browser <browser> (default: ${gT.browsers[0]}) browser to run tests for.
      Supported browsers are: ${gT.browsers.join(', ')}

      --browser-log-level <level> - 0 - 1000 (default ${gT.engineConsts.defaultBrowserLogLevel}). 0 means to log all, 1000 - only severe errors.
      800 - info, 900 - warnings. 1000 - severe errors.

      --debug-avg - equals to --log-to-console --log-err-to-console --keep-browser-at-error --trace-level 2
      Though --trace-level option can be used to override tracing level.
      Note: --debug-max have precedence over --debug-avg.

      --debug-max - equals to --log-to-console --log-err-to-console --keep-browser-at-error --force-log-actions --trace-level 3
      Though --trace-level option can be used to override tracing level.

      --def-host <host:port> - sets default host and port.
      E.g. --def-host http://localhost:1338
      This parameter allows to use the '$(host)' string in your tests.
      See more details in selHost option description in config/default-dir-config.js.

      --diffs-to-mlog - forces diffs to be printed to short meta log.

      --disable-email - disables email.

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

      --email-cfg-path <path> - path to email config. See tia/doc/mail-cfg-example.json for example.
      See tia/config/default-suite-config.js for more details.
      Note: ${gT.engineConsts.emailCfgPathEnvVarName} environment variable can be used for the same purpose.

      --err-to-console print all errors to console.

      --et-mlog - filepath for etalog meta-log (absolute or relative to parent of tests directory).
      If exists, - it is used for meta logs comparison and writing info such as
      ET_MLOG / DIF_MLOG to the head of output.

      --ext-log <external_log_path> - before each test this file is removed, and after each test this file content
      is added to test log. This allows to track some unexpected server side errors.
      ${gT.engineConsts.externalLogEnvVarName} environment variable also can be used for this.

      --force-log-actions forced console logs for all actions ans silent passes (in high level API).
      Does not affect file logs. Works only with --log-to-console option

      -h, --help - Print this help.
      
      --hang-timeout <timeout> - timeout in milliseconds after which some action considered as hanged one,
      a screenshot is saved and an error is generated. ${gT.engineConsts.hangTimeout} milliseconds by default.

      --ignore-skip-flag - ignore 'skip' config option in config.js files.

      --keep-browser-at-error - prevents browser quit at errors.
      It saves much time at debugging of heavy applications.

      --log-to-console print test logs to console.

      --pattern <pattern> - pattern for tests to run.
      , any test which file path (relative to <testSuiteRoot>) contains <pathToDirOrTest> substring will run.
      By default, tests from all directories (recursively) will run.

      --require-modules <paths_separated_by_comma>
      Forces tia to require listed files as Node.js modules.
      ${gT.engineConsts.requireModulesEnvVarName} environment variable also can be used for this.

      --run-self-tests - Run tests for the engine (from tia/tests directory).
      
      --share-browser - Try to share the browser between tests within one node.js process.
      In this case 'init' call is performed only for the first test and 'quit' call only for the last one.
      Note, that --use-remote-driver option prevents the last test from automatically quit.

      --stack-to-log print stack trace to test logs.

      --stop-remote-driver - (for chromedriver only) shuts down the remote driver.

      --tests-dir <Tests Root Directory> - root directory for test suite (can be relative to current working dir).
      It there is no --tests-dir, tia will check ${gT.engineConsts.testsDirEnvVarName} environment variable.
      Note: browser profile root is created as sibling to tests directory.

      --too-long-time <duration>. If tests running exceeded the specified milliseconds amount. Email subject will
      have 'TOO_LONG' prefix.

      --trace-level <level> enables tracing (1 | 2 | 3 ) (1 - less verbose, 3 - maximum verbosity, 0 - forbids tracing).

      --use-remote-driver - (for chromedriver only). Starts the browser driver (if it is not already started),
      and forces s.driver.init() to use this external driver.
      This is convenient for test debugging.
      This option allows to use the same page opened in the browser for different node.js processes.
      I.e. one process ("node tia" run) - does load needed page, performs some actions with the page, exit.
      The next process ("node tia"  run) - performs other actions. Etc.
      The variable gT.firstRunWithRemoteDriver is true when the current run is the first run for which
      the remote driver was initialized.
       
       -v, --version - shot the version of tia engine.

      --xvfb - allow to use xvfb settings from config (see DISPLAY option in config/default-dir-config.js).

    Examples:
        tia --tests-dir <path_to_my-tests-dir>
        node bin/tia.js --tests-dir <path_to_my-tests-dir>
    If there is no diffs, 0 is returned, otherwise 1 is returned.

    This utility uses external utilities: diff, rm.
    
    See readme.md for more details.`
  );
};
