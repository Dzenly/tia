
Если позиционировать как систему для юнит тестов для идемпотентных функций -, то нужно сделать параллельное исполнение тестов. Сейчас параллельное исполнение тестов можно сделать, через запуск tia для отдельных директорий и эталонные мета - логи для этих директорий.

Добавить поддержку coverage.

?? Добавить поддержку автоматического определения зависимостей тестов, и прогона только тех тестов,
исходники зависимостей которых поменялись после последнего прогона.

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

Может быть вести какой-то отдельный лог с трейсингом?
И присылать его для failed тестов.
Это была бы тема.

===================

Это что:
http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/http/util.html#waitForServer

===================

Большая проблема - хреновый call stack от Selenium WebDriver при ошибках - есть описание ошибки,
но нет нормального колл - стэка, т.к. у драйвера какая-то своя очередь.
Поисследовать это.

===================

Показывать/перемещать курсор мыши при selenium тестах.
Опцией это сделать, чисто для демонстрации.
Трейсинг с потреблением памяти.
Трейсинг доступных ресурсов по памяти и по диску.
Трейсинг индекса загруженности процессора.
По какому-то таймеру ? setInterval ?
А может просто при трейсинге ошибки?

===================

Ввести dotenv настройки.
А константы - это будут значения по-умолчанию.

Команда для вывода значений конфигов.

===================

chromedriver.isRunning()

===================

===================

Выводить версию tia и chromedriver в заголовок мейла.

===================

Как узнать состояние драйвера.

===================

ExtJs:
По хорошему нужно сделать ожидание такой-то ошибки или её отсутствия, для такого-то элемента с таймаутом.
Можно не конкретной ошибки, а пустой/непустой.

waitErrorAndPrintIt
waitErrorAbsense

===================

Ввести флаг, действия по нечестному варианту.
Ввод с клавиатуры. Какие-то комбинации действий.

И часто гонять тесты так.
И гораздо реже гонять честно.

===================

Как можно ускорить тесты за счет опций браузера?
Вообще поизучать все options, capabilities, preferences.

===================

hover ?
как зависнуть над объектом ?

как управлять перемещением курсора ?

Как показать курсор мыши, чтобы он двигался?

WebElement.getLocation()

actionSequence.mouseMove.

===================

https://sites.google.com/a/chromium.org/chromedriver/capabilities

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/capabilities_exports_Capability.html

===================

Потестить webElement, хранит ли он данные внутри, или при всякий get* командах обращается к вебдрайверу?
Если хранит внутри - он бесполезен, разве что если у него есть команда update.

Подумать, как  засунуть WebElement в idToIdObj.
В принципе, актуально только для непосредственных кликов или sendKeys, clear,

И ещё logStr - если это tab, или button.
оно будет содержать getText или value или innerText, или ещё что.

Сделать в браузерном коде возвращение сложных объектов.

===================

Поискать везде ${id}
id
formId

