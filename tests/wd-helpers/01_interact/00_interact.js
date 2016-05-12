'use strict';

function *test() {
  t.setTitle('Test for client interaction with a browser');
  yield s.driver.init();

  if (gIn.firstRunWithRemoteDriver) {
    yield s.browser.loadPage('http://google.com');
  } else {
    //yield s.browser.loadPage('http://yandex.ru');
    yield s.browser.executeScript('alert("asdf");');
  }

  // yield s.driver.sleep(35000);

  // yield s.browser.setDbgClickHandler(`
  // var el = Ext.dom.Element.fromPoint(e.clientX, e.clientY);
  // alert(el);
  // `
  // );

  // var res = yield s.browser.executeScript('return 5;');
  // l.println('Result of script execution: ' + res);

  // yield s.browser.close();
  // yield s.driver.quit();
}

u.execGen(test);
