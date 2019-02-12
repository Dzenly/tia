# Time Is All (log driven test engine with ExtJs support)

[See Change log for migration guides](docs-md/changelog.md)

This is a testing automation engine.
It allows any types of testing:
* unit testing,
* functional testing,
* GUI testing, etc.

Both `assertion-driven` and `logs-driven` tests are supported.

The engine supports Web sites testing, using Selenium WebDriver,
and provides API for work with `ExtJs` components.
You can run GUI autotests using `Xvfb` or using headless chrome.

> Note: Since 0.20.4 minimal supported Node.js version is 10.15.1.

## Examples

The engine has tests for itself, they can be used as examples.
https://github.com/Dzenly/tia/tree/master/tests

## API Documentation

[API documentation is here(under construction)](http://dzenly.github.io/tia/)

## Terms

### AUT

Abbreviation for Application Under Test.
I.e. your web page inside a browser.

### Project root directory

The directory containing your project.
In general it is the root of your VCS repository.
Hereinafter the *Project root directory* will be denoted as `<prjRoot>`.

It can contain many [Test suites](#Test-suite) (i.e `__tia-tests__` directories, see below) at any level.

`<prjRoot>` contains at least one `__tia-tests__` directory.
The `__tia-tests__` directory

By default the current working directory will be used as the project root directory,
but you set it it by:

* `--root-dir` cmd line option.
*  `TIA_ROOT_DIR` environment variable.

If both are specified `--root-dir` will be used.
I.e. always cmd line option take precedence over env var.

### Test suite

A set of tests located in some `__tia-tests__` directory, e.g.:

* `<prjRoot>/__tia-tests__`
* `<prjRoot>/subDir/subSubDir/__tia-tests__`

Note: don't nest `__tia-tests__` to `__tia-tests__`.

When you run TIA, it will perform all test suites from the [Project root directory](#Project-root-directory)

### Test

JavaScript file, which name ends by `.tia.js` suffix (e.g. `00_my-test.tia.js`).
Tests can be located inside some [Test suite](#Test-suite) directory at any level.
Test are executed by TIA and can use all global objects, exposed by TIA (see below).
Test file should create a [Test log](#Test-log) (see below) by TIA API.

So if you use both `TIA` and [Jest](https://jestjs.io/), you should use `.jest.js` suffix for Jest tests
and set up according pattern in Jest config.

#### Global objects exposed by TIA, which test can use

They are defined in following files:
* api/api-index.js
* engine/init-global-objects.js
* api/selenium/sel-index.js
* api/extjs/extjs-index.js

You can explore `gT` (global Test helpers) global object to find them all.
The `gIn` (global Inner test helpers) contain low level helper functions,
you can use them to extend TIA's API.

Global objects have short aliases (see details in files listed above).

### Test log

This is a text file which is created by TIA API calls from [Test](#Test).
TIA has API for interactions with browser (using webdriver and ExtJs API).
This API write info about actions into the *Test log*.
Assertions also write results into the *Test log*.
And user can write to *Test log*.

The file reflects the test scenario and should be very similar to the according test case section.

At the end of the *Test log* TIA writes statistics info about the test and adds
logs from browser console for browser tests (if such option is enabled).

The *Test log* file name is equal to the [Test](#Test) file name,
but the log has the `.tia.log` extension (instead of `.tia.js`).

**Test logs are not commited to VCS.**

### Etalon test log

When the test author finished [Test](#Test) creation, he should run it, check the [Test log](#Test-log) and mark it as
etalon (reference) log by renaming `.tia.log` to `.tia.et`.

**Etalon test logs are commited to VCS**.

### Suite log

This is a log with statistics for all [Tests](#Test) from a [Test suite](#Test-suite) directory.
*Suite log* is located in the `__tia-tests__/__tia__/suite.log` file.
The *Suite log* is sent to email addresses of subscribers (if --email option is specified and there is a correct email config).
NOTE: The *Suite log* is also affected with the `sectionTitle` option from `tia-dir-config.js` files.

**`suite.log` files are not commited to VCS.**

### Etalon suite log

Etalon suite log, located in it the `__tia-tests__/__tia__/suite.et` file.
**`*.et` files are commited to VCS.**

### Root log

This is a log with statistics for all [Tests](#Test) from the [Project root directory](#Project-root-directory).
It is located in `<prjRoot>/__tia-tests__/__tia__/root.log`.
The *Root log* is sent to emails (if --email option is specified and there is a correct email config).

**Not commited to VCS.**

### Etalon root log?

Nope. There is no such a log type, cause it makes no sense.

### Diff (TBD)

### Expected diff (TBD)

### Browser profiles

Browser profiles are located in  `__tia-tests__/__tia__/tia-browser-profiles` directories.
See also the `selProfilePath` option in the
[config/default-suite-config.js](https://github.com/Dzenly/tia/blob/master/config/default-suite-config.js).

----------------------------------

## Prerequisites

* `diff`, `rm`, `zip` utililies (you can use Cygwin on Windows)
* `Node.js` 8.6.0+
* `Xvfb` (if you wish to run tests under Linux without GUI).
	How to start:
	 $ Xvfb :1 -screen 5 2560x1440x24
	How to stop:
	 $ killall Xvfb
* The 'xvfb' directory contains the script for using as `/etc/init.d/xvfb` and readme.md.
* Note: that there is headless chrome and firefox, which are supported by the `--headless` command line option.

----------------------------------

## Installation at tests development.

$ npm install tia

Now in the project you can use `node_modules/tia/bin/tia.js` as a start script for node.js.

If you are lucky, your IDE will support some autocompletion for TIA API.

## Installation for daily tests run

$ npm install -g tia

### Self - test after installation

$ tia --run-self-tests

## Creating / debugging tests

* $ mkdir my-prj
* $ cd my-prj
* $ npm init
* $ mkdir tests
* $ npm install tia

In your debug configuration you can use

`node mode_modules/tia/bin/tia.js`

as engine.

### Using typings

There is not TIA DTS for now.
But there is DTS for selenium-webdriver (it is pretty out of date, but helpful).

$ npm i -g typings
$ typings install selenium-webdriver --ambient --save

### Speed up test creation/debugging using connection to the existing browser session

If you are testing some heavy application and application start requires noticeable time,
you can use the '--use-remote-driver' option. In this case TIA will use existing browser session for all test runs.
Inside your code you can use the `gT.firstRunWithRemoteDriver` global variable
to distinct very first run (when you need some browser session initialization) from following runs (for which you need just use the existing session).

Use `tia --help` to see the help for the following things:

* --use-remote-driver cmd line option.
* --stop-remote-driver cmd line option.
* gT.firstRunWithRemoteDriver global variable.

----------------------------------

## Config files

TBD

### For engine

#### suite-config.js

If the root tests dir contains `suite-config.js` file, it will override parameters from `config/default-suite-config.js` (see this file for parameter details).

An example:

```js
 module.exports = {
   mailRecipientList: "vasya@pupkin.ru",
 };
```

#### config.js

If some directory contains `config.js` file, it will override parameters
from `config/default-dir-config.js` (see this file for parameter details).

Also config.js from the current directory overrides config.js from parent directory
(except sectionTitle parameter).

An example:

```js
module.exports = {
  sectionTitle: "Config testing",
};
```

### For email

There are two ways how to use email settings.

#### --email-cfg-path cmd line option and TIA_EMAIL_CFG_PATH environment variables.

You can specify path to some `*.js` or `*.json` file.
TIA does `require` this config and
options are merged to default suite config, see `config/default-suite-config.js`.
If the `mailRecipientList` field in the config is empty, email will be disabled.

#### suite-config.js

Email options also can be defined in `suite-config.js` (see above).
Settings from `suite-config.js` will override cmd line and env variable settings.
See `config/default-suite-config.js` for email option descriptions.
To keep credentials secret you can have `suite-config.js` like:

```js
let suiteConfig = {};

try {
  suiteConfig = require('./mail-settings.nogit.json');
} catch(e) {

}

suiteConfig.option1 = 'value 1';
suiteConfig.option2 = 'value 2';

module.exports = suiteConfig;
```

Use JSON here because JS files (except config.js, suite-config.js) are runned as test files.

## Environment variables

See TIA_ROOT_DIR, TIA_REQUIRE_MODULES, TIA_EXTERNAL_LOG descriptions in `tia --help`.
Use TIA_NO_COLORS - to disable ANSI colors.

----------------------------------

## Run

To show help when TIA is installed globally:

$ tia --help

To show help for local installation:

$ node bin/tia.js --help

----------------------------------

## Order of tests execution

Tests are executed in the alphabet order, so it is recommended to prefix your folders and tests by
numbers, like `00_CheckingSomeStuff.js`.

----------------------------------

## How it works

### How the engine works and how different files are created

TIA does recursively walks the tests directory.
`suite-config.js` from the root tests directory is used to setup parameters for the whole test bunch.
`config.js` from any directory is used to setup parameters for the given directory and its subdirectories
(with exception of sectionTitle parameter).

Other `*.js` files are executed by TIA and should use TIA API to create logs.
For each test there should be an etalon log, which is thoroughly checked by the author,
and is saved as `*.et` file.

After a test finish, its current log is compared with its etalon log.
If there is a difference it is saved as `*.dif` file.
Note: All diffs are made as `diff newOut oldOut`, so as error or difference will be on top of log.

There is an ability to create expected diff files (`*.edif`).
If the current `*.dif` is equal to `*.edif` it is not counted as a diffed one.

### If there will be some error, the test log will contain:

Info about the error, and if test uses selenium:
* browser console output
* browser exceptions
* path to the screenshot made immediately after the error (`*.png` file)

### Suite logs details (also see above for suite log descriptions)

Logs with statistics info for the whole test bunch. They have name `suite.log`.
These logs are sent to email (if corresponding options is enabled).

#### Email subject has following notations

[ET_SLOG/DIF_SLOG, ]linux_3.16.0-4-amd64, [AS PREV/AS PREV (8 diff(s) changed)/DIF FROM PREV], "testsWdHelpers", Dif: 0, Fail: 0, EDif: 0, Skip: 0, Pass: 4, 19203.05 ms

* ET_SLOG - the current suite log is equal to the etalon suite log
* DIF_SLOG - the current suite log is different from the etalon suite log
* TOO_LONG - tests duration is exceeded --too-long-time parameter
* linux_3.16.0-4 - OS.
* amd64 - Platform.
* NO PREV - no previous log, e.g. the first run, custom files removing, or some terrible fail at previous run.
* DIF FROM PREV - the current tests run is different from the previous run.
* AS PREV - the current run is equal to the previous run.
* AS PREV (8 diff(s) changed). - the current run has diffs in the same tests as in previous run, but diffs are changed.
* testsWdHelpers - root tests dirname.
* Dif: 0, - zero tests have diffs.
* Fail: 0, - zero failed assertions.
* EDif: 0, - zero expected diffs.
* Skip: 0, - zero skipped tests (dues ot 'skip: true' in config.js)
* Pass: 4, - 4 assertions in the whole test bunch passed.
* 19203.05 ms - tests duration.

#### Suite log notations

They are almost the same as for Email subject notations.
Suite log contains statistics info for each directory.

Suite log contains two parts: short (contains diffed tests only) and long (contains all the tests).

### Process exit code and stdout

TIA returns 0 if all tests are passed as expected, or 1 if there are unexpected diffs.

The 'true' value for the `suite-config.js` option `suiteLogToStdout` prints suite log to stdout
(see `config/default-dir-config.js` for more details).

See also the `--log-to-console` option description in the `tia --help` output.

----------------------------------

## API for tests creation

The `api` directory contains functions (with JSDoc documentation), which
perform users action emulation, assertion checking, logging and other actions.

----------------------------------
## FAQ and lifehacks

* xvfb analog for Windows.

See the `desktops` utility for creation alternative desktops.
https://technet.microsoft.com/en-us/library/cc817881.aspx

* How to subscribe to updates:

You can use this link in your RSS feed client:

https://github.com/Dzenly/tia/releases.atom

* Autocompletion in IDE.
If your IDE does not automatically suggest autocompletion for short named global objects 's', 't', 'l', etc.,
you could try 'gT.s', 'gT.t', etc.
Also you can use break points and explore these global objects.

* You can copy `.jshintrc`, `.jscsrc` files from TIA to your project and use them,
it can speed up your debugging.

----------------------------------

## Files description

* bin/tia.js - The main file of TIA.
* api - API to be used in tests.
  `browser-part` subdirectories contain scripts to be executed in browsers.
* inner-docs - my inner documentation, TODOs, current thoughts, design decisions, etc.
  https://github.com/Dzenly/tia/tree/master/inner-docs
* engine - the heart of the TIA.
* log-viewer - Here is the prototype for Web client for logs exploration.
* tests - self tests for TIA.
    * tia - tests for non - GUI part.
    * wd-helpers - web driver tests.
* utils - inner TIA utilities.
* xvfb - utility to run GUI tests so as do not prevent other work with the computer.
  See xvfb/readme.md for more details.

### File types:

* `*.log` - test log
* `*.slog` - suite log for directory with tests
* `*.slog.json` - suite log as JSON (to use with HTML log-viewer (it is in my TODO list for now))
* `*.slog.notime` - suite log without time measurements
* `*.slog.notime.prev` - previous suite log without time measurements
* `*.et` - etalon logs and etalon suite logs
* `*.js` - tests or configs
* `*.json` - configs.

----------------------------------

## Known issues and bugs

* WebStorm often kill detached child process when it stops debugging.
  So --use-remote-driver TIA option sometimes does not keep chromedriver running.

* Browser profiles do not save on Windows after browser closing.
  I.e. you can use predefined profiles, but it will not be updated after selenium tests.
  Chrome's profile is broken after browser exit, Firefox profile does not
  save changes to initial profile, it uses initial profile as a template to create some tmp profile.
  Firefox's `--profile` option does not work with Selenium.
  For now I did not use tests which preserve cookies and sessions between browser restarts.  

* On Linux, browser profiles do correctly save for chrome.
  Firefox on linux has the same behaviour as for Windows.

* If you will change input focuses during some selenium test work, there can be errors in this test.

* On Windows selenium sometimes incorrectly returns old page title.

----------------------------------

## License: MIT

----------------------------------

## Words of gratitude

The engine was started to develop in the "R-Vision" company (https://rvision.pro/).
Thank you, "R-Vision", for initial sponsorship and for allowance to open the sources.

----------------------------------

## Links

* [TODO for 1.0.0 version](docs-md/todos-for-1.0.0.md)
* [Selenium Webdriver usage in TIA](docs-md/selenium-webdriver.md)
* [How to test ExtJs applications](docs-md/extjs.md)
* [ExtJs App Explorer](docs-md/extjs-explorer.md)

----------------------------------

## Donations

Since year 2004 I have been involved in auto-testing. I very like it and I have many ideas to implement.
So I develop this test engine, dedicating most of my free time to this, using all my experience and best practices.
Main goals of this project is to create a good tool for ExtJs applications testing, and to fasten autotesting in common,
using the log comparison paradigm (and not the assertion paradigm, though assertions are also supported).

If you like this test engine, you can to star my project on github:
https://github.com/Dzenly/tia.

If you wish to support the project with moneys, here is an info about my accounts for donations:
https://github.com/Dzenly/tia/blob/master/docs-md/donations-info.md

My TODO lists are in 'inner-docs' project directory:
https://github.com/Dzenly/tia/tree/master/inner-docs.
