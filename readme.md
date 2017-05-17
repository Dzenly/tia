# Time Is All (log driven test engine with ExtJs support)

This is an engine for `[massive]` regression testing automation.
The engine supports Web sites testing using Selenium WebDriver
and provides API for work with ExtJs components.
Xvfb is supported.

*Note: since the 0.12.0 version - the minimum supported Node.js version is 6.9.0.*

The engine is in development stage, but well tested and ready to use.

To don't blow up versions for now I am not following SEMVER rules.
I change the 'patch' version part at adding new functionality and bug fixes,
and change the 'minor' version part at changes which break backward compatibility.

After 1.0.0 version I will follow SEMVER strictly.

Some TODO for near future:

* more wrappers for Selenium actions.
* more API for ExtJs actions.
* API refactoring (before 1.0.0 release).
* some global variables usage refactoring.
* typings definitions.
* better documentation with examples.
* more means for exploration of ExtJs applications.
* more assertions.
* more compatibility with continuous integration systems.

----------------------------------

## Selenium WebDriver notes

GUI part is created on top of the official JS selenium-webdriver binding:

http://seleniumhq.github.io/selenium/docs/api/javascript/index.html

It is good to know following Selenium terms: 

WebElement:

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html

Actions:

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/actions_exports_ActionSequence.html

By

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html

until

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html

chrome webdriver

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html

Key

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

After install one can find examples of (non TIA) selenium tests here:
`tia/node_modules/selenium-webdriver/test` 

I create wrappers for Selenium API, but for now for complex tests one needs to know selenium.
*sOrig* global object provides Selenium objects (listed above).

### Common workflow for tests using Selenium Webdriver

* Go to some URL. (see s.browser.loadPage(url)).
* Wait for some event like HTML element appearance, some JS object state, title value, etc.
  (see s.wait* functions) (If you are assured that element exists you can find element without wait).
* Send various events from mouse or keyboard to the found element
  (s.click*, s.sendKeys*).
* Read some data from the HTML element.
* Read some data from JS objects. (s.browser.executeScript()).
* Check that values are equal to expected ones by various assertions (see 'a' global object), or just logging results.

### Notes about ExtJs

* For dynamically generated id you need to get id of HTML elements using TIA API or s.browser.executeScript, and then send user actions to this id.

* Also you can use s.browser.executeScript to access ExtJs objects using your way and return JS DOM for further interactions by TIA API and selenium-webdriver API.

## Terms

### Test suite

A set of tests located in some directory.
This directory is specified by --tests-dir cmd line option or by TIA_TESTS_DIR environment variable.

### Test

JavaScript file, located inside test suite directory.
This file is executed by TIA and can use all global objects, exposed by TIA (see below).
Test file should create a *test log* by TIA API.

All `*.js` files are considered as tests except config.js and suite-config.js which
are considered as config files.

#### Global objects exposed by TIA, which test can use

They are defined in following files:
* api/api-index.js
* engine/init-global-objects.js
* api/selenium/sel-index.js
* api/extjs/extjs-index.js

You can explore 'gT' global object to find them all.
You can use 'gIn' global object to extend TIA's API.

Global objects have short aliases (see sources in files listed above).

### Test log

This is a text file which is created by TIA API calls
(actions with logging, assertions, etc.) in a test JS file.
The file reflects the test scenario and should be very similar with the according test case section.

At the end of the log TIA writes statistics info about the test and adds
logs from browser console (if such option is enabled).

The log file name is equal to the test file name, but the log has the `.log` extension (instead of `.js`).

### Etalon test log

When the test author finished test creating he should run it, check the test log and mark it as
etalon (reference) log by renaming `.log` to `.et`.

### Meta log (suite log)

This is a log with statistics for all tests from the tests directory.
The name of a meta log consists of the tests directory name and `.mlog` extension.
The meta log is sent to emails (if --email option is specified and there is a correct email config).

NOTE: The meta log is also affected with the `sectionTitle` option in `config.js` files.

### Browser profiles

The `br-profiles` directory is created as a sibling to the tests directory.
(see --tests-dir option or TIA_TESTS_DIR environment variable description) and keeps browser profiles.

See also the `selProfilePath` option in the `config/default-suite-config.js`.

----------------------------------

## Prerequisites

* diff, rm, zip utililies (you can use Cygwin on Windows)
* Node.js 4.x.
  TIA uses ECMA Script 2015 features, so `bin/tia.js` contains a shebang string to use
  node --harmony when tia.js is used as an executable file.
  But if you use it as a JavaScript (as parameter for `node`), you must use --harmony Node.js option.
* Xvfb (if you wish to run tests under Linux without GUI).
	How to start:
	 $ Xvfb :1 -screen 5 2560x1440x24
	How to stop:
	 $ killall Xvfb
* The 'xvfb' directory contains the script for using as `/etc/init.d/xvfb` and readme.md.

----------------------------------

## Installation at tests development.

$ npm install tia

Now in the project you can use `node_modules/tia/bin/tia.js` as start script for node.js.
Use --harmony parameter for Node.js if your Node.js version is less then 6.x.x, because TIA uses string templates and other features from ES 2015.

Probably your IDE will support some autocompletion for TIA API.

## Installation for daily tests run

$ npm install -g tia

### Self - test after installation

$ tia --run-self-tests

----------------------------------

## Creating / debugging tests

$ mkdir my-prj
$ cd my-prj
$ npm init
$ mkdir tests
$ npm install tia

In your debug confiuration you can use

node --harmony mode_modules/tia/bin/tia.js

