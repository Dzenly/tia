Сравнение скриншотов ?

BrowserModProxy?
Or http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/proxy.html?

-------

Вынести утилитки для работы с

* файлами
* директориями
* строками

В отдельные модули и репозитории.

unpublish/deprecate старые версии из npm.

Попробовать пересоздать и github репозиторию тоже.

Может быть, перейти на gitlab и гонять тесты тоже.

Как на github гоняются тесты?

Кнопка для пожертвований.

Задействовать разные поля, в соответствие с:
https://docs.npmjs.com/files/package.json
документация, тестирование.

Сделать возможность удаленного запуска.
Т.е. на каком-то сервере ты настраиваешь, чтобы он:

Подтягивал изменения.
Стартовал сервер.
стартовал xvfb.

Debug tests for windows (3h). Slash / backslash issues, cygwin utilities work.
Опция -l аттачить логи, для дифнутых тестов к мейлу.

* Refactor everything to be more OOP (incapsulation, accessors, constructors, signletons, factories). (12h)

Very low priority. Перехватывать все, что сыпется в stderr.

============

Можно ли подцепляться к существующему браузеру, исследовать текущую сессию.
Что-то как будто это сложно.
Многие советы сводятся к тому, чтобы оставлять браузер открытым после выхода из теста.
Либо запоминать и восстанавливать все куки при переоткрытии.

https://groups.google.com/forum/#!topic/selenium-developers/1LygDvlQ3H4
http://stackoverflow.com/questions/26386418/how-to-use-attach-an-existing-browser-using-selenium
https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/18

http://stackoverflow.com/questions/8344776/can-selenium-interact-with-an-existing-browser-session

```js
// First, make sure you have a WebDriver server running. For example, download ChromeDriver,
// then run chromedriver --port=9515.

// Second, create the driver like this:

let webdriver = require('selenium-webdriver');

let driver = new webdriver.Builder()
   .withCapabilities(webdriver.Capabilities.chrome())
   // As an alternative to this method, you may also set the SELENIUM_REMOTE_URL environment variable.
   .usingServer('http://localhost:9515')
   .build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
driver.findElement(webdriver.By.name('btnG')).click();
driver.getTitle().then(function(title) {
   console.log(title);
 });

driver.quit();
```

http://www.binaryclips.com/2016/03/selenium-webdriver-in-c-how-to-use.html

Как-то связано с Remote.
Люди выкашивают --no-remote из запуска Firefox.
+ unset MOZ_NO_REMOTE

Как selenium работает с MessageBox ?
http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_TargetLocator.html#alert
http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_AlertPromise.html

========================

Улучшить распечатку иерархии видимых компонентов.
Скроллинг клавиатурой по messageBox.
Сделать диалог с деревом видимых компонентов.
В дереве первым идет лист с инфой о компоненте, затем узлы.
