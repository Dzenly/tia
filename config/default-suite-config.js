'use strict';

// Конфиг для сьюта по умолчанию. Suite - директория, содержащая тесты.
// Эти опции не перегружаются локальными конфигами директорий.
module.exports = {

  // Нужно ли писать в summary log информацию о директории, в которой не было тестов
  // (либо там нет тестов, либо для директории выставлен skip: true).
  emptyDirToSuiteLog: false,

  // Если true, подробный лог с таймингами будет распечатан в stdout.
  metaLogToStdout: true,

  // Нужно ли аттачить к письму архив тестовой директории.
  attachArchiveToMail: true,

  // Должен ли архив содержать только тесты с дифами.
  attachOnlyDiffs: true,

  // Удалять ли zip после отправки.,
  removeZipAfterSend: true,

  // Если пользуетесь рассылкой писем - обязательно перегрузить mail* параметры в suite-config.js.

  // Кому рассылать результаты. Список мейлов через запятую.
  mailRecipientList: '',
  // smtp host, e.g. smtp.yandex.ru
  mailSmtpHost: '',
  // user to send mail on behalf of.
  mailUser: '',
  // password of the user to send mail on behalf of.
  mailPassword: ''
};
