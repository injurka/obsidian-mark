# Extract

## Описание

> [!info] Extract<Type, Union>
> Утилитарный тип `Extract<Type, Union>` создает тип путем извлечения из типа `Type` всех членов объединения (Union), которые могут быть присвоены типу `Union`. Является полной противоположностью `Exclude`.

Этот тип используется для "фильтрации" объединений. Например, если у вас есть общий тип со всеми возможными событиями, и вы хотите получить только те события, которые относятся к клику или наведению мыши, вы можете "извлечь" их в новый тип.

## Примеры использования

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// type T0 = "a"
```

Пример с функциями:
```typescript
type T1 = Extract<string | number | (() => void), Function>;
// type T1 = () => void
```

Практический пример:
```typescript
interface ClickEvent { type: "click"; x: number; y: number; }
interface HoverEvent { type: "hover"; element: string; }
interface KeydownEvent { type: "keydown"; key: string; }

type AllEvents = ClickEvent | HoverEvent | KeydownEvent;

// Оставляем только те события, у которых type либо 'click', либо 'hover'
type MouseEvents = Extract<AllEvents, { type: "click" | "hover" }>;
/* 
type MouseEvents = 
  | { type: "click"; x: number; y: number; }
  | { type: "hover"; element: string; }
*/
```

## Особенности и нюансы

- **Под капотом**: Как и `Exclude`, тип `Extract` работает на базе дистрибутивных условных типов (Distributive Conditional Types), но логика в нем обратная:
  ```typescript
  type Extract<T, U> = T extends U ? T : never;
  ```
  Если член объединения `T` расширяет (может быть присвоен) `U`, то он возвращается (`T`), иначе отбрасывается (`never`).

## Связанные темы
- [[Карта знаний TypeScript]]
