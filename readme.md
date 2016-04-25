# Time Is All (log driven test engine)

This is an engine for `[massive]` regression testing automation.
The engine supports Web sites testing using Selenium WebDriver and inner API for work with ExtJs elements.
Non-GUI unit tests are also supported.

The engine is ready to use, but requires adding:
* more wrappers for Selenium actions.
* more API for ExtJs actions.
* more assertions.
* more compatibility with continues integration systems.
* more documentation.

To don't blow up versions for now I am not following SEMVER rules.
I change the 'patch' version part at adding new functionality and bug fixes,
and change the 'minor' version part at changes which break backward compatibility.

After 1.0.0 (it is planned as of June 2016) version I will follow SEMVER strictly.

----------------------------------

## Selenium WebDriver notes

GUI part is created on top of official JS selenium-webdriver binding:

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
`TIA/node_modules/selenium-webdriver/test` 

I create wrappers for Selenium API, but for now for complex tests one needs to know selenium.
sOrig global object provides Selenium objects (listed above).

### Common workflow for tests using Selenium Webdriver

* Go to some URL. (see s.browser.loadPage(url)).
* Wait for appearance of some event like HTML element, JS object, title, etc.
  (see s.wait* functions)
* If you are assured that element exists you can find element without wait.
* Send to the found element various events from mouse or keyboard  
  (s.click*, s.sendKeys*).
* Read some data from the HTML element.
* Read some data from JS objects. (s.browser.executeScript()).
* Check that values are equal to expected ones by various assertions (see 'a' global object).

### Notes about ExtJs

* This part is still under development, so here are few API functions for now.

* For dynamically generated id you need get id of HTML elements using TIA API or s.browser.executeScript,
and then send user actions to this id.

* Also you can use s.browser.executeScript to access ExtJs objects and return JS objects from browser
 to your test.

## Terms

### Test suite

A set of tests located in some directory.
This directory is specified by --tests-dir cmd line option or by TIA_TESTS_DIR environment variable.

### Test

JavaScript file, located inside test suite directory.
This file is executed by TIA and can use all global objects, exposed by TIA (see below).
Test file should create a test log by TIA API.

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

Global objects have short aliases (see files above).

### Test log

This is a text fail (in ASCII encoding) which is created by TIA API calls
(actions with logging, assertions, etc.) in a test JS file.
The file reflects the test scenario and should be very similar with the according test plan section.

At the end of the log TIA writes statistics info about the test and adds
logs from browser console (if such option is enabled).

The log file name is equal to test file name, but the log has the `.log` extension (and not `.js`).

### Etalon test log

When the test author finished test creating he should check the test log and mark it as
etalon (reference) log by renaming `.log` to `.et`.

### Meta log (suite log)

This is log with statistics on all tests from the tests directory.
The name of a meta log consists of the tests directory name and `.mlog` extension.
The meta log is sent to emails (if --email option is specified and there is a correct email configs).

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
  But if you use it a JavaScript (as parameter for `node`), you must use --harmony Node.js option.
* Xvfb (if you wish to run tests under Linux without GUI).
	How to start:
	 $ Xvfb :1 -screen 5 2560x1440x24
	How to stop:
	 $ killall Xvfb
    xvfb directory contains xfvb script and readme.md.

----------------------------------

## Installation

$ npm install -g TIA

### Self - test after installation

$ tia --run-self-tests

----------------------------------

## Creating / debugging tests

$ mkdir my-prj
$ cd my-prj
$ npm init
$ mkdir tests
$ npm install TIA

In your debug confiuration you can use

node --harmony mode_modules/TIA/bin/TIA.js

### Using typings

There is not TIA DTS for now.
But there is DTS for selenium-webdriver (it is pretty out of date, but helpful).

$ npm i -g typings
$ typings install selenium-webdriver --ambient --save

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

It should be defined in `suite-config.js` (see above).
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

See TIA_TESTS_DIR and TIA_REQUIRE_MODULES descriptions in tia --help.
Use TIA_NO_COLORS - to disable ANSI colors.

----------------------------------

## Run

To show help when TIA is installed globally:

$ TIA --help

To show help for local installation:

$ node --harmony bin/TIA.js --help

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
* linux_3.16.0-4 - OS.
* amd64 - Platform.
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

Meta log contains from two parts: short (contains diffed tests only) and long (contains all the tests).

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

https://github.com/Dzenly/TIA/releases.atom
	
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
* engine - the heard of the TIA.
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

* Ignore this message:
  `.../.nvm/versions/node/v4.4.1/bin/TIA: line 2: //#: No such file or directory`

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

More then 10 years I have been involved in auto-testing.
So I develop this test engine using all my experience and best practices.
Also I learn existing test engines and add their best parts to TIA.
My TODO lists are in 'inner-docs' project directory:
https://github.com/Dzenly/TIA/tree/master/inner-docs.
In a few weeks I am planning to translate all docs to English and create a github wiki page.
Here is an info about my accounts for donations:
https://github.com/Dzenly/TIA/blob/master/donations-info.md
