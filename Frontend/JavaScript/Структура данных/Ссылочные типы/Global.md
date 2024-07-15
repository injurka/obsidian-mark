---
tags:
  - js
keywords:
  - global
  - window
  - js-type
title: Объект Global в ECMAScript
---
Объект **Global** является одним из самых уникальных объектов в ECMAScript, так как он недоступен явно. В спецификации ECMA-262 он описывается как некая "складка" для свойств и методов, у которых без Global не было бы объекта-владельца. На практике, глобальных переменных или функций не существует — все глобально определенные переменные и функции становятся свойствами объекта Global.

## Методы объекта Global

### Методы кодирования URI

Методы `encodeURI()` и `encodeURIComponent()` используются для кодирования универсальных идентификаторов ресурса (URI), передаваемых браузеру. Допустимые URI не могут содержать определенные знаки, например пробелы. Чтобы браузер все же мог принимать и понимать их, методы кодирования URI заменяют все недопустимые знаки специальными кодами в кодировке UTF-8.

- **`encodeURI()`** работает с целыми URI.
- **`encodeURIComponent()`** работает с сегментами URI.

```javascript
let uri = "http://www.wrox.com/illegal value.js#start";
console.log(encodeURI(uri)); // "http://www.wrox.com/illegal%20value.js#start"
console.log(encodeURIComponent(uri)); // "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start"
```

> [!WARN] Примечание
> Метод `encodeURIComponent()` используется гораздо чаще, чем `encodeURI()`, потому что аргументы строк запросов обычно кодируются отдельно от базового URI.

### Методы декодирования URI

У этих методов есть обратные методы: `decodeURI()` и `decodeURIComponent()`.

```javascript
let uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
console.log(decodeURI(uri)); // "http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start"
console.log(decodeURIComponent(uri)); // "http://www.wrox.com/illegal value.js#start"
```

> [!WARN] Примечание
> Методы `encodeURI()`, `encodeURIComponent()`, `decodeURI()` и `decodeURIComponent()` заменяют методы `escape()` и `unescape()`, которые признаны устаревшими в третьей редакции ECMA-262.

### Метод eval()

Метод `eval()` является одним из самых мощных в языке ECMAScript. Он принимает строку ECMAScript-кода и выполняет её.

```javascript
eval("console.log('hi')"); // эквивалентно console.log("hi");
```

> [!WARN] Примечание
> Будьте крайне осторожны с методом `eval()`, особенно при передаче в него данных, введенных пользователем, так как этот метод предоставляет большую возможную поверхность атаки для XSS-уязвимостей.

## Свойства объекта Global

С некоторыми свойствами объекта Global мы уже встречались. Например, в их число входят специальные значения `undefined`, `NaN` и `Infinity`. Конструкторы встроенных ссылочных типов, таких как `Object` и `Function`, также являются свойствами объекта Global.

| Свойство         | Описание                         |
| ---------------- | -------------------------------- |
| `undefined`      | Специальное значение `undefined` |
| `NaN`            | Специальное значение `NaN`       |
| `Infinity`       | Специальное значение `Infinity`  |
| `Object`         | Конструктор `Object`             |
| `Array`          | Конструктор `Array`              |
| `Function`       | Конструктор `Function`           |
| `Boolean`        | Конструктор `Boolean`            |
| `String`         | Конструктор `String`             |
| `Number`         | Конструктор `Number`             |
| `Date`           | Конструктор `Date`               |
| `RegExp`         | Конструктор `RegExp`             |
| `Symbol`         | Псевдоконструктор `Symbol`       |
| `Error`          | Конструктор `Error`              |
| `EvalError`      | Конструктор `EvalError`          |
| `RangeError`     | Конструктор `RangeError`         |
| `ReferenceError` | Конструктор `ReferenceError`     |
| `SyntaxError`    | Конструктор `SyntaxError`        |
| `TypeError`      | Конструктор `TypeError`          |
| `URIError`       | Конструктор `URIError`           |

## Объект Window

Хотя в ECMA-262 не указан способ непосредственного доступа к объекту Global, в веб-браузерах он реализуется с помощью делегата — объекта `window`. Это означает, что все переменные и функции, объявленные в глобальной области видимости, становятся свойствами `window`.

```javascript
let color = "red";
function sayColor() {
  console.log(window.color);
}
window.sayColor(); // "red"
```

> [!WARN] Примечание
> Объект `window` в JavaScript используется при решении самых разных задач, а не только как реализация ECMAScript-объекта Global. Подробно объект `window` обсуждается в главе 12 "Объектная модель браузера".

## Источники
- #### Книга  `Фрисби М. Ф89	JavaScript для профессиональных веб-разработчиков. 4-е международное изд. — СПб.: Питер, 2022. — 1168 с.: ил. — (Серия «Для профессионалов»). ISBN 978-5-4461-1740-6`