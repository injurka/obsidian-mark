# Union Distribution

## Описание

> [!info] 
> Union Distribution (Дистрибутивность объединений) — это поведение условных типов (Conditional Types) в TypeScript, при котором операция над типом-объединением (Union) применяется к каждому элементу этого объединения по отдельности, а результаты снова собираются в Union.

По умолчанию, когда вы передаете Union-тип (`A | B`) в обобщенный условный тип `T extends U ? X : Y`, TypeScript вычисляет это не как одно условие `(A | B) extends U`, а распределяет (distributes) его на `(A extends U ? X : Y) | (B extends U ? X : Y)`. 

## Примеры использования

```typescript
// Обобщенный условный тип
type ToArray<T> = T extends any ? T[] : never;

// Передаем Union type
type StrOrNumArray = ToArray<string | number>;
// Ожидание неопытного разработчика: (string | number)[]
// Реальность из-за Union Distribution: string[] | number[]

// Утилита Exclude работает именно на этом механизме
// type Exclude<T, U> = T extends U ? never : T;
type T0 = Exclude<"a" | "b" | "c", "a">;
// Разворачивается в: 
// ("a" extends "a" ? never : "a") | 
// ("b" extends "a" ? never : "b") | 
// ("c" extends "a" ? never : "c")
// Результат: never | "b" | "c" === "b" | "c"
```

## Особенности и нюансы

- **Отключение дистрибутивности**: Если вам нужно избежать этого поведения и проверить Union целиком, вы можете обернуть обе части условия в квадратные скобки (создать кортеж): 
  `type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;`
  `ToArrayNonDist<string | number>` вернет `(string | number)[]`.
- **Работает только с голыми параметрами типа**: Дистрибутивность срабатывает только тогда, когда проверяемый тип является "голым" параметром дженерика (naked type parameter), то есть просто `T`. Если он обернут в другой тип (например, `T[] extends ...` или `{ a: T } extends ...`), дистрибутивности не будет.
- **Работает только с `extends`**: Это поведение применимо исключительно к Conditional Types (оператор `extends` с `? :`).

## Связанные темы
- [[Карта знаний TypeScript]]
