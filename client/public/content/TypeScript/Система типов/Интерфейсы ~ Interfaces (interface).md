
## Что это?

Интерфейсы — это еще один способ определить "форму" или "контракт" объекта: какие свойства и методы он должен иметь. Также могут описывать типы функций и структуру классов. Используется ключевое слово `interface`.

## Зачем нужно?

*   Определять контракты для объектов, особенно для API.
*   Определять требования, которым должны соответствовать классы (с помощью `implements`).
*   Использовать наследование (`extends`) для построения иерархии типов.
*   Использовать декларативное слияние (Declaration Merging) для расширения интерфейсов.

## Как работает?

*   Описывают структуру объекта (поля, методы, модификаторы `readonly`, `?`).
*   Могут наследоваться от других интерфейсов с помощью `extends`.
*   Классы могут реализовывать интерфейсы с помощью `implements`.
*   Поддерживают декларативное слияние: несколько объявлений `interface` с одинаковым именем объединяются в одно.
*   Могут описывать типы функций.
*   Основное отличие от `type` — возможность слияния объявлений и более тесная связь с концепциями ООП (наследование, реализация).

## Примеры:

```typescript
// Описание формы объекта
interface User {
  readonly id: number; // Свойство только для чтения
  name: string;
  age?: number; // Необязательное свойство
  greet(): string; // Метод
}

let user1: User = {
  id: 1,
  name: "Alice",
  greet() { return `Hello, I am ${this.name}`; }
};
// user1.id = 2; // Ошибка: read-only property

// Наследование интерфейсов
interface Admin extends User {
  permissions: string[];
}
let admin1: Admin = { /* ... */ };

// Реализация интерфейса классом
class RegisteredUser implements User {
  readonly id: number;
  name: string;
  constructor(id: number, name: string) { /* ... */ }
  greet() { return `Registered user: ${this.name}`; }
}

// Декларативное слияние
interface Window { myCustomProperty: string; }
interface Window { anotherProperty: number; }
// window.myCustomProperty = "hello"; // OK
// window.anotherProperty = 123; // OK

// Описание типа функции
interface StringFormat {
    (str: string, isUpper: boolean): string;
}
let format: StringFormat = (str, isUpper) => isUpper ? str.toUpperCase() : str.toLowerCase();
```
