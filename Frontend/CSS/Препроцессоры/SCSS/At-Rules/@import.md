## Введение

Sass расширяет правило CSS `@import`, добавляя возможность импортировать стили Sass и CSS, предоставляя доступ к миксинам, функциям и переменным, а также объединяя CSS из нескольких таблиц стилей. В отличие от обычных CSS импортов, которые требуют от браузера выполнять несколько HTTP-запросов при рендеринге страницы, импорты Sass обрабатываются полностью во время компиляции.

Импорты Sass имеют ту же синтаксис, что и импорты CSS, за исключением того, что они позволяют разделять несколько импортов запятыми, а не требуют, чтобы каждый из них имел свой собственный `@import`. Кроме того, в отступах синтаксиса импортированные URL-адреса не обязательно должны быть в кавычках.

> [!ERROR] Внимание
> Начиная с Dart Sass 1.80.0, правило `@import` является устаревшим и будет удалено из языка в Dart Sass 3.0.0. Предпочтительно использовать правило `@use`.

### Проблемы с `@import`

Правило `@import` имеет ряд серьезных проблем:

1. **Глобальная доступность:** Все переменные, миксины и функции становятся глобально доступными. Это затрудняет определение места, где что-то определено.
2. **Конфликты имен:** Из-за глобальной доступности библиотеки должны добавлять префиксы ко всем своих членам, чтобы избежать конфликтов имен.
3. **Глобальные правила `@extend`:** Это затрудняет предсказание того, какие правила стилей будут расширены.
4. **Повторная компиляция:** Каждая таблица стилей выполняется и ее CSS выводится каждый раз при импорте, что увеличивает время компиляции и создает избыточный вывод.
5. **Отсутствие приватных членов:** Не было возможности определить приватные члены или заполнители селекторов, которые были бы недоступны для импортируемых таблиц стилей.

Новая модульная система и правило `@use` решают все эти проблемы.

### Как мигрировать?

Мы написали инструмент миграции, который автоматически преобразует большую часть кода на основе `@import` в код на основе `@use` за считанные секунды. Просто укажите ему ваши точки входа и дайте ему работать!

## Синтаксис SCSS

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// style.scss
@import 'foundation/code', 'foundation/lists';
```

### Вывод CSS

```css
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

## Импорт файлов

Когда Sass импортирует файл, этот файл оценивается так, как если бы его содержимое появилось непосредственно на месте `@import`. Все миксины, функции и переменные из импортированного файла становятся доступными, а весь его CSS включается в точке, где был написан `@import`. Более того, все миксины, функции или переменные, определенные до `@import` (включая из других `@import`), доступны в импортированной таблице стилей.

> [!ERROR] Внимание
> Если один и тот же файл импортируется более одного раза, он будет оцениваться снова каждый раз. Если он просто определяет функции и миксины, это обычно не имеет большого значения, но если он содержит правила стилей, они будут скомпилированы в CSS более одного раза.

### Поиск файла

Не было бы интересно писать абсолютные URL-адреса для каждой таблицы стилей, которую вы импортируете, поэтому алгоритм Sass для поиска файла, который нужно импортировать, делает это немного проще. Для начала вам не нужно явно указывать расширение файла, который вы хотите импортировать; `@import "variables"` автоматически загрузит `variables.scss`, `variables.sass` или `variables.css`.

> [!ERROR] Внимание
> Чтобы обеспечить работу таблиц стилей на любой операционной системе, Sass импортирует файлы по URL, а не по пути к файлу. Это означает, что вам нужно использовать прямые слэши, а не обратные, даже если вы находитесь в Windows.

### Пути загрузки

Все реализации Sass позволяют пользователям предоставлять пути загрузки: пути в файловой системе, в которых Sass будет искать при разрешении импортов. Например, если вы передадите `node_modules/susy/sass` как путь загрузки, вы можете использовать `@import "susy"` для загрузки `node_modules/susy/sass/susy.scss`.

Импорты всегда будут разрешаться относительно текущего файла в первую очередь. Пути загрузки будут использоваться только в том случае, если не существует относительного файла, который соответствует импорту. Это гарантирует, что вы не сможете случайно испортить ваши относительные импорты при добавлении новой библиотеки.

💡 **Интересный факт:**

В отличие от некоторых других языков, Sass не требует, чтобы вы использовали `./` для относительных импортов. Относительные импорты всегда доступны.

### Частичные файлы

