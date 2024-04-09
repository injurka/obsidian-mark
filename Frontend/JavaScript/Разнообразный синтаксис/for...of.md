Оператор `for (переменная) of (сущность)` позволяет пройти в цикле по свойствам сущности. Оператор работает только с итерируемыми сущностями. В начале цикла оператор достаёт из сущности итератор. Каждая итерация цикла – это вызов метода `.next()` итератора. 

```js
let iterable = [10, 20, 30]

for (let value of iterable) {
  value += 1
  console.log(value)
}
// 11
// 21
// 31
```

---

## Источник
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of)
