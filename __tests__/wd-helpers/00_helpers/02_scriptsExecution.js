'use strict';

async function test() {
  t.setTitle('Test for client exceptions');
  await s.driver.init();
  await s.browser.loadPage('http://google.com');

  const res = await s.browser.executeScript('return 5;');
  l.println(`Result of script execution: ${res}`);

  // await s.browser.close();
  await s.driver.quit();
}

module.exports = test();
