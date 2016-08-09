===================

Выдавать где-то суммарное время в waitForAjaxRequest.

===================

Завести ли счетчик для успешных действий.
(раньше считалось в pass count, теперь нигде)

===================

Сделать нечестные но быстрые ф-и (JS вместо Selenium).

===================

Приоритет теста в конфиге директории ??

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


Подумать о переходе на Java WebDriver - побольше возможностей, получше документация:
http://eclipsesource.com/blogs/2016/07/20/running-node-js-on-the-jvm/?utm_source=nodeweekly&utm_medium=email

Посмотреть browserify.
Сделать dz-logify - для обертки всех ф-й какого-то модуля, с целью логирования и замера времени.

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

Перевести хэлпы на английский.
Поддержать Windows.
МОжет быть MacOS  автоматом поддержится.

Везде поправить форматирование кода.

Когда движок разовьется - отписаться в sencha, чтобы они поместили описание в своей секции
про тестирование.

More tests for support of all config parameters.

Tests for passed, failed, throwed from web driver promises.
Tests for error chaining for flow.execute(), say if first of ten functions faled, all queue should fail.
More tests for async engine.

Some tests for test engine util functions.

* When many function parameters - replace by options object. (3h)

Performance issue: Manage Driver timeouts: (? 1.5h research work)
http://seleniumhq.github.io/selenium/docs/api/javascript/class_webdriver_WebDriver_Timeouts.html
Not so important, I checked that driver polls the DOM more that 10 times per second.


Выводить в консоль набор опций, используемых при запуске?

emptyDirToSuiteLog - перетащить в cmd line?

? В конфиге задавать шаблоны, какие `*.js` файлы игнорировать.

? -l (TODO) attach diffed logs to mail.

--ignore-dir-config-skip - насильно гонять все тесты, даже проскипанные.

Посмотреть как Selenium IDE работает с ExtJs.

? Может быть написать плагин для Selenium IDE, который работает с ExtJs.
Интересно, можно ли по CSS селектору найти ExtJs объект.
И типа плагин выдает текст, который работает с tia :)


