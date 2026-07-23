Метод **`Promise.allSettled()`** возвращает промис, который исполняется когда все полученные промисы завершены (исполнены или отклонены), содержащий массив результатов исполнения полученных промисов.

Всегда ждёт завершения всех промисов. В массиве результатов будет

- `{status:"fulfilled", value:результат}` для успешных завершений,
- `{status:"rejected", reason:ошибка}` для ошибок.

---

## Примеры использования 

```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Массив `results` в строке `(*)` будет таким:

```javascript
[
  {status: 'fulfilled', value: ...объект ответа...},
  {status: 'fulfilled', value: ...объект ответа...},
  {status: 'rejected', reason: ...объект ошибки...}
]
```

---

## Полифил

### JS + `Promise.all`

```javascript
Promise.allSettled = function (promises) {
  return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
    status: 'fulfilled',
    value,
  }), error => ({
    status: 'rejected',
    reason: error,
  }))))
}
```

### TS

```typescript
type PromiseSettledResult<T> = {
    status: 'fulfilled' | 'rejected';
    value?: T;
    reason?: any;
};

function promiseAllSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
    return new Promise((resolve) => {
        const results: PromiseSettledResult<T>[] = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            promise.then(
                (value) => {
                    results[index] = { status: 'fulfilled', value };
                },
                (reason) => {
                    results[index] = { status: 'rejected', reason };
                }
            ).finally(() => {
                completedCount++;
                if (completedCount === promises.length) {
                    resolve(results);
                }
            });
        });
    });
}
```