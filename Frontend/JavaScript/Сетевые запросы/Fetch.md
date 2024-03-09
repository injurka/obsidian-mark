Для сетевых запросов из JavaScript есть широко известный термин «AJAX» (аббревиатура от **A**synchronous **J**avaScript **A**nd **X**ML). XML мы использовать не обязаны, просто термин старый, поэтому в нём есть это слово. Возможно, вы его уже где-то слышали.

Есть несколько способов делать сетевые запросы и получать информацию с сервера.

Метод `fetch()` — современный и очень мощный, поэтому начнём с него. Он не поддерживается старыми (можно использовать полифил), но поддерживается всеми современными браузерами.

Подобная функциональность ранее достигалась с помощью [`XMLHttpRequest`](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest). Fetch представляет собой лучшую альтернативу, которая может быть легко использована другими технологиями, такими как `Service Workers` Fetch также обеспечивает единое логическое место для определения других связанных с HTTP понятий, такие как CORS и расширения для HTTP.

Обратите внимание, `fetch` спецификация отличается от `jQuery.ajax()` в основном в двух пунктах:

- Promise возвращаемый вызовом `fetch()` **не перейдёт в состояние "отклонено" из-за ответа HTTP, который считается ошибкой**, даже если ответ HTTP 404 или 500. Вместо этого, он будет выполнен нормально (с значением false в статусе `ok` ) и будет отклонён только при сбое сети или если что-то помешало запросу выполниться.
- По умолчанию, `fetch` **не будет отправлять или получать cookie файлы** с сервера, в результате чего запросы будут осуществляться без проверки подлинности, что приведёт к неаутентифицированным запросам, если сайт полагается на проверку пользовательской сессии (для отправки cookie файлов в аргументе [init options](https://developer.mozilla.org/ru/docs/Web/API/fetch#parameters) должно быть задано значение свойства _credentials_ отличное от значения по умолчанию `omit`).

---

## Установка параметров запроса

Метод `fetch()` может принимать второй параметр - объект `init`, который позволяет вам контролировать различные настройки:

```js
// Пример отправки POST запроса:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `response.json()` call
});
```

---

## Отправка запроса с учётными данными

Чтобы браузеры могли отправлять запрос с учётными данными (даже для cross-origin запросов), добавьте `credentials: 'include'` в объект `init`, передаваемый вами в метод `fetch()`:

```js
fetch("https://example.com", {
  credentials: "include",
});
```

Если вы хотите отправлять запрос с учётными данными только если URL принадлежит одному источнику (origin) что и вызывающий его скрипт, добавьте credentials: 'same-origin'.

```js
// Вызывающий скрипт принадлежит источнику 'https://example.com'
fetch("https://example.com", {
  credentials: "same-origin",
});
```

Напротив, чтобы быть уверенным, что учётные данные не передаются с запросом, используйте credentials: 'omit':

```js
fetch("https://example.com", {
  credentials: "omit",
});
```

---

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch)
- #### [learn.js](https://learn.javascript.ru/fetch)
