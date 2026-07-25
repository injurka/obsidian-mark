# Const Type Parameters

## Описание

> [!info]
> `const` type parameters (параметры типов с модификатором `const`) — это фича TypeScript (добавлена в v5.0), которая позволяет функциям выводить более узкие, неизменяемые типы для generic аргументов, аналогично тому, как действует `as const`.

При передаче объекта или массива в обычную generic функцию TypeScript часто расширяет (widens) типы строковых литералов до `string` и типы массивов до `Type[]`. Добавление модификатора `const` к параметру типа `<const T>` заставляет TypeScript выводить типы максимально строго.

## Примеры использования

```typescript
// Без const type parameter:
function getNames<T>(names: T): T { return names; }
const result1 = getNames(["Alice", "Bob"]); 
// Тип result1: string[]

// С const type parameter:
function getNamesStrict<const T>(names: T): T { return names; }
const result2 = getNamesStrict(["Alice", "Bob"]);
// Тип result2: readonly ["Alice", "Bob"]
```

## Особенности и нюансы

- Это избавляет от необходимости требовать от пользователей API писать `as const` при вызове функции (например, `myFunc(["a", "b"] as const)`).
- Модификатор применяется только при инференсе (выводе типов).
- Смягчает проблему с массивами: теперь они корректно выводятся как кортежи, а не расширяются.
- Если функция должна возвращать что-то мутируемое, `const` параметры типа использовать не следует, так как они выводят readonly-структуры.

## Связанные темы
- [[Карта знаний TypeScript]]
