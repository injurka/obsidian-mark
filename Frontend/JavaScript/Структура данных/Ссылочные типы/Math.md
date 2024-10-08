---
tags:
  - js
keywords:
  - math
  - js-type
title: Объект `Math` в ECMAScript
---
Объект `Math` в ECMAScript предоставляет **математические формулы**, **константы** и **методы** для выполнения различных вычислений. Этот объект является встроенным и не требует создания экземпляра.

> [!WARN] Примечание
> * **Быстродействие**: Вычисления на объекте `Math` выполняются быстрее, чем в аналогичном JS-коде, благодаря более эффективным реализациям в механизме JavaScript и инструкциях процессора.
> * **Точность**: Точность этих операций может варьироваться в зависимости от браузера, операционной системы, набора команд и аппаратного обеспечения.

## Свойства объекта `Math`

Объект `Math` имеет несколько свойств, которые представляют специальные математические значения:

| СВОЙСТВО    | ОПИСАНИЕ                                      |
|-------------|-----------------------------------------------|
| `Math.E`    | Значение e, основание натурального логарифма  |
| `Math.LN10` | Натуральный логарифм 10                       |
| `Math.LN2`  | Натуральный логарифм 2                        |
| `Math.LOG2E`| Двоичный логарифм e                           |
| `Math.LOG10E`| Десятичный логарифм e                         |
| `Math.PI`   | Число π                                       |
| `Math.SQRT1_2`| Квадратный корень из 1⁄2                    |
| `Math.SQRT2`| Квадратный корень из 2                        |

## Методы объекта `Math`

### Методы `min()` и `max()`

Эти методы определяют наименьшее и наибольшее числа в группе чисел:

```js
let max = Math.max(3, 54, 32, 16);
console.log(max); // 54

let min = Math.min(3, 54, 32, 16);
console.log(min); // 3
```

### Методы округления

* `Math.ceil(x)`: Округляет числа вверх до ближайшего целого.
* `Math.floor(x)`: Округляет числа вниз до ближайшего целого.
* `Math.round(x)`: Стандартное округление (вверх, если дробная часть равна 0.5 или больше, и вниз в противном случае).
* `Math.fround(x)`: Возвращает представление числа с плавающей точкой ближайшей одинарной точности (32 бита).

```js
console.log(Math.ceil(25.9)); // 26
console.log(Math.ceil(25.5)); // 26
console.log(Math.ceil(25.1)); // 26

console.log(Math.round(25.9)); // 26
console.log(Math.round(25.5)); // 26
console.log(Math.round(25.1)); // 25

console.log(Math.fround(0.4)); // 0.4000000059604645
console.log(Math.fround(0.5)); // 0.5
console.log(Math.fround(25.9)); // 25.899999618530273

console.log(Math.floor(25.9)); // 25
console.log(Math.floor(25.5)); // 25
console.log(Math.floor(25.1)); // 25
```

### Метод `random()`

Возвращает случайное число от 0 до 1:

```js
let num = Math.floor(Math.random() * 10 + 1);
console.log(num); // случайное число от 1 до 10
```

> [!WARN] Примечание 
> Метод `Math.random()` подходит для целей, продемонстрированных здесь. Если вам необходимо использовать генерацию случайных чисел для криптографических целей (что требует более высокой энтропии во входах генератора), вместо этого предпочтительнее использовать `window.crypto. getRandomValues()`.

## Методы объекта `Math` в JavaScript

Объект `Math` в JavaScript предоставляет множество методов для выполнения различных математических операций. Вот некоторые из них:

Эти методы позволяют выполнять широкий спектр математических операций в JavaScript.

| Метод                  | Описание                                                                       |
| ---------------------- | ------------------------------------------------------------------------------ |
| `Math.pow(...nums)`    | Возвращает квадратный корень из суммы квадратов всех чисел из `nums`.          |
| `Math.clz32(x)`        | Возвращает количество нулей слева в 32-разрядном целом числе `x`.              |
| `Math.sign(x)`         | Возвращает `1`, `0`, `-0` или `-1`, обозначая знак числа `x`.                  |
| `Math.trunc(x)`        | Возвращает целочисленную составляющую числа `x`, удаляя все десятичные дроби.  |
| `Math.sqrt(x)`         | Возвращает квадратный корень из числа `x`.                                     |
| `Math.cbrt(x)`         | Возвращает кубический корень из числа `x`.                                     |
| `Math.acos(x)`         | Возвращает арккосинус числа `x`.                                               |
| `Math.acosh(x)`        | Возвращает гиперболический арккосинус числа `x`.                               |
| `Math.asin(x)`         | Возвращает арксинус числа `x`.                                                 |
| `Math.asinh(x)`        | Возвращает гиперболический арксинус числа `x`.                                 |
| `Math.atan(x)`         | Возвращает арктангенс числа `x`.                                               |
| `Math.atanh(x)`        | Возвращает гиперболический арктангенс числа `x`.                               |
| `Math.atan2(y, x)`     | Возвращает арктангенс отношения `y/x`.                                         |
| `Math.cos(x)`          | Возвращает косинус числа `x`.                                                  |
| `Math.sin(x)`          | Возвращает синус числа `x`.                                                    |
| `Math.tan(x)`          | Возвращает тангенс числа `x`.                                                  |
| `Math.abs(x)`          | Возвращает абсолютное значение числа `x`.                                      |
| `Math.exp(x)`          | Возвращает значение `Math.E` (основание натурального логарифма) в степени `x`. |
| `Math.expm1(x)`        | Эквивалентен выражению `Math.exp(x) - 1`.                                      |
| `Math.log(x)`          | Возвращает натуральный логарифм числа `x`.                                     |
| `Math.log1p(x)`        | Эквивалентен выражению `1 + Math.log(x)`.                                      |
| `Math.pow(x, степень)` | Возвращает число `x`, возведенное в указанную степень.                         |

## Источники
- #### Книга  `Фрисби М. Ф89	JavaScript для профессиональных веб-разработчиков. 4-е международное изд. — СПб.: Питер, 2022. — 1168 с.: ил. — (Серия «Для профессионалов»). ISBN 978-5-4461-1740-6`