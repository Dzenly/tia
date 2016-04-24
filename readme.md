# Time Is All (log driven test engine)

This is an engine for `[massive]` regression testing automation.
The engine supports Web sites testing using Selenium WebDriver and inner API for work with ExtJs elements.
Non-GUI unit tests are also supported.

The engine is ready to use, but requires adding:
* more wrappers for Selenium actions.
* more API for ExtJs actions.
* more assertions.
* more compatibility with continues integration systems.

To don't blow up versions for now I am not following SEMVER rules.
I change the 'patch' version part at adding new functionality and bug fixes,
and change the 'minor' version part at changes which break backward compatibility.

After 1.0.0 (it is planned as of June 2016) version I will follow SEMVER strictly.

English documentation is planned as of May 2016.

----------------------------------

## Selenium WebDriver notes

GUI part is created on top of official JS selenium-webdriver binging:

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
To keep credentials secret you can do smth like that:

```js
var suiteConfig = {};

try {
  suiteConfig = require('./mail-settings.nogit.json');
} catch(e) {

}
suiteConfig.dummyGoodSuitConfigOption = 'dummyGoodSuitConfigOption';

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

Файлы config.js в директориях запускаются, и используются для перегрузки конфигов (см. "Конфигурационные файлы").

Другие файлы `*.js` запускаются движком, в них должны находиться тесты, выполняющие что угодно (все, что может делать node.js),
и пишущие логи (`*.log`) (см. Лог Теста), используя API (см. директорию 'api').

Для каждого теста есть эталонный лог (`*.et`), этот лог создается и тщательно проверяется автором теста.

После прогона теста, его текущий лог сравнивается с эталонным. Если есть разница, она записывается в виде `*.dif` файла.

Есть возможность создавать эталонные дифы (`*.edif`). Если диф равен эталонному, то он в логе пакета не считается дифом.

### If there will be some error, the test log will contain:

* info about the error
* browser console output
* browser exceptions
* path to the screenshot made immediately after the error (`*.png` file)

### Помимо локальных файлов для каждого теста, создаются общие логи статистики по всем тестам.

Эти логи рассылаются на почту.
Также на почту отсылается архив с результатами тестов, если соответвующие опции включены в конфиге.

#### В заголовке письма используются следующие обозначения:

[ET_MLOG/DIF_MLOG, ]linux_3.16.0-4-amd64, AS PREV , "testsWdHelpers", Dif: 0, Fail: 0, EDif: 0, Skip: 0, Pass: 4, 19203.05 ms

* ET_MLOG - металог совпадает с эталонным металогом.
* DIF_MLOG - металог не совпадает с эталонным металогом.
* linux_3.16.0-4 - Операционная система.
* amd64 - Платформа.
* Один из трех вариантов, показывающий отношение текущего прогона к предыдущему:
	* DIF FROM PREV - означает, что появились дифы в тестах, где дифов не было, или исчезли дифы для тестов, где дифы были.
	* AS PREV - означает, что при текущем прогоне абсолютно такие же результаты, что и при предыдущем.
	* AS PREV (8 diff(s) changed). - дифы в тех же тестах, что и раньше, но какие-то дифы изменились.
* testsWdHelpers - имя корневой директории для тестов.
* Dif: 0, - ноль тестов имеют неожиданные дифы.
* Fail: 0, - ноль ошибок во всех тестах.
* EDif: 0, - ноль ожидаемых дифов.
* Skip: 0, - ноль тестов проигнорено (из-за skip: true в локальном конфиге)
* Pass: 4, - 4 команды во всех тестах сообщили о том, что они прошли успешно.
* 19203.05 ms - тесты шли 19 с копейками секунд.


#### В логах используются следующие обозначения:

Обозначения те же, что и выше, только теперь они расписаны для каждой директории и каждого теста.
Лог состоит из двух частей: короткой (содержащей только подифанные тесты), и длинной (содержащей все тесты).

### Статус возврата, stdout, stderr.

TIA возвращает 0 если тесты прошли ожидаемо и 1, если есть неожиданные дифы.

Конфиг опция metaLogToStdout со значением true, приводит к выводу мега - лога в stderr,
см. описание этой опции в config/default-dir-config.js.

----------------------------------

## API для создания тестов:

В директории api находятся функции, которые выполняют эмуляцию действий пользователя, логирование, и другие действия.
См. JSDoc документацию в комментариях к функциям.

----------------------------------
## FAQ and lifehacks

* Как запускать тесты на Windows, чтобы они не мешали работать?

  Можно установить desktops и запускать тесты на альтернативном рабочем столе.
  https://technet.microsoft.com/en-us/library/cc817881.aspx

	TODO: давно не тестировал на Windows, не уверен, что сходу всё заработает.

* Как подписаться на RSS обновлений движка:

	https://github.com/Dzenly/TIA/releases.atom
	
	
* Если IDE плохо автодополняет 's.' конструкции внутри тестов, попробуйте использовать 'gT.s.',
мой WebStorm 2016.1.1 в этом случае автодополняет нормально.

* Можно исследовать глобальные объекты (например, s) в дебажном режиме,
  сделав брейк - поинт в тесте (см. объект global, например global.t, global.s и т.д.).
   
* Корень проекта содержит .jshintrc, .jscsrc файлы, которые могут сильно ускорить поиск ошибок.

----------------------------------

## Files description

* bin/TIA.js - утилита для запуска тестов, наберите "node --harmony TIA.js --help", для просмотра помощи по утилите.
При глобальной установке, достаточно набрать "TIA --help".
* api - API для использования в тестах.
  Поддиректории browser-part содержат скрипты, которые исполняются в браузере.
* inner-docs - внутренняя документация.
https://github.com/Dzenly/TIA/tree/master/inner-docs
* engine - внутренние файлы движка.
* log-viewer - здесь разрабатывается веб-клиент для очень удобной работы с логами.
* tests - директория с пакетами тестов.
*     TIA - Тесты для общей части.
*     wd-helpers - Тесты для web driver части.
* utils - внутренние утилитные функции, используемые движком.
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
  .../.nvm/versions/node/v4.4.1/bin/TIA: line 2: //#: No such file or directory

* На Windows не работает сохранение профайла после выхода из браузеров.
  Т.е. можно юзать кастомные профайлы заранее созданные, но в них ничего не запишется при выходе из браузера.
  У Chrome получается битый профайл, а Firefox в сочетании с selenium воспринимает
  профайл, как шаблон для создания своего временного профайла, опция -profile не работает с selenium :(.
  Не очень долго разбирался с этим, ибо тесты с сохранением куков и сессий между запусками браузера,
  пока считаю экзотикой.
  
* На Linux сохранение профайла работает для chrome. А для firefox так же, как для Windows.

* Парочка тестов в пакете TIA намеренно вызывает exceptions.
  см. также TODO* файлы в inner-docs директории:
  https://github.com/Dzenly/TIA/tree/master/inner-docs

* Иногда Selenium глючит, если параллельно с тестами, что-то делать за компом (если не через xvfb).
  Т.е. желательно не менять фокусы ввода элементов и окон, пока работают тесты.
  
* На Windows иногда глючит ожидание title у страницы. Title уже давно сменился, а Selenium думает, что
  title старый (проверить, не связано ли это с одновременной работой параллельно с тестами).

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
