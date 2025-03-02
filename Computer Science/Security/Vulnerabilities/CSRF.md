> Cross Site Request Forgery

 «межсайтовая подделка запроса» — вид [атак](https://ru.wikipedia.org/wiki/%D0%A5%D0%B0%D0%BA%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D0%B0%D1%82%D0%B0%D0%BA%D0%B0) на посетителей [веб-сайтов](https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%B1-%D1%81%D0%B0%D0%B9%D1%82), использующий недостатки протокола [HTTP](https://ru.wikipedia.org/wiki/HTTP). Если жертва заходит на сайт, созданный злоумышленником, от её лица тайно отправляется запрос на другой [сервер](https://ru.wikipedia.org/wiki/%D0%A1%D0%B5%D1%80%D0%B2%D0%B5%D1%80_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5)) (например, на сервер платёжной системы), осуществляющий некую вредоносную операцию (например, перевод денег на счёт злоумышленника). Для осуществления данной атаки жертва должна быть [аутентифицирована](https://ru.wikipedia.org/wiki/%D0%90%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F) на том сервере, на который отправляется запрос, и этот запрос не должен требовать какого-либо подтверждения со стороны пользователя, которое не может быть проигнорировано или подделано атакующим скриптом.

### Защита

**CSRF token**

- Для каждой пользовательской сессии генерируется уникальный и **высокоэнтропийный** токен.
- Токен вставляется в DOM HTML страницы или отдается пользователю через API.
- Пользователь с каждым запросом, связанным с какими-либо изменениями, должен отправить токен в параметре или в HTTP-заголовке запроса.
- Так как атакующий не знает токен, то классическая CSRF-атака не работает.

**Double submit cookie**

- Опять генерируется уникальный и **высокоэнтропийный** токен для каждой пользовательской сессии, но он помещается в куки.
- Пользователь должен в запросе передать одинаковые значения в куках и в параметре запроса.
- Если эти два значения совпадают в куках и в параметре, то считается, что это легитимный запрос.
- Так как атакующий просто так не может изменить куки в браузере пользователя, то классическая CSRF-атака не работает.

**Content-Type based protection**

- Пользователь должен отправить запрос с определенным заголовком Content-Type, например, application/json.
- Так как в браузере через HTML форму или XHR API невозможно отправить произвольный Content-Type cross-origin, то классическая CSRF-атака опять не работает.

**Referer-based protection**

- Пользователь должен отправить запрос с определенным значением заголовка Referer. Бэкенд его проверяет, если он неверный, то считается, что это CSRF-атака.
- Так как браузер не может отправить произвольный Referer через HTML форму или XHR API, то классическая CSRF-атака не работает.

**Password confirmation / websudo**

- Пользователь должен подтверждать действие с помощью пароля (или секрета).
- Так как атакующий его не знает, то классическая CSRF-атака не работает.

**SameSite Cookies в Chrome, Opera**

Это новая технология, которая призвана защитить от CSRF. В данный момент она работает только в двух браузерах (Chrome, Opera).

- У куки устанавливается дополнительный атрибут — samesite, который может иметь два значения: lax или strict.
    
- Суть технологии в том, что браузер не отправляет куки, если запрос осуществляется с другого домена, например, с сайта атакующего. Таким образом это опять защищает от классической CSRF-атаки.
    

## Дополнительно
- #### [owasp](https://owasp.org/www-community/attacks/csrf)
- #### [CSRF-уязвимости все еще актуальны](https://habr.com/company/oleg-bunin/blog/412855/)
- #### [Методы защиты от CSRF-атаки](https://habr.com/post/318748/)