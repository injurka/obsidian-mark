# Generic Type Aliases

## Описание

> [!info] 
> **Обобщенные псевдонимы типов (Generic Type Aliases)** — это псевдонимы типов (type aliases), определенные через ключевое слово `type`, которые принимают параметры типа. Это мощный инструмент для создания утилитарных типов, объединений (unions) и сложных трансформаций типов.

С помощью обобщенных `type` алиасов можно создавать переиспользуемые шаблоны типов, которые вычисляют новые типы на основе переданных параметров. Практически все встроенные Utility Types (например, `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`) реализованы именно как обобщенные алиасы.

## Примеры использования

```typescript
// 1. Обобщенный алиас для объединения
type Result<T, E> = 
  | { success: true; value: T }
  | { success: false; error: E };

const handleSuccess: Result<number, Error> = { success: true, value: 42 };
const handleError: Result<number, Error> = { success: false, error: new Error("Failed") };

// 2. Обертка (контейнер)
type Nullable<T> = T | null | undefined;

let username: Nullable<string> = null;

// 3. Более сложная трансформация типов
type Dictionary<T> = {
    [key: string]: T;
};

const users: Dictionary<{ name: string }> = {
    "user1": { name: "Alice" },
    "user2": { name: "Bob" }
};
```

## Особенности и нюансы

- В отличие от интерфейсов, обобщенные алиасы могут описывать примитивы, union-типы, tuple-типы и другие структуры, которые интерфейсам недоступны.
- Обобщенные алиасы нельзя рекурсивно объявлять с циклическими зависимостями напрямую в некоторых случаях (хотя современный TypeScript поддерживает большинство рекурсивных конструкций, например, `type Tree<T> = { value: T; children: Tree<T>[] }`).
- Параметры типа также могут иметь ограничения (`extends`) и значения по умолчанию (`= DefaultType`).

## Связанные темы
- [[Карта знаний TypeScript]]
