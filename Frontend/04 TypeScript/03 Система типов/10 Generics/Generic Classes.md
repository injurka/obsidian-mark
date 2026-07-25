# Generic Classes

## Описание

> [!info] 
> **Обобщенные классы (Generic Classes)** — это классы, которые используют параметры типа, чтобы определять свойства и методы, работающие с различными типами данных, сохраняя при этом жесткую типизацию экземпляров.

Как и интерфейсы, классы могут быть обобщенными. Параметр типа задается в угловых скобках после имени класса. Это особенно полезно при написании структур данных (коллекций, деревьев, очередей, стеков) и базовых классов для API или репозиториев.

## Примеры использования

```typescript
// Обобщенный класс-коллекция (Стек)
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}

// Создаем стек для чисел
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
const num = numberStack.pop(); // number | undefined

// Создаем стек для строк
const stringStack = new Stack<string>();
stringStack.push("A");
// stringStack.push(1); // Ошибка типизации
```

## Особенности и нюансы

- **Только для экземплярных членов:** Статические члены класса (методы или свойства с модификатором `static`) не могут использовать параметры типа, объявленные на уровне класса. Класс-параметр относится к конкретному экземпляру, а статические члены принадлежат самому классу как объекту.
  ```typescript
  class MyClass<T> {
      static value: T; // Ошибка: Static members cannot reference class type parameters.
  }
  ```
- Можно применять ограничения (constraints) на параметры типа, чтобы класс мог работать только с типами, имеющими определенную структуру: `class DataManager<T extends HasId>`.

## Связанные темы
- [[Карта знаний TypeScript]]
