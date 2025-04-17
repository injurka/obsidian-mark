---
title: ECMAScript modules
tags:
  - js-module
  - js
---

## Dynamic import (Native)

`Dynamic import` (динамический импорт) в контексте ECMAScript Modules (ESM) — это функция, которая позволяет вам загружать модули асинхронно во время выполнения программы. Это отличается от статического импорта, который происходит на этапе компиляции и требует, чтобы все импортируемые модули были известны заранее.

### Роль и полезность `dynamic import`

1. **Асинхронная загрузка модулей**: Динамический импорт позволяет загружать модули только тогда, когда они действительно нужны, что может улучшить производительность приложения, уменьшив начальный размер загружаемого кода.
2. **Условная загрузка**: Можно загружать модули на основе условий, что невозможно сделать со статическим импортом. Например, загрузка модуля только при выполнении определенного условия.
3. **Управление зависимостями**: Помогает управлять зависимостями более гибко, особенно в больших приложениях, где не все части кода могут быть необходимы сразу.
4. **Поддержка браузеров**: Динамический импорт поддерживается современными браузерами, что делает его удобным для использования в веб-разработке.

### Функционал `dynamic import`

1. **Асинхронность**: Динамический импорт возвращает промис, который разрешается в модуль, когда он загружен. Это позволяет использовать `async/await` для управления загрузкой.
2. **Путь к модулю**: Путь к модулю может быть динамическим, что позволяет использовать переменные и выражения для определения, какой модуль загружать.
3. **Обработка ошибок**: Так как это асинхронная операция, можно использовать стандартные методы для обработки ошибок, такие как `try/catch` или `.catch()` на промисе.

### Пример использования 

```javascript
// Пример динамического импорта
async function loadModule(modulePath) {
  try {
    const module = await import(modulePath);
    // Теперь можно использовать функции и переменные из модуля
    console.log(module.default);
  } catch (error) {
    console.error('Ошибка при загрузке модуля:', error);
  }
}

// Загрузка модуля по условию
if (someCondition) {
  loadModule('./path/to/module.js');
}
```

В этом примере функция `loadModule` асинхронно загружает модуль по указанному пути и обрабатывает возможные ошибки. Модуль загружается только если выполняется условие `someCondition`.


## Dynamic import (Vite)

Vite предлагает расширенную функциональность для импорта модулей, которая выходит за рамки стандартного `dynamic import` ECMAScript. Эти дополнительные возможности называются `Glob Import` и `Dynamic Import with Variables`, и они предоставляют более гибкие и мощные инструменты для управления зависимостями в вашем проекте.

### Glob Import

`Glob Import` позволяет вам импортировать сразу несколько модулей из файловой системы, используя специальную функцию `import.meta.glob`. Это особенно полезно, когда вам нужно загрузить множество модулей, соответствующих определенному шаблону.

#### Основное использование

```javascript
const modules = import.meta.glob('./dir/*.js');
```

Этот код будет преобразован Vite в:

```javascript
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
};
```

Затем вы можете перебирать ключи объекта `modules` для доступа к соответствующим модулям:

```javascript
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}
```

#### Eager Loading

По умолчанию, соответствующие файлы загружаются лениво через динамический импорт и разделяются на отдельные чанки во время сборки. Если вы хотите загрузить все модули напрямую, вы можете передать опцию `{ eager: true }`:

```javascript
const modules = import.meta.glob('./dir/*.js', { eager: true });
```

Это будет преобразовано в:

```javascript
import * as __glob__0_0 from './dir/foo.js';
import * as __glob__0_1 from './dir/bar.js';
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
};
```

#### Множественные шаблоны

Первый аргумент может быть массивом шаблонов:

```javascript
const modules = import.meta.glob(['./dir/*.js', './another/*.js']);
```

#### Отрицательные шаблоны

Вы также можете исключать файлы из результата, используя отрицательные шаблоны:

```javascript
const modules = import.meta.glob(['./dir/*.js', '!**/bar.js']);
```

Это будет преобразовано в:

```javascript
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
};
```

#### Именованные импорты

Вы можете импортировать только части модулей с помощью опции `import`:

```typescript
const modules = import.meta.glob('./dir/*.js', { import: 'setup' });
```

Это будет преобразовано в:

```typescript
const modules = {
  './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
  './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup),
};
```

Комбинируя с `eager`, вы можете включить tree-shaking для этих модулей:

```typescript
const modules = import.meta.glob('./dir/*.js', { import: 'setup', eager: true });
```

Это будет преобразовано в:

```typescript
import { setup as __glob__0_0 } from './dir/foo.js';
import { setup as __glob__0_1 } from './dir/bar.js';
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
};
```

#### Пользовательские запросы

Вы также можете использовать опцию `query` для предоставления запросов к импортам, например, для импорта ресурсов как строки или как URL:

```typescript
const moduleStrings = import.meta.glob('./dir/*.svg', { query: '?raw', import: 'default' });
const moduleUrls = import.meta.glob('./dir/*.svg', { query: '?url', import: 'default' });
```

Это будет преобразовано в:

```typescript
const moduleStrings = {
  './dir/foo.svg': () => import('./dir/foo.js?raw').then((m) => m['default']),
  './dir/bar.svg': () => import('./dir/bar.js?raw').then((m) => m['default']),
};
const moduleUrls = {
  './dir/foo.svg': () => import('./dir/foo.js?url').then((m) => m['default']),
  './dir/bar.svg': () => import('./dir/bar.js?url').then((m) => m['default']),
};
```

### Dynamic Import with Variables

Vite также поддерживает динамический импорт с переменными:

```typescript
const module = await import(`./dir/${file}.js`);
```

Обратите внимание, что переменные представляют только имена файлов на одном уровне вложенности. Если `file` равен `'foo/bar'`, импорт завершится ошибкой. Для более сложных случаев использования вы можете использовать функцию `glob import`.

