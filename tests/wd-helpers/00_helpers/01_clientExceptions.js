function issueClientException(logAction) {
	return s.browser.executeScript('setTimeout(function() { DsgwDwd3 += 8;}, 0)');
};

function *test() {
	t.setTitle('Test for client exceptions');

	yield s.driver.init();
  yield s.browser.loadPage('http://google.com');
	// yield s.browser.setWindowSize(2560, 1440);

	l.println('No exceptions and console logs:');
	yield s.browser.printCaughtExceptions(true);
	yield s.browser.printSelBrowserLogs();

	yield issueClientException();

	l.println('One exception and one console log:');
	yield s.browser.printCaughtExceptions(true);
	yield s.browser.printSelBrowserLogs();

	l.println('No exceptions and console logs:');
	yield s.browser.printCaughtExceptions(true);
	yield s.browser.printSelBrowserLogs();

	// yield s.browser.close();
	yield s.driver.quit();
}

module.exports = u.execGenSafe(test);
