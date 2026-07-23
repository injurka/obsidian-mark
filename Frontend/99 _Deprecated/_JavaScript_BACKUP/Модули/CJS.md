---
title: CommonJS modules
tags:
  - js-module
  - js
---

## Что такое CommonJS и зачем он появился

До появления CommonJS в JavaScript не существовало стандартной системы модулей. Весь код либо помещался в один файл, либо подключался через глобальные переменные в браузере — это порождало конфликты имён и неуправляемые зависимости.

В 2009 году Кевин Дангур (Kevin Dangoor) основал проект **ServerJS** (позднее переименованный в **CommonJS**) с целью создать стандарт для серверного JavaScript, по аналогии со стандартными библиотеками Python или Ruby. В том же году Райан Даль (Ryan Dahl) создал **Node.js** и выбрал CommonJS в качестве встроенной системы модулей.

**Ключевые факты:**
- CJS — синхронная система модулей, спроектированная для серверной среды
- Каждый файл — изолированный модуль со своей областью видимости
- Файлы читаются с диска синхронно, поэтому блокирующий `require()` приемлем на сервере, но неприменим в браузере без сборщика
- По умолчанию Node.js интерпретирует `.js`-файлы как CJS (если в `package.json` не указано `"type": "module"`)

## Синтаксис: require, module.exports и exports

### Экспорт: module.exports

`module.exports` — главный объект, который возвращается при `require()` данного файла. По умолчанию это пустой объект `{}`.

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Экспорт объекта с несколькими функциями
module.exports = { add, multiply };
```

```javascript
// greet.js — экспорт одного значения (функции, класса, примитива)
module.exports = function greet(name) {
  return `Hello, ${name}!`;
};
```

### Сокращение: exports

`exports` — это ссылка на `module.exports`. Можно добавлять свойства напрямую, но **нельзя переназначать** `exports` целиком — это разорвёт связь с `module.exports`.

```javascript
// utils.js
exports.PI = 3.14159;

exports.square = function (x) {
  return x * x;
};

// ❌ Это НЕ работает — разрывает ссылку
// exports = { PI: 3.14159 };
```

Внутри Node.js оба варианта приводят к одному результату, если не переназначать `exports`:

```javascript
// Эти два файла эквивалентны:

// вариант 1 — через module.exports
module.exports.foo = 'bar';

// вариант 2 — через exports
exports.foo = 'bar';
```

### Импорт: require()

`require()` загружает модуль по пути и возвращает его `module.exports`.

```javascript
// app.js
const { add, multiply } = require('./math');   // деструктуризация
const greet = require('./greet');              // единственный экспорт
const { PI } = require('./utils');

console.log(add(2, 3));        // 5
console.log(greet('World'));   // Hello, World!
console.log(PI);               // 3.14159
```

**Поиск модуля по пути:**
1. Если путь начинается с `./` или `../` — ищет файл относительно текущего
2. Если нет префикса — ищет в `node_modules` (встроенный модуль или npm-пакет)
3. Node.js пробует расширения: `.js` → `.json` → `.node`

```javascript
// Примеры разных форм require
const fs = require('fs');                    // встроенный модуль Node.js
const lodash = require('lodash');            // из node_modules
const config = require('./config.json');     // JSON автоматически парсится
const helper = require('./lib/helper');      // расширение .js можно опустить
```

### Встроенные переменные модуля

В каждом CJS-модуле доступны специальные переменные (в ESM их нет):

```javascript
console.log(__filename); // абсолютный путь к текущему файлу
console.log(__dirname);  // абсолютный путь к директории файла

console.log(module);     // объект текущего модуля
console.log(exports);    // ссылка на module.exports
```

## Кэш модулей

Node.js кэширует каждый загруженный модуль после первого `require()`. Повторные вызовы `require()` с тем же путём возвращают **уже готовый объект из кэша**, а не перезапускают файл.

```javascript
// counter.js
let count = 0;

