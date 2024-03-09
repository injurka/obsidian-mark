Метод очень похож на `Promise.race`, но ждёт только первый _успешно выполненный_ промис, из которого берёт результат.

Если ни один из переданных промисов не завершится успешно, тогда возвращённый объект Promise будет отклонён с помощью `AggregateError` – специального объекта ошибок, который хранит все ошибки промисов в своём свойстве `errors`.

Синтаксис:

```javascript
let promise = Promise.any(iterable);
```

Например, здесь, результатом будет `1`:

```javascript
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```