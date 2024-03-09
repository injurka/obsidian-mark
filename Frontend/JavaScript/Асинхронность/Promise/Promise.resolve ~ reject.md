Методы `Promise.resolve` и `Promise.reject` редко используются в современном коде, так как синтаксис `async/await` (мы рассмотрим его [чуть позже](https://learn.javascript.ru/async-await)) делает их, в общем-то, не нужными.

Мы рассмотрим их здесь для полноты картины, а также для тех, кто по каким-то причинам не может использовать `async/await`.

---

## Promise.resolve

- `Promise.resolve(value)` создаёт успешно выполненный промис с результатом `value`.

То же самое, что:

```javascript
let promise = new Promise(resolve => resolve(value));
```

---

## Promise.reject

- `Promise.reject(error)` создаёт промис, завершённый с ошибкой `error`.

То же самое, что:

```javascript
let promise = new Promise((resolve, reject) => reject(error));
```