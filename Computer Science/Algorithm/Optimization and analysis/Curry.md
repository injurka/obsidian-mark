Каррирование – это трансформация функций таким образом, чтобы они принимали аргументы не как `f(a, b, c)`, а как `f(a)(b)(c)`.

Каррирование не вызывает функцию. Оно просто трансформирует её.

Давайте сначала посмотрим на пример, чтобы лучше понять, о чём речь, а потом на практическое применение каррирования.

Создадим вспомогательную функцию `curry(f)`, которая выполняет каррирование функции `f` с двумя аргументами. Другими словами, `curry(f)` для функции `f(a, b)` трансформирует её в `f(a)(b)`.

> TypeScript

```ts
function curry(func: any) {
  return function curried(...args: any) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...args2: any) {
        return curried(...args.concat(args2));
      };
    }
  };
}

function sum(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6, всё ещё можно вызывать нормально
console.log(curriedSum(1)(2, 3)); // 6, каррирование первого аргумента
console.log(curriedSum(1)(2)(3)); // 6, каррирование всех аргументов
```

> JavaScipt

```js
function curry(func) {
  return function curried(...args) {
    console.log('this', this);

    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}


function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6, всё ещё можно вызывать нормально
console.log(curriedSum(1)(2, 3)); // 6, каррирование первого аргумента
console.log(curriedSum(1)(2)(3)); // 6, каррирование всех аргументов

```

Когда мы запускаем её, есть две ветви выполнения `if`:

1. Вызвать сейчас: если количество переданных аргументов `args` совпадает с количеством аргументов при объявлении функции (`func.length`) или больше, тогда вызов просто переходит к ней.
2. Частичное применение: в противном случае `func` не вызывается сразу. Вместо этого, возвращается другая обёртка `pass`, которая снова применит `curried`, передав предыдущие аргументы вместе с новыми. Затем при новом вызове мы опять получим либо новое частичное применение (если аргументов недостаточно) либо, наконец, результат.

Например, давайте посмотрим, что произойдёт в случае `sum(a, b, c)`. У неё три аргумента, так что `sum.length = 3`.

Для вызова `curried(1)(2)(3)`:

1. Первый вызов `curried(1)` запоминает `1` в своём лексическом окружении и возвращает обёртку `pass`.
2. Обёртка `pass` вызывается с `(2)`: она берёт предыдущие аргументы (`1`), объединяет их с тем, что получила сама `(2)` и вызывает `curried(1, 2)` со всеми ними. Так как число аргументов всё ещё меньше 3-х, `curry` возвращает `pass`.
3. Обёртка `pass` вызывается снова с `(3)`. Для следующего вызова `pass(3)` берёт предыдущие аргументы (`1`, `2`) и добавляет к ним `3`, делая вызов `curried(1, 2, 3)` – наконец 3 аргумента, и они передаются оригинальной функции.