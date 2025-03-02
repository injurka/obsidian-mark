Символ (`Symbol`) — примитивный тип, значения которого создаются с помощью вызова функции `Symbol`. Каждый созданный символ уникален.

Символы могут использоваться в качестве имён свойств в объектах. Символьные свойства могут быть прочитаны только при прямом обращении и не видны при обычных операциях.

## Создание

Для создания символа нужно вызвать функцию `Symbol`:
```js
const sym = Symbol()
const symTwo = Symbol()

console.log(sym === symTwo)
// false
```

>[!INFO] Внимание
> Создание символа через конструктор `new Symbol()` не поддерживается.

При создании символа первым аргументом можно передать его описание. Оно ни на что не влияет и необходимо только для отладки. 
_Даже если описания символов совпадают, JavaScript всё равно создаёт уникальные символы_:

```ts
const sym = Symbol('name')
const symTwo = Symbol('name')

console.log(sym === symTwo)
// false
```

## Использование

Символы используются для создания скрытых свойств объектов. В отличие от свойств, ключом которых является строка, символьные свойства может читать только владелец символа. Скрытые свойства не видны при его обходе с помощью [[for...in]]:

```js
const secondaryId = Symbol()

const user = {
  'id': 193,
  'name': 'Ольга',
  [secondaryId]: 'olga-1'
}

for (const prop in user) {
  console.log(prop, user[prop])
}
// id 193
// name Ольга

console.log(user[secondaryId])
// olga-1
```

Это может пригодиться, когда необходимо добавить свойства объекту, который могут модифицировать другие части программы. Таким образом только вы сможете читать созданное свойство, а гарантия уникальности символов гарантирует и отсутствие конфликтов имён.

## Системные символы

Символы активно используются внутри самого JavaScript, чтобы определять поведение объектов. Такие символы называются «хорошо известными» (well-known symbols).

Самый известный символ [[The Iterator protocol ~ Протокол Итератора |Symbol.iterator]], который позволяет реализовать обход конструкции с помощью синтаксических конструкций `for..of` и [[spread|спред-синтаксиса ]] .

Полный список таких символов доступен в [спецификации](https://tc39.es/ecma262/#sec-well-known-symbols), но на практике он нужен нечасто.

## Глобальный реестр символов

Созданный символ уникален, но как быть, если он нужен в нескольких местах программы? Для решения этой проблемы существует глобальный реестр символов, он хранит символы по строковым ключам. При обращении по ключу всегда будет возвращаться один и тот же символ.

Работа с реестром символов организована с помощью двух методов:

- `Symbol.for(ключ)` — возвращает символ, хранящийся по ключу. Если символа ещё не существует, он создаётся автоматически.
- `Symbol.keyFor(символ)` — возвращает строковый ключ, который хранит переданный символ или [[Undefined]], если символ не хранится в реестре.

```js
const secondaryId = Symbol()

const user = {
  'id': 193,
  'name': 'Ольга',
  [secondaryId]: 'olga-1'
}

console.log(Symbol.keyFor(secondaryId))
// undefined

const newSym = Symbol.for('registryKey')
const newestSym = Symbol.for('registryKey')
console.log(newSym === newestSym)
// true

user[newSym] = 'hello'
console.log(Symbol.keyFor(newSym))
// registryKey
```

[[Well-known Symbols]] ~ Известные символы - это встроенные значения Symbol, на которые явно ссылаются алгоритмы данной спецификации. Обычно они используются в качестве ключей свойств, значения которых служат точками расширения алгоритма спецификации. Если не указано иное, значения известных символов являются общими для всех областей кода.

## Примеры задач

> Реализовать кастомный `split`

```js
class MySplit {
  constructor(value) {
    this.value = value; 
  }
  [Symbol.split](string) {
    return string.replace(new RegExp(`\\${this.value}`,'g'), `-`);
  }
}

"foo.bar.foo.baz".split(new MySplit(".")) // "foo-var-foo-baz"
```

> Реализовать кастомный преобразование к примитиву

```js
const obj = {
  valueOf() {
    return 42;
  },
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.valueOf();
    }
    if (hint === 'string') {
      return 'forty-two';
    }
    return null;
  }
};

console.log(+obj); // 42
console.log(`${obj}`); // 'forty-two'
console.log(obj + ''); // 'null'
```

> Скрыть переменную для чтения

```js
const obj = {
  foo: 1,
  bar: 2,
  [Symbol.unscopables]: {
    bar: true
  }
};

with (obj) {
  console.log(foo); // 1
  console.log(bar); // ReferenceError: bar is not defined
}
```

> Итерировать объект по значению

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let index = 0;
    
    return {
      next: () => {
        if (index < keys.length) {
          const key = keys[index];
          index++;
          
          return { value: [key, this[key]], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const [key, value] of obj) {
  console.log(`${key}: ${value}`); // Вывод: a: 1, b: 2, c: 3
}
```

> Итерировать объект по значению через generator yield

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield [key, this[key]];
    }
  }
};

for (const [key, value] of obj) {
  console.log(`${key}: ${value}`); // Вывод: a: 1, b: 2, c: 3
}
```

> Итерировать объект по значению через async

```js
const asyncIterable = {
  data: [1, 2, 3],
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (const item of asyncIterable) {
    console.log(item); // Вывод: 1, 2, 3 (с задержкой в 1 секунду между каждым элементом)
  }
})();
```

