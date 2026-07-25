# Классы в JavaScript

## Описание

> [!info] 
> Классы — это синтаксический сахар над прототипным наследованием JavaScript, представляющий собой шаблон для создания объектов с заранее заданными свойствами и методами.

Классы были введены в ES6 для более удобного и привычного объектно-ориентированного программирования. В TypeScript классы дополнительно поддерживают модификаторы доступа (`public`, `private`, `protected`), абстрактные классы, интерфейсы, readonly-свойства и строгую типизацию полей и методов.

## Примеры использования

```typescript
// Определение интерфейса
interface IAnimal {
  makeSound(): void;
}

// Абстрактный класс
abstract class Animal implements IAnimal {
  // readonly свойство
  public readonly name: string;
  // protected свойство, доступно в наследниках
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Абстрактный метод
  abstract makeSound(): void;

  public getAge(): number {
    return this.age;
  }
}

// Наследование
class Dog extends Animal {
  // private свойство, доступно только внутри Dog
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age); // Вызов конструктора родителя
    this.breed = breed;
  }

  public makeSound(): void {
    console.log(`${this.name} says Woof!`);
  }

  public getInfo(): string {
    return `Breed: ${this.breed}, Age: ${this.age}`; // Доступ к protected age
  }
}

const myDog = new Dog("Buddy", 3, "Golden Retriever");
myDog.makeSound(); // Buddy says Woof!
```

## Особенности и нюансы

- В TypeScript существуют модификаторы `private` и `protected`, но они существуют только на этапе компиляции (TypeScript). В скомпилированном JavaScript они исчезают, если не использовать синтаксис приватных полей JS (`#fieldName`).
- Parameter properties (свойства-параметры) в конструкторе (`constructor(public name: string) {}`) позволяют автоматически создавать и инициализировать свойства.
- Абстрактные классы не могут быть инстанцированы (`new Animal()` вызовет ошибку).
- TypeScript позволяет классам реализовывать (implements) интерфейсы, что обеспечивает выполнение контракта.

## Связанные темы
- [[Карта знаний TypeScript]]
