## Что это?

Псевдонимы типов позволяют дать пользовательское имя *любому* типу (примитиву, объекту, объединению, пересечению, кортежу, типу функции, дженерику и т.д.). Используется ключевое слово `type`.

## Зачем нужно?

*   **Улучшение читаемости:** Дать понятное имя сложному типу (`string | number | undefined` можно назвать `NullableID`).
*   **Повторное использование:** Определить тип один раз и использовать его во многих местах.
*   **Упрощение рефакторинга:** Изменить определение типа в одном месте, и оно обновится везде.

## Как работает?

*   `type` создает *псевдоним*, а не новый отдельный тип. Он просто ссылается на существующую структуру типа.
*   Может использоваться с дженериками.

## Примеры:

```typescript
// Псевдоним для примитива
type MyString = string;
let message: MyString = "hello";

// Псевдоним для объединения
type ID = string | number;
let currentId: ID = "abc";
currentId = 123;

// Псевдоним для объектного типа
type Point = {
  x: number;
  y: number;
};
let p1: Point = { x: 10, y: 20 };

// Псевдоним для типа функции
type StringProcessor = (input: string) => string;
const upperCaseProcessor: StringProcessor = (s) => s.toUpperCase();

// Псевдоним с дженериком
type Container<T> = { value: T };
let stringContainer: Container<string> = { value: "test" };
let numberContainer: Container<number> = { value: 42 };
```
