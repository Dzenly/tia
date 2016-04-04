function *test() {
	t.setTitle('Test for client exceptions');

	yield s.initDriver();
  yield s.get('http://google.com');
	//yield s.setWindowSize(2560, 1440);

	l.println('No exceptions and console logs:');
	yield s.logBrowserExceptions(true);
	yield s.console();

	yield s.issueClientException();

	l.println('One exception and one console log:');
	yield s.logBrowserExceptions(true);
	yield s.console();

	l.println('No exceptions and console logs:');
	yield s.logBrowserExceptions(true);
	yield s.console();

	yield s.close();
	yield s.quit();
}

u.execGen(test);
