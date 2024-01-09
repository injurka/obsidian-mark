`I` -  `Interface Segregation Principle` - принцип разделения интерфейсов. Данный принцип обозначает, что не нужно заставлять клиента (класс) реализовывать интерфейс, который не имеет к нему отношения.

Допустим у нас имеется интерфейс `Payments` и в нем есть три метода: оплата WebMoney, оплата банковской карточкой и оплата по номеру телефона.

```ts
interface Payments {
    payWebMoney(): void;
    payCreditCard(): void;
    payPhoneNumber(): void;
}
```

Далее нам надо реализовать два класса-сервиса, которые будут у себя реализовывать различные виды проведения оплат (класс `InternetPaymentService` и `TerminalPaymentService`). При этом `TerminalPaymentService` не будет поддерживать проведение оплат по номеру телефона. Но если мы оба класса имплементим от интерфейса `Payments`, то мы будем "заставлять" `TerminalPaymentService` реализовывать метод, который ему не нужен.

```ts
class InternetPaymentService implements Payments {
    payWebMoney(): void {
        //logic
    }

    payCreditCard(): void {
        //logic
    }

    payPhoneNumber(): void {
        //logic
    }
}
```

```ts
class TerminalPaymentService implements Payments {
    payWebMoney(): void {
        //logic
    }

    payCreditCard(): void {
        //logic
    }

    payPhoneNumber(): void {
        //???????
    }
}
```

Таким образом произойдет нарушение принципа разделения интерфейсов.

Для того чтобы этого не происходило необходимо разделить наш исходный интерфейс `Payments` на несколько и, создавая классы, имплементить в них только те интерфейсы с методами, которые им нужны.

```ts
interface WebMoneyPayment {
    payWebMoney(): void;
}

interface CreditCardPayment {
    payCreditCard(): void;
}

interface PhoneNumberPayment {
    payPhoneNumber(): void;
}

class InternetPaymentService implements WebMoneyPayment, CreditCardPayment, PhoneNumberPayment {
    payWebMoney(): void {
        //logic
    }

    payCreditCard(): void {
        //logic
    }

    payPhoneNumber(): void {
        //logic
    }
}

class TerminalPaymentService implements WebMoneyPayment, CreditCardPayment {
    payWebMoney(): void {
        //logic
    }

    payCreditCard(): void {
        //logic
    }
}
```

<br />
<hr />
<br />

Принцип разделения интерфейсов (`Interface Segregation Principle, ISP`) гласит, что клиенты не должны зависеть от интерфейсов, которые они не используют. В TypeScript принцип ISP можно реализовать с использованием различных паттернов, таких как:

- Адаптер (`Adapter`): Позволяет объектам с несовместимыми интерфейсами работать вместе. Можно создать адаптер, который реализует только необходимые методы интерфейса, чтобы клиентский код не зависел от неиспользуемых методов.

- Фасад (`Facade`): Предоставляет унифицированный интерфейс для набора интерфейсов в подсистеме. Можно использовать фасад для предоставления клиенту только необходимых методов, скрывая остальные.

### Adapter
```ts
// Пример с использованием паттерна Адаптер
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

class AllInOnePrinter implements Printer, Scanner {
  print(): void {
    console.log('Печать документа');
  }

  scan(): void {
    console.log('Сканирование документа');
  }
}

class PrinterAdapter implements Printer {
  private allInOnePrinter: AllInOnePrinter;

  constructor(allInOnePrinter: AllInOnePrinter) {
    this.allInOnePrinter = allInOnePrinter;
  }

  print(): void {
    this.allInOnePrinter.print();
  }
}

// Использование
const allInOnePrinter = new AllInOnePrinter();
const printer = new PrinterAdapter(allInOnePrinter);
printer.print();
```

### Facade
```ts
// Несколько сложных классов с различными интерфейсами
class SubsystemA {
  operationA(): string {
    return "Subsystem A: Ready!";
  }
}

class SubsystemB {
  operationB(): string {
    return "Subsystem B: Ready!";
  }
}

class SubsystemC {
  operationC(): string {
    return "Subsystem C: Ready!";
  }
}

// Фасад, предоставляющий унифицированный интерфейс для работы с подсистемой
class Facade {
  private subsystemA: SubsystemA;
  private subsystemB: SubsystemB;
  private subsystemC: SubsystemC;

  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
    this.subsystemC = new SubsystemC();
  }

  // Методы фасада, предоставляющие унифицированный интерфейс
  operation1(): string {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystemA.operationA();
    result += this.subsystemB.operationB();
    return result;
  }

  operation2(): string {
    let result = "Facade orders subsystems to perform the action:\n";
    result += this.subsystemB.operationB();
    result += this.subsystemC.operationC();
    return result;
  }
}

// Использование
const facade = new Facade();
console.log(facade.operation1());
console.log(facade.operation2());
```