### Using typings

There is not TIA DTS for now.
But there is DTS for selenium-webdriver (it is pretty out of date, but helpful).

$ npm i -g typings
$ typings install selenium-webdriver --ambient --save

### Speed up test creation/debugging using connection to the existing browser session 

If you are testing some heavy application and application start requires noticeable time, you can
use the '--use-remote-driver' option. In this case TIA will use existing browser session for all test runs.
You can use the `gT.firstRunWithRemoteDriver` global variable to distinct very first run (when you need some
browser sessin initialization) from following runs (for which you need just use the existing session). 

Use `tia --help` to see the help for the following things: 

* --use-remote-driver cmd line option.
* --stop-remote-driver cmd line option.
* gT.firstRunWithRemoteDriver global variable.

----------------------------------

## Config files

### For engine

#### suite-config.js

If the root tests dir contains this file it will override parameters from
`config/default-suite-config.js` (see this file for parameter details).

An example:
 
```js
 module.exports = {
   mailRecipientList: "vasya@pupkin.ru",
 };
```

#### config.js

If some directory contains this file it will override parameters from
`config/default-dir-config.js` (see this file for parameter details).

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

#### With suite-config.js

Email options also can be defined in `suite-config.js` (see above).
Settings from `suite-config.js` will override cmd line and env variable settings.
See `config/default-suite-config.js` for email option descriptions.
To keep credentials secret you can have `suite-config.js` like:

```js
var suiteConfig = {};

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

See TIA_TESTS_DIR, TIA_REQUIRE_MODULES, TIA_EXTERNAL_LOG descriptions in `tia --help`.
Use TIA_NO_COLORS - to disable ANSI colors.

----------------------------------

## Run

To show help when TIA is installed globally:

$ tia --help

To show help for local installation:

$ node --harmony bin/tia.js --help

----------------------------------

## Order of tests execution

Tests are executed in the alphabet order, so it is recommended to prefix your folders and tests by
numbers, like 00_CheckingSomeStuff.js.

----------------------------------

## How it works

### How the engine works and how different files are created

TIA does recursively walks the tests directory.
suite-config.js from the root tests directory is used to setup parameters for the whole test bunch. 
config.js from any directory is used to setup parameters for the given directory and its subdirectories
(with exception of sectionTitle parameter).

Other `*.js` files are executed by TIA and should use TIA API to create logs.
For each test there should be an etalon log, which is thoroughly checked by the author,
and is saved as `*.et` file. 

After a test run its current log is compared with its etalon log.
If there is a difference it is saved as `*.dif` file.
Note: All diffs are made as diff newOut oldOut, so as error or difference will be on top of log.

There is an ability to create expected diff files (`*.edif`).
If the current `*.dif` is equal to `*.edif` it is not counted as a diffed one.

### If there will be some error, the test log will contain:

* info about the error
* browser console output
* browser exceptions
* path to the screenshot made immediately after the error (`*.png` file)

### Meta logs

Logs with statistics info for the whole test bunch.
These logs are sent to email (if corresponding options is enabled).

#### Email subject has following notations

[ET_MLOG/DIF_MLOG, ]linux_3.16.0-4-amd64, [AS PREV/AS PREV (8 diff(s) changed)/DIF FROM PREV], "testsWdHelpers", Dif: 0, Fail: 0, EDif: 0, Skip: 0, Pass: 4, 19203.05 ms

* ET_MLOG - the current meta log is equal to the etalon meta log
* DIF_MLOG - the current meta log is different from the etalon meta log
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

#### Meta log notations

They are almost the same as for Email subject notations.
Meta log contains statistics info for each directory.

Meta log contains two parts: short (contains diffed tests only) and long (contains all the tests).

### Process exit code and stdout

TIA returns 0 if all tests are passed as expected, or 1 if there are unexpected diffs.

The 'true' value for the suite-config.js option 'metaLogToStdout' prints meta log to stdout
(see config/default-dir-config.js for more details).

See also the `--log-to-console` option description in the `tia --help` output.

----------------------------------

## API for tests creation

The `api` directory contains functions (with JSDoc documentation), which
perform users action emulation, assertion checking, logging and other actions.

----------------------------------
## FAQ and life hacks

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
* `*.mlog` - meta log for directory with tests
* `*.mlog.json` - meta log as JSON (to use with HTML log-viewer (it is in my TODO list for now))
* `*.mlog.notime` - meta log without time measurements
* `*.mlog.notime.prev` - previous meta log without time measurements

----------------------------------

## Known issues and bugs

* WebStorm often kill detached child process when it stops debugging.
  So --use-remote-driver TIA option sometimes does not leave chromedriver running.

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

## Donations

More then 10 years I have been involved in auto-testing. I very like it and I have many ideas to implement.
So I develop this test engine, dedicating most of my free time to this, using all my experience and best practices.
Main goals of this project is to create a good tool for ExtJs applications testing, and to fasten autotesting in common, using the log comparison paradigm (and not the assertion paradigm, though assertions are also supported).

If you like my work, you can to star my project on github:
https://github.com/Dzenly/tia.

If you wish to support the project with moneys, here is an info about my accounts for donations:
https://github.com/Dzenly/tia/blob/master/donations-info.md

My TODO lists are in 'inner-docs' project directory:
https://github.com/Dzenly/tia/tree/master/inner-docs.
After 1.0.0 release I am planning to create a github wiki page and create the site containing engine documentation with search ability.

When I will finish to implement my general ideas about this engine I will create a tool like TestLink based on Node.js.
