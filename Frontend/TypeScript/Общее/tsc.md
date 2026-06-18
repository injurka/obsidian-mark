---
title: TypeScript Compiler (tsc)
tags:
  - typescript
  - tsc
  - compiler
---

## Что такое tsc и зачем он нужен

`tsc` — официальный компилятор TypeScript, входящий в пакет `typescript`. Его задача — преобразовать `.ts`/`.tsx`-файлы в JavaScript, который понимают браузеры и Node.js.

**Что делает tsc:**
1. **Статическая проверка типов** — выявляет ошибки на этапе разработки, до запуска кода
2. **Транспиляция** — преобразует синтаксис TypeScript (типы, декораторы, enum) в чистый JS
3. **Понижение версии (downleveling)** — генерирует ES5/ES6 из современного синтаксиса
4. **Генерация деклараций** — создаёт `.d.ts`-файлы для библиотек

> В отличие от Babel или esbuild, tsc выполняет полноценную проверку типов, а не просто стирает их.

---

## Установка и базовое использование

### Установка

```bash
# Локально в проект (рекомендуется)
npm install --save-dev typescript

# Глобально
npm install -g typescript
```

### Запуск через npx

```bash
# Скомпилировать конкретный файл
npx tsc src/index.ts

# Скомпилировать проект по tsconfig.json
npx tsc

# Инициализировать tsconfig.json
npx tsc --init

# Режим слежения за изменениями
npx tsc --watch
```

### Пример: компиляция одного файла

```typescript
// src/hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));
```

```bash
npx tsc src/hello.ts
# → генерирует src/hello.js
```

```javascript
// src/hello.js (результат)
function greet(name) {
  return "Hello, ".concat(name, "!");
}
console.log(greet("TypeScript"));
```

---

## Ключевые флаги командной строки

Флаги CLI позволяют управлять компилятором без `tsconfig.json` или переопределять его настройки.

| Флаг | Описание |
|---|---|
| `--target` | Целевая версия JS: `ES5`, `ES6`, `ES2020`, `ESNext` |
| `--module` | Система модулей: `commonjs`, `esm`, `esnext`, `umd` |
| `--outDir` | Директория для скомпилированных файлов |
| `--strict` | Включает все строгие проверки |
| `--watch` | Режим слежения, перекомпиляция при изменениях |
| `--noEmit` | Только проверка типов, без генерации файлов |
| `--declaration` | Генерировать `.d.ts`-файлы |
| `--sourceMap` | Генерировать `.map`-файлы для отладки |
| `--rootDir` | Корневая директория исходных файлов |
| `--lib` | Набор встроенных типов (`dom`, `es2020`, и т.д.) |

### Примеры использования флагов

```bash
# Компилировать в ES2020, модули CommonJS, вывод в dist/
npx tsc --target ES2020 --module commonjs --outDir dist

# Только проверить типы без генерации файлов (быстро, в CI)
npx tsc --noEmit

# Собрать и сгенерировать декларации
npx tsc --declaration --outDir dist

# Следить за изменениями + строгий режим
npx tsc --watch --strict
```

---

## tsconfig.json: ключевые поля

`tsconfig.json` — основной конфигурационный файл проекта. Создаётся командой `npx tsc --init`.

### Структура файла

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noEmit": false,
    "declaration": true,
    "declarationDir": "./dist/types",
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "lib": ["ES2020", "DOM"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"],
  "extends": "./tsconfig.base.json",
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" }
  ]
}
```

### compilerOptions — важнейшие опции

```json
{
  "compilerOptions": {
    // Целевая среда
    "target": "ES2020",            // Версия JS на выходе
    "lib": ["ES2020", "DOM"],      // Встроенные типы (не путать с target)
    "module": "ESNext",            // Формат модулей
    "moduleResolution": "bundler", // Как резолвить импорты

    // Строгость
    "strict": true,                // Включает: strictNullChecks, noImplicitAny и др.
    "noImplicitAny": true,         // Запрещать неявный any
    "strictNullChecks": true,      // null/undefined — отдельные типы
    "noUnusedLocals": true,        // Ошибка при неиспользуемых переменных

    // Вывод
    "outDir": "./dist",            // Куда складывать .js
    "rootDir": "./src",            // Откуда брать .ts
    "declaration": true,           // Генерировать .d.ts
    "sourceMap": true,             // Генерировать .map

    // Совместимость
    "esModuleInterop": true,       // Упрощённый импорт CJS-модулей
    "skipLibCheck": true           // Пропускать проверку .d.ts из node_modules
  }
}
```

### include / exclude

```json
{
  "include": [
    "src/**/*",        // Все файлы в src/ (рекурсивно)
    "types/**/*.d.ts"  // Кастомные декларации
  ],
  "exclude": [
    "node_modules",    // По умолчанию уже исключён
    "dist",
    "**/*.spec.ts",
    "**/*.test.ts"
  ]
}
```

> Если `include` не указан, компилируются все `.ts`-файлы в проекте (кроме `exclude`).

### extends — наследование конфигов

Позволяет создавать базовый конфиг и расширять его:

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

```json
// tsconfig.json (приложение)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json (для Node.js скриптов)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2018"
  }
}
```

---

## Как работает tsc под капотом

Компилятор проходит несколько чётких этапов:

### 1. Scanning (лексический анализ)

Исходный текст разбивается на **токены**: ключевые слова, идентификаторы, операторы, литералы.

```
const x: number = 42;
↓
[const] [x] [:] [number] [=] [42] [;]
```

### 2. Parsing (синтаксический анализ)

Из токенов строится **AST (Abstract Syntax Tree)** — дерево, отражающее синтаксическую структуру кода.

```typescript
// Исходный код
const add = (a: number, b: number): number => a + b;

