function *test() {
	t.setTitle('Test for work with profile to auto-login without "remember me" using');
	yield sel.cleanProfile();
	yield *sel.hl.initAndLogin(false);
	yield sel.quit();
	yield *sel.hl.initAndWaitExtApp();
	yield sel.getUrlPrefix(true);
	yield sel.quit();
}

sel.execGen(test);
