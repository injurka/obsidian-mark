Необходимо распределить ответственности между классами так, чтобы обеспечить минимальную связанность.

> Самым ярким примером нарушения этого принципа, является циклическая зависимость

«Степень зацепления» — мера неотрывности элемента от других элементов (либо мера данных, имеющихся у него о них).

«Слабое» зацепление — распределение обязанностей и данных, обеспечивающее взаимную независимость классов. Класс со «слабым» зацеплением:

- Не зависит от внешних изменений;
- Прост для повторного использования.

Примеры, где `Low Coupling` **соблюдается**:

1. Можно создать класс `Order`, который зависит от класса `Product`, но не наоборот. Это позволяет изменять `Product` независимо от `Order`.

```ts
class Product {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    // ...
}

class Order {
    private product: Product;
    private quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    // ...
}
```

1. Можно создать класс `Logger`, который зависит от интерфейса `ILogger`, а не от конкретной реализации. Это позволяет легко заменить реализацию логгера без изменения других классов.

```ts
interface ILogger {
    log(message: string): void;
}

class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
}

class FileLogger implements ILogger {
    log(message: string): void {
        // ...
    }
}

class Service {
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    // ...
}
```

---

Примеры, где `Low Coupling` **нарушается**:

1. Можно создать класс `Order`, который зависит от класса `Product` и наоборот. Это нарушает принцип `Low Coupling`, так как изменения в одном классе могут повлиять на другой.

```ts
class Product {
    private name: string;
    private price: number;
    private orders: Order[];

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
        this.orders = [];
    }

    addOrder(order: Order) {
        this.orders.push(order);
    }

    // ...
}

class Order {
    private product: Product;
    private quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        product.addOrder(this);
    }

    // ...
}
```

1. Можно создать класс `Service`, который зависит от конкретной реализации логгера. Это нарушает принцип `Low Coupling`, так как изменения в логгере могут повлиять на `Service`.

```ts
class ConsoleLogger {
    log(message: string): void {
        console.log(message);
    }
}

class Service {
    private logger: ConsoleLogger;

    constructor() {
        this.logger = new ConsoleLogger();
    }

    // ...
}
```