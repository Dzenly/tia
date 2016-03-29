Добавить в документацию как ставить для запуска тестов
и как ставить для разработки.
Сделать документацию по workflow при создании и отладке тестов.

Привести в порядок тестовые логи. Закоммитить.

Растащить TODO на R-Vision и tia части.
 
Растащить документацию на R-Vision и tia части.

Переделать на require.

Переделать camelCase в названиях файлов.

Отделить assertions.
Структурировать их.
Добавить побольше разных assertions.

Сделать chalk подсветку в хэлпе tia.js.

Сделать поддержку chalk для ручных прогонов.

Выводить красочный лог.

TIA_NO_COLORS

Просмотреть все доки. Перенести R-Vision часть в tia-tests.

Регрессионные тесты для самого движка.

logViewer (сделать expandable) и вообще додумать концепцию.


Отделить R-Vision часть.

Переделать, чтобы не требовалось в серверной части знать про TestHelper*.
Т.е. сделать ф-ю, которая добавляет к windows - нужные ф-и.

Разбить все на модули.

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

Наверно будет какой-то массив ф-й для инжектирования всякой байды после загрузки страницы.
И средства для подписки / отписки ф-й.
Ф-я, объект с параметрами, this.

Задокументировать все JSDoc ом.

Переделать мои back-end тесты для работы с новым движком,
и проверить их на голом tia.

Перевести хэлпы на английский.

Поддержать Windows.
МОжет быть MacOS  автоматом поддержится.

Везде поправить формат.

Подключить к JSCS к проекту.

Вынести утилитки для работы с

* файлами
* директориями
* строками

В отдельные модули и репозитории.

Писать обзорные логи в текущую директорию, откуда запущена tia.
Или все-таки в suiteRoot?

Попробовать указать tests как suiteRoot.

Fail - не должен быть ожидаемым.

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

Продублировать свойства gTE в отдельных глобальных переменных.

4.4.1 - в требования?

Бага в webstorm - в перемешке stdout и stderr.

Поддерживает ли bamboo ansi colors ?

Поисследовал проблему.
Вроде, бамбу поддерживает ansi colors.
Но хрен знает в каких случаях и как её включать.
Гугление по support ansi colors in bamboo ничего не дает по цветам.
Попробую потом включить цвета, хотя бы для красивого вывода для локальной отладки,
и сделать тестовый репозиторий с использованием chalk.

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

Как сделать так, чтобы старые версии тестов работали на старом движке.
А новые могли на новой версии движка.

Версии движка сделать легко.
Буду соблюдать semver.

Запускать можно через конкретный JS, все modules тоже будут искаться в конкретном скопе.





Debug tests for windows (3h). Slash / backslash issues, cygwin utilities work.

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

tests for timeouts for vm.runInThisContext (2h may have some research)

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