// Упрощённый AST
VariableDeclaration
  └─ VariableDeclarator
       ├─ Identifier: "add"
       └─ ArrowFunctionExpression
            ├─ Parameters: [a: number, b: number]
            ├─ ReturnType: number
            └─ BinaryExpression: a + b
```

### 3. Type Binding

Компилятор связывает идентификаторы с их объявлениями — строит **Symbol Table** (таблицу символов). Каждый символ хранит информацию о типе, области видимости, объявлениях.

### 4. Type Checking (проверка типов)

Самый затратный этап. tsc обходит AST и для каждого узла:
- Выводит или проверяет тип
- Применяет правила совместимости типов
- Сообщает об ошибках

```typescript
// tsc найдёт ошибку на этом этапе
function double(x: number): number {
  return x * "2"; // TS2362: The left-hand side of an arithmetic operation
                  // must be of type 'any', 'number', 'bigint' or an enum type
}
```

### 5. Emit (генерация кода)

Если ошибок нет (или включён `noEmitOnError: false`), tsc генерирует:
- `.js` — скомпилированный JavaScript
- `.d.ts` — файлы деклараций (если `declaration: true`)
- `.js.map` — source maps (если `sourceMap: true`)

```
Parsing → Binding → Type Checking → Emit
   ↑                                  ↓
  .ts                           .js + .d.ts + .map
```

> `noEmit: true` позволяет остановить процесс после Type Checking — полезно для CI-проверок, когда генерацию выполняет Vite/esbuild.

---

## Declaration Files (.d.ts)

### Что это и зачем

`.d.ts`-файлы содержат **только описание типов** без реализации. Они нужны для:
- Предоставления типов при публикации npm-пакетов
- Подключения типов для JS-библиотек (например, `@types/lodash`)
- Описания глобального окружения (браузерные API, глобальные переменные)

```typescript
// src/math.ts — исходник с реализацией
export function add(a: number, b: number): number {
  return a + b;
}

export interface Vector2 {
  x: number;
  y: number;
}
```

```typescript
// dist/math.d.ts — сгенерированный файл деклараций
export declare function add(a: number, b: number): number;

export interface Vector2 {
  x: number;
  y: number;
}
```

### Генерация деклараций

```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "declarationMap": true
  }
}
```

### Ручное написание деклараций

Когда TypeScript не умеет сгенерировать типы автоматически (JS-библиотека без типов):

```typescript
// types/legacy-lib.d.ts
declare module "legacy-lib" {
  export function calculate(input: string): number;
  export const VERSION: string;
}

// Глобальные переменные (window.__APP_CONFIG__ и т.п.)
declare global {
  interface Window {
    __APP_CONFIG__: {
      apiUrl: string;
      version: string;
    };
  }
}
```

### Указание типов в package.json

```json
{
  "name": "my-package",
  "main": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

---

## Project References (монорепозитории)

### Проблема без references

В монорепозитории несколько пакетов зависят друг от друга. Без `references`:
- tsc перекомпилирует весь код при каждом изменении
- Нет инкрементальной сборки между пакетами
- Невозможно параллелизировать сборку

### Настройка Project References

```
monorepo/
├─ tsconfig.json          ← корневой конфиг
├─ packages/
│   ├─ core/
│   │   ├─ src/
│   │   └─ tsconfig.json
│   ├─ ui/
│   │   ├─ src/
│   │   └─ tsconfig.json
│   └─ app/
│       ├─ src/
│       └─ tsconfig.json
```

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,    // обязательно для referenced пакетов
    "declaration": true,  // обязательно
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

```json
// packages/ui/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../core" }  // зависит от core
  ],
  "include": ["src"]
}
```

```json
// packages/app/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist"
  },
  "references": [
    { "path": "../core" },
    { "path": "../ui" }
  ],
  "include": ["src"]
}
```

```json
// monorepo/tsconfig.json — корневой (для IDE и --build)
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/app" }
  ]
}
```

### Сборка с --build

```bash
# Сборка всего монорепозитория (с учётом зависимостей)
npx tsc --build

# Сборка конкретного пакета (и его зависимостей)
npx tsc --build packages/app

# Пересборка с нуля
npx tsc --build --force

# Проверка без генерации файлов
npx tsc --build --noEmit

# Режим слежения
npx tsc --build --watch
```

**Преимущества `--build`:**
- Инкрементальная сборка — перекомпилирует только изменившиеся пакеты
- Параллельная сборка независимых пакетов
- Кэширование через `.tsbuildinfo`-файлы

```json
// Опция для ускорения повторных сборок
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

---

## Полезные ссылки

- [Компилятор TypeScript: что важно знать — Frontend Stuff](https://frontend-stuff.com/blog/typescript-compiler/)
- [TSConfig Reference — TypeScript Docs](https://www.typescriptlang.org/tsconfig)
- [Project References — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [tsc CLI Options — TypeScript Docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)