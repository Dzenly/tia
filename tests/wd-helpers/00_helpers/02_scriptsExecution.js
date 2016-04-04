'use strict';

function *test() {
  t.setTitle('Test for client exceptions');
  yield s.initDriver();
  yield s.get('http://google.com');

  var res = yield s.executeScript('return 5;');
  l.println('Result of script execution: ' + res);

  yield s.close();
  yield s.quit();
}

u.execGen(test);
