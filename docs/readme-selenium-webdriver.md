## Selenium WebDriver notes

There are wrappers for Selenium API, but sometimes one needs to know Selenium.
*sOrig* global object provides Selenium objects (listed below).

GUI part is created on top of the official JS selenium-webdriver binding:

http://seleniumhq.github.io/selenium/docs/api/javascript/index.html

It is good to know following Selenium terms:

### WebElement

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html

### Actions

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/actions_exports_ActionSequence.html

### By

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html

### until

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html

## chrome webdriver

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html

## Key

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

After install one can find examples of (non TIA) selenium tests here:
`tia/node_modules/selenium-webdriver/test`

### Common workflow for tests using Selenium Webdriver

* Go to some URL. (see s.browser.loadPage(url)).
* Wait for some event like HTML element appearance, some JS object state, title value, etc.
  (see s.wait* functions) (If you are assured that element exists you can work with an element without wait).
* Send various mouse or keyboard events to the found element
  (s.click*, s.sendKeys*).
* Read some data from the HTML element.
* Read some data from JS objects. (s.browser.executeScript()).
* Check that values are equal to expected ones by various assertions (see 'a' global object), or just logging results.
