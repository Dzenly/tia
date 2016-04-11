Может добавить в лог дополнительный verbosity, который подробней пишет, что за assertions применяются.
Может это на высоком уровне трейсинга включить.
Может хорошо помогать новичкам въезжать в движок.

PASS/OK/FAIL mix.

Ожидаемые exception нужно превратить в pass строчки логов. И они не должны попадать в консоль. 

Сделать поддержку chalk для ручных прогонов.
Выводить красочный лог (сейчас работает только для assertions, добавить для успешных actions).
TIA_NO_COLORS
Сделать chalk подсветку в хэлпе tia.js.

В тестах задействовать html, лежащие на файловой системе,
чтобы тесты не требовали сети и не притормаживали.
Заготовить тестовые html.

? Потом для extjs заготовить тестовые html.

В readme.md написать примеры использования ф-ий в тестах.
Сослаться на тесты из папки tests.

logViewer (сделать expandable) и вообще додумать концепцию.

============

? Дальнейшее разбиение на модули.

Модуль для движка - tia, 
он может подключать другие модули.

А почему бы их не подключать сразу?

Чтобы не тянуть за собой кучу зависимостей?

tia

Эти подключать легко, если все ставить глобально:
tia-selenium
tia-selenium-extjs

Этот из приватного репозитория:
tia-rvision
Он будет опциональной зависимостью extjs и будет ссылаться на приватный репозиторий r-vision.

============

Наверно будет какой-то массив ф-й для инжектирования всякой байды после загрузки страницы.
И средства для подписки / отписки ф-й.
Ф-я, объект с параметрами, this.

Перевести хэлпы на английский.

Поддержать Windows.
МОжет быть MacOS  автоматом поддержится.

Везде поправить форматирование кода.

-------

Вынести утилитки для работы с

* файлами
* директориями
* строками

В отдельные модули и репозитории.

-------

Попробовать указать tests как suiteRoot.

Fail - не должен быть ожидаемым.
Т.е. ожидаемый fail это только для самотестирования движка.

В дополнительных модулях - тесты для этих модулей.

Задействовать разные поля, в соответствие с:
https://docs.npmjs.com/files/package.json
документация, тестирование.

Сделать более IDE friendly (проверить, есть ли вообще проблема, по моему WebStorm нормально ищет в global).

unpublish старые версии из npm.

Попробовать пересоздать и github репозиторию тоже.

Может быть, перейти на gitlab и гонять тесты тоже.

Как на github гоняются тесты?

Кнопка для пожертвований.

==============

Если старые тесты сломаются, то выпустить мажорную версию?

Закомитить утилитку xvfb.

Добавить в доках заметку по xvfb и desktops.

Сделать возможность удаленного запуска.
Т.е. на каком-то сервере ты настраиваешь, чтобы он:

Подтягивал изменения.
Стартовал сервер.
стартовал xvfb.

4.4.1 - в требования?

================

Вообще понимаю, что наши регрессионные тесты должны быть каким-то скриптом,
который встраивается в любые CI системы.
Т.е. не надо, чтобы надо было натаскивать в CI системе кучку всяких блоков.
Должен быть один блок, которые вставляется во все возможные системы.
Да и без систем нормально работает.

