См. также: Посредник (шаблон проектирования)

Слабое зацепление между элементами системы (и возможность повторного использования) обеспечивается назначением промежуточного объекта их посредником.

Пример: В архитектуре Model-View-Controller, контроллер (англ. controller) ослабляет зацепление данных (англ. model) за их представление (англ. view).

Примеры, где `Indirection` **соблюдается**:

1. Вызов метода объекта через посредника:

```ts
class RealObject {
    public operation(): void {
        console.log('RealObject operation');
    }
}

class Indirection {
    private realObject: RealObject;

    constructor() {
        this.realObject = new RealObject();
    }

    public operation(): void {
        this.realObject.operation();
    }
}

const indirection = new Indirection();
indirection.operation(); // RealObject operation
```

1. Использование посредника для доступа к данным:

```ts
class Data {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }
}

class Indirection {
    private data: Data;

    constructor(value: string) {
        this.data = new Data(value);
    }

    public getValue(): string {
        return this.data.getValue();
    }
}

const indirection = new Indirection('Hello, world!');
console.log(indirection.getValue()); // Hello, world!
```

---

Примеры, где `Indirection` **нарушается**:

1. Непосредственное взаимодействие объектов:

```ts
class ObjectA {
    public operation(): void {
        console.log('ObjectA operation');
    }
}

class ObjectB {
    private objectA: ObjectA;

    constructor() {
        this.objectA = new ObjectA();
    }

    public operation(): void {
        this.objectA.operation();
    }
}

const objectB = new ObjectB();
objectB.operation(); // ObjectA operation
```

1. Неправильное использование посредника:

```ts
class Data {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }
}

class NoIndirection {
    private data: Data;

    constructor(value: string) {
        this.data = new Data(value);
    }

    public getValue(): string {
        return this.data.getValue();
    }
}

const noIndirection = new NoIndirection('Hello, world!');
console.log(noIndirection.getValue()); // Hello, world!
```

В этом примере `NoIndirection` не использует посредника для доступа к данным, что нарушает принцип `Indirection`.