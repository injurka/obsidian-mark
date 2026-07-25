# typeof guard

## Описание

> [!info] 
> typeof Guard — это вид Type Guard, который использует встроенный JavaScript оператор `typeof` для сужения типов базовых примитивов (`string`, `number`, `boolean`, `symbol`, `bigint`, `object`, `function`, `undefined`).

TypeScript распознает проверки `typeof x === "..."` (или `!==`) как Type Guards. Это самый распространенный способ разделить логику для примитивных значений в Union-типах.

## Примеры использования

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // В этой ветке id гарантированно string
    console.log(`Your ID is: ${id.toUpperCase()}`);
  } else {
    // В этой ветке id гарантированно number
    console.log(`Your ID is: ${id.toFixed(2)}`);
  }
}
```

## Особенности и нюансы

- **Ловушка с `null`**: Историческая ошибка JavaScript состоит в том, что `typeof null === "object"`. Из-за этого `typeof x === "object"` не исключает возможность того, что `x` равно `null`. Всегда нужно проверять `x !== null` дополнительно.
- **Ограниченность**: `typeof` работает только с примитивами (и функциями). Он не поможет отличить один класс от другого или один интерфейс от другого. Для них используются `instanceof` или оператор `in`.
- **Массивы**: `typeof [] === "object"`. Чтобы проверить массив, используйте `Array.isArray(x)`.

## Связанные темы
- [[Карта знаний TypeScript]]
