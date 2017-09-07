'use strict';

// The default config for test directories.
// Options can be overloaded in directory configs.
module.exports = {

  // API - функции могут писать информацию о своем вызове в лог.
  // По-умолчанию, low level функции пишут о своём вызове в лог, а high level функции пишут укороченную информацию,
  // отключая логи для low level функций, составляющих high level функцию.
  // Многие low level функции принимают параметр logAction, который позволяет управлять логированием.
  // Если этот параметр не используется, используется дефолтное значение для разрешения логирования.
  // Чтобы выключить лог для какой-то функции,нужно передать false в качестве logAction.
  // Чтобы временно поменять дефолтное разрешение логирования, можно юзать gT.lL.setDefaultLlLogAction.
  // См. также gT.lL.setLlPassCounting.

  // milliseconds, Задержка между low level вызовами для selenium действий со страницей,
  // можно использовать для визуализации процесса тестирования.
  // В боевом режиме используйте 0.
  selActionsDelay: 0,

  // Можно включать вывод таймингов для каждой low level команды. Это приведет к дифам в логах.
  // Поэтому, в боевом режиме - используйте false.
  enableTimings: false,

  // Этот параметр может/должен перегружаться локальными конфигами директорий, чтобы задавать название секции.
  sectionTitle: '',

  // Если true - перестанут считаться Pass и Fail счетчики.
  // Может использоваться для тестирования движка тестов, или при написании high level функций.
  ignorePassAndFailCounters: false,

  // Игнорировать ли все тесты из директории в которой лежит config.js.
  // Если надо пропустить один тест, можно переименовать его, чтобы расширение стало не .js.
  skip: false,

  // Печатать в лог все исключения браузера, произошедшие во время выполнения low level фукнции.
  selPrintClExcAfterEachCommand: false,

  // Печатать в лог содержимое консоли браузера, добавленное за время выполнения low level функции.
  // TODO: перенести в константы и cmd line?
  // TODO: включать при отладке?
  selPrintClConsoleAfterEachCommand: false,

  // Выбор дисплея, например ':1.5' чтобы тесты работали без видимого GUI
  // (если Xvfb запущена, как "Xvfb :1 -screen 5 2560x1440x24"),
  // пустая строка - дефолтный DISPLAY.
  DISPLAY: ':1.5',

  // Путь к профайлу пользователя относительно gIn.params.profileRootPath (пока реализована поддержка только для Chrome).
  // Пустая строка - путь по умолчанию, он уничтожается при закрытии браузера,
  // а значит при закрытии браузера уничтожаются и все данные (сессии, куки, настройки, и т.д.).
  // Используйте очень осторожно, т.к. функции очистки профайла выполняют удаление директории на диске.
  selProfilePath: '',

  // Уровень сообщений, отлавливаемых в консоли браузера. SEVERE или WARNING.
  // Из-за этих сообщений могут быть дифы. Ближе к релизу можно ставить WARNING.
  // selConsoleReportLevel: 'SEVERE',

  // Адрес сервера. Полезно менять при одновременной работе нескольких тестеров на одной машине.
  // В логах адрес будет заменяться на $(host).
  // В функциях, принимающих URL строка $(host) заменяется на этот полный адрес.
  // Этот параметр можно перегружать в локальном config.js.
  // Также, этот параметр можно перегружать через --def-host опцию.
  selHost: 'http://localhost:1338',

  resUsagePrintAtErrors: true // Print resource usage at error. Makes sense to disable for tests for errors testing.

  // TODO ?:
  //stopTestsIfThrow: false, // Can be overriden in tests for test engine.
  //stopTestsIfFail: false, // Can be overriden in tests for test engine.
  //stopTestsIfDiff: false, // Can be overriden in tests for test engine.
  //logVerboseResults: true, // Show results for non-diffed *.js tests in metaLog.
  //logSubItemIndent: ' ', // Indent for subsection or for *.js inside section.
  // If false - there will not be section with detailed results.
};

