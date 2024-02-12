`L` - `Liskov substitution Principle` - принцип подстановки Барбары Лисков. Должна быть возможность вместо базового (родительского) типа (класса) подставить любой его подтип (класс-наследник), при этом работа программы не должна измениться.

Данный принцип непосредственно связан с наследованием классов. Допустим у нас есть базовый класс Счет (`Account`), в котором есть три метода: просмотр остатка на счете, пополнение счета и оплата.

```ts
class Account {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }

    payment(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
``` 

Нам необходимо написать еще два класса: зарплатный счет и депозитный счет, при этом зарплатный счет должен поддерживать все операции, представленные в базовом классе, а депозитный счет - не должен поддерживать проведение оплаты.

```ts
class SalaryAccount extends Account {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }

    payment(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
```

```ts
class DepositAccount extends Account {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }

    payment(numberAccount: string, sum: BigDecimal): void {
        throw new Error("Operation not supported");
    }
}
```

Если сейчас в коде программы везде, где мы использовали класс Account заменить на его класс-наследник (подтип) `SalaryAccount`, то программа продолжит нормально работать, так как в классе `SalaryAccount` доступны все операции, которые есть и в классе Account.

Если же мы такое попробуем сделать с классом `DepositAccount`, то есть заменим базовый класс Account на его класс-наследник `DepositAccount`, то программа начнет неправильно работать, так как при вызове метода `payment()` будет выбрасываться исключение new `UnsupportedOperationException`. Таким образом произошло нарушение принципа подстановки Барбары Лисков.

Для того чтобы следовать принципу подстановки Барбары Лисков необходимо в базовый (родительский) класс выносить только общую логику, характерную для классов наследников, которые будут ее реализовывать и, соответственно, можно будет базовый класс без проблем заменить на его класс-наследник.

В нашем случае класс `Account` будет выглядеть следующим образом.

```ts
class Account {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
```

Мы сможем от него наследовать класс `DepositAccount`.

```ts
class DepositAccount extends Account {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
```

Создадим дополнительный класс `PaymentAccount`, который унаследуем от `Account` и его расширим методом проведения оплаты.

```ts
class PaymentAccount extends Account {
    payment(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
```

И наш класс `SalaryAccount` уже унаследуем от класса `PaymentAccount`.

```ts
class SalaryAccount extends PaymentAccount {
    balance(numberAccount: string): BigDecimal {
        //logic
        return bigDecimal;
    }

    refill(numberAccount: string, sum: BigDecimal): void {
        //logic
    }

    payment(numberAccount: string, sum: BigDecimal): void {
        //logic
    }
}
```

Сейчас замена класса `PaymentAccount` на его класс-наследник `SalaryAccount` не "поломает" нашу программу, так как класс `SalaryAccount` имеет доступ ко всем методам, что и `PaymentAccount`. Также все будет хорошо при замене класса Account на его класс-наследник `PaymentAccount`.

Принцип подстановки Барбары Лисков заключается в правильном использовании отношения наследования. Мы должны создавать наследников какого-либо базового класса тогда и только тогда, когда они собираются правильно реализовать его логику, не вызывая проблем при замене родителей на наследников.

<br />
---
<br />

Принцип подстановки Лисков (`Liskov Substitution Principle, LSP`) гласит, что объекты должны быть заменяемыми своими подтипами без изменения свойств программы. В TypeScript принцип `LSP` можно продемонстрировать на примере с использованием паттерна "Стратегия".

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
