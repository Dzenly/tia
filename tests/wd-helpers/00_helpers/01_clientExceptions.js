function issueClientException(logAction) {
	return s.browser.executeScript('setTimeout(function() { DsgwDwd3 += 8;}, 0)');
};

function *test() {
	t.setTitle('Test for client exceptions');

	yield s.driver.init();
  yield s.browser.loadPage('http://google.com');
	// yield s.browser.setWindowSize(2560, 1440);

	l.println('No exceptions and console logs:');
	yield s.browser.logExceptions(true);
	yield s.browser.logConsoleContent();

	yield issueClientException();

	l.println('One exception and one console log:');
	yield s.browser.logExceptions(true);
	yield s.browser.logConsoleContent();

	l.println('No exceptions and console logs:');
	yield s.browser.logExceptions(true);
	yield s.browser.logConsoleContent();

	// yield s.browser.close();
	yield s.driver.quit();
}

u.execGen(test);
