---
title: Less
tags:
  - css
  - less
  - preprocessor
---

## Что такое Less

**Less** (Leaner Style Sheets) — CSS-препроцессор, написанный на JavaScript. Расширяет синтаксис CSS переменными, миксинами, вложенностью, операциями и функциями. Less-файл компилируется в обычный CSS перед подачей браузеру.

### Краткая история

- **2009** — Alexis Sellier (cloudhead) создал Less, изначально реализованный на Ruby
- **2012** — переписан на JavaScript (Node.js), что сделало его кросс-платформенным
- **2013–2016** — пик популярности; использовался в Bootstrap 3
- **Bootstrap 4+** — перешёл на SCSS, что снизило интерес к Less, но не убило его

### Less vs SCSS vs Stylus

| Критерий | Less | SCSS | Stylus |
|---|---|---|---|
| Синтаксис переменных | `@var` | `$var` | `var` (без префикса) |
| Синтаксис миксинов | `.mixin()` | `@mixin` / `@include` | `mixin()` |
| Рантайм (браузер) | Да (less.js) | Нет | Нет |
| Условия | `.mixin() when (...)` | `@if` / `@else` | `if` / `else` |
| Циклы | Рекурсивные миксины | `@for`, `@each`, `@while` | `for` / `each` |
| JS-рантайм | Node.js | Dart/Node | Node.js |
| Экосистема | Средняя | Большая | Малая |

**Когда выбирать Less:**
- Проект уже использует Less (Bootstrap 3, Ant Design)
- Нужна компиляция прямо в браузере без сборщика
- Команда знакома с Less-синтаксисом

---

## Установка и компиляция

### Через npm

```bash
# Глобальная установка CLI
npm install -g less

# Локальная установка в проект
npm install --save-dev less
```

### Компиляция через CLI (lessc)

```bash
# Базовая компиляция
lessc styles.less styles.css

# С минификацией (требует плагин)
npm install -g less-plugin-clean-css
lessc --clean-css styles.less styles.min.css

# Source maps
lessc --source-map styles.less styles.css
```

### Компиляция в браузере (только для разработки)

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="https://cdn.jsdelivr.net/npm/less"></script>
```

> Браузерная компиляция не рекомендуется для production — только для быстрого прототипирования.

### Интеграция с Webpack

```bash
npm install --save-dev less less-loader
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',   // внедряет CSS в DOM
          'css-loader',     // обрабатывает @import и url()
          'less-loader',    // компилирует Less → CSS
        ],
      },
    ],
  },
};
```

### Интеграция с Vite

```bash
npm install --save-dev less
```

Vite автоматически подхватывает Less при наличии пакета — никакой дополнительной конфигурации не нужно:

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      less: {
        // Опционально: глобальные Less-переменные
        modifyVars: {
          'primary-color': '#1DA57A',
        },
        javascriptEnabled: true, // нужно для Ant Design
      },
    },
  },
};
```

---

## Переменные

В Less переменные объявляются через `@`. Они вычисляются **один раз** и используются как константы (в отличие от CSS-переменных, которые вычисляются каждый раз).

```less
// Объявление переменных
@primary-color: #4a90d9;
@font-size-base: 16px;
@padding-default: 8px 16px;
@font-stack: 'Inter', sans-serif;
@border-radius: 4px;

// Использование
.button {
  background-color: @primary-color;
  font-size: @font-size-base;
  padding: @padding-default;
  font-family: @font-stack;
  border-radius: @border-radius;
}
```

Компилируется в:

```css
.button {
  background-color: #4a90d9;
  font-size: 16px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  border-radius: 4px;
}
```

### Переменные как имена свойств и селекторов (интерполяция)

```less
@property: color;
@selector: header;

.@{selector} {
  @{property}: red;
  background-@{property}: blue;
}
```

Результат:

```css
.header {
  color: red;
  background-color: blue;
}
```

### Ленивое вычисление и переопределение

```less
@base: 5%;
@filler: @base * 2;   // 10% — вычислится позже
@base: 10%;           // переопределение

.element {
  width: @filler;     // 20% (берёт последнее значение @base)
}
```

Less вычисляет переменные в момент использования, используя последнее объявление в текущей области видимости.

---

## Вложенность и `&`

### Базовая вложенность

```less
nav {
  background: #333;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
```

Компилируется в:

```css
nav { background: #333; }
nav ul { margin: 0; padding: 0; list-style: none; }
nav li { display: inline-block; }
nav a { color: white; text-decoration: none; }
nav a:hover { text-decoration: underline; }
```

### Оператор `&` — ссылка на родительский селектор

`&` заменяется текущим родительским селектором без пробела — это ключевой инструмент для BEM-нотации и псевдоклассов.