dynid no case sensitive
параметры типа name в функциях 
exports.treeByDynId = function (id, treeName, options, logAction) {

Чтобы добавить поддержку динамических id во все API.

id = idToIdObj(id);

===================

logById

почему там больше одной ф-и?

Может быть сделать автоматическую разруливалку типа компонента.

1. У каждого типа компонента свой набор опций - что показывать, что нет.

===================

В качестве id ф-и могут принимать объект, с полями id, nameForLog.
Заменить везде DynId на автоматичекое вытаскивание id из параметра ф-и.

===================

Будет ли ускорение за счет кэширования?

ПОиск может вернуть:

* WebElement
* HTML id
* autogenerated
* индекс в массиве хэша на ячейку где:
 
id, DOM element, Component.

Хэш компонентов может быть общим для всех тестов в одном браузере.

Хэш может быть на стороне клиента.
Он мог бы хранить:

* некий текстовый key, который знают все тесты.
* описание элемента, идущее в логи.
* индекс в кэше на стороне браузера
* веб элемент
* id

Надо будет прогнать тесты через профилировщик. Посмотреть узкие места.
Посмотреть сколько занимает поиск в ExtJs.

===================

Во внутренних тестах открывать какой-то локальный html.
чтобы не ждать гугля, и не зависеть от его надежности.

===================

===================

Для писателей тестов в тестлинке.
Исследовалка приложения, чтобы лучше определять названия элементов, 
и может даже проставлять путь поиска.
Исследовалка должна встраиваться в приложение по какой-то системной переменной (можно и в серверную и в клиентскую часть).

В идеале должно быть, чтобы в тестлинке в действиях был код tia.
А в ожидаемых результатах - логи tia.

Можно сделать какие-то формальные конструкции, которые из тестлинка однозначно переводятся в tia.

===================

Сделать в БРАУЗЕРНОМ КОДЕ универсальный механизм, поддерживающий множество способов.
С хорошей обработкой ошибок.

В принципе, можно и передавать js код для поиска.

'Ext.getCmp('asdf').down(compQuery)
'Ext.getCmp('asdf').child(compQuery)
Ext.getCmp('asdf').lookupReferenceHolder().lookupReference('form')
form.findField('name')

Для панелей - брать getView / getForm.

Сделать браузерную ф-ю, которая выдает компонент по множеству способов.

===================

Если юзер случайно закрыл сессию для удаленного драйвера, нужно не ругаться, а пересоздать сессию.
И quit поддержать для удаленного драйвера.
И close().

===================

Что делать с зависаниями.
Попробовать с удаленным вебдрайвером?
Внешний скриншотер для Xvfb ?
Оставить гоняться тесты каждую минуту на моей локальной машине и потом разгрести результаты.

===================

```js
function showFirstClientRect(elt) {
    // Note: the overlay will be out of place if the user resizes or zooms.
    var rect = elt.getClientRects()[0];
    
        var rect = rects[i];
        var tableRectDiv = document.createElement('div');
        tableRectDiv.style.position = 'absolute';
        tableRectDiv.style.border = '1px solid red';
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        tableRectDiv.style.margin = tableRectDiv.style.padding = '0';
        tableRectDiv.style.top = (rect.top + scrollTop) + 'px';
        tableRectDiv.style.left = (rect.left + scrollLeft) + 'px';
        // we want rect.width to be the border width, so content width is 2px less.
        tableRectDiv.style.width = (rect.width - 2) + 'px';
        tableRectDiv.style.height = (rect.height - 2) + 'px';
        document.body.appendChild(tableRectDiv);
}
```

===================

Можно ли запросить у драйвера ID текущей сессии?
Можно ли запросить количество и статус текущих сессий?

Содержимое какой-то системной переменной в префикс к мейлу или в subj.

For commands that cause a new document to load, the point at which the command returns is determined by the session’s page load strategy. A value of normal causes the command to return after the load event fires on the new page, a value of eager causes it to return after DOMContentLoaded fires, and a value of none causes it to return immediately.

Подписаться на Executor и смотреть какие команды с какими параметрами идут вебдрайверу.

Заюзать какие-то extensions chromedriver или firefox ?

Может быть зависает подгрузка чего-то внешнего ?

**Надо попробовать с eager, и посмотреть как изменятся тесты.**

FullScreen window ???
ПОсмотреть что за ботва.

Посмотреть какие WebDriver extensions есть у chrome и firefox.

Посмотреть есть ли баг с зависанием у FireFox и какая скорость у FireFox.

===================

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Timeouts.html
webdriver.manage().timeouts()
implicitlyWait(ms) - 0 by default.
pageLoadTimeout(ms)
?? какое дефолтное значение ??
setScriptTimeout()

Актуальные capabilities:
http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html#getCapabilities

===================

executeAsyncScript - подумать как применять.

===================

Можно ли в вейт кондишне ждать либо одного либо другого.
Если что - нужно написать такую ф-ю.

Убедиться, что два init - это нормально.

===================

get - для ExtJs должна дождаться Url и дождаться всех Ajax вызовов.

===================

Выделить из браузерного API get чего-то?

===================

Вкомбинировать ремоутный драйвер и --keep-browser... в одну опцию.
И по ней в тестах разводить код на исследовательский и боевой.
В общем, сделать, чтобы переключение между боевым и тестовым режимом было только за счет опции.
--ignore-quit ?

===================

Однообразные сепараторы для content и для exploration, чтобы тестописатели привыкали.

===================

Дополнительный файл, где будут логи и трейсинг.
Чтобы отделить вывод tia от вывода сервера.

===================

Аттачить внешний лог к письму, если он есть.

===================

Кастомный префикс для subj email логов?
Чтобы различать тесты разного вида.

===================

Тихие assertions?
Т.е. без логирования в случае успеха.
a.sP - сделать тест на них.

===================

Для ускорения работы с формой.
setCurrentForm.
И API без обращения к formId.
И без распечатки formId.

===================

Сделать тест на соответствие promiseA+.

Проверить consume, что она действительно перехватывает throw, и что при reject она вернет reject а не сделает throw.

===================

Отделение команд run/update и ещё каких-нибудь. И выпуск 1.0 версии.

===================

Функциональность по прогону только тех тестов, где есть дифы.

======================

Посмотреть параметры этих функций, чтобы понять что в сорцах нужно менять:

* Ext.define
* Ext.create

Поддерживают ли обе эти ф-и id, reference, itemId ?

Интересно, что если я добавлю уже существующее имя reference ?

===================

Для табов - распечатка текста на табе.

===================

drop down menus in grid headers.

?? Что такое group header and sub headers?

===================

Может быть попробовать flow.reset ?
Правда у меня весь тест состоит из yield.
Тогда почему такие большие цепочки в очереди?

===================

Как бы нормально посмотреть состояние очереди.
Поменьше анонимных функций. Чтобы в стэке была информация.

======================

API для работы с деревом внутри комбобокса.

======================

Обернуть в try / catch все, что я ставлю в очередь на выполнение webdriver'ом.

======================

Что за свойство: config.

======================

Ext.mixin.Observable
Ext.EventManager
Что насчет preventDefault, stopPropagation?

Ext.Class
Ext.Base

Скроллинг клавиатурой по messageBox.

=====================

Почитать про Base Config, есть ли там мысль, что конфиги отражаются на свойства.
Есть мысль, что есть автогенеренные геттеры и сеттеры, видимо, для каждого ожидаемого конфига.
Проверить.

=====================

Внести/задействовать в распечатку компонента параметр - объект с опциями
- что печатать, а что нет.


Все-таки привести исследовалку к виду, когда она будет
обозначать путь поиска элемента. Т.е. строку, которую можно скопи-пастить в код теста.
М.б. сделать фильтрацию в уже готовом массиве? .filter.

=====================

Есть ли в ExtJs компоненте информация из какого он сорца?
Может быть у ExtJs есть особый режим, в котором это показывается?

? Заменить initialConfig на getInitialConfig() ?

======================

Тест для всех видов API.
В том числе и для кликов по табам.
При кликах по табам - включить ожидание завершения AJAX вызовов в API.

======================

Попробовать использовать исследовательские скрипты в разработке / отладке.
Перенести код установки хэндлеров в браузерную часть.

======================

Прочитать доки про другие элементы управления.

======================

API для кликов по табам - поревьюить существующее и добавить, если чего-то не хватает.

======================

?? API, чтобы убедиться, что в дереве, таблице, комбобоксе (или другом пикере) есть определенный набор значений (и без разницы что там есть ещё).

======================

Подумать как перевести на TypeScript, можно ли переводить частично.
Как ставятся TypeScript npm модули.

======================

Потестить API для кликов для таблиц, в которых модель распространяется не на все поля.

======================

API для работы со столбцами в таблицах.
Индекс строки, индекс столбца.

======================

В гридах и в Store глянуть отдельную ф-ю для поиска по id.

Получше отформатировать строку о записи в исследовалке.
Сделать режимы подробности вывода инфы,
в идеале в этом же диалоге в виде чекбоксов :).

