`Intl` — это объект в JavaScript, предоставляемый стандартом ECMAScript Internationalization API. Он позволяет разработчикам форматировать строки, числа, даты и время с учетом локали пользователя. Это особенно полезно для приложений, которые должны поддерживать несколько языков и регионов.

## Основные компоненты `Intl`:

1. **`Intl.Collator`**: Используется для сравнения строк с учетом локали.
2. **`Intl.DateTimeFormat`**: Используется для форматирования дат и времени.
3. **`Intl.NumberFormat`**: Используется для форматирования чисел.
4. **`Intl.PluralRules`**: Используется для определения правил множественного числа.
5. **`Intl.RelativeTimeFormat`**: Используется для форматирования относительного времени (например, "3 дня назад").

## Примеры использования:

#### 1. `Intl.DateTimeFormat`

```javascript
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formatter = new Intl.DateTimeFormat('en-US', options);
console.log(formatter.format(date)); // Например, "November 15, 2023"
```

#### 2. `Intl.NumberFormat`

```javascript
const number = 123456.789;
const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(formatter.format(number)); // Например, "123.456,79 €"
```

#### 3. `Intl.Collator`

```javascript
const collator = new Intl.Collator('en-US');
const words = ['apple', 'Orange', 'banana'];
words.sort(collator.compare);
console.log(words); // ["apple", "banana", "Orange"]
```

#### 4. `Intl.PluralRules`

```javascript
const pr = new Intl.PluralRules('en-US');
console.log(pr.select(0)); // "other"
console.log(pr.select(1)); // "one"
console.log(pr.select(2)); // "other"
```

#### 5. `Intl.RelativeTimeFormat`

```javascript
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // "yesterday"
console.log(rtf.format(1, 'day')); // "tomorrow"
```

## Особенности и советы:

1. **Локализация**: Вы можете указать локаль в виде строки (например, `'en-US'`, `'de-DE'`, `'ru-RU'`). Если локаль не указана, будет использована локаль по умолчанию браузера.
2. **Опции форматирования**: Каждый конструктор (`DateTimeFormat`, `NumberFormat`, `RelativeTimeFormat`) принимает объект с опциями форматирования, которые позволяют настроить вывод.
3. **Поддержка браузерами**: API `Intl` хорошо поддерживается современными браузерами, но всегда стоит проверять совместимость, особенно если вы ориентируетесь на старые версии или специфические платформы.
4. **Производительность**: Использование `Intl` может быть более производительным, чем написание собственных функций форматирования, так как он оптимизирован для работы с различными локалями.

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl)