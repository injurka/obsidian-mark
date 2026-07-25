# Discriminated Unions

## Описание

> [!info]
> Discriminated Unions (Размеченные объединения) — это паттерн в TypeScript, позволяющий безопасно работать с объединениями (Union types), используя общее свойство (дискриминатор) для определения конкретного типа в рантайме и во время компиляции.

Это один из самых важных и часто используемых паттернов для моделирования стейт-машин, событий, экшенов (например, в Redux) и результатов операций (Успех / Ошибка).

## Примеры использования

```typescript
// 1. Определение интерфейсов с общим полем-дискриминатором (часто type, kind, status)
interface Circle {
  kind: "circle"; // Дискриминатор
  radius: number;
}

interface Square {
  kind: "square"; // Дискриминатор
  sideLength: number;
}

// 2. Создание Union типа
type Shape = Circle | Square;

// 3. Использование в функции с сужением типа (Type Narrowing)
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      // TypeScript знает, что здесь shape - это Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      // TypeScript знает, что здесь shape - это Square
      return shape.sideLength ** 2;
  }
}
```

## Особенности и нюансы

- Поле-дискриминатор должно быть литеральным типом (строка, число, boolean).
- Уменьшает потребность в использовании Type Assertions (`as Type`) и Type Guards (`is Type`), делая код намного безопаснее.
- Идеально комбинируется с **Exhaustiveness Checking**, чтобы гарантировать обработку всех возможных вариантов.

## Связанные темы
- [[Карта знаний TypeScript]]
