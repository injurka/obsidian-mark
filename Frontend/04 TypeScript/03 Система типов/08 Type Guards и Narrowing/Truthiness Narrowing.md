# Truthiness Narrowing

## Описание

> [!info] 
> Truthiness Narrowing — это процесс сужения типов на основе проверки значения на "истинность" (truthiness) в JavaScript, например, в условиях `if (x)` или `x && y`.

В JavaScript значения `0`, `NaN`, `""` (пустая строка), `0n`, `null`, `undefined` и `false` являются ложными (falsy). Все остальные — истинными. TypeScript знает об этом и способен удалять `null`, `undefined` и литеральные falsy типы из Union-типов, когда переменная проверяется в булевом контексте.

## Примеры использования

```typescript
function printName(name: string | null | undefined) {
  if (name) {
    // В этой ветке name точно не null, не undefined и не ""
    console.log(name.toUpperCase());
  }
}

function multiplyAll(values: number[] | undefined, factor: number) {
  if (!values) {
    // Если values === undefined (или null/пустая строка, которых тут нет в типе)
    return values;
  }
  // Здесь values гарантированно number[]
  return values.map(x => x * factor);
}
```

## Особенности и нюансы

- **Случайное отсечение валидных значений**: Частая ошибка! Если переменная имеет тип `string | undefined`, проверка `if (str)` отсечет не только `undefined`, но и пустую строку `""`. Если пустая строка является валидным значением вашей бизнес-логики, лучше использовать явную проверку `if (str !== undefined)`.
- **Булевы приведения**: То же самое касается проверки `Boolean(x)` или `!!x`. TypeScript корректно обрабатывает их как Truthiness Narrowing.
- **Удобство**: Это самый быстрый и распространенный способ убедиться в наличии объекта перед доступом к его свойствам.

## Связанные темы
- [[Карта знаний TypeScript]]