======================

?? API для проверки выделен ли заданный элемент.
isSelected ( node ) : Boolean 

======================

?? API для работы с Menu.

======================

?? При работе с деревьями - сделать автоэкспанд перед кликом.
?? При работе с таблицами - тоже.

======================

Перечитать ещё раз эти доки:

http://docs.sencha.com/extjs/5.1.2/Ext.ClassManager.html

http://docs.sencha.com/extjs/5.1/core_concepts/components.html
http://docs.sencha.com/extjs/5.1/core_concepts/layouts.html
http://docs.sencha.com/extjs/5.1/application_architecture/application_architecture.html
http://docs.sencha.com/extjs/5.1/components/forms.html

В общем ещё раз пройтись по Guides с углубленным пониманием.

======================

focusRow
focusNode
focusCell
getNode

В исследовалке выводить имена полей модели компонента.

При серьезных ошибках с закрытием браузера останавливать удаленный драйвер?

cmd line option - запускать chrome c detached debug window.

==========

treeStore.filter ?
cascadeBy
findChildBy
child.data.text

var rn = panel.getRootNode() - какого типа return value?
var c = rn.findChild("text","Also ASP.net",true); // Возможно ищет только в экспанднутом дереве?
c.expand();

а ещё есть node id и есть getNodeById.

