Выражение **`for await...of`** создаёт цикл, проходящий через асинхронные итерируемые объекты, а также синхронные итерируемые сущности, включающие: встроенные [`String`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String), [`Array`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array), `Array`-подобные объекты (например., [`arguments`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/arguments) или [`NodeList`](https://developer.mozilla.org/ru/docs/Web/API/NodeList)), [`TypedArray`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [`Map` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Currently only available in English (US)"), [`Set`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set), а также определяемые пользователем асинхронные/синхронные сущности. Он вызывает пользовательский итерационный хук с инструкциями, которые должны быть выполнены для значения каждого отдельного свойства объекта.

## Синтаксис

```ts
for await (variable of iterable) {
  statement
}
```

### `variable`

- На каждой итерации значение другого свойства присваивается _variable_. _variable_ может быть объявлена с помощью ключевых слов `const`, `let`, or `var`.

### `iterable`

- Объект, чьи итерируемые свойства будут повторяться.

---

## Итерирование по асинхронным генераторам

```ts
async function* asyncGenerator() {
  yield 'Hello';
  yield 'World';
}

(async () => {
  for await (let value of asyncGenerator()) {
    console.log(value);
  }
})();
```

---

## Итерирование по асинхронным переменным

```ts
var asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false });
        }

        return Promise.resolve({ done: true });
      },
    };
  },
};

(async function () {
  for await (let num of asyncIterable) {
    console.log(num);
  }
})();
```

---

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for-await...of)