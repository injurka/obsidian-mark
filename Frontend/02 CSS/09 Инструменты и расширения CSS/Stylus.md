---
title: Stylus
tags:
  - css
  - preprocessor
  - stylus
---

## Что такое Stylus

**Stylus** — CSS-препроцессор, написанный на Node.js. Его главная особенность — максимальная гибкость синтаксиса: можно писать как в полном CSS-стиле (со скобками, двоеточиями и точками с запятой), так и в минималистичном стиле на основе отступов — без единого лишнего символа.

Ключевые отличия от SCSS/Less:
- **Синтаксис на отступах** — фигурные скобки, двоеточия и точки с запятой необязательны
- **Переменные без префиксов** — нет `$` (SCSS) или `@` (Less), просто `name = value`
- **Миксины и функции** — объединены в единый механизм; поведение зависит от того, возвращает ли блок значение
- **Полная поддержка JavaScript-выражений** внутри стилей

## Установка и компиляция

### Установка

```bash
# Глобально
npm install -g stylus

# Локально в проект
npm install --save-dev stylus
```

### Компиляция через CLI

```bash
# Один файл
stylus style.styl -o style.css

# Наблюдение за изменениями (watch)
stylus --watch style.styl -o style.css

# Папка целиком
stylus src/ -o dist/

# С сжатием (compressed)
stylus --compress style.styl -o style.css
```

### Использование в Node.js

```javascript
const stylus = require('stylus')
const fs = require('fs')

const src = fs.readFileSync('style.styl', 'utf8')

stylus.render(src, { filename: 'style.styl' }, (err, css) => {
  if (err) throw err
  console.log(css)
})
```

### Интеграция с Vite / Webpack

Vite поддерживает Stylus из коробки — достаточно установить пакет:

```bash
npm install --save-dev stylus
```

После этого файлы `.styl` будут обрабатываться автоматически.

## Три стиля синтаксиса

Stylus уникален тем, что позволяет смешивать стили синтаксиса в одном файле.

### Минималистичный (без скобок)

Отступы заменяют фигурные скобки, двоеточия и точки с запятой опускаются:

```stylus
body
  font-family sans-serif
  font-size 16px
  color #333

.container
  max-width 1200px
  margin 0 auto
```

### Классический CSS-стиль

Полностью совместим с обычным CSS:

```stylus
body {
  font-family: sans-serif;
  font-size: 16px;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Смешанный стиль

Можно комбинировать подходы в одном файле:

```stylus
// Без скобок
.header
  background #fff
  padding 20px

// С фигурными скобками, но без точки с запятой
.nav {
  display flex
  gap 16px
}

// Полный CSS
.btn {
  padding: 8px 16px;
  border-radius: 4px;
}
```

## Переменные

В Stylus переменные объявляются без каких-либо префиксов — просто `имя = значение`. Это одно из главных синтаксических отличий от SCSS и Less.

```stylus
// Объявление переменных
primary-color = #3498db
font-size-base = 16px
font-family-base = 'Helvetica Neue', Arial, sans-serif
spacing-unit = 8px

// Использование
body
  font-family font-family-base
  font-size font-size-base
  color primary-color

.card
  padding spacing-unit * 2   // 16px — арифметика работает
  margin-bottom spacing-unit
```

### Переменные с интерполяцией

Переменные можно использовать в именах свойств и селекторов через `{var}`:

```stylus
side = 'left'

.element
  border-{side} 1px solid red   // border-left: 1px solid red
  padding-{side} 10px            // padding-left: 10px
```

### Область видимости

```stylus
color = white

.widget
  color = black     // локальная переменная
  background color  // background: black

body
  color color       // color: white — внешняя переменная не затронута
```

## Вложенность и `&`

### Базовая вложенность

```stylus
.nav
  display flex
  list-style none

  li
    padding 0 12px

    a
      color inherit
      text-decoration none

      &:hover
        color #3498db