грид имеет метод filter.

Можно ли rootNode взять у View не поднимаясь до panel.

```js

  var panel = me.up('panel'),
                    rn = panel.getRootNode(),
                    regex = new RegExp("ASP.net");

  rn.findChildBy(function (child) {
                    var text = child.data.text;
                    if (regex.test(text) === true) {
                        console.warn("selecting child", child);
                        panel.getSelectionModel().select(child, true);
                    }
                });
```

http://victorbarzana.blogspot.ru/2012/11/recursively-search-in-extjs-tree.html
https://gist.github.com/colinramsay/1789536

Ext.data.TreeStore - есть filters в конфигах.

Там какие-то Path должны быть для деревьев.

Перед считыванием грида проверять его "готовность", м.б. он в процессе обновления.
isVisible, isExpanded - что-то такое.

==========

?? Поддержать разные логи для одного теста.
Например, если меняются локали.

==========

Просто ф-я для распечатки объекта в лог.

Тест поддержки массивов в equalDeep.

cmd line параметр для подключения внешних файлов к тестам.
Перед каждым тестом все эти файлы удаляются.
После каждого теста - их содержимое прибавляется к логу теста.

==========

2h
Сделать опцию, которая отключает сравнение с предыдущим ```*.mlog.```
Т.е. чтобы этой строки вообще не было в заголовке лога.

==========

2h.

В tia сделать опцию - подключать такой-то файлик к аттачменту почты.
(Нужно для лога коммитов).

==========

2h
Автор говорит, что jsdiff должен поддерживать utf8, перейти на jsdiff.
Поисследовать юникодные дифы.

Кстати, появилась новая версия jsdiff.

==========

6h.
Добавить поддержку тэгов в тестах.
id, автоматизирован ли тест, приоритет.
Дать возможность гонять тесты только с определенными тегами.
Дать возможность просматривать список тестов с определенными тегами.

Можно сделать рядом с каждым тестом (js файлом) - файл с информацией о тесте.
В частности и с тегами.
Ещё там могут быть зависимости, какие-то пререквизиты, может быть ссылка на номер бага в Jira, и т.д.
В общем, любая доп. инфа по тесту.

* Ввести этот файл.
* Ввести поддержку какие тэги гонять, а какие-нет (символ !) в коммандной строке.
* Читать файл перед тестом, и принимать решение гонять или нет.

Сюда же можно добавить среднее время прохождения теста.

А в командную строку можно добавить опцию, при каком отклонении от среднего времени выдавать ворнинг.

==========

Допереводить конфиги.
Убрать все русские комменты в коде.

==========

? Запускать тесты даже если нет изменений, для поиска спорадических багов.

===========

Поналяпать всяких waitAndClick
Или даже просто добавить во все наши акшны - wait элементов.
А может ввести в конфиге флаг - ждать / не ждать.
Или ввести таймаут у ф-й, если не 0 (по умолчанию) - ждать.

--attach-to-email
Позволяет приаттачить к мейлу файлы, разделенные запятыми.

зачем я в URL употребляю $(host).
Может быть всегда его подразумевать?

==========

