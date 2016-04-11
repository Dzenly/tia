Начал вести файл сделанных TODO 2016.04.11

Избавиться от использования stderr для логирования ожидаемых сообщений вообще.
Ибо нет гарантии, что будет правильный порядок.
Сделать все либо через html логи, либо через ansi colors.
http://stackoverflow.com/questions/3723795/is-stdout-line-buffered-unbuffered-or-indeterminate-by-default
Бага в webstorm - в перемешке stdout и stderr.

log.js pass - должен ставить префикс OK
fail - 'FAIL:'

Отделить assertions.

