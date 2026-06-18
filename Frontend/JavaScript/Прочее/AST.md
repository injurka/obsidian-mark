---
title: Abstract Syntax Tree (AST)
tags:
  - js
  - ast
  - compiler
  - babel
  - eslint
---

## Что такое AST и зачем он нужен

**Abstract Syntax Tree (AST)** — абстрактное синтаксическое дерево — это древовидное представление структуры исходного кода программы. Каждый узел дерева описывает конструкцию языка: переменную, вызов функции, оператор, выражение и т.д.

«Абстрактный» означает, что дерево не отражает все детали синтаксиса (скобки, точки с запятой, пробелы), а только **смысловую структуру** программы.

**Зачем нужен AST:**
- Движки JavaScript (V8, SpiderMonkey) используют AST как промежуточное представление перед генерацией байт-кода
- Инструменты вроде Babel, ESLint, Prettier работают исключительно через AST — они читают код, строят дерево, трансформируют его и выводят обратно в текст
- Позволяет писать codemods — автоматические рефакторинги кодовой базы

## Как JavaScript-движок строит AST

Процесс преобразования исходного текста в AST проходит два основных этапа:

### 1. Лексический анализ (Tokenization)

Исходный код разбивается на **токены** — минимальные смысловые единицы языка. Токен — это пара `(тип, значение)`.

```javascript
const x = 42 + 1;
```

Превращается в поток токенов:

```
[
  { type: 'Keyword',    value: 'const' },
  { type: 'Identifier', value: 'x'     },
  { type: 'Punctuator', value: '='     },
  { type: 'Numeric',    value: '42'    },
  { type: 'Punctuator', value: '+'     },
  { type: 'Numeric',    value: '1'     },
  { type: 'Punctuator', value: ';'     },
]
```

### 2. Синтаксический анализ (Parsing)

Парсер берёт поток токенов и строит из них дерево, применяя грамматику языка (ECMAScript specification). На выходе — объект AST в формате JSON.

```
Исходный код
    ↓  Lexer (токенизация)
Поток токенов
    ↓  Parser (парсинг)
AST (JSON-дерево)
    ↓  Дальнейшая обработка / кодогенерация
```

## Структура узла AST

Каждый узел AST имеет обязательное поле `type` и набор дочерних узлов, специфичных для этого типа. За стандарт де-факто принят формат [ESTree](https://github.com/estree/estree).

**Исходный код:**

```javascript
const x = 42 + 1;
```

**AST (упрощённо):**

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "kind": "const",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "x"
          },
          "init": {
            "type": "BinaryExpression",
            "operator": "+",
            "left": {
              "type": "NumericLiteral",
              "value": 42
            },
            "right": {
              "type": "NumericLiteral",
              "value": 1
            }
          }
        }
      ]
    }
  ]
}
```

**Ключевые типы узлов ESTree:**

| Тип узла | Что описывает |
|---|---|
| `Program` | Корень дерева, весь файл |
| `VariableDeclaration` | `var` / `let` / `const` |
| `FunctionDeclaration` | `function foo() {}` |
| `ArrowFunctionExpression` | `() => {}` |
| `CallExpression` | Вызов функции `foo()` |
| `BinaryExpression` | Бинарная операция `a + b` |
| `Identifier` | Имя переменной / функции |
| `Literal` | Литерал: строка, число, булево |
| `MemberExpression` | Доступ к свойству `obj.prop` |
| `ImportDeclaration` | `import x from '...'` |

## Применение AST в инструментах

### Babel

Babel использует AST для транспиляции современного JavaScript в совместимый со старыми браузерами код:

1. `@babel/parser` — парсит код в AST
2. Плагины трансформируют AST (например, заменяют стрелочные функции на обычные)
3. `@babel/generator` — генерирует код обратно из AST

### ESLint

ESLint обходит AST и проверяет каждый узел против набора правил. Правило — это объект с методами-обработчиками для определённых типов узлов:

```javascript
// Пример пользовательского правила ESLint
module.exports = {
  create(context) {
    return {
      // Срабатывает на каждый узел типа 'Identifier'
      Identifier(node) {
        if (node.name === 'eval') {
          context.report({ node, message: 'Использование eval запрещено' });
        }
      },
    };
  },
};
```

### Prettier

Prettier парсит код в AST, **полностью игнорирует** оригинальное форматирование и генерирует текст заново по собственным правилам — это и даёт 100% консистентный стиль.

### Codemods

Codemods — скрипты автоматического рефакторинга. Инструмент `jscodeshift` позволяет массово изменять кодовую базу через AST:

```javascript
// jscodeshift codemod: заменить require() на import
module.exports = function (fileInfo, api) {
  return api
    .jscodeshift(fileInfo.source)
    .find(api.jscodeshift.CallExpression, { callee: { name: 'require' } })
    .replaceWith((path) => {
      // логика замены
    })
    .toSource();
};
```

## Обход AST: паттерн Visitor

Стандартный способ работы с AST — паттерн **Visitor** («Посетитель»). Вместо ручного рекурсивного обхода вы описываете обработчики для конкретных типов узлов, а библиотека сама вызывает их при обходе.

### Обход через @babel/traverse

```javascript
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const code = `const hello = "world";`;