```less
.card {
  padding: 16px;
  border: 1px solid #ddd;

  // BEM: .card__title
  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  // BEM: .card__body
  &__body {
    color: #555;
  }

  // BEM: .card--featured
  &--featured {
    border-color: #4a90d9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  // Псевдоклассы
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  // .no-js .card
  .no-js & {
    display: none;
  }
}
```

### Вложенность медиазапросов

```less
.sidebar {
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
}
```

---

## Миксины

### Обычные миксины

Миксин в Less — это селектор, который можно вызывать как функцию. Любой класс или ID может быть миксином.

```less
// Объявление миксина
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Использование
.overlay {
  .flex-center();
  position: fixed;
  inset: 0;
}
```

Компилируется в:

```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
}
```

> Чтобы миксин **не попал** в итоговый CSS как отдельный класс, объявите его со скобками: `.mixin-name()`.

```less
// Этот класс НЕ будет в итоговом CSS
.clearfix() {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

.container {
  .clearfix();
}
```

### Параметрические миксины

```less
// С обязательными параметрами
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

// С параметрами по умолчанию
.box-shadow(@x: 0; @y: 2px; @blur: 4px; @color: rgba(0,0,0,0.2)) {
  -webkit-box-shadow: @x @y @blur @color;
  box-shadow: @x @y @blur @color;
}

// С переменным числом аргументов (rest args)
.transition(@props...) {
  -webkit-transition: @props;
  transition: @props;
}

// Использование
.card {
  .border-radius(8px);
  .box-shadow();                        // все по умолчанию
  .box-shadow(0; 4px; 12px; #0003);    // переопределение
  .transition(color 0.3s, opacity 0.2s);
}
```

### Миксины с `@arguments`

`@arguments` — специальная переменная, содержащая все переданные аргументы.

```less
.border(@width; @style; @color) {
  border: @arguments;
}

.box {
  .border(1px; solid; #ccc);
  // → border: 1px solid #ccc;
}
```

### Возврат значений из миксинов

```less
.average(@x; @y) {
  @result: ((@x + @y) / 2);
}

.element {
  .average(10px; 30px);
  width: @result; // 20px
}
```

---

## Операции и функции

### Математические операции

Less поддерживает `+`, `-`, `*`, `/` для чисел, цветов и переменных.

```less
@base-size: 16px;
@column-width: 100px;
@gutter: 10px;

.container {
  width: @column-width * 12 + @gutter * 11;
  // → width: 1310px
}

.text-small {
  font-size: @base-size * 0.75; // 12px
}

.text-large {
  font-size: @base-size * 1.5;  // 24px
}
```

> **Важно:** Деление (`/`) требует скобок в новых версиях Less, чтобы не конфликтовать с CSS-синтаксисом `font: 10/12px`.

```less
.element {
  width: (100% / 3);   // 33.33333%
  margin: (20px / 2);  // 10px
}
```

### Цветовые функции

Less предоставляет богатый набор функций для манипуляции цветами:

```less
@primary: #4a90d9;

.button {
  background: @primary;
  border-color: darken(@primary, 10%);      // темнее на 10%
  color: lighten(@primary, 40%);            // светлее на 40%

  &:hover {
    background: saturate(@primary, 20%);    // насыщеннее
  }

  &:disabled {
    background: desaturate(@primary, 50%);  // менее насыщенный
    opacity: 0.6;
  }
}

// Смешивание цветов
@mixed: mix(#f00, #00f, 50%);   // → #800080 (фиолетовый)

// Прозрачность
@translucent: fade(@primary, 50%);     // opacity 50%
@fadedIn: fadein(@primary, 10%);       // увеличить непрозрачность
@fadedOut: fadeout(@primary, 10%);     // уменьшить непрозрачность

// HSL-манипуляции
@rotated: spin(@primary, 30);          // сдвиг по цветовому кругу на 30°
```

### Числовые и утилитарные функции

```less
// Округление
@a: ceil(2.4);         // 3
@b: floor(2.9);        // 2
@c: round(2.5);        // 3
@d: abs(-10px);        // 10px
@e: max(5px, 10px, 3px); // 10px
@f: min(5px, 10px, 3px); // 3px
@g: percentage(0.5);   // 50%

// Проверка типов
@isNum: isnumber(42);     // true
@isPx: ispixel(42px);     // true
@isColor: iscolor(#fff);  // true

// Работа с единицами измерения
@unitless: unit(10px);    // 10 (убирает единицу)
@withUnit: unit(10, px);  // 10px (добавляет единицу)
```

---

## Импорт

### Базовый импорт

```less
// main.less
@import "variables";       // подключит variables.less
@import "mixins.less";
@import "components/button";
```