module.exports = {
  increment() { count++; },
  getCount()  { return count; },
};
```

```javascript
// a.js
const counter = require('./counter');
counter.increment();
console.log(counter.getCount()); // 1
```

```javascript
// b.js
const counter = require('./counter'); // ← тот же объект из кэша
console.log(counter.getCount());     // 1 (не 0!)
```

```javascript
// main.js
require('./a');
require('./b');
// Оба модуля получили один и тот же экземпляр counter
```

**Кэш доступен через `require.cache`:**

```javascript
// Просмотр всех закэшированных модулей
console.log(Object.keys(require.cache));

// Инвалидация кэша (редко нужна, но возможна)
delete require.cache[require.resolve('./counter')];
// Следующий require('./counter') заново выполнит файл
```

> [!NOTE]
> Кэширование — это ключевое свойство CJS. Оно гарантирует, что модуль является **синглтоном**: любые изменения его состояния видны всем потребителям.

> [!WARNING]
> Кэш строится по **абсолютному пути** файла. Один и тот же логический модуль может быть закэширован дважды, если он подключается по разным путям (например, через симлинки).

## Круговые зависимости (Circular Dependencies)

CJS поддерживает круговые зависимости, но делает это частично — модуль получает **неполный экспорт** того модуля, который ещё не завершил инициализацию.

### Пример кругового импорта

```javascript
// a.js
console.log('a начал загрузку');
const b = require('./b');
console.log('в a, b.done =', b.done);
exports.done = true;
console.log('a завершил загрузку');
```

```javascript
// b.js
console.log('b начал загрузку');
const a = require('./a'); // ← a ещё не завершён!
console.log('в b, a.done =', a.done);
exports.done = true;
console.log('b завершил загрузку');
```

```javascript
// main.js
const a = require('./a');
const b = require('./b');
console.log('в main, a.done =', a.done, ', b.done =', b.done);
```

**Вывод:**
```
a начал загрузку
b начал загрузку
в b, a.done = undefined   ← a ещё не экспортировал done
b завершил загрузку
в a, b.done = true
a завершил загрузку
в main, a.done = true , b.done = true
```

### Как Node.js разрывает цикл

Когда `a.js` вызывает `require('./b')`, а `b.js` в свою очередь вызывает `require('./a')`, Node.js обнаруживает, что `a` **уже в процессе загрузки**. Вместо зависания он возвращает текущее (частичное) значение `module.exports` модуля `a` — то, что было экспортировано на момент вызова.

```
┌─────────────────────────────────────────────┐
│  Загрузка a.js начата                        │
│  → require('./b') запрашивает b.js           │
│    ┌─────────────────────────────────────┐   │
│    │  Загрузка b.js начата               │   │
│    │  → require('./a') — цикл!           │   │
│    │    возвращает частичный exports a   │   │
│    │  b.js завершён                      │   │
│    └─────────────────────────────────────┘   │
│  a.js продолжает и завершается               │
└─────────────────────────────────────────────┘
```

**Рекомендации по работе с циклами:**
- Перестройте архитектуру так, чтобы исключить циклы (выделите общий модуль)
- Если цикл неизбежен — используйте `module.exports` с отложенной инициализацией или перенесите `require()` внутрь функций

```javascript
// Безопасный вариант: require внутри функции
// a.js
exports.getB = function () {
  const b = require('./b'); // загружается только при вызове
  return b;
};
```

## CJS и ESM: синхронность vs асинхронность

> [!NOTE]
> Подробное сравнение CJS и ESM см. в файле [[ESM vs CommonJS]]. Здесь — только ключевое отличие по модели загрузки.

**CJS — синхронный:**
- `require()` блокирует выполнение до полной загрузки и выполнения модуля
- Граф зависимостей строится **динамически** во время выполнения
- `require()` можно вызывать в любом месте кода и с динамическими путями

```javascript
// Динамический require — валидный CJS
const moduleName = condition ? './a' : './b';
const mod = require(moduleName); // путь вычисляется в рантайме

