---
tags:
  - js
keywords:
  - boolean
  - js-type
title: Объект Boolean в JavaScript
---
Объект `Boolean` является ссылочным типом, соответствующим булевым значениям. Для создания объекта `Boolean` можно использовать конструктор `Boolean`, передав ему значение `true` или `false`:

```js
let booleanObject = new Boolean(true);
```

Экземпляры `Boolean` переопределяют метод `valueOf()`, чтобы он возвращал примитивное значение `true` или `false`. Метод `toString()` также переопределяется и возвращает строку `"true"` или `"false"`.

## Проблемы с использованием объектов Boolean

Объекты `Boolean` могут затруднять понимание кода и приводить к неожиданным результатам в логических выражениях. Например:

```js
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result); // true

let falseValue = false;
result = falseValue && true;
console.log(result); // false
```

В этом коде создается объект `Boolean` со значением `false`, а затем для него и примитивного значения `true` выполняется операция И. В булевой математике результатом операции `false И true` является `false`, но в этой строке кода оценивается объект `falseObject`, а не его значение (`false`). В логических выражениях все объекты автоматически преобразуются в `true`, так что вместо `falseObject` на самом деле используется значение `true`. Применение оператора И к двум значениям `true` дает в результате `true`.

## Различия между примитивным и ссылочным логическими типами

- Оператор `typeof` возвращает `"boolean"` для примитивного типа и `"object"` для ссылочного.
- Объект `Boolean` является экземпляром типа `Boolean`, поэтому оператор `instanceof` возвращает `true` для объекта и `false` для примитивного значения:

```js
console.log(typeof falseObject); // object
console.log(typeof falseValue); // boolean
console.log(falseObject instanceof Boolean); // true
console.log(falseValue instanceof Boolean); // false
```

Важно понимать различия между примитивным логическим значением и объектом `Boolean` и по возможности не использовать последний.

## Источники
- #### Книга  `Фрисби М. Ф89	JavaScript для профессиональных веб-разработчиков. 4-е международное изд. — СПб.: Питер, 2022. — 1168 с.: ил. — (Серия «Для профессионалов»). ISBN 978-5-4461-1740-6`