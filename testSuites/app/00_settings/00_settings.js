function *test() {
	t.setTitle('Test for settings tab');
	yield *sel.hl.initAndLogin();
	yield sel.clickTabId('settings');
	yield sel.waitForUrl('$(host)/#settings:org_info', 4000);
	var url = yield sel.getUrl();
	t.println('Current URL: ' + url);
	yield sel.close();
	yield sel.quit();
}

sel.execGen(test);

