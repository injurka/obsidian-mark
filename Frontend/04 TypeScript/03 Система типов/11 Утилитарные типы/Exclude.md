# Exclude

## Описание

> [!info] Exclude<UnionType, ExcludedMembers>
> Утилитарный тип `Exclude<UnionType, ExcludedMembers>` создает новый тип, исключая из объединения (Union) `UnionType` все типы, которые могут быть присвоены `ExcludedMembers`.

Он решает проблему фильтрации объединений типов (Union Types). Часто применяется, когда у вас есть большой список возможных значений (строковых литералов или примитивов), и нужно получить подмножество, отбросив ненужные варианты.

## Примеры использования

```typescript
type Status = "idle" | "loading" | "success" | "error";

// Исключаем статусы ошибки и успеха
type ActiveStatus = Exclude<Status, "error" | "success">;
// type ActiveStatus = "idle" | "loading"
```

Исключение базовых типов:
```typescript
type StringOrNumberOrBoolean = string | number | boolean;

// Исключаем boolean
type StringOrNumber = Exclude<StringOrNumberOrBoolean, boolean>;
// type StringOrNumber = string | number
```

Пример с типами функций:
```typescript
type T0 = Exclude<string | number | (() => void), Function>;
// type T0 = string | number
```

## Особенности и нюансы

- **Только для объединений (Union Types)**: `Exclude` работает с объединениями типов (например, `A | B | C`). Он *не* исключает свойства из объектов (для этого используется `Omit`).
- **Как это работает под капотом**: `Exclude` реализован с помощью дистрибутивных условных типов (Distributive Conditional Types).
  ```typescript
  type Exclude<T, U> = T extends U ? never : T;
  ```
  Если `T` — это `A | B`, то TypeScript проверяет каждое составляющее объединения:
  - `A extends U ? never : A`
  - `B extends U ? never : B`
  Затем результаты объединяются. Тип `never` в объединениях игнорируется (`A | never` становится `A`).

## Связанные темы
- [[Карта знаний TypeScript]]
