
Позволяет создавать объекты на основе уже ранее созданных объектов-прототипов. То есть по сути данный паттерн предлагает технику клонирования объектов.

### Когда использовать?

- Когда конкретный тип создаваемого объекта должен определяться динамически во время выполнения

- Когда нежелательно создание отдельной иерархии классов фабрик для создания объектов-продуктов из параллельной иерархии классов (как это делается, например, при использовании паттерна Абстрактная фабрика)

- Когда клонирование объекта является более предпочтительным вариантом нежели его создание и инициализация с помощью конструктора. Особенно когда известно, что объект может принимать небольшое ограниченное число возможных состояний.

<hr />

### Пример реализации

```ts
abstract class Prototype {
  public abstract clone(): Prototype
}

// Пример класса, который будет использоваться в качестве прототипа
class ConcretePrototype extends Prototype {
  public property1: string;
  public property2: number;

  public clone() {
    const clone = Object.create(this);

    clone.property1 = this.property1;
    clone.property2 = this.property2;
    
    return clone;
  }
}

// Пример использования
const prototype = new ConcretePrototype();
prototype.property1 = "abc";
prototype.property2 = 123;

// Создание нового объекта на основе прототипа
const newObject = prototype.clone();
console.log(newObject.property1); // Вывод: "abc"
console.log(newObject.property2); // Вывод: 123
```