// 1. Парсим код в AST
const ast = parser.parse(code);

// 2. Обходим AST с помощью Visitor
traverse(ast, {
  // Вызывается при входе в каждый StringLiteral
  StringLiteral(path) {
    console.log('Найден строковый литерал:', path.node.value);
    // Заменяем строку на другую
    path.replaceWith(t.stringLiteral('AST is awesome!'));
  },
});

// 3. Генерируем код обратно
const output = generate(ast);
console.log(output.code);
// const hello = "AST is awesome!";
```

### Обход через acorn + acorn-walk

```javascript
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const code = `function greet(name) { return "Hello, " + name; }`;

// Парсим
const ast = acorn.parse(code, { ecmaVersion: 2020 });

// Обходим
walk.simple(ast, {
  FunctionDeclaration(node) {
    console.log('Функция:', node.id.name);
  },
  BinaryExpression(node) {
    console.log('Оператор:', node.operator);
  },
});
```

### Ключевые концепции при работе с path в Babel

```javascript
traverse(ast, {
  Identifier(path) {
    // path.node    — текущий узел AST
    // path.parent  — родительский узел
    // path.scope   — информация об области видимости
    // path.remove()         — удалить узел
    // path.replaceWith(node)— заменить узел
    // path.skip()           — не заходить в дочерние узлы
  },
});
```

## Инструменты для работы с AST

### AST Explorer

[astexplorer.net](https://astexplorer.net/) — онлайн-инструмент для интерактивного изучения AST. Поддерживает множество парсеров (acorn, @babel/parser, esprima, typescript и др.). Незаменим при написании плагинов и правил.

**Возможности:**
- Выделяешь фрагмент кода → подсвечивается соответствующий узел в AST
- Можно писать и тестировать трансформации прямо в браузере
- Поддерживает JavaScript, TypeScript, CSS, HTML, GraphQL и другие языки

### Популярные парсеры

| Парсер | Автор | Особенности |
|---|---|---|
| `acorn` | Marijn Haverbeke | Лёгкий, стандарт ESTree, основа для многих инструментов |
| `@babel/parser` (Babylon) | Babel team | Расширяет ESTree, поддерживает TypeScript, JSX, Flow |
| `esprima` | Ariya Hidayat | Один из первых парсеров, полная совместимость с ESTree |
| `@typescript-eslint/parser` | TypeScript ESLint | AST для TypeScript-кода |
| `meriyah` | — | Быстрый ESTree-совместимый парсер |

### Быстрый старт с acorn

```bash
npm install acorn acorn-walk
```

```javascript
import * as acorn from 'acorn';

const ast = acorn.parse('1 + 2', {
  ecmaVersion: 2022,   // версия ECMAScript
  sourceType: 'module' // 'module' или 'script'
});

console.log(JSON.stringify(ast, null, 2));
```

### Быстрый старт с @babel/parser

```bash
npm install @babel/parser @babel/traverse @babel/generator @babel/types
```

```javascript
import parser from '@babel/parser';

const ast = parser.parse(`import React from 'react';`, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'], // поддержка JSX и TS
});

console.log(ast.program.body[0].type); // ImportDeclaration
```

## Полезные ссылки
- #### [astexplorer](https://astexplorer.net/)
- #### [habr](https://habr.com/ru/companies/ruvds/articles/415269/)