echo PASS: [32mura[39m
echo [31merror: [39mSOME COLORED TEXT.
>&2 echo STDERR
echo "<b>AAAA</b>"
node -e "process.stderr.write('STDERR FROM NODEJS\n');"

+Сделать модуль глобальным.
+Как сделать, чтобы chromedriver не нужно было добавлять в пути.

Отладить текущий модуль.
Сделать простой тестплан для теста по настройкам.
Выпустить минорную версию.



TODO: 
Поискать возможность в Селениум подключать конкретные скрипты ко всем страницам. (какие-то хуки)
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

?? Запускать можно через конкретный JS, все modules тоже будут искаться в конкретном скопе.


Debug tests for windows (3h). Slash / backslash issues, cygwin utilities work.
Вроде, все работает.

Опция -l аттачить логи, для дифнутых тестов к мейлу.
Сделать общий обход по дифнутым файлам. И колбэками делать что-то при обходе (dependency injection).
Называть логи по полному пути до них. Заменять слэш на +. (1.5h)
TODO: М.б. изображения тоже аттачить по этой опции? Заходишь в мейл, у тебя и логи и изображения встроены.(1h)

Write good help for public functions. (1.5h for current state)

More tests for support of all config parameters.(2h)

Tests for passed, failed, throwed from web driver promises. (3h)
Tests for error chaining for flow.execute(), say if first of ten functions faled, all queue should fail.
More tests for async engine.(1.5h)

Some tests for test engine util functions.(3h)


### Code review. (? )

* When many function parameters - replace by options object. (3h)
* Refactor everything to be more OOP (incapsulation, accessors, constructors, signletons, factories). (12h)

----

Temporary Stderr and Stdout redirection, try to overload
write function for stdout and stderr streams.
Tests for stderr redirection. (? 3h research)
Некоторые тесты для движка намеренно пишут несколько строк в stderr
Если мы в bamboo подсветим stderr в логах, то эти строки могут вносить смуту.
Можно попробовать сделать так, чтобы на время выполнения теста весь stderr писался в лог теста.
Пока что это known issue.
Может это не понадобится в свете использования chalk.

Connect to existing window? To start test from some cusom point.

tests for timeouts for webdriver (seems like sometimes it hanging).
May be page loading - the special case for which timeouts work differently.(3h (may include some research work)).

Take best parts from tape, mocha, jasmine, protractor, etc.

Separate test engine from Selenium and from ExtJS. (? 16h (now it is used Selenium's control flow and selenium promises)).
I.e. implement abilities to plug Selenium and plug ExtJS modules into the test engine. (? 16h)

selenium-webdriver can work from browser (and not from NodeJS) (2h learn what from this can be useful for us)

If we will support phantomjs:
PhantomJs does not follow WebDriver standard. It does not cleanup logs after reading.
We could introduce counter for strings to skip.
Investigations show that phantom cleans console at URLchanging.


Performance issue: Manage Driver timeouts: (? 1.5h research work)
http://seleniumhq.github.io/selenium/docs/api/javascript/class_webdriver_WebDriver_Timeouts.html
Not so important, I checked that driver polls the DOM more that 10 times per second.



============

Сделать поддержку профайла Firefox на Linux.

Проверить как будет работать chrome на виндовс, после отключения HDD и переустановки.

Может быть попробовать завести на виндах нового пользователя и под ним запустить тесты.
(чтобы избежать проблем с chrome).

? Починить профайлы браузера на винде.

==============

Сделать создание профайла отдельной утилитой ?
Заюзать тот модуль для создания профайлов?
Это потом.

Некоторые утилиты (utils) юзают глобальные объекты.
Надо отревьюить это.


Специальная команда - сохранять состояние мета-лога тоже.
Т.е. ввести команду эталонного мета лога.
При этом оставить предыдущий мета лог.

Пробежаться по TODO в самом коде.

Не писать трейсинг в лог.

Утилиты в глобальном gT объекте имеют смысл, если они будут предоставлять логирование действий.

Но, вообще лучше предоставить возможность обернуть в логи все экспортные ф-и какого-то модуляю
Logify ?
Заюзать всякие мои утилиты. На них потренить dz-logify.
Я посмотрел logify в npm - это misleading name.

Проверить на виндах ф-и архивирования и отсылки мейла.

dot notation instead of bracket notation.

Как-то проработать концепцию, что выводить fail в лог можно, только если это тестирование движка.
Т.е. в боевых логах, не должо быть fail в металоге.

В тестах можно использовать любые опции из конфига или из ENV.

=======================

что-то типа
tia - движок (логи, сравнения, рассылка почты, ассершны).
tia-selenium - добавляет поддержку selenium
tia-extjs - добавляет поддержку extjs.
Эти три модуля буду поддерживать лично я.
можно будет сделать приватный для r-vision модуль tia-r-vision.
он будет добавлять r-vision specific stuff.
можно сделать параметр командной строки, который указывает какой скрипт нужно сделать require чтобы расширить возможности движка, как бы кастомизировать его.
Вот так можно подключать r-vision specific stuff.
При разработке тестов проект можно создавать в tia-tests, там можно сделать npm i tia -S.
И будет одно место.

Сделать короткие версии для опций.

typings for tia.

github.io

github wiki.

Ввести cmd line опцию - путь к профайлам браузера.

Проверить поддержку -l опции

? [TOC] в readme.

Команды.

run
show-diffs
view-logs - посмотреть локальные логи в html формате.
Добавить во view-log возможность распечатывать конкретный файл лога

Открыть наружу какие-то утилиты.
Чисто ради логов (уже где-то упоминал про dz-logify).

ПОдумать, может дифф как-то понаглядней можно сделать.

Поддержать кастомный порт и включение поддержки tls в mail.
.mail-settingsrc

=========

Посмотреть какие ещё конфиги стоило бы поддержать через .*rc, 
может быть туда можно testRoot помещать и ещё какие-нить опции.
строку, причем минимистом.
Так что можно юзать для одноразовой настройки и потом запуска без параметров вообще.

=========

МОжет быть для отладки:
wrapper around WebDriverEventListener 

Сделать переменную окружения, которая показывает откуда читать конфигурацию.
А то если поставил глобально, - неудобно лазить в глобальных node_modules.

? сделать через module.exports и избавиться от u.execGen.
Но, что тогда с синхронными тестами, где u.execGen не нужно.

Задействовать ф-ю, вычитывающую инфу о caller для улучшения отладочного трейсинга.

Добавить в readme.md замечание о многопоточности.

Добавить в html движок возможность обновлять эталонные аутпуты.
Т.е. сделать удобную веб-морду для работы с логами.

С консоли тоже сделать какие-то удобства для работы с логами:
* просмотр
* обновление эталонных логов
* обновление эталонных дифов.

В html мета логе сделат тултипы - расшифровки всяких сокращений.

Опция, которая в металоге в консоли, сразу распечатывает дифы?

Надо что-то придумать, позволяющее массово обновлять log -> et.

Сейчас я могу писать в лог без \n, через process.stdout.write.
Может быть я могу унифицировать вывод, и сократить логи.

Добавить некий verbosity, который пишет, что происходит очень подробно,
расшифровывает все сокращения (это чтобы новички быстрее вникали).
Сделать тултипы для расшифровки сокращений в html морде.
Запуск тестов из html морды, выборочный запуск.

Инструменты для исследования ExtJS приложения.
Даже не знаю, может плагин для браузера какой-то.
Или просто набор JS скриптов, который вызывая из tia будет строить какое-то дерево объектов.
Или даже создавать прямо в элементах тултипы с инфой, полезной автотестерам.
Может быть в SeleniumIDE есть какие-то хуки, куда это все можно повставлять.


// https://github.com/gempesaw/Selenium-Remote-Driver/wiki/PhantomJS-Headless-Browser-Automation
// phantomjs --webdriver=4444, OR:
// java -jar selenium-server-standalone-2.35.0.jar -Dphantomjs.binary.path=/usr/local/bin/phantomjs
// my $driver =  Selenium::Remote::Driver->new("browser_name" => "phantomjs");

// gT.sOrig.driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

// TODO: find analog of this (Java):
//Wait<WebDriver> wait = new FluentWait<WebDriver>(driver)
//				.withTimeout(30, SECONDS)
//				.pollingEvery(5, SECONDS)
//				.ignoring(NoSuchElementException.class);

//var drvr = new webdriver.Builder()
//		.forBrowser('firefox')
//		.usingServer('http://localhost:4444/wd/hub')
//		.build();

// SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" node script.js
