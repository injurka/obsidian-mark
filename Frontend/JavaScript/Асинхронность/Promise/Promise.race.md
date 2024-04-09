Метод очень похож на `Promise.all`, но ждёт только первый _выполненный_ промис, из которого берёт результат (или ошибку).

Например, тут результат будет `1`:

```javascript
Promise.race([
  new Promise((res, rej) => setTimeout(() => res(1), 1000)),
  new Promise((res, rej) => setTimeout(() => rej(new Error("Ошибка!")), 2000)),
  new Promise((res, rej) => setTimeout(() => res(3), 3000))
]).then(alert); // 1
```

Быстрее всех выполнился первый промис, он и дал результат. После этого остальные промисы игнорируются.

---

## Полифил

```typescript
function promiseRace<T>(promises: Array<Promise<T>>): Promise<T> {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve, reject);
        });
    });
}
```