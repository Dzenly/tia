'use strict';

function *test() {
  t.setTitle('Test for client exceptions');
  yield sel.initDriver();
  yield sel.get('http://google.com');

  var res = yield sel.executeScript('return 5;');
  t.println('Result of script execution: ' + res);

  yield sel.close();
  yield sel.quit();
}

sel.execGen(test);