// require внутри функции — тоже допустимо
function loadPlugin(name) {
  return require(`./plugins/${name}`);
}
```

**ESM — асинхронный (статический):**
- `import` обрабатывается **до** выполнения кода — на этапе разбора
- Граф зависимостей строится **статически** — бандлеры могут делать tree shaking
- `import()` (динамический) возвращает Promise

```javascript
// ESM — статический импорт, всегда наверху файла
import { add } from './math.js';

// ESM — динамический импорт (Promise-based)
const { add } = await import('./math.js');
```

| Характеристика | CJS | ESM |
|---|---|---|
| Загрузка | Синхронная | Асинхронная |
| Анализ графа | В рантайме | На этапе парсинга |
| Tree shaking | ❌ | ✅ |
| Динамические пути | ✅ | Только через `import()` |
| Top-level await | ❌ | ✅ |

## Совместимость CJS и ESM в современном Node.js

Node.js поддерживает обе системы модулей. Ключевые инструменты совместимости:

### Расширения файлов и поле "type"

```json
// package.json — весь проект переключается в режим ESM
{
  "type": "module"
}
```

| Расширение | Режим |
|---|---|
| `.js` | CJS (по умолчанию) или ESM (если `"type": "module"`) |
| `.cjs` | Всегда CJS |
| `.mjs` | Всегда ESM |

```javascript
// Файл server.cjs — всегда CJS, независимо от package.json
const http = require('http');
module.exports = http.createServer(() => {});
```

### Импорт CJS из ESM

ESM-модуль может подключать CJS через `import`. Node.js автоматически оборачивает `module.exports` в default-экспорт:

```javascript
// ESM-файл (index.mjs) импортирует CJS-библиотеку
import lodash from 'lodash'; // module.exports становится default
const { map } = lodash;

// Или через деструктуризацию (работает не всегда — зависит от структуры)
import { cloneDeep } from 'lodash';
```

> [!WARNING]
> Именованные экспорты из CJS в ESM могут работать некорректно. Если `module.exports` — объект, Node.js пытается угадать именованные экспорты через статический анализ, но это не всегда возможно. Безопаснее использовать default-импорт.

### Импорт ESM из CJS: createRequire

`require()` **не может** загружать ESM-модули напрямую. Для использования ESM-пакетов из CJS-контекста есть два подхода:

**1. Динамический import() (рекомендуется):**

```javascript
// CJS-файл использует ESM-пакет через динамический импорт
async function main() {
  const { default: chalk } = await import('chalk'); // chalk — ESM-only
  console.log(chalk.green('Успех!'));
}

main();
```

**2. module.createRequire — для использования CJS из ESM:**

```javascript
// ESM-файл (helper.mjs) хочет использовать require()
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

// Теперь можно загружать CJS-модули через require
const config = require('./legacy-config.json');
const legacyLib = require('./old-library');

console.log(config, legacyLib);
```

### Поле exports в package.json

Современные пакеты используют `"exports"` для публикации обеих версий одновременно:

```json
{
  "name": "my-library",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

Node.js автоматически выбирает нужный формат в зависимости от контекста вызывающего кода.

### Глобальные переменные CJS в ESM-контексте

В ESM недоступны `__filename`, `__dirname` и `require`. Их заменители:

```javascript
// ESM-эквиваленты CJS-глобалов
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
```

## Источники

- [Node.js — Modules: CommonJS modules](https://nodejs.org/api/modules.html)
- [Node.js — Modules: Packages](https://nodejs.org/api/packages.html)
- [Node.js — Interoperability with CommonJS](https://nodejs.org/api/esm.html#interoperability-with-commonjs)
- [CommonJS история — Wikipedia](https://en.wikipedia.org/wiki/CommonJS)