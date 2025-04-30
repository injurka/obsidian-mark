Метод очень похож на `Promise.race`, но ждёт только первый _успешно выполненный_ промис, из которого берёт результат.

Если ни один из переданных промисов не завершится успешно, тогда возвращённый объект Promise будет отклонён с помощью `AggregateError` – специального объекта ошибок, который хранит все ошибки промисов в своём свойстве `errors`.

Синтаксис:

```javascript
let promise = Promise.any(iterable);
```

Например, здесь, результатом будет `1`:

```javascript
Promise.any([
  new Promise((res, rej) => setTimeout(() => rej(new Error("Ошибка!")), 1000)),
  new Promise((res, rej) => setTimeout(() => res(1), 2000)),
  new Promise((res, rej) => setTimeout(() => res(3), 3000))
]).then(alert); // 1
```


---

## Полифил

### Compact with `Promise.all`

```typescript
const promiseAny = async <T>(
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T> => {
  return Promise.all(
    [...iterable].map(promise => {
      return new Promise((resolve, reject) =>
        Promise.resolve(promise).then(reject, resolve)
      );
    })
  ).then(
    errors => Promise.reject(errors),
    value => Promise.resolve<T>(value)
  );
};
```

### Modern

```typescript
function promiseAny<T>(promises: Array<Promise<T>>): Promise<T> {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const totalPromises = promises.length;
    const errors: Array<any> = [];

    promises.forEach((promise, index) => {
      promise
        .then(val => resolve(val))
        .catch(err => {
          errors[index] = err;
          rejectedCount++;

          if (rejectedCount === totalPromises) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}
```