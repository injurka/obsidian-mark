# Discriminant Property

## Описание

> [!info] 
> Discriminant Property (дискриминантное свойство) — это общее литеральное свойство (обычно строковое), присутствующее в каждом типе внутри Union. Оно используется для однозначного различения (сужения) этих типов.

Этот паттерн часто называют Discriminated Unions или Tagged Unions. В TypeScript это лучший способ моделирования состояний или различных структур данных, которые могут быть представлены одной переменной. Проверяя значение этого общего свойства, TypeScript может безопасно сузить тип до нужного интерфейса.

## Примеры использования

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  // 'kind' выступает в роли Discriminant Property
  switch (shape.kind) {
    case "circle":
      // Здесь shape - это Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      // Здесь shape - это Square
      return shape.sideLength ** 2;
  }
}
```

## Особенности и нюансы

- **Масштабируемость**: При добавлении нового типа в Discriminated Union (например, `Triangle`) TypeScript подскажет, в каких `switch/case` он не был обработан (с использованием паттерна Exhaustiveness checking).
- **Свойство должно быть литералом**: Чтобы это работало, дискриминантное свойство должно иметь специфический литеральный тип (например, `"circle"`), а не просто общий `string`.
- **Поддержка Redux/Flux**: Этот паттерн повсеместно используется в экосистеме React/Redux, где объекты действий (`actions`) имеют свойство `type` (например, `{ type: 'ADD_TODO', payload: ... }`).

## Связанные темы
- [[Карта знаний TypeScript]]
