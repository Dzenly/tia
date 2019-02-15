# Notes about ExtJs

## Terms

[TEQ](http://dzenly.github.io/tia/modules/_ext_js_common_d_.html#teq)

## ExtJs App Explorer

[ExtJs App Explorer](extjs-explorer.md)

=============

TODO

* To save your time for autotests creation and to make tests faster,
it is strongly recommended to develop some design of id naming in your project,
and use id everywhere.
In complex cases you should use itemId.
You should not rely on XPath, attributes, css styles, etc.

* Also you can use s.browser.executeScript to access ExtJs objects your way and return
JS DOM for further interactions by TIA API and selenium-webdriver API.

## Known issues

* autoGenId for inner components (say for boundlist of combobox)
is true. Even if autoGenId for the combobox is false.
