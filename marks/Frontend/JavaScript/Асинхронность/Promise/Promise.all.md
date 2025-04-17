Метод **`Promise.all(iterable)`** возвращает промис, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонено любое из переданных промисов.

Например, `Promise.all`, представленный ниже, выполнится спустя 3 секунды, его результатом будет массив `[1, 2, 3]`:

```javascript
Promise.all([
  new Promise(res => setTimeout(() => res(1), 3000)), // 1
  new Promise(res => setTimeout(() => res(2), 2000)), // 2
  new Promise(res => setTimeout(() => res(3), 1000))  // 3
]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива
```

Обратите внимание, что порядок элементов массива в точности соответствует порядку исходных промисов. Даже если первый промис будет выполняться дольше всех, его результат всё равно будет первым в массиве.

**Если любой из промисов завершится с ошибкой, то промис, возвращённый `Promise.all`, немедленно завершается с этой ошибкой.**

Например:
```javascript
Promise.all([
  new Promise((res, rej) => setTimeout(() => res(1), 1000)),
  new Promise((res, rej) => setTimeout(() => rej(new Error("Ошибка!")), 2000)),
  new Promise((res, rej) => setTimeout(() => res(3), 3000))
]).catch(alert); // Error: Ошибка!

```

Здесь второй промис завершится с ошибкой через 2 секунды. Это приведёт к немедленной ошибке в `Promise.all`, так что выполнится `.catch`: ошибка этого промиса становится ошибкой всего `Promise.all`.

---

## Полифил

```typescript
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            promise.then(result => {
                results[index] = result;
                completedCount++;

                if (completedCount === promises.length) {
                    resolve(results);
                }
            }).catch(error => {
                reject(error);
            });
        });
    });
}
```
