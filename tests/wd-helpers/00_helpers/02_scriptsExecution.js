'use strict';

function *test() {
  t.setTitle('Test for client exceptions');
  yield s.driver.init();
  yield s.browser.loadPage('http://google.com');

  var res = yield s.browser.executeScript('return 5;');
  l.println('Result of script execution: ' + res);

  yield s.browser.close();
  yield s.driver.quit();
}

u.execGen(test);
