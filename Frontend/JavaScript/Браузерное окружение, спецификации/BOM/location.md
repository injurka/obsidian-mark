Объект `location` в JavaScript является частью объекта `window` и предоставляет информацию о текущем URL страницы, а также позволяет управлять навигацией в браузере. Давайте подробнее рассмотрим его свойства и методы.

## Свойства объекта `location`

1. **`href`**:
   - Содержит полный URL текущей страницы.
   - Пример: `https://www.google.com/search?q=javascript`
   - Это свойство можно использовать как для чтения, так и для записи. Если вы измените его значение, браузер перейдет на новый URL.

   ```javascript
   console.log(location.href); // Выведет текущий URL
   location.href = 'https://yandex.ru'; // Переход на новый URL
   ```

2. **`protocol`**:
   - Содержит протокол, используемый для доступа к странице (например, `http:` или `https:`).
   - Пример: `https:`

   ```javascript
   console.log(location.protocol); // Выведет "https:"
   ```

3. **`host`**:
   - Содержит имя хоста и порт (если он указан).
   - Пример: `www.google.com:8080`

   ```javascript
   console.log(location.host); // Выведет "www.google.com:8080"
   ```

4. **`hostname`**:
   - Содержит только имя хоста без порта.
   - Пример: `www.google.com`

   ```javascript
   console.log(location.hostname); // Выведет "www.google.com"
   ```

5. **`port`**:
   - Содержит номер порта, если он указан в URL.
   - Пример: `8080`

   ```javascript
   console.log(location.port); // Выведет "8080"
   ```

6. **`pathname`**:
   - Содержит путь к текущей странице относительно корня домена.
   - Пример: `/search`

   ```javascript
   console.log(location.pathname); // Выведет "/search"
   ```

7. **`search`**:
   - Содержит строку запроса (query string), начинающуюся с символа `?`.
   - Пример: `?q=javascript`

   ```javascript
   console.log(location.search); // Выведет "?q=javascript"
   ```

8. **`hash`**:
   - Содержит фрагмент URL, начинающийся с символа `#`.
   - Пример: `#section1`

   ```javascript
   console.log(location.hash); // Выведет "#section1"
   ```

## Методы объекта `location`

1. **`assign(url)`**:
   - Загружает новый документ по указанному URL.
   - Пример:

   ```javascript
   location.assign('https://yandex.ru');
   ```

2. **`replace(url)`**:
   - Заменяет текущий документ новым, но без добавления новой записи в истории браузера. Это означает, что пользователь не сможет вернуться на предыдущую страницу с помощью кнопки "Назад".
   - Пример:

   ```javascript
   location.replace('https://yandex.ru');
   ```

3. **`reload()`**:
   - Перезагружает текущую страницу.
   - Пример:

   ```javascript
   location.reload();
   ```

   - Можно передать параметр `true`, чтобы заставить браузер перезагрузить страницу с сервера, игнорируя кеш:

   ```javascript
   location.reload(true);
   ```

## Пример использования

Предположим, у нас есть URL: `https://www.example.com:8080/path/to/page?query=string#section1`

```javascript
console.log(location.href);      // "https://www.example.com:8080/path/to/page?query=string#section1"
console.log(location.protocol);  // "https:"
console.log(location.host);      // "www.example.com:8080"
console.log(location.hostname);  // "www.example.com"
console.log(location.port);      // "8080"
console.log(location.pathname);  // "/path/to/page"
console.log(location.search);    // "?query=string"
console.log(location.hash);      // "#section1"
```

## Изменение URL

Вы можете изменить URL страницы, используя свойства `location`. Например:

```javascript
location.href = 'https://yandex.ru'; // Переход на Яндекс
location.pathname = '/new-path';     // Изменение пути
location.search = '?newQuery=value'; // Изменение строки запроса
location.hash = '#newSection';       // Изменение хеша
```
