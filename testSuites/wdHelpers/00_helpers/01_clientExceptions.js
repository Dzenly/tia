function *test() {
	t.setTitle('Test for client exceptions');
	yield *sel.hl.initAndLogin();
	//yield sel.setWindowSize(2560, 1440);
	//yield sel.initDriver();
	//yield sel.get('$(host)');

	t.println('No exceptions and console logs:');
	yield sel.logBrowserExceptions(true);
	yield sel.console();

	yield sel.issueClientException();

	t.println('One exception and one console log:');
	yield sel.logBrowserExceptions(true);
	yield sel.console();

	t.println('No exceptions and console logs:');
	yield sel.logBrowserExceptions(true);
	yield sel.console();

	yield sel.close();
	yield sel.quit();
}

sel.execGen(test);