```

Скомпилируется в:

```css
.nav { display: flex; list-style: none; }
.nav li { padding: 0 12px; }
.nav li a { color: inherit; text-decoration: none; }
.nav li a:hover { color: #3498db; }
```

### Оператор `&`

`&` ссылается на текущий родительский селектор:

```stylus
.button
  padding 8px 16px
  background #3498db

  &:hover
    background darken(#3498db, 10%)

  &:active
    transform scale(0.98)

  &.disabled
    opacity 0.5
    cursor not-allowed

  &--primary           // BEM-модификатор
    background #2ecc71

  .icon &              // инверсия: .icon .button
    margin-right 8px
```

### Вложенность медиазапросов

```stylus
.container
  width 100%

  @media (min-width: 768px)
    max-width 720px

  @media (min-width: 1200px)
    max-width 1140px
```

## Миксины и функции

В Stylus **миксины** и **функции** объявляются одинаково — через именованный блок с параметрами. Разница только в поведении:
- **Миксин** — вставляет CSS-свойства (не возвращает значение)
- **Функция** — возвращает значение через `return` и используется в выражениях

### Миксины

```stylus
// Объявление миксина
flex-center()
  display flex
  align-items center
  justify-content center

// Миксин с параметрами и значениями по умолчанию
border-radius(r = 4px)
  -webkit-border-radius r
  -moz-border-radius r
  border-radius r

// Миксин с несколькими параметрами
transition(prop = all, dur = 0.3s, ease = ease)
  -webkit-transition prop dur ease
  transition prop dur ease

// Использование
.card
  flex-center()
  border-radius(8px)
  transition(opacity, 0.2s)
```

### Прозрачные миксины (transparent mixins)

Если имя миксина совпадает с CSS-свойством, он применяется неявно:

```stylus
border-radius(n)
  -webkit-border-radius n
  border-radius n

// Использование как обычного свойства!
.box
  border-radius 10px
```

### Блочные миксины

Миксину можно передать блок содержимого через `{block}`:

```stylus
media-mobile()
  @media (max-width: 767px)
    {block}

// Использование
.sidebar
  width 300px
  +media-mobile()
    width 100%
    display none
```

### Функции

```stylus
// Функция возвращает значение
double(n)
  return n * 2

em(px, base = 16)
  return (px / base) * 1em

// Использование в значениях свойств
.text
  font-size em(18)          // font-size: 1.125em
  margin-bottom double(8px) // margin-bottom: 16px
```

### Аргументы через `arguments`

```stylus
box-shadow()
  -webkit-box-shadow arguments
  box-shadow arguments

.card
  box-shadow 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)
```

## Итерации (`for ... in`)

Stylus поддерживает циклы через конструкцию `for ... in`.

### Цикл по диапазону

```stylus
// for <val> in <range>
for i in 1..5
  .col-{i}
    width (i * 20)%
```

Результат:

```css
.col-1 { width: 20%; }
.col-2 { width: 40%; }
.col-3 { width: 60%; }
.col-4 { width: 80%; }
.col-5 { width: 100%; }
```

### Цикл по списку

```stylus
sizes = sm md lg xl

for size in sizes
  .text-{size}
    font-size s('var(--font-size-%s)', size)
```

### Цикл с индексом

```stylus
colors = #e74c3c #3498db #2ecc71

for color, i in colors
  .badge-{i + 1}
    background color
```

### Генерация утилит

```stylus
// Генерация классов отступов
for i in 0..8
  .m-{i}
    margin (i * 4)px
  .p-{i}
    padding (i * 4)px
```

## Условия (`if / else / unless`)

### Базовые условия

```stylus
theme = dark

body
  if theme == dark
    background #1a1a2e
    color #eee
  else
    background #fff
    color #333
```

### `unless` — инверсия условия

`unless condition` — эквивалент `if !condition`:

```stylus
debug = false

.element
  unless debug
    outline none
  // то же самое, что: if !debug { outline: none }
```

### Условия в миксинах

```stylus
button(type = 'default')
  padding 8px 16px
  border none
  cursor pointer

  if type == 'primary'
    background #3498db
    color #fff
  else if type == 'danger'
    background #e74c3c
    color #fff
  else
    background #ecf0f1
    color #333

.btn-primary
  button('primary')

.btn-danger
  button('danger')
```

### Постфиксная форма

```stylus
.hidden
  display none if hidden
  color red unless active
```

### Тернарный оператор

```stylus
size = large
font-size = size == large ? 24px : 16px

.title
  font-size font-size
```

## Встроенные функции

### Цветовые функции

```stylus
base = #3498db

.palette
  // Осветление и затемнение
  background lighten(base, 20%)    // светлее на 20%
  border-color darken(base, 15%)   // темнее на 15%

  // Насыщенность
  color saturate(base, 30%)        // более насыщенный
  color desaturate(base, 30%)      // менее насыщенный

  // Прозрачность
  background alpha(base, 0.5)      // rgba с прозрачностью 0.5
  background rgba(base, 0.8)       // альтернативный синтаксис

  // Смешивание
  color mix(#fff, base, 50%)       // 50% белого + 50% base
```

### Функции для работы с HSL

```stylus
primary = hsl(210, 70%, 50%)

.element
  color adjust-hue(primary, 30)      // сдвиг оттенка на 30°
  background complement(primary)     // дополнительный цвет (180°)
  border-color invert(primary)       // инвертированный цвет
```

### Получение компонентов цвета

```stylus
color = #3498db

h = hue(color)          // 204
s = saturation(color)   // 70%
l = lightness(color)    // 52%
r = red(color)          // 52
g = green(color)        // 152
b = blue(color)         // 219
```

### Математические функции

```stylus
.element
  width round(33.33px)     // 33px
  height ceil(12.1px)      // 13px
  margin floor(8.9px)      // 8px
  padding abs(-16px)       // 16px
  font-size max(14px, 1em) // больший из двух
  line-height min(2, 1.5)  // меньший из двух
```

### Строковые функции

```stylus
// s() — форматированная строка (аналог sprintf)
selector = s('.btn-%s', 'primary')   // '.btn-primary'

// unquote() — убрать кавычки
font = unquote('Arial, sans-serif')
```

### Функции для работы со списками

```stylus
list = 10px 20px 30px

.box
  padding list[0] list[1]   // 10px 20px — доступ по индексу

len = length(list)           // 3

first-val = first(list)      // 10px
last-val = last(list)        // 30px
```

### Проверка типов

```stylus
check(val)
  if typeof(val) == 'unit'
    return val
  else
    return 0

.box
  margin check(10px)   // 10px
  padding check(none)  // 0
```

## Импорт и разбивка на файлы

### Базовый импорт

```stylus
// Подключение файла (расширение .styl можно опустить)
@import 'variables'
@import 'mixins'
@import 'components/button'
```

### Структура проекта

Рекомендуемая структура для организации Stylus-файлов:

```
styles/
├── main.styl            # точка входа — только @import
├── _variables.styl      # переменные
├── _mixins.styl         # миксины и функции
├── _reset.styl          # сброс стилей
├── base/
│   ├── _typography.styl
│   └── _layout.styl
└── components/
    ├── _button.styl
    ├── _card.styl
    └── _nav.styl
```

`main.styl`:

```stylus
@import '_variables'
@import '_mixins'
@import '_reset'

@import 'base/_typography'
@import 'base/_layout'

@import 'components/_button'
@import 'components/_card'
@import 'components/_nav'
```

### `@import` vs `@require`

```stylus
// @import — подключает файл каждый раз (стандартное поведение)
@import 'mixins'

// @require — подключает файл только один раз,
// даже если указан в нескольких местах (защита от дублирования)
@require 'variables'
```

### Glob-импорт

```stylus
// Подключить все файлы из папки
@import 'components/*'
```

### Встроенный CSS через `@css`

Блок `@css` передаётся в вывод без обработки Stylus:

```stylus
@css {
  .legacy-element {
    zoom: 1;
    filter: alpha(opacity=80);
  }
}
```

## Источники

- [Официальная документация Stylus](https://stylus-lang.com/)
- [Stylus на GitHub](https://github.com/stylus/stylus)
- [Встроенные функции Stylus](https://stylus-lang.com/docs/bifs.html)