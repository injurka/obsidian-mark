Правило `@forward` в Sass позволяет загружать таблицу стилей Sass и делать её миксины, функции и переменные доступными для других таблиц стилей, которые используют ваш модуль. Это особенно полезно для организации больших библиотек Sass в нескольких файлах, предоставляя пользователям единую точку входа. Ниже мы разберем ключевые аспекты правила `@forward`, включая добавление префиксов, контроль видимости и настройку модулей.

### Основное использование

Правило `@forward` записывается как:

```scss
@forward "<url>";
```

Это загружает модуль по указанному URL и делает его публичные члены доступными для пользователей вашего модуля. Однако эти члены недоступны внутри вашего модуля, если вы не используете правило `@use`.

### Пример

```scss
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list";

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

В этом примере миксин `list-reset` из `src/_list.scss` становится доступным для `styles.scss` через модуль `bootstrap`.

### Добавление префикса

Вы можете добавить префикс ко всем членам, переадресованным модулем, чтобы сделать их имена более контекстно-специфичными. Это делается с помощью:

```scss
@forward "<url>" as <prefix>-*;
```

### Пример

```scss
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list" as list-*;

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

Здесь миксин `reset` переадресуется с префиксом `list-`, поэтому он становится `list-reset` в `styles.scss`.

### Контроль видимости

Вы можете контролировать, какие члены переадресуются, используя ключевые слова `hide` или `show`:

```scss
@forward "<url>" hide <members...>;
@forward "<url>" show <members...>;
```

### Пример

```scss
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include list-reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}

// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;
```

В этом примере `list-reset` и `$horizontal-list-gap` не переадресуются, но другие члены переадресуются.

### Настройка модулей

Правило `@forward` также может загружать модуль с настройками, аналогично `@use`. Одно ключевое отличие заключается в том, что `@forward` позволяет использовать флаг `!default` в своих настройках, что позволяет вам устанавливать значения по умолчанию, которые все еще могут быть переопределены в последующих таблицах стилей.

### Пример

```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);

// style.scss
@use 'opinionated' with ($black: #333);
```

В этом примере `_opinionated.scss` переадресует `_library.scss` с измененными значениями по умолчанию, а `style.scss` дополнительно переопределяет переменную `$black`.

### Резюме

- **Основное использование**: `@forward "<url>";`
- **Добавление префикса**: `@forward "<url>" as <prefix>-*;`
- **Контроль видимости**: `@forward "<url>" hide <members...>;` или `@forward "<url>" show <members...>;`
- **Настройка модулей**: `@forward "<url>" with (<configuration>);`

Правило `@forward` — это универсальный инструмент для организации и модуляризации вашего кода Sass, что упрощает управление и повторное использование стилей в больших проектах.