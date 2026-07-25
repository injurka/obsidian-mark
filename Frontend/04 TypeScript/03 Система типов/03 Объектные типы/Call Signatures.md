# Call Signatures

## Описание

> [!info] 
> **Call Signatures (сигнатуры вызова)** — это синтаксис в TypeScript для описания функций (их параметров и возвращаемого значения) в виде свойств объекта или внутри интерфейсов/алиасов типов.

В JavaScript функции — это объекты, поэтому они могут иметь собственные свойства. Call Signatures позволяют типизировать не только то, как функция должна быть вызвана, но и какие дополнительные свойства на ней могут висеть. Это основное отличие от обычного типа функции (стрелочного синтаксиса `(args) => Type`).

## Примеры использования

```typescript
// Описание с помощью Type Alias (стрелочный синтаксис)
type SimpleLog = (message: string) => void;

// Описание с помощью Call Signature в интерфейсе
interface DescribableFunction {
  description: string;           // Обычное свойство
  (someArg: number): boolean;    // Call Signature
}

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// Реализация
const myFunc = (x: number) => x > 3;
myFunc.description = "Function that checks if number is greater than 3";

doSomething(myFunc);
```

## Особенности и нюансы

- **Синтаксис**: Call Signature использует двоеточие `:` для указания возвращаемого типа (как при описании методов), в отличие от `=>` в типах функций (Function Type Expressions).
  ```typescript
  // Call Signature
  type CallSig = { (a: number): string };
  // Function Type Expression
  type FuncType = (a: number) => string;
  ```
- **Перегрузка функций (Function Overloads)**: С помощью Call Signatures внутри интерфейса или типа можно описывать перегрузки — когда функция может принимать разные наборы аргументов и возвращать разные типы.
  ```typescript
  interface OverloadedFunction {
    (x: number): number;
    (x: string): string;
    (x: number, y: number): number;
  }
  ```
- **Функции с состоянием или свойствами**: Идеально подходит для типизации функций, которые используются как объекты (например, `jQuery` или `React` компоненты, имеющие статические свойства вроде `propTypes` или `defaultProps`).
- **Construct Signatures**: Похожая концепция, но с ключевым словом `new`, используется для типизации классов или функций-конструкторов (т.е. того, что вызывается через `new`).
  ```typescript
  interface CallOrConstruct {
    new (s: string): Date; // Construct signature
    (n?: number): number;  // Call signature
  }
  ```

## Связанные темы
- [[Карта знаний TypeScript]]
