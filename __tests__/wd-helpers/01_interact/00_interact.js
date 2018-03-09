'use strict';

async function test() {
  t.setTitle('Test for client interaction with a browser');
  await s.driver.init();

  if (gT.firstRunWithRemoteDriver) {
    await s.browser.loadPage('http://google.com');
  } else {
    // yield s.browser.loadPage('http://yandex.ru');
    await s.browser.executeScript('alert("asdf");');
  }

  // yield s.driver.sleep(35000);

  // yield s.browser.setDbgOnMouseDown(`
  // const el = Ext.dom.Element.fromPoint(e.clientX, e.clientY);
  // alert(el);
  // `
  // );

  // const res = yield s.browser.executeScript('return 5;');
  // l.println('Result of script execution: ' + res);

  // yield s.browser.close();
  // yield s.driver.quit();
}

module.exports = test();
