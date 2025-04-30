`O` - `Open closed Principle` - принцип открытости-закрытости. Классы должны быть открыты для расширения, но закрыты для изменения.

```ts
class NotificationService {
    sendMessage(typeMessage: string, message: string): void {
        if (typeMessage === "email") {
            //write email
            //use JavaMailSenderAPI
        }
    }
}
```

Допустим нам необходимо кроме отправки сообщения по электронной почте отправлять еще смс сообщения. И мы можем дописать метод sendMessage таким образом:

```ts
class NotificationService {
    sendMessage(typeMessage: string, message: string): void {
        if (typeMessage === "email") {
            //write email
            //use JavaMailSenderAPI
        }
        if (typeMessage === "sms") {
            //write sms
            //send sms
        }
    }
}
```

Но в данном случае мы нарушим второй принцип, потому что класс должен быть закрыт для модификации, но открыт для расширения, а мы модифицируем (изменяем) метод.


Для того чтобы придерживаться принципа открытости-закрытости нам необходимо спроектировать наш код таким образом, чтобы каждый мог повторно использовать нашу функцию, просто расширив ее. Поэтому создадим интерфейс `NotificationService` и в нем поместим метод sendMessage.

```ts
interface NotificationService {
    sendMessage(message: string): void;
}
```

Далее создадим класс `EmailNotification`, который имплементит интерфейс `NotificationService` и реализует метод отправки сообщений по электронной почте.

```ts
class EmailNotification implements NotificationService {
    sendMessage(message: string): void {
        //write email
        //use JavaMailSenderAPI
    }
}
```

Создадим аналогично класс `MobileNotification`, который будет отвечать за отправку смс сообщений.

```ts
class MobileNotification implements NotificationService {
    sendMessage(message: string): void {
        //write sms
        //send sms
    }
}
```

Проектируя таким образом код мы не будем нарушать принцип открытости-закрытости, так как мы расширяем нашу функциональность, а не изменяем (модифицируем) наш класс.

---

Принцип open-close (открыт-закрыт) является одним из принципов SOLID и заключается в том, что программные сущности (классы, модули, функции и т. д.) должны быть открыты для расширения, но закрыты для модификации. Это означает, что поведение сущностей можно расширить без изменения их исходного кода.

В TypeScript принцип open-close можно реализовать с использованием различных паттернов, таких как:

- Стратегия (`Strategy`): Создание интерфейса, который определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми. Затем можно создать различные классы, реализующие этот интерфейс, и использовать их в основном классе без изменения его кода.

- Декоратор (`Decorator`): Позволяет добавлять новое поведение или функциональность существующим объектам без изменения их кода. В TypeScript можно использовать декораторы для добавления новых методов или свойств к существующим классам.

- Фабричный метод (`Factory Method`): Позволяет делегировать создание объектов подклассам. Это позволяет расширять классы без изменения их кода.

Пример использования принципа open-close с помощью паттернов в TypeScript:

### Strategy

```ts
// Пример с использованием паттерна Стратегия
interface SortStrategy {
  sort(data: number[]): number[];
}

class BubbleSortStrategy implements SortStrategy {
  sort(data: number[]): number[] {
    // Реализация сортировки пузырьком
    return data;
  }
}

class QuickSortStrategy implements SortStrategy {
  sort(data: number[]): number[] {
    // Реализация быстрой сортировки
    return data;
  }
}

class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sortData(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Использование
const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sorter = new Sorter(new BubbleSortStrategy());
console.log(sorter.sortData(data));
sorter.setStrategy(new QuickSortStrategy());
console.log(sorter.sortData(data));
```


### Decorator

```ts
// Интерфейс компонента
interface Coffee {
  cost(): number;
  description(): string;
}

// Реализация компонента
class SimpleCoffee implements Coffee {
  cost(): number {
    return 10;
  }

  description(): string {
    return "Простой кофе";
  }
}

// Декоратор
class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 5;
  }

  description(): string {
    return this.coffee.description() + ", с молоком";
  }
}

// Декоратор
class WhipDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 7;
  }

  description(): string {
    return this.coffee.description() + ", с взбитыми сливками";
  }
}

// Использование
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.description(), coffee.cost());

coffee = new MilkDecorator(coffee);
console.log(coffee.description(), coffee.cost());

coffee = new WhipDecorator(coffee);
console.log(coffee.description(), coffee.cost());
```

### Factory Method
```ts
// Интерфейс продукта
interface Product {
  operation(): string;
}

// Конкретная реализация продукта
class ConcreteProduct implements Product {
  operation(): string {
    return 'Результат работы ConcreteProduct';
  }
}

// Создатель
abstract class Creator {
  abstract factoryMethod(): Product;

  someOperation(): string {
    const product = this.factoryMethod();
    return `Создатель работает с ${product.operation()}`;
  }
}

// Конкретный создатель
class ConcreteCreator1 extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct();
  }
}

// Использование
const creator1 = new ConcreteCreator1();
console.log(creator1.someOperation());
```
