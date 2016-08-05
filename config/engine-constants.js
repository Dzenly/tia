'use strict';

// Конфиги для всех test suites. Не перегружаются нигде.
module.exports = {

  testsDirEnvVarName: 'TIA_TESTS_DIR',

  requireModulesEnvVarName: 'TIA_REQUIRE_MODULES',

  emailCfgPathEnvVarName: 'TIA_EMAIL_CFG_PATH',

  externalLogEnvVarName: 'TIA_EXTERNAL_LOG',

  // Имя файла для локального конфига.
  configName: 'config.js',

  // Имя файла для конфига пакета тестов (test suite), перегружающего настройки по умолчанию.
  suiteConfigName: 'suite-config.js',

  // Корневая директория, где лежат профайлы. Не перегружается в локальных конфигах.
  profileRootDir: 'br-profiles',

  // Дефолтный дисплей для GUI тестов.
  // Сохраняем состояние в момент старта.
  defDisplay: process.env.DISPLAY,

  // TODO: Имя лога для git pull, этот лог посылается на почту.
  gitPullLog: 'gitpull.log',

  // File name for PID for remote chrome driver.
  remoteChromeDriverPid: 'cd.pid',

  // File name for PID for remote chrome driver.
  remoteChromeDriverSid: 'cd.sid',

  logEncoding: 'utf8',  // ascii

  selfTestsEtMLog: 'tests.et',

  selfTestsExtLog: 'ext-log.log',

  hangTimeout: 20000, // Timeout after which action function considered as hanging.,

  defaultWaitTimeout: 20000, // Default timeout for e.wait functions.,

  // Delay before click on ExtJs element. It seems like ExtJs does not handle
  // too fast clicking.
  extJsClickDelay: 0, // milliseconds.

  maxRecursiveErrCountForTest: 2, // Maximum recursive errors count for one test.

  // Maximum tests count with recursive errors if this limit is exceeded
  // all tests will be cancelled.
  maxTestCountWithRecursiveError: 2,


  // Comboboxes have a glitch, at one left click they can open bouldList and immediately close it.
  // This constant sets how many times tia will retry to click comboboxes if bound List is not opened.
  // If retry count is 0 the only one attempt to click combobox will be performed.
  cbRetryClicksCount: 2,

  cbBoundListTimeout: 5000, // milliseconds for waiting of bound list to be opened after click on combobox.

  // milliseconds for waiting of ajax requests after clicks.
  // This is actual for lazy loading some stuff at clicking.
  ajaxTimeoutAfterClick: 5000, // TODO: increase after good debugging. For now low value is needed to detect unstable parts.

  elGetTextFail: 'ElGetTextFail' // The error message for getText fail for Web Element.
};
