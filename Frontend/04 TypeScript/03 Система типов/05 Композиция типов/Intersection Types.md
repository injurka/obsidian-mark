## Что это?

Тип пересечения комбинирует несколько типов в один. Переменная типа `A & B` должна иметь *все* свойства и методы как типа `A`, так и типа `B`. Используется символ `&` (амперсанд).

## Зачем нужно?

Для создания новых типов путем объединения характеристик существующих. Часто используется для "миксинов" (mixins) или для комбинирования нескольких интерфейсов в один сложный контракт.

## Как работает?

*   Значение типа `A & B` должно быть совместимо *одновременно* и с `A`, и с `B`.
*   Если пересекаются объектные типы, результирующий тип будет иметь все свойства из обоих типов. Если есть свойства с одинаковым именем, их типы также должны быть совместимы (или пересекаться, если они сами являются объектами).
*   Пересечение примитивных типов (например, `string & number`) обычно приводит к типу `never`, так как значение не может быть одновременно и строкой, и числом.

## Примеры:

```typescript
interface Clickable {
  click(): void;
}

interface Focusable {
  focus(): void;
}

// Тип InteractiveWidget должен реализовывать и Clickable, и Focusable
type InteractiveWidget = Clickable & Focusable;

let button: InteractiveWidget = {
  click() { console.log("Clicked!"); },
  focus() { console.log("Focused!"); }
};

button.click();
button.focus();

// Комбинирование свойств
interface HasName { name: string; }
interface HasAge { age: number; }

type Person = HasName & HasAge;

let person: Person = {
  name: "Bob",
  age: 30
};

// Пересечение с примитивом (редко полезно, часто => never)
type Impossible = string & number; // Тип Impossible равен never
// let imp: Impossible = "hello"; // Ошибка
```
