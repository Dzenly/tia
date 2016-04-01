'use strict';

/* globals gT: true */

// Конфиг для сьюта по умолчанию. Suite - директория, содержащая тесты.
// Эти опции не перегружаются локальными конфигами директорий.
gT.suiteConfigDefault = {
  emptyDirToSuiteLog: true, // Если какая-то директория не содержит тестов, нужно ли информацию о ней писать в summary log.
  //mailList: '',
  mailList: 'alexchem@yandex.ru', // Кому рассылать результаты. Список мейлов через запятую.
  logToStdErrOut: true, // Если true, подробный лог с таймингами будет распечатан в stdout (часть лога без дифов) и stderr (часть лога с дифами).

  attachArchive: true, // Нужно ли аттачить к письму архив тестовой директории.

  attachOnlyDiffs: true, // Должен ли архив содержать только тесты с дифами.

  removeZipAfterSend: true // Удалять ли zip после отправки.
};
