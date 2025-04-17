Higher-Order Generics (генераторы высшего порядка) — это продвинутая техника в TypeScript, которая позволяет создавать обобщенные типы или функции, которые сами принимают или возвращают другие обобщенные типы или функции. Это мощный инструмент для создания сложных и гибких типов, которые могут адаптироваться к различным сценариям.

Higher-Order Generics — которые работают с другими Generics. Они позволяют создавать функции или типы, которые:
- Принимают Generics как аргументы.
- Возвращают Generics как результат.

Это похоже на функции высшего порядка в JavaScript, где функции могут принимать другие функции как аргументы или возвращать их.

## Примеры Higher-Order Generics

### Пример 1: Функция, возвращающая Generics

```typescript
function createArray<T>(value: T): T[] {
    return [value];
}

let stringArray = createArray<string>("Hello"); // Тип: string[]
let numberArray = createArray<number>(42);      // Тип: number[]
```

Здесь `createArray` — это функция, которая возвращает массив типа `T`. Это простой пример Generics, но он демонстрирует идею.

### Пример 2: Higher-Order Generics с функциями

```typescript
function higherOrderFunction<T>(value: T): () => T {
    return () => value;
}

let getString = higherOrderFunction<string>("Hello"); // Тип: () => string
let getNumber = higherOrderFunction<number>(42);      // Тип: () => number

console.log(getString()); // "Hello"
console.log(getNumber()); // 42
```

Здесь `higherOrderFunction` возвращает функцию, которая возвращает значение типа `T`.


