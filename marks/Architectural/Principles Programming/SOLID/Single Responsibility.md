`S` - `Single Responsibility Principle` - принцип единственной ответственности. Каждый класс должен иметь только одну зону ответственности.

Допустим у нас есть класс RentCarService и в нем есть несколько методов: найти машину по номеру, забронировать машину, распечатать заказ, получить информацию о машине, отправить сообщение.

```ts
class RentCarService {
    findCar(carNo: string): Car {
        //find car by number
        return car;
    }

    orderCar(carNo: string, client: Client): Order {
        //client order car
        return order;
    }

    printOrder(order: Order): void {
        //print order
    }

    getCarInterestInfo(carType: string): void {
        if (carType === "sedan") {
            //do some job
        }
        if (carType === "pickup") {
            //do some job
        }
        if (carType === "van") {
            //do some job
        }
    }

    sendMessage(typeMessage: string, message: string): void {
        if (typeMessage === "email") {
            //write email
            //use JavaMailSenderAPI
        }
    }
}
```

У данного класса есть несколько зон ответственности, что является нарушением первого принципа. Возьмем метод получения информации об машине. Теперь у нас есть только три типа машин sedan, pickup и van, но если Заказчик захочет добавить еще несколько типов, тогда придется изменять и дописывать данный метод.

Или возьмем метод отправки сообщения. Если кроме отправки сообщения по электронной почте необходимо будет добавить отправку смс, то также необходимо будет изменять данный метод.

Одним словом, данный класс нарушает принцип единой ответственности, так как отвечает за разные действия.

Необходимо разделить данный класс `RentCarService` на несколько, и тем самым, следуя принципу единой ответственности, предоставить каждому классу отвечать только за одну зону или действие, так в дальнейшем его будет проще дополнять и модифицировать.

Необходимо создать класс `PrinterService` и вынести там функционал по печати.

```ts
class PrinterService {
    printOrder(order: Order): void {
        //print order
    }
}
```

Аналогично работа связанная с поиском информации о машине перенести в класс `CarInfoService`.

```ts
class CarInfoService {
    getCarInterestInfo(carType: string): void {
        if (carType === "sedan") {
            //do some job
        }
        if (carType === "pickup") {
            //do some job
        }
        if (carType === "van") {
            //do some job
        }
    }
}
```

Метод по отправке сообщений перенести в класс `NotificationService`.
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

А метод поиска машины в `CarService`.
```ts
class CarService {
    findCar(carNo: string): Car {
        //find car by number
        return car;
    }
}
```

И в классе `RentCarService` останется только один метод.

```ts
class RentCarService {
    orderCar(carNo: string, client: Client): Order {
        //client order car
        return order;
    }
}
```
Теперь каждый класс несет ответственность только за одну зону и есть только одна причина для его изменения.

Принцип подстановки Лисков (`Liskov Substitution Principle, LSP`) гласит, что объекты должны быть заменяемыми своими подтипами без изменения свойств программы. В TypeScript принцип `LSP` можно продемонстрировать на примере с использованием паттерна "Стратегия".

<br />
---
<br />

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

В этом примере класс `Sorter` принимает стратегию сортировки через конструктор и метод `setStrategy`. Объекты `BubbleSortStrategy` и `QuickSortStrategy` заменяемы между собой без изменения поведения класса `Sorter`, что соответствует принципу `LSP`.