По соглашению, файлы Sass, которые предназначены только для импорта, а не для компиляции сами по себе, начинаются с `_` (например, `_code.scss`). Они называются частичными файлами и сообщают инструментам Sass не пытаться компилировать эти файлы самостоятельно. Вы можете опустить `_` при импорте частичного файла.

### Индексные файлы

Если вы напишете `_index.scss` или `_index.sass` в папке, когда сама папка импортируется, этот файл будет загружен вместо нее.

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// foundation/_index.scss
@import 'code', 'lists';

// style.scss
@import 'foundation';
```

### Вывод CSS

```css
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

### Пользовательские импортеры

Все реализации Sass предоставляют способ определения пользовательских импортеров, которые контролируют, как `@import` находит таблицы стилей:

- **Node Sass и Dart Sass на npm** предоставляют опцию `importer` как часть их JS API.
- **Dart Sass на pub** предоставляет абстрактный класс `Importer`, который может быть расширен пользовательским импортером.
- **Ruby Sass** предоставляет абстрактный класс `Importers::Base`, который может быть расширен пользовательским импортером.

### Вложенные импорты

Импорты обычно пишутся на верхнем уровне таблицы стилей, но они также могут быть вложены в правила стилей или простые CSS-правила. Импортированный CSS вложен в этом контексте, что делает вложенные импорты полезными для ограничения блока CSS определенным элементом или медиа-запросом. Миксины, функции и переменные, определенные в вложенном импорте, доступны только в этом вложенном контексте.

```scss
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}

// style.scss
.theme-sample {
  @import "theme";
}
```

### Вывод CSS

```css
.theme-sample pre, .theme-sample code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```

💡 **Интересный факт:**

Вложенные импорты очень полезны для ограничения сторонних таблиц стилей, но если вы автор импортируемой таблицы стилей, обычно лучше писать стили в миксине и включать этот миксин в вложенный контекст. Миксин может использоваться более гибко, и ясно, когда смотришь на импортируемую таблицу стилей, как она предназначена для использования.

> [!ERROR] Внимание
> CSS во вложенных импортах оценивается как миксин, что означает, что любые родительские селекторы будут ссылаться на селектор, в котором вложен таблица стилей.

```scss
// _theme.scss
ul li {
  $padding: 16px;
  padding-left: $padding;
  [dir=rtl] & {
    padding: {
      left: 0;
      right: $padding;
    }
  }
}

// style.scss
.theme-sample {
  @import "theme";
}
```

### Вывод CSS

```css
.theme-sample ul li {
  padding-left: 16px;
}
[dir=rtl] .theme-sample ul li {
  padding-left: 0;
  padding-right: 16px;
}
```

### Импорт CSS

В дополнение к импорту файлов `.sass` и `.scss`, Sass может импортировать обычные файлы `.css`. Единственное правило заключается в том, что импорт не должен явно включать расширение `.css`, поскольку оно используется для указания обычного CSS `@import`.

```scss
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@import 'code';
```

### Вывод CSS

```css
code {
  padding: .25em;
  line-height: 0;
}
```

Файлы CSS, импортированные Sass, не допускают никаких специальных функций Sass. Чтобы убедиться, что авторы не случайно пишут Sass в своих CSS, все функции Sass, которые не являются также допустимыми CSS, будут вызывать ошибки. В противном случае CSS будет отображаться как есть. Он даже может быть расширен!

### Обычные CSS `@import`

Поскольку `@import` также определено в CSS, Sass нуждается в способе компиляции обычных CSS `@import` без попытки импортировать файлы во время компиляции. Для этого Sass компилирует любой `@import` со следующими характеристиками в обычные CSS импорты:

- Импорты, где URL заканчивается на `.css`.
- Импорты, где URL начинается с `http://` или `https://`.
- Импорты, где URL написан как `url()`.
- Импорты, которые имеют медиа-запросы.

```scss
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```

### Интерполяция

Хотя импорты Sass не могут использовать интерполяцию (чтобы всегда было возможно определить, откуда берутся миксины, функции и переменные), обычные CSS импорты могут. Это позволяет динамически генерировать импорты, например, на основе параметров миксина.

```scss
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Droid Sans");
```

### Импорт и модули

Модульная система Sass интегрируется бесшовно с `@import`, будь то импорт файла, содержащего правила `@use`, или загрузка файла, содержащего импорты, как модуля. Мы хотим сделать переход от `@import` к `@use` как можно более плавным.

#### Импорт файла с модульной системой

Когда вы импортируете файл, содержащий правила `@use`, импортирующий файл имеет доступ ко всем членам (даже приватным)