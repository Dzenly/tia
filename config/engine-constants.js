'use strict';

// Конфиги для всех test suites. Не перегружаются нигде.
module.exports = {

  testsDirEnvVarName: 'TIA_TESTS_DIR',

  requireModulesEnvVarName: 'TIA_REQUIRE_MODULES',

  emailCfgPathEnvVarName: 'TIA_EMAIL_CFG_PATH',

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

  logEncoding: 'utf8' // ascii
};
