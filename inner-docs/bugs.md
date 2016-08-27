
По борьбе с зависаниями:

--dns-prefetch-disable option of chrome.

I had this issue with my Django selenium tests (django==1.7.12 and selenium==2.53.1) with ChromeDriver 2.21.371459 and Google Chrome 48.0.2564.116.

I was able to isolate the issue. In my case it was happening only for pages referencing a static file (an image in a HTML <img> tag for instance http://cdn.local.myproject.net/static/myimage.png) on my custom local cdn domain. The was not present if I used a relative path "/static/myimage.png" or localhost "http://127.0.0.1/static/myimage.png" so I figured it was a DNS problem.

I was able to bypass the problem by using the --dns-prefetch-disable option of chrome.

Example in Python:

from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--dns-prefetch-disable')
driver = Chrome(chrome_options=options)

I don't know if this is the general case but hopefully it can help some of you.



Comment 41 by hdatt...@gmail.com, Aug 3, 2016
I found the root cause of the issue, at least for my case. We were running the selenium tests on a Jenkins machine which was using a proxy server. We came across this issue only when we enabled logging to All. Its a known fact that websockets do not work with proxies and chromedriver uses websockets to fetch browser logs. So we disabled proxy and the issue is resolved. Hope this helps someone.



delay after new driver.

Возможно, что связано с уровнями логирования. Т.е. возможно какой-то логер вызывает зависания.

Может быть связано с плагинами.

Проверять, что драйвер стартанул считыванием какого-то статуса драйвера.
А может каким-то действием со страницей. И если облом - весь процесс заново,
пока не отработает нормально. Убиваешь все зависшие процессы с chromedriver,
и вперед. В конфигах таймаут между попытками и количество попыток, после которого вывалиться с ошибкой.

Посмотреть что с FireFox.