Попробовать ускорить логин, за счет предустановленных профайлов.
Не знаю нужно ли тут убивать логин.
Он, вроде, у меня автоматом убивается при hl login.
Но вообще нужно сделать режим, чтобы и без логина заходилось, если явно он не требуется тестом.

==========

Подсветить в консольном металоге.
EDIF
Fail

Подсветить трейсинг разными цветами.
3й темный, 2й посветлее. 1й - нормальным цветом.
А может быть весь трейсинг потемнее.

==========

? Подсветить хелп.

==========

?
Ожидаемые exception нужно превратить в pass строчки логов.
И они не должны попадать в консоль.
М.б. какой-нить expectException - в ассершнах.
без --debug-max или --err-to-console.

==========

Сделать возможность просматривать дифы простой командой tia.js diff_number.

==========

Добавить побольше разных assertions.
Задокументировать и структурировать все ф-и.
* ф-и для логирования.
* assertions
* actions

? Ещё структурировать assertions.
Получше изучить что есть в assertions из selenium testing, node.js, tape, mocha, chai, jasmine.
Добавить на основе этого ещё assertions.

==========

Написать побольше оберток на разные действия с элементами.

==========

? Может быть на все экшны сделать опциональное msg, которое перегружает путь поиска элемента,
который может меняться.

================================================

# Переделки в режимах запуска

Ввести команды:
tia <command> [options]

====

commands:

Опции, не используемые командой должны генерить - unknown option,
для повышение осознанности при пользовании движком.
Поэтому, сначала считываешь команду, затем задаешь параметры минимисту.

* run - прогнать тесты.

==

* init - создать шаблоны для рутовых конфигов там, куда указывают --cfg-dir TIA_CONFIG_DIR.
Если их нет - в current working dir.
Если конфиги уже есть: ругаться, и ничего не делать.
Копировать:
* config/default-dir-config.js -> config.js
* default-suite-config.js -> suite-config.js

====

Соответственно поменять хелпы в tia и tia-tests.

================================================

http://docs.sencha.com/extjs/5.1/core_concepts/localization.html

================================================

Ещё раз поревьюить код. Задокументировать все JSDoc ом.
inspect all files (JsHint, JsCs).
Пробежаться по TODO в самом коде.

Написать тесты на каждую ф-ю. Проверить каждый параметр конфига и каждую cmd line опцию.

Поисследовать разные режимы дифф - утилит.
Подсвеченные дифы в консоль.
Дифы где показаны измененные куски.

================================================

WebStorm все-таки плохо поддерживает autocomplete.
Надо typings спецификацию сделать.
А может посмотреть как работает Visual Studio Code.

===========

Команда для очистки тестовой директории.

Удаляет все `*.log, *.dif`.

===========      

Сейчас есть шанс, что профайлы повторяются.
Может быть это и нормально, но нужно задокументировать.

===========

Проверить на виндах, что tia --help сработает, т.е. что --harmony сработает.

===========

* Добавить ошибку, что нет настроек для мейла, если мейл используется.

===========

Однозначно в log-viewer сделать возмжожность смотреть скриншоты.
Пилить хороший log-viwer.
Пилить поддержку всяких CI.

Автоматизировать всякие git blame.

===========

Поизучать sencha cmd с целью выжать какую-то производительность.
А может и параметры, управляющие генерацией всяких id шников.

=============

Post answers here with link to my tia engine (after adding more meat (assertions, selenium wrappers, extjs stuff)
to the engine):
http://stackoverflow.com/questions/8344776/can-selenium-interact-with-an-existing-browser-session
http://sqa.stackexchange.com/questions/1988/selenium-reuse-existing-browser-session-instead-of-opening-new-windows

=============

Разбивать трейсинг не только по уровню, но и по контексту.
Т.е. от каких функциональностей он нужен, а от каких - нет.
--trace-ctx dirWalker, rmDriver, etc.
gIn.tracer.traceI(msg, ctx);
if (ctx in traceCtx).
(indexOf ?).
Если нет --trace-ctx - трейсить все.
Отсортированный массив, оптимизированный поиск.

```js
/**
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
function binaryIndexOf(searchElement) {
    'use strict';
 
    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;
 
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = this[currentIndex];
 
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
}
```
=============

