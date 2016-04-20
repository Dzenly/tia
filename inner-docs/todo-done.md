Начал вести файл сделанных TODO 2016.04.11

Избавиться от использования stderr для логирования ожидаемых сообщений вообще.
Ибо нет гарантии, что будет правильный порядок.
Сделать все либо через html логи, либо через ansi colors.
http://stackoverflow.com/questions/3723795/is-stdout-line-buffered-unbuffered-or-indeterminate-by-default
Бага в webstorm - в перемешке stdout и stderr.

log.js pass - должен ставить префикс OK
fail - 'FAIL:'

Отделить assertions.

Short log to console.
Diffs to meta log (как бы для отладки, и если дифы мелкие можно и для боевого режима).
Не выводить ожидаемые дифы.

Не печатать тесты, которые пропустил с помощью --p.
Включая родительские директории (не имеющие листьев).
Этим управляет emptyDirToSuiteLog.

Убрать дифы для проскипанных через конфиг тестов:
diff: 01_secondSkippedTest.et: No such file or directory
Похоже, пофиксилось само в результате других фиксов.

