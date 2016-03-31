'use strict';
// Конфиги для всех test suites. Не перегружаются нигде.
gT.engineConfig = {
  configName: 'config.js', // Имя файла для локального конфига.

  suiteConfigName: 'suite-config.js', // Имя файла для конфига пакета тестов (test suite), перегружающего настройки по умолчанию.

  profileRoot: 'tmpProfiles', // TODO Корневая директория, где лежат профайлы. Не перегружается в локальных конфигах.

  defDisplay: process.env.DISPLAY, // Дефолтный дисплей.

  gitPullLog: 'gitpull.log' // TODO: Имя лога для git pull, этот лог посылается на почту.
};