log as overriding Executor.execute function?
So I can track all selenium commands and their parameters.
  
=============

? Выводить diff mlogа to console.
for et and for prev.

Сделать обертку на все ф-и, могущие кинуть исключение.
Может быть это поможет лучше отлаживаться.
А то selenium execute flow никакой инфы не говорит.
М.б. где-то это настраивается?

Ошибки в скриптах внутри браузера.
М.б. то, что перехватил в unhandled exceptions - распечатывать.
Только фигово, что на самом деле скрипта нет, есть исполненная разок ф-я.

Selenium быстрее работает через id или через WebElement?

TODO: в тестах проставлять ID от тестлинко-подобных тулзов?
TODO: зависимости тестов.

Поотлаживаться на Windows.

Поотлаживаться на FireFox.
IE ??

Пройтись по TODO в коде.

=======================

Запинать все на Firefox и перейти на него при отладке.
Сравнить возможности отладочных тулзов при работе с WebDriver.

Вывод инфы о ячейках таблицы и о ячейках заголовка таблицы в исследовалке.

=======================

https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/2766

Сделать список известных проблем с Selenium, который девелоперы могут смотреть в первую очередь.

Containers.js:
Разве reference можно задавать в Ext.define ??
А id ?

getIdByFn() : custom function to get id.
getCompByFn()

===================

Поотлаживать non clickable ?
Похоже элемент дергается, как раз после 5 секунд задержки.
Но может это связано с ошибкой.
А в test_production нет скроллбаров.
Элемент содержит рисунки 1х1.

===================

Более выразительные дифы.
Хорошо бы в logViewer сделать коллапсибельные дифы.

+/tmp - много профайлов браузеров ? Пока решил by rm -rf /tmp/.com.google.Chrome*.

===================

gT.suiteConfig.attachOnlyDiffs - в cmd line opts, пробежаться ещё по всяким константам и конфигам,
посмотреть что следует вынести в cmd line.

===================

Аргументы для внешних тулзов, которые подключаются через require.
Можно сделать отдельную строковую опцию, где можно задавать все такие аргументы.

===================

Добавить в хелп:
Мое API не поддерживает внутреннюю очередь, поэтому вся синхронизация делается с помощью yield.

===================

getCapabilities в трейс или в префикс письма.

===================

Присылать лог в html форме, с подсветками.
Конечные тесты могут быть гиперссылками на лог.
В металог идут дифы, поэтому пока что ссылка на диф ненужна.

===================

? Добавить сверку с эталонным скриншотом
Уровни похожести изображений?
Sikuli?

===================

Обернуть вообще все вызовы в Execute, чтобы не париться с синхронизацией.
Будет возмжожность и юзать yield и then цепочки.

Если взять всю ф-ю, вместе с врапером в Execute, то не над act() выполнять в Execute.

act() - может возвращать не thenable ?

Проверить что будет в catch.
```js
flow.execute(function() {
  flow.execute(() => console.log('a'));
  flow.execute(() => throw new Error('asdf'));
}).catch(фыва);

```

Проверить пример

```js
var d1 = promise.defer();
d1.promise.then(() => console.log('A'));

var d2 = promise.defer();
d2.promise.then(() => console.log('B'));

flow.execute(function() {
  d1.promise.then(() => console.log('C'));
  flow.execute(() => console.log('D'));
});
flow.execute(function() {
  flow.execute(() => console.log('E'));
  flow.execute(() => console.log('F'));
  d1.fulfill();
  d2.fulfill();
}).then(function() {
  console.log('fin');
});
// D
// A
// C
// B
// E
// F
// fin

```

TODO: пройтись по всему коду в свете того, что режекченный промис сбрасывает всю subtask.

==============

Selenium не подчищает за собой временный профайл браузера?


После того, как сделаю сайт, сделать классный скринкаст по движку.
До этого надо заюзать typescript для улучшения работы intellisense.


=============

Вести в каком-то файле самое маленькое и самое большое время выполнения тестов.
Посылать на почту сообщение о побитии рекордов.
Когда добавляешь или удаляешь тест - стираешь этот файл.