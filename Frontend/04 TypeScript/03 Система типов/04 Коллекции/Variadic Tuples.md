# Variadic Tuples

## Описание

> [!info]
> Вариативные типы кортежей (Variadic Tuple Types) позволяют использовать generic-параметры с оператором spread (`...`) внутри других кортежей, сохраняя при этом информацию о типах.

Это продвинутая функциональность, которая позволяет писать сложные функции высшего порядка (например, `concat`, `bind`, `call`), которые могут комбинировать кортежи неизвестной длины и типов, сохраняя строгую типизацию результата.

## Примеры использования

```typescript
// Соединение двух кортежей
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type TupleA = [string, number];
type TupleB = [boolean];
type ResultTuple = Concat<TupleA, TupleB>; 
// ResultTuple вычисляется как [string, number, boolean]

// Функция высшего порядка
function tail<T extends unknown[]>(arr: readonly [unknown, ...T]): T {
  const [_ignored, ...rest] = arr;
  return rest;
}

const myTuple = [1, "two", true] as const;
const myTail = tail(myTuple); 
// Тип myTail вычисляется как readonly ["two", true]
```

## Особенности и нюансы

- До TypeScript 4.0 использование `...T` (где T - generic параметр) было возможно только в конце кортежа или списка аргументов функции. Теперь spread может находиться где угодно.
- Если спредится массив (`number[]`) вместо кортежа, результирующий кортеж становится массивом переменной длины.
- Это фундаментальный инструмент для создания сложных утилит-типов и типизации библиотек, работающих с аргументами функций динамически.

## Связанные темы
- [[Карта знаний TypeScript]]
