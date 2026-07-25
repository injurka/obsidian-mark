# Widening и Narrowing

## Описание

> [!info] 
> Widening (Расширение) и Narrowing (Сужение) — два противоположных процесса, с помощью которых TypeScript управляет типами в зависимости от контекста и потока выполнения.

**Widening** происходит, когда TypeScript автоматически выводит более общий тип (например, `string` вместо строкового литерала `"hello"`).
**Narrowing** происходит, когда вы используете проверки в коде (type guards), чтобы сузить широкий тип (например, `string | number`) до более конкретного (`string`).

## Widening (Расширение)

Когда вы объявляете переменную с помощью `let` или `var`, TypeScript предполагает, что её значение может измениться в будущем.

```typescript
// Type is `string` (widened), не "hello"
let message = "hello";

// Type is "hello" (literal type, no widening), так как `const` не может быть изменен
const greeting = "hello";
```

## Narrowing (Сужение)

TypeScript анализирует поток управления (Control Flow Analysis) и сужает типы на основе условий (if/else, switch).

### Type Guards (Защитники типа)

- **`typeof`**:
  ```typescript
  function printId(id: number | string) {
    if (typeof id === "string") {
      // id имеет тип string
      console.log(id.toUpperCase());
    } else {
      // id имеет тип number
      console.log(id.toFixed(2));
    }
  }
  ```
- **`instanceof`**: Проверка классов или объектов.
- **`in`**: Проверка наличия свойства в объекте.
- **Custom Type Guards (Пользовательские защитники):** Функции, возвращающие предикат типа `arg is Type`.

```typescript
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

## Особенности и нюансы
- `as const` можно использовать, чтобы предотвратить Widening при создании литералов объектов и массивов.

## Связанные темы
- [[Карта знаний TypeScript]]
