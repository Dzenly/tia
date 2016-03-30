// TODO: made configs as private (closure) variables and provide accessors ?

// TODO: Сделать возможность просматривать дифы простой командой tia.js diff_number.

// Конфиг для директорий, используемый по умолчанию. Эти опции можно перегружать в локальных конфигах директорий.
gT.dirConfigDefault = {

  // API - функции из директорий apiHighLevel и apiLowLevel могут писать информацию о своем вызове в лог.
  // По-умолчанию, low level функции пишут о своём вызове в лог, а high level функции пишут укороченную информацию, отключая логи для low level функций,
  // составляющих high level функцию. Многие low level функции принимают параметр logAction, который позволяет управлять логированием.
  // Если этот параметр не используется, лог включен. Чтобы выключить лог для какой-то функции, нужно передать false в качестве logAction.

  forceLogAction: false, // true - Насильно выводить все действия, даже если logAction = false. Может использоваться при отладке.
  // Есть подобная опция для командной строки. Если хоть одна из этих двух опций true - будут логироваться все actions.

  delay: 0, // milliseconds, Задержка между low level вызовами, можно использовать для визуализации процесса тестирования. В боевом режиме используйте 0.

  timings: false, // Можно включать вывод таймингов для каждой low level команды. Это приведет к дифам в логах. Поэтому, в боевом режиме - используйте false.

  timeout: 15000, // milliseconds, таймаут для синхронной части *.js теста, после которого тест остановится движком.
  // Т.к. обычный тест это функция, которая ставит тестовое задание в очередь и возвращает управление, синхронная часть теста выполняется миллисекунды.
  // Поэтому, лучше не трогать этот параметр без нужды.

  sectTitle: '', // Этот параметр может перегружаться локальными конфигами директорий. Чтобы задать название секции.

  ignorePassAndFailCounters: false, // Если true - перестанут считаться Pass и Fail счетчики. Может использоваться для тестирования движка тестов, или
  // при написании high level функций.

  skip: false, // Эту опцию можно перегрузить в локальной директории, чтобы игнорировать все тесты из неё.
  // Если надо пропустить один тест, можно переименовать его, чтобы расширение стало не .js.

  printClExcAfterEachCommand: false, // Печатать в лог все исключения браузера, произошедшие во время выполнения low level фукнции.

  printClConsoleAfterEachCommand: false, // Печатать в лог содержимое консоли, добавленное за время выполнения low level функции.

  DISPLAY: ':1.5', // Выбор дисплея, например ':1.5' чтобы тесты работали без видимого GUI (если Xvfb запущена, как "Xvfb :1 -screen 5 2560x1440x24"),
  // пустая строка - дефолтный DISPLAY.

  profilePath: '', // Путь к профайлу пользователя относительно gT.engineConfig.profileRoot (пока реализована поддержка только для Chrome).
  // Пустая строка - путь по умолчанию, он уничтожается при закрытии браузера,
  // а значит при закрытии браузера уничтожаются и все данные (сессии, куки, настройки, и т.д.).
  // Используйте очень осторожно, т.к. функции очистки профайла выполняют удаление директории на диске.

  consoleReportLevel: 'SEVERE', // Уровень сообщений, отлавливаемых в консоли браузера. SEVERE или WARNING.
  // Из-за этих сообщений могут быть дифы. Ближе к релизу можно ставить WARNING.

  host: 'http://localhost:1338', // Адрес сервера. Полезно менять при одновременной работе нескольких тестеров на одной машине.
  // В логах адрес будет заменяться на $(host). В функциях, принимающих URL строка $(host) заменяется на этот полный адрес.

  // Опции в задумках, не реализованы:
  //stopTestsIfThrow: false, // Can be overriden in tests for test engine.
  //stopTestsIfFail: false, // Can be overriden in tests for test engine.
  //stopTestsIfDiff: false, // Can be overriden in tests for test engine.
  //logVerboseResults: true, // Show results for non-diffed *.js tests in suiteLog.
  //logSubItemIndent: ' ', // Indent for subsection or for *.js inside section.
  // If false - there will not be section with detailed results.
};