### Ключевые слова импорта

Less расширяет `@import` специальными ключевыми словами:

```less
// reference — импортирует файл, но его стили не попадают в итоговый CSS
// (только миксины и переменные из него доступны)
@import (reference) "bootstrap/mixins";

// once — импортировать файл только один раз (поведение по умолчанию)
@import (once) "variables";

// multiple — импортировать файл каждый раз при вызове
@import (multiple) "overrides";

// less — принудительно обрабатывать как Less (даже с другим расширением)
@import (less) "theme.css";

// css — подставить @import как есть в итоговый CSS
@import (css) "external-lib.css";

// inline — включить содержимое файла в CSS без Less-парсинга
@import (inline) "hacks.css";
```

### Организация проекта

Принятая структура Less-проекта:

```
styles/
├── main.less           ← точка входа
├── _variables.less
├── _mixins.less
├── _reset.less
└── components/
    ├── _button.less
    ├── _card.less
    └── _form.less
```

```less
// main.less
@import "variables";
@import "mixins";
@import "reset";
@import "components/button";
@import "components/card";
@import "components/form";
```

---

## Guards — условия в миксинах

Less не имеет директивы `@if`, но предоставляет механизм **guards** (охранники) — условия, при которых миксин применяется.

### Синтаксис

```less
.mixin(@a) when (условие) {
  /* применяется только если условие истинно */
}
```

### Операторы сравнения

```less
.mixin(@a) when (@a > 0)   { color: green; }
.mixin(@a) when (@a = 0)   { color: gray; }
.mixin(@a) when (@a < 0)   { color: red; }
.mixin(@a) when (@a >= 10) { font-weight: bold; }
```

### Guards на основе значений

```less
.set-color(@type) when (@type = primary) {
  color: #4a90d9;
}

.set-color(@type) when (@type = danger) {
  color: #e74c3c;
}

.set-color(@type) when (default()) {
  color: #333;
}

// Использование
.title   { .set-color(primary); }  // color: #4a90d9
.error   { .set-color(danger); }   // color: #e74c3c
.message { .set-color(other); }    // color: #333 (default)
```

### Guards с проверкой типов

```less
.responsive(@size) when (ispixel(@size)) {
  width: @size;
}

.responsive(@size) when (ispercentage(@size)) {
  width: @size;
  max-width: 100%;
}

.box   { .responsive(300px); }  // width: 300px
.fluid { .responsive(80%); }    // width: 80%; max-width: 100%
```

### Логические операторы

```less
// AND
.mixin(@a; @b) when (@a > 0) and (@b > 0) {
  display: block;
}

// OR (через запятую между guards)
.mixin(@a) when (@a > 10), (@a < -10) {
  font-weight: bold;
}

// NOT
.mixin(@a) when not (iscolor(@a)) {
  color: black;
}
```

---

## Namespace и Scope

### Namespace — пространство имён

Namespace позволяет группировать миксины внутри класса или ID, избегая конфликтов имён.

```less
// Объявление namespace
#theme() {
  .button() {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;

    .primary() {
      background: #4a90d9;
      color: white;
    }

    .secondary() {
      background: #2ecc71;
      color: white;
    }
  }

  .text(@size: 16px; @weight: 400) {
    font-size: @size;
    font-weight: @weight;
    line-height: 1.5;
  }
}

// Использование — обращение через полный путь
.btn-primary {
  #theme.button();
  #theme.button.primary();
}

.btn-secondary {
  #theme.button();
  #theme.button.secondary();
}

.heading {
  #theme.text(24px; 700);
}
```

### Scope — область видимости

Less использует **лексическую область видимости** — переменные ищутся сначала в локальном блоке, затем поднимаются вверх до глобального.

```less
@color: global-blue;    // Глобальная переменная

.component {
  @color: local-red;    // Локальная — перекрывает глобальную

  .title {
    color: @color;      // → local-red (из родительского блока)
  }
}

.other {
  color: @color;        // → global-blue (глобальная)
}
```

### Переменные из миксинов

```less
.size-mixin() {
  @width: 100px;        // локальная переменная миксина
  @height: 50px;
}

.element {
  .size-mixin();
  width: @width;        // → 100px (переменная доступна после вызова миксина)
  height: @height;      // → 50px
}
```

> Переменные, объявленные внутри миксина, становятся доступны в блоке, где миксин вызван. Используйте это для возврата вычисленных значений из миксинов.

---

## Полезные ссылки

- [Официальная документация Less](https://lesscss.org/)
- [Less функции — полный список](https://lesscss.org/functions/)
- [Less GitHub репозиторий](https://github.com/less/less.js)
- [less-loader для Webpack](https://webpack.js.org/loaders/less-loader/)
