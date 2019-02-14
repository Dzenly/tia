Time Is All (log-driven test engine with ExtJs support)

<!-- toc -->

- [About TIA](#about-tia)
  * [What does "log-driven" mean?](#what-does-log-driven-mean)
- [Examples](#examples)
- [Installation](#installation)
- [Self tests after installation](#self-tests-after-installation)
- [RSS for new releases](#rss-for-new-releases)
- [API Documentation](#api-documentation)
- [Terms](#terms)
  * [AUT](#aut)
  * [Project root directory](#project-root-directory)
  * [Test suite](#test-suite)
  * [Test](#test)
  * [Global objects exposed by TIA, which test can use](#global-objects-exposed-by-tia-which-test-can-use)
  * [Test log](#test-log)
  * [Etalon test log](#etalon-test-log)
  * [Suite log](#suite-log)
  * [Etalon suite log](#etalon-suite-log)
  * [Root log](#root-log)
  * [Etalon root log?](#etalon-root-log)
  * [Diff (TBD)](#diff-tbd)
  * [Expected diff (TBD)](#expected-diff-tbd)
  * [Browser profiles](#browser-profiles)
- [Prerequisites](#prerequisites)
- [Installation at tests development.](#installation-at-tests-development)
- [Installation for daily tests run](#installation-for-daily-tests-run)
  * [Self - test after installation](#self---test-after-installation)
- [Creating / debugging tests](#creating--debugging-tests)
  * [Selenium-webdriver typings](#selenium-webdriver-typings)
  * [Speed up test creation/debugging using connection to the existing browser session](#speed-up-test-creationdebugging-using-connection-to-the-existing-browser-session)
- [Config files](#config-files)
  * [For engine](#for-engine)
    + [suite-config.js](#suite-configjs)
    + [config.js](#configjs)
  * [For email](#for-email)
    + [--email-cfg-path cmd line option and TIA_EMAIL_CFG_PATH environment variables.](#--email-cfg-path-cmd-line-option-and-tia_email_cfg_path-environment-variables)
    + [suite-config.js](#suite-configjs-1)
- [Environment variables](#environment-variables)
- [Run](#run)
- [Order of tests execution](#order-of-tests-execution)
- [How it works](#how-it-works)
  * [How the engine works and how different files are created](#how-the-engine-works-and-how-different-files-are-created)
  * [If there will be some error, the test log will contain:](#if-there-will-be-some-error-the-test-log-will-contain)
  * [Suite logs details (also see above for suite log descriptions)](#suite-logs-details-also-see-above-for-suite-log-descriptions)
    + [Email subject has following notations](#email-subject-has-following-notations)
    + [Suite log notations](#suite-log-notations)
  * [Process exit code and stdout](#process-exit-code-and-stdout)
- [API for tests creation](#api-for-tests-creation)
- [FAQ and lifehacks](#faq-and-lifehacks)
- [Files description](#files-description)
  * [File types:](#file-types)
- [Known issues and bugs](#known-issues-and-bugs)
- [License: MIT](#license-mit)
- [Words of gratitude](#words-of-gratitude)
- [Links](#links)
- [Donations](#donations)

<!-- tocstop -->

> Note: Since version 0.20.4 minimal supported Node.js version is 10.15.1.

## About TIA

This is a JS engine for test automation.
The main destination is end-to-end tests for ExtJs-based web applications.
You also can use it for non-ExtJs web applications, and for non-GUI tests,
i.e. for functional and unit-testing.
You can run GUI autotests on your console server using `Xvfb`
or using headless chrome.

Web application part of the engine is based on
[selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
npm module.

Here is the [Selenium webdriver documentation.](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

### What does "log-driven" mean?

Modern autotesting engines contains two entities: `assertions` and `logs`.
`Assertion` is checking of some condition.
And `log` is writing some autotest result to filesystem or console.
Say, [jest](https://www.npmjs.com/package/jest) has [snapshots](https://jestjs.io/docs/en/snapshot-testing). These snapshots are a bit similar to TIA `test logs`.

In many autotest engines assertion is a first-class citizen, but in the `TIA`
assertion is second-class citizen. And first-class one is a `test log`.

So the main purpose of TIA autotest is a `test log` creation.
The difference between jest `snapshot` and TIA `test log` is than
`test log` is a one [big] snapshot, which is very similar
to accorging `test case` description.

[TIA API](http://dzenly.github.io/tia/) contains methods for
* interactions with GUI elements.
* for checking of some GUI element state.
* for writting some GUI elements state to the `test log`.

Each such method automatically writes an accorging record to the `test log`.
The record contains:
* element type.
* element id.
* action taken.
* result.

So the test log looks like:
```
Tab panel "#r-main": select tab by cardId: "assets" ... OK
Tab "#assets > tabbar > tab[text=l"info"]": click ... OK
```

## Examples

The engine has tests for itself, they can be used as examples.
https://github.com/Dzenly/tia/tree/master/__tia-tests__
https://github.com/Dzenly/tia/tree/master/common-utils/__tia-tests__
https://github.com/Dzenly/tia/tree/master/api/log/__tia-tests__
https://github.com/Dzenly/tia/tree/master/testsDir/testsSubDir/__tia-tests__

## Installation

`npm install [-g] tia`.
For test creation the local installation is more convenient.

For test running you can use global installation.

## Self tests after installation

`tia --run-self-tests`, it will use your chrome browser for some self tests.

## RSS for new releases

https://github.com/Dzenly/tia/releases.atom

## API Documentation

TIA contains `d.ts` definitions for its API here:
https://github.com/Dzenly/tia/tree/master/types

API documentation generated by [typedoc](https://www.npmjs.com/package/typedoc)
is [here](http://dzenly.github.io/tia/).

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

When you run `tia`, the current working directory will be used as the project root directory by default, but you set it it by:

* `--root-dir` cmd line option.
*  `TIA_ROOT_DIR` environment variable.

If both are specified `--root-dir` will be used.
Cmd line options alwais take precedence over env vars.

### Test suite

A set of tests located in some `__tia-tests__` directory, e.g.:

* `<prjRoot>/__tia-tests__`
* `<prjRoot>/subDir/subSubDir/__tia-tests__`

Note: don't nest `__tia-tests__` to `__tia-tests__`.

When you run `tia`, it will execute all `test suites` from the [Project root directory](#Project-root-directory)

### Test

JavaScript file, which name ends by `.tia.js` suffix (e.g. `00_my-test.tia.js`).
Tests can be located inside some [Test suite](#Test-suite) directory at any level.
Test are executed by TIA and can use all global objects, exposed by TIA (see below).
Test file should create a [Test log](#Test-log) (see below) by TIA API.

### Global objects exposed by TIA, which test can use

TIA provides `gT` and `gIn` global objects to tests.

TIA contains `d.ts` definitions for its API here:
https://github.com/Dzenly/tia/tree/master/types

API documentation generated by [typedoc](https://www.npmjs.com/package/typedoc)
is [here](http://dzenly.github.io/tia/).

The page with global objects is here:
http://dzenly.github.io/tia/modules/_index_d_.html

In JS code, global objects are defined They are defined in following files:
* api/api-index.js
* engine/init-global-objects.js
* api/selenium/sel-index.js
* api/extjs/extjs-index.js

You can explore `gT` (global Test helpers) global object to find them all.
The `gIn` (global Inner test helpers) contain low level helper functions,
you can use them to extend TIA's API.

Global objects have short aliases (see details in files listed above or in API docs).

### Test log

This is a text file which is created by TIA API calls from [Test](#Test).
TIA has API for interactions with browser (using webdriver and ExtJs API).
This API write info about actions into the *Test log*.
Assertions also write results into the *Test log*.
And user can write custom messages to the *Test log*.

The file reflects the test scenario and should be very similar to the according test case.

At the end of the *Test log*, TIA writes statistics info about the test and adds
logs from browser console (for browser tests, if such option is enabled).

The *Test log* file name is equal to the [Test](#Test) file name,
but the log has the `.tia.log` extension (test has the `.tia.js` extenstion).

**Test logs are not commited to VCS.**

### Etalon test log

When the test author finished [Test](#Test) creation, he should run it,
check the [Test log](#Test-log), and mark it as
etalon (reference) log by renaming `*.tia.log` to `*.tia.et` for the test.

**Etalon test logs are commited to VCS**.

### Suite log

This is a log with statistics for all [Tests](#Test) from a [Test suite](#Test-suite) directory.
*Suite log* is located in `**/__tia-tests__/__tia-suite__/suite.log` files.
The *Suite log* is sent to email addresses of subscribers (if --email option is specified and there is a correct email config).
NOTE: The *Suite log* is also affected with the `sectionTitle` option from `tia-dir-config.js` files.

**`suite.log` files are not commited to VCS.**

### Etalon suite log

Etalon suite log, it is located in it the `**/__tia-tests__/__tia-suite__/suite.et` file.

**`*.et` files are commited to VCS.**

### Root log

This is a log with statistics for all [Test Suites](#Test-Suite) from the [Project root directory](#Project-root-directory).
It is located in `<prjRoot>/__tia-tests__/__tia-root__/root.log`.
The *Root log* is sent to emails (if --email option is specified and there is a correct email config).

**Root log is NOT commited to VCS.**

### Etalon root log?

Nope. There is no such a log type in TIA.

### Dif files

It is result of diff between [Etalon test log](#Etalon-test-log)
and [Actual test log](#Test-log).

If the test named `xxxx.tia.js` then dif will be named as `xxxx.tia.dif`
in the same directory.

Also there can be diffs for suite logs named
`_tia-suite/suite.log.notime.et.dif`.

If some [Actual test log](#Test-log) has diff with the corresponding [Etalon test log](#Etalon-test-log), such test is considered as a fail,
and the [Suite log](#Suite-log) will also be diffed with
the [Etalon suite log](#Etalon-suite-log).

**Dif files are not commited to VCS**

### Expected dif

If you have `xxxx.tia.dif` which is equal to `xxxx.tia.edif`,
then such diff will not be considered as a fail.
It can be used for known bugs, to avoid fail status for the [Root log](#Root-log).

**`.edif` files are commited to VCS**

### Browser profiles

There is the default browser profile, located at
`<prjRoot>/__tia-tests__/__tia-root__/tia-browser-profiles/default` directory.

Also each test directory can specify its profile dir
in the [Directory config](#Directory-config).
See the `browserProfileDir` option description in the
[config/default-dir-config.js](https://github.com/Dzenly/tia/blob/master/config/default-dir-config.js).

Browser profiles are located in `**/_tia-suite/tia-browser-profiles/<browserProfileDir>`  directories, where `browserProfileDir` is config option from the [Directory config](#Directory-config).

----------------------------------

## Prerequisites

* `zip` utilility (you can use Cygwin on Windows)
* `Node.js` 10.15.1+
* `Xvfb` (if you wish to run tests under Linux without GUI).
	How to start:
	 $ Xvfb :1 -screen 5 2560x1440x24
	How to stop:
	 $ killall Xvfb
  The 'xvfb' directory contains the script for using as `/etc/init.d/xvfb` and readme.md.
* Note: there are headless chrome and firefox, which are supported by the `--headless` command line option of TIA.

----------------------------------

## Installation at tests development.

$ npm install tia

Now in the project you can use `node_modules/tia/bin/tia.js` as a start script for node.js.

VS Code and WebStorm should support some autocompletion for TIA API.
You can starty to type `gT.` and your IDE should hint you about `gT` properties,
properties of properties, etc.

## Installation for daily tests run

$ npm install -g tia

### Self - test after installation

$ tia --run-self-tests

## Cmd line options

$ tia --help

There are many nice abilities, so find time to read this help.

## Creating / debugging tests

* $ npm i -g tia
* $ mkdir my-prj - it will be your [Project root directory](#Project-root-directory).
* $ cd my-prj
* $ tia initRoot - to create project root TIA subdirectories (TODO and config stubs).
* Choose/create some directory inside my-prj where the [Test suite](#Test suite) will be created.
* $ tia initSuite - to create suite TIA subdirectories (TODO: and config stubs).
* Inside created `__tia-tests__` directory you can create directories with [tests](#Test).
* $ npm init
* $ npm install tia - for ability to use `tia.js` as entry point.

In your debug configuration you can use

`mode_modules/tia/bin/tia.js`

And set CWD as my-prj or use `--root-dir` TIA cmd line option.

### Speed up test creation/debugging using connection to the existing browser session

If you are testing some heavy application and application start requires noticeable time,
you can use the `--use-remote-driver` option.
See `tia --help` for the following things:

* --use-remote-driver
* --stop-remote-driver
* gT.firstRunWithRemoteDriver global variable.

----------------------------------

## Config files

This is JS files, contains just

```js
module.exports = {
  // Here are config options.
}
```

It is for you to decide whether to commit these files to VCS.
If you have one test environment you can commit them, if you have
multiple environments with different options, - you should
add these files into your `<.vsc>ignore` or keep just stubs in VCS.

### Global config

Optional.
Located in the `**/__tia-tests__/_tia-suite/tia-suite-config.js` files.

Standard TIA options are described here:
https://github.com/Dzenly/tia/tree/master/config/default-global-config.js

You can add some custom options to the Global config and use
`gT.globalConfig` to access them from your tests.

### Suite config

Optional.
Located in the `**/__tia-tests__/_tia-suite/tia-suite-config.js` files.

Standard TIA options are described here:
https://github.com/Dzenly/tia/tree/master/config/default-suite-config.js

You can add some custom options to the Global config and use
`gT.suiteConfig` to access them from your tests.

### Directory config

TBD

global, suite, dir.

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
* `*.tia.js` - tests
* `tia*.js` - config file.

----------------------------------

## Known issues and bugs

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

* [API documentation (under construction)](http://dzenly.github.io/tia/)
* [Changelog and migration guides](docs-md/changelog.md)
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
