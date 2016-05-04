'use strict';

function *test() {
  t.setTitle('Test for client interaction with a browser');
  yield s.driver.init();
  yield s.browser.loadPage('http://google.com');

  yield s.browser.setDbgClickHandler(`alert('HERE!');`);

  // var res = yield s.browser.executeScript('return 5;');
  // l.println('Result of script execution: ' + res);

  // yield s.browser.close();
  // yield s.driver.quit();
}

u.execGen(test);
