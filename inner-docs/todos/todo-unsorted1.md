This file is mainly for author of test engine (i.e. Aleksey Chemakin).
If you wish to add suggestion, use Suggestions.txt or Jira.

List contains rough optimistic estimations.

==================================
TODO: 
Поискать возможность в Селениум подключать конкретные скрипты ко всем страницам.
Можно инжектировать скрипты при каждой загрузке новой страницы, но тогда не будет кэширования
в браузере.
Это чтобы серверная часть как можно меньше знала о тестировании.
В принципе, я могу каждый раз после загрузки страницы делать скрипт, который вставляет элемент <script>,
будет ли тогда подгружаться скрипт?
А куда этот скрипт будет ссылаться?
Может тогда все-таки проще просто в браузер локально засылать скрипт.
Он там на пару килобайт от силы.
Так что это будет быстро, типа при каждой загрузке страницы - пару кб лишнего трафика.
Но это все локально.

Запускать можно через конкретный JS, все modules тоже будут искаться в конкретном скопе.

----------------------------------

==================================
ПОДУМАТЬ В ФОНЕ (РАБОЧИЕ МОМЕНТЫ)
----------------------------------

Пусть все разработчики пишут код с учетом тестов, т.е. используют id и itemId, где это можно.

Как мне узнавать где какой itemId используется, поможет ли в этом Sencha App Inspector (chrome plugin)?

Когда тесты ломаются, на них идет Auto Assignment в bamboo (похоже, авторы коммитов ассайнятся автоматом).
Надо понять как это можно настраивать. Вроде бы мейлы авторам не рассылаются, и надеюсь, Jira таски автоматом
не создаются.
 
Что можно сделать для ускорения загрузки базы, на bamboo тесты тормозней, чем на моей машине раз в 6.

Подизайнить содержимое БД для тестовой системы.

Когда тесты заработают "официально" -
завести autotestDev ветку в гите. Создание тестов будет в ней, а в master будут выкладываться уже проверенные тесты.

Можно ли в bamboo сохранять изображения и давать ссылки на них?

==================================
HIGH LEVEL PRIORITY:
----------------------------------

Create some more tests.

Tests wait for database loading too long (two minutes sometimes).

Debug tests for windows (3h). Slash / backslash issues, cygwin utilities work.

? Setup bamboo and tests on Windows (remote desktop) (6h).

Support all needed browsers (chrome, firefox, safari, ie (on windows)). (10h ? research work (console logs from all browsers)).

==================================
MIDDLE LEVEL PRIORITY: (in parallel with tests).
----------------------------------
Добавить в bamboo.js возможность гонять по очереди тестовые пакеты, перечисленные в конфиге.
Т.е. опции для tia.js.(3.5h (нужно будет разобраться с модулем для чтения конфигов и каким-нибудь async)).
Добавить в bamboo.js опцию - останавливать ли все тестовые пакеты, если один пакет failed.(1h).

? Ненадежная проверка, что приложение готово к запуску (2h ? research).
Может быть подписаться на какие-то ивенты? (2h ? research).
Либо сделать поступенчатое (сначала Ext, потом R, потом ещё чего-нибуть) ожидание готовности приложения.

Опция -l аттачить логи, для дифнутых тестов к мейлу.
Сделать общий обход по дифнутым файлам. И колбэками делать что-то при обходе (dependency injection).
Называть логи по полному пути до них. Заменять слэш на +. (1.5h)
TODO: М.б. изображения тоже аттачить по этой опции? Заходишь в мейл, у тебя и логи и изображения встроены.(1h)

Сделать help для bamboo.js.(1h)

Как в bamboo сделать, логи интерактивными, чтобы можно было коллапсить ненужные блоки.
Например, блоки с информацией о задании (environment, etc) на страницу.(? research)

Tests for passed, failed, throwed from web driver promises. (3h)
Tests for error chaining for flow.execute(), say if first of ten functions faled, all queue should fail.
More tests for async engine.(1.5h)

Some tests for test engine util functions.(3h)

----

### Code review. (? )

* When many function parameters - replace by options object. (3h)
* Refactor everything to be more OOP (incapsulation, accessors, constructors, signletons, factories). (12h)

----

Automatic detection which tests to run by code changes. (? research work, we will implement it when it will be needed due to time issues)

Create logs as active web pages when one can use any filters and give links on such pages in emails. (8h)

Temporary Stderr and Stdout redirection, try to overload
write function for stdout and stderr streams.
Tests for stderr redirection. (? 3h research)
Некоторые тесты для движка намеренно пишут несколько строк в stderr
Если мы в bamboo подсветим stderr в логах, то эти строки могут вносить смуту.
Можно попробовать сделать так, чтобы на время выполнения теста весь stderr писался в лог теста.
Пока что это known issue.

Connect to existing window? To start test from some hand point.

tests for timeouts for webdriver (seems like sometimes it hanging).
May be page loading - the special case for which timeouts work differently.(3h (may include some research work)).

How to integrate tests into some cloud system for auto-testing. (? 12h research)

==================================
LOW LEVEL PRIORITY:
----------------------------------

При ошибке пробовать самому делать бисекцию, вычисляя коммит - вредитель.
Это позволит избавить от этой работы программиста, а ещё вести статистику чьи коммиты сколько раз сломали
тесты. (?)

tia.js could start Xvfb before tests and stop after tests. Now xvfb is started by bamboo or by hands. (1.5h)

Config option - continueAfterFail. (2h) ? (даже не знаю, где бы это могло пригодиться).

Integration with mocha? (? 20h research)

Separate test engine from Selenium and from ExtJS. (? 16h (now it is used Selenium's control flow and selenium promises)).
I.e. implement abilities to plug Selenium and plug ExtJS modules into the test engine. (? 16h)

Allow using Java tests. (12h research)

Create a few tests on Java. (8h)

Compare JavaScript and Java engines. (4h)

32bit/64bit separate tests? ( 2h (if there will be separate 64 bit and 32 bit OSes the work is just setup)).

selenium-webdriver can work from browser (and not from NodeJS) (2h learn what from this can be useful for us)

If we will support phantomjs:
PhantomJs does not follow WebDriver standard. It does not cleanup logs after reading.
We could introduce counter for strings to skip.
Investigations show that phantom cleans console at URLchanging.

Mac OS (if there will be customers).
