
## Что это?

Дженерики (обобщения) позволяют писать код (функции, классы, интерфейсы, типы), который может работать с *разными типами*, не теряя при этом информации о конкретном типе. Тип указывается как *параметр* (например, `<T>`).

## Зачем нужно?

*   **Повторное использование кода:** Написать одну функцию/класс, которая работает с любым типом, вместо дублирования кода.
*   **Типобезопасность:** Сохранить строгую типизацию, избегая `any`. Дженерик "запоминает" конкретный тип, с которым он используется.

## Как работает?

*   Тип-параметр (`<T>`) объявляется при определении функции/класса/интерфейса/типа.
*   При использовании можно явно указать тип (`<string>`) или позволить TypeScript *вывести* его из контекста (аргументов, присвоений).
*   Можно накладывать *ограничения* (constraints) на тип-параметр с помощью `extends`, чтобы гарантировать наличие определенных свойств или методов (`<T extends SomeInterface>`).

## Примеры:

```typescript
// Дженерик функция identity
function identity<T>(arg: T): T {
  return arg;
}
let outputStr = identity<string>("myString"); // Явно указали T = string
let outputNum = identity(123);          // TS вывел T = number

// Дженерик интерфейс
interface Result<Data> {
  success: boolean;
  data: Data | null;
  error?: string;
}
let userResult: Result<User> = { success: true, data: user1 };

// Дженерик класс
class DataStorage<T> {
  private data: T[] = [];
  addItem(item: T): void { this.data.push(item); }
  getItems(): T[] { return this.data; }
}
const stringStorage = new DataStorage<string>();
stringStorage.addItem("Hello");

// Дженерик с ограничением
interface Lengthwise { length: number; }
function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}
logLength("hello"); // OK
logLength([1, 2, 3]); // OK
// logLength(123); // Ошибка: number не имеет свойства length
```
