============================

Разобрать плюсы и минусы наличия директории tia-tests.
Можно раскидать тесты и по продуктам.

+
Удобно смотреть примеры кода для разных продуктов.
Удобно подтягивать из репозитория.
можно хранить tia-ex прямо в tia-tests.
удобно делать глобальные поиск и замена, когда переходишь на новую версию движка.
при разработке tia лежит в одной директории, а если разделить, то будет в директории каждого репозитория.

Тесты для лицензирующего модуля.

-

Допустим, я пишу коллектор, и у меня в директории collectorjs/test сразу есть тесты.
? Можно сделать.

============================


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
