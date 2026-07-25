# Exhaustiveness Checking

## Описание

> [!info]
> Exhaustiveness Checking (Проверка на полноту) — это методика использования системы типов TypeScript для гарантии того, что вы обработали все возможные варианты в структуре вроде `switch` для Union типа (обычно Discriminated Union).

Если в будущем в Union будет добавлен новый вариант, компилятор TypeScript выдаст ошибку в том месте кода, где вы забыли его обработать.

## Примеры использования

```typescript
type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };

// Специальная функция-помощник, которая принимает тип never
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      // Если мы добавим { kind: "triangle" } в Shape, 
      // то TypeScript выдаст ошибку здесь, так как shape не сузился до never!
      return assertNever(shape); 
  }
}
```

## Особенности и нюансы

- **Функция `assertNever`:** Классический паттерн. Если все `case` обработаны, переменная в `default` блоке будет иметь тип `never`. Если мы добавим новый вариант, переменная не сузится до `never`, и функция выдаст ошибку компиляции.
- В TypeScript 4.x и выше можно также полагаться на неявный возврат `undefined` при включенной опции `noImplicitReturns`, но паттерн с `never` считается более надежным и самодокументируемым.
- Крайне важно использовать Exhaustiveness Checking в больших приложениях с Discriminated Unions, чтобы избежать багов при рефакторинге и расширении моделей.

## Связанные темы
- [[Карта знаний TypeScript]]
