const { t, l, s } = gT;

function issueClientException(enableLog) {
  return s.browser.executeScript('setTimeout(function() { DsgwDwd3 += 8;}, 0)');
}

async function test() {
  t.setTitle('Test for client exceptions');

  await s.driver.init();
  await s.browser.loadPage('http://google.com');

  // await s.browser.setWindowSize(2560, 1440);

  l.println('No exceptions and console logs:');
  await s.browser.printCaughtExceptions(true);
  await s.browser.printSelBrowserLogs();

  await issueClientException();

  l.println('One exception and one console log:');
  await s.browser.printCaughtExceptions(true);
  await s.browser.printSelBrowserLogs();

  l.println('No exceptions and console logs:');
  await s.browser.printCaughtExceptions(true);
  await s.browser.printSelBrowserLogs();

  // await s.browser.close();
  await s.driver.quit();
}

module.exports = test();
