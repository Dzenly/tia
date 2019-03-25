
* ?? Нечестный API через модель. Тогда биндинг разбросает что надо по полям + потом
сделать dirty и заставить переписать в БД.

===================

Добавить поддержку coverage.

===================

Если позиционировать как систему для юнит тестов для идемпотентных функций -,
то нужно сделать параллельное исполнение тестов.
Сейчас параллельное исполнение тестов можно сделать,
через запуск tia для отдельных директорий и эталонные мета - логи для этих директорий.

===================

Вести отдельные логи для срабатывания костылей.
Для каждого теста.
Если сработал костыль - добавлять в subj не ET_SLOG, а ET_SLOG_чего-то там.
Зачем это?
Если хочется отследить задержки во времени - можно просто замерять время.
Информация - как часто срабатывают какие костыли?
Зачем она, типа чтобы когда пофиксят баги убрать костыль?

===================

Выдавать где-то суммарное время в waitForAjaxRequest.
Определить где waitForAjaxRequest вообще не нужен.

===================

Уровни логирования для high level ф-й.
Логировать или нет pass.
Либо через общий флаг, который обрабатывается в pass.
Либо через параметр, который передается в assertion и в pass.
Либо и то и другое.

Можно передавать объектом.
Можно флагами.

===================

При наведении мыши в messageBox - делать css border вокруг элемента.
При убирании - убирать.
Применять какие-нибудь Expandable штуки внутри диалога с исследованием элемента.

======================

Посмотреть browserify.
Сделать dz-logify - для обертки всех ф-й какого-то модуля, с целью логирования и замера времени.

Сделать поддержку chalk для ручных прогонов.
Выводить красочный лог (сейчас работает только для assertions, добавить для успешных actions).
TIA_NO_COLORS

В self тестах задействовать html, лежащие на файловой системе,
чтобы тесты не требовали сети и не притормаживали.
Заготовить тестовые html.

? Потом для extjs заготовить тестовые html.

В readme.md написать примеры использования ф-ий в тестах.
Сослаться на тесты из папки tests.

logViewer (сделать expandable) и вообще додумать концепцию.

Когда движок разовьется - отписаться в sencha, чтобы они поместили описание в своей секции
про тестирование.

More tests for support of all config parameters.

Some tests for test engine util functions.

* When many function parameters - replace by options object. (3h)

Performance issue: Manage Driver timeouts: (? 1.5h research work)
http://seleniumhq.github.io/selenium/docs/api/javascript/class_webdriver_WebDriver_Timeouts.html
Not so important, I checked that driver polls the DOM more that 10 times per second.


Выводить в консоль набор опций, используемых при запуске?

emptyDirToSuiteLog - перетащить в cmd line?

--ignore-dir-config-skip - насильно гонять все тесты, даже проскипанные.

? Может быть написать плагин для Selenium IDE, который работает с ExtJs.
Интересно, можно ли по CSS селектору найти ExtJs объект.
И типа плагин выдает текст, который работает с tia :)

* Написать на Community Edition ExtJs приложение, содержащее все контролы. И сделать примеры тестов для всего.

===================
Если один тест завис, тест за ним может сломаться с таким логом.
При этом нет мейла. См. конец лога, программа завершается аварийно.
М.б. стоит вернуть обработчик unhandledExceptions.
М.б. стот сделать тест, где искусственно вызывать такое зависание.

```
build	14-сен-2016 05:16:12	[39m[31mERR: Recursive error at error handling. The test will be canceled.
build	14-сен-2016 05:16:12	[39m[31mERR: Error at quit at error handling. The test will be canceled.
build	14-сен-2016 05:16:12	[39m[31m
build	14-сен-2016 05:16:12	TRCERR: Safe Generator caught error: Cancelling the suite due to hanging
build	14-сен-2016 05:16:12	 No stack trace
build	14-сен-2016 05:16:12
build	14-сен-2016 05:16:12	[39m
build	14-сен-2016 05:16:12	TRC2: Starting new test: /root/.nvm/versions/node/v4.5.0/lib/node_modules/tia/tests/wd-helpers/00_helpers/02_scriptsExecution.js
build	14-сен-2016 05:16:12	TRC3: selProfilePath:
build	14-сен-2016 05:16:12	TRC3: shareBrowser: false
build	14-сен-2016 05:16:12	TRC3: sharedBrowserInitiated: undefined
build	14-сен-2016 05:16:12	TRC3: Inside wrapper, before start timer,  msg: Initialization (with default empty profile) ...
build	14-сен-2016 05:16:12	TRC3: Inside wrapper, after start timer, msg: Initialization (with default empty profile) ...
build	14-сен-2016 05:16:12	TRC1: Cancelling action using gIn.cancelSuite flag
build	14-сен-2016 05:16:12	[31mERR: Act.Wrapper.FAIL
build	14-сен-2016 05:16:12	[39m[31mERR: ========== Err Info Begin ==========
build	14-сен-2016 05:16:12	[39m[31mERR: Msg was: Initialization (with default empty profile) ...
build	14-сен-2016 05:16:12	[39m[31mEXC: Exception in wrapper:  Cancelling the suite due to hanging
build	14-сен-2016 05:16:12	 No stack trace
build	14-сен-2016 05:16:12
build	14-сен-2016 05:16:12	[39m[31mEXC: Exception stack:  
build	14-сен-2016 05:16:12	No Exception info
build	14-сен-2016 05:16:12
build	14-сен-2016 05:16:12	[39m
build	14-сен-2016 05:16:12	TRC1: Act.Wrapper: scheduling screenshot, browser exceptions and browser console logs.
build	14-сен-2016 05:16:12	[31mTRCERR: Safe Generator caught error: NoSuchSessionError: This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.
build	14-сен-2016 05:16:12	NoSuchSessionError: This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.
build	14-сен-2016 05:16:12	[39m
build	14-сен-2016 05:16:12	TRC3: handleDir Dir: /root/.nvm/versions/node/v4.5.0/lib/node_modules/tia/tests/wd-helpers/01_interact
build	14-сен-2016 05:16:12	TRC3: quitIfInited: before quit call
build	14-сен-2016 05:16:12	[31mTRCERR: Runner ERR: NoSuchSessionError: This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.
build	14-сен-2016 05:16:12	NoSuchSessionError: This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.
build	14-сен-2016 05:16:12	    at next (native)
build	14-сен-2016 05:16:12	From: Task: <anonymous>
build	14-сен-2016 05:16:12	    at process._tickCallback (node.js:369:9)
build	14-сен-2016 05:16:12	    at Function.Module.runMain (module.js:443:11)
build	14-сен-2016 05:16:12	    at startup (node.js:139:18)
build	14-сен-2016 05:16:12	    at node.js:974:3
error	14-сен-2016 05:21:12	Command exited with non-zero status 1
error	14-сен-2016 05:21:12	0.56user 0.15system 10:06.71elapsed 0%CPU (0avgtext+0avgdata 48572maxresident)k
error	14-сен-2016 05:21:12	0inputs+360outputs (0major+31344minor)pagefaults 0swaps
build	14-сен-2016 05:21:12	[39m
simple	14-сен-2016 05:21:12	Failing task since return code of [/bin/sh /opt/atlassian/bamboo/temp/RV-TIAT2-JOB1-7414-ScriptBuildTask-8744185176314095995.sh] was 1 while expected 0
```
===================
