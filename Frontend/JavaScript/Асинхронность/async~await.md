Добавленное перед определением функции ключевое слово `async` делает функцию асинхронной. Возвращаемое значение такой функции автоматически оборачивается в **Promise**:

```ts
async function getStarWarsMovies() {
  return 1
}

console.log(getStarWarsMovies()) // Promise { <state>: "fulfilled", <value>: 1 }
```

Ключевое слово `await` используется, чтобы дождаться выполнения асинхронной операции

☝️ Ключевое слово `await` может использоваться не только внутри асинхронных функций, но и в [модулях](https://doka.guide/js/modules/).

💡 Возможность использовать `await` вне асинхронной функции в модулях появилась в стандарте ES2022.

Попытка использовать `await` вне модуля и не в асинхронной функции приведёт к синтаксической ошибке:  
`SyntaxError: await is only valid in async functions and the top level bodies of modules`