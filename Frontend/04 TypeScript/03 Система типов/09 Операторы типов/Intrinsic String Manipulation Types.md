# Intrinsic String Manipulation Types

## Описание

> [!info] 
> Intrinsic String Manipulation Types (Встроенные типы для манипуляции строками) — это набор специальных утилит-типов (таких как `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`), реализованных внутри самого компилятора TypeScript для трансформации строковых литералов.

В отличие от большинства утилит-типов (типа `Partial` или `Pick`), которые можно реализовать обычным TypeScript кодом, эти типы встроены непосредственно в компилятор из соображений производительности. Они принимают на вход тип строкового литерала и возвращают измененный строковый литерал.

## Примеры использования

```typescript
type Greeting = "hello world";

type LoudGreeting = Uppercase<Greeting>; 
// "HELLO WORLD"

type QuietGreeting = Lowercase<LoudGreeting>; 
// "hello world"

type TitleGreeting = Capitalize<QuietGreeting>; 
// "Hello world"

type UncapGreeting = Uncapitalize<"TypeScript">; 
// "typeScript"

// Использование в связке с Template Literal Types
type APIEndpoints = "users" | "posts" | "comments";
type APIMethods = `fetch${Capitalize<APIEndpoints>}`;
// "fetchUsers" | "fetchPosts" | "fetchComments"
```

## Особенности и нюансы

- **intrinsic keyword**: Если вы посмотрите на их определение в `lib.es5.d.ts`, то увидите `type Uppercase<S extends string> = intrinsic;`. Это означает, что реализация находится в C++ коде компилятора TypeScript (или JavaScript, на котором он написан), а не в файле деклараций.
- **Реакция на non-string типы**: Эти утилиты принимают только типы, расширяющие `string`. Передача им числа или объекта приведет к ошибке компиляции.
- **Работа с Union**: Если передать в эти типы объединение строковых литералов, тип будет применен к каждому элементу объединения (благодаря Union Distribution).

## Связанные темы
- [[Карта знаний TypeScript]]
