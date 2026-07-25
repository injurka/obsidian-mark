# Деструктуризация в JavaScript

Деструктуризация (Destructuring assignment) — это синтаксис, позволяющий извлекать значения из массивов или свойства из объектов в отдельные переменные.

## Деструктуризация объектов
```js
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
```

## Деструктуризация массивов
```js
const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
```

## Связанные темы
- [[01. JavaScript/01. Основы языка/Деструктуризация и rest-spread/rest|Оператор rest]]
- [[01. JavaScript/01. Основы языка/Деструктуризация и rest-spread/spread|Оператор spread]]
