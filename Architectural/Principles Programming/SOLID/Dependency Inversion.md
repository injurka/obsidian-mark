`D` - `Dependency Inversion Principle` - принцип инверсии зависимостей. Модули верхнего уровня не должны зависеть от модулей нижнего уровня. И те, и другие должны зависеть от абстракции. Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.


Допустим мы пишем приложение для магазина и решаем вопросы с проведением оплат. Вначале это просто небольшой магазин, где оплата происходит только за наличные. Создаем класс `Cash` и класс `Shop`.

```ts
class Cash {
    doTransaction(amount: BigDecimal): void {
        //logic
    }
}

class Shop {
    private cash: Cash;

    constructor(cash: Cash) {
        this.cash = cash;
    }

    doPayment(order: Object, amount: BigDecimal): void {
        this.cash.doTransaction(amount);
    }
}
```

Вроде все хорошо, но мы уже нарушили принцип инверсии зависимостей, так как мы тесно связали оплату наличными к нашему магазину. И если в дальнейшем нам необходимо будет добавить оплату еще банковской картой и телефоном ("100% понадобится"), то нам придется переписывать и изменять много кода. Мы в нашем коде модуль верхнего уровня тесно связали с модулем нижнего уровня, а нужно чтобы оба уровня зависели от абстракции.

Поэтому создадим интерфейс `Payments`.

```ts
interface Payments {
    doTransaction(amount: BigDecimal): void;
}
```

Теперь все наши классы по оплате будут имплементить данный интерфейс.

```ts
class Cash implements Payments {
    doTransaction(amount: BigDecimal): void {
        //logic
    }
}

class BankCard implements Payments {
    doTransaction(amount: BigDecimal): void {
        //logic
    }
}

class PayByPhone implements Payments {
    doTransaction(amount: BigDecimal): void {
        //logic
    }
}
```

Теперь надо перепроектировать реализацию нашего магазина:

```ts
class Shop {
    private payments: Payments;

    constructor(payments: Payments) {
        this.payments = payments;
    }

    doPayment(order: Object, amount: BigDecimal): void {
        this.payments.doTransaction(amount);
    }
}
```

---

Принцип инверсии зависимостей (`Dependency Inversion Principle, DIP`) гласит, что модули верхнего уровня не должны зависеть от модулей нижнего уровня. Оба уровня должны зависеть от абстракций. Кроме того, абстракции не должны зависеть от деталей, а детали должны зависеть от абстракций.

Пример использования принципа `DIP` с помощью паттернов в TypeScript:

### Fabric method
```ts
// Абстракция
interface Logger {
  log(message: string): void;
}

// Реализация абстракции
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`Console log: ${message}`);
  }
}

// Реализация абстракции
class FileLogger implements Logger {
  log(message: string): void {
    // Логика записи в файл
    console.log(`File log: ${message}`);
  }
}

// Фабричный метод
class LoggerFactory {
  createLogger(): Logger {
    // Логика создания логгера
    return new ConsoleLogger();
  }
}

// Использование
const loggerFactory = new LoggerFactory();
const logger = loggerFactory.createLogger();
logger.log("Test message");
```

В этом примере класс `LoggerFactory` создает экземпляр конкретной реализации логгера (`ConsoleLogger`), но клиентский код зависит только от абстракции `Logger`, а не от конкретной реализации.


### Dependency injection

```ts
// Абстракция
interface Notifier {
  send(message: string): void;
}

// Реализация абстракции
class EmailNotifier implements Notifier {
  send(message: string): void {
    // Логика отправки почты
    console.log(`Sending email: ${message}`);
  }
}

// Реализация абстракции
class SMSNotifier implements Notifier {
  send(message: string): void {
    // Логика отправки SMS
    console.log(`Sending SMS: ${message}`);
  }
}

// Класс, использующий абстракцию
class NotificationService {
  private notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  notifyUser(message: string): void {
    this.notifier.send(message);
  }
}

// Использование
const emailNotifier = new EmailNotifier();
const notificationService = new NotificationService(emailNotifier);
notificationService.notifyUser("Test notification");
```

В этом примере класс `NotificationService` зависит от абстракции `Notifier`, и конкретная реализация (`EmailNotifier`) внедряется через конструктор, что позволяет легко заменить реализацию без изменения клиентского кода